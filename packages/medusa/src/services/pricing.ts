import { BaseService } from "medusa-interfaces"
import { EntityManager } from "typeorm"
import {
  CartService,
  ProductVariantService,
  ProductService,
  RegionService,
  TaxProviderService,
} from "."
import { Product, ProductVariant } from "../models"
import { TaxServiceRate } from "../types/tax-service"
import {
  ProductVariantPricing,
  TaxedPricing,
  PricingContext,
  PricedProduct,
  PricedVariant,
} from "../types/pricing"
import {
  IPriceSelectionStrategy,
  PriceSelectionContext,
} from "../interfaces/price-selection-strategy"

type InjectedDependencies = {
  manager: EntityManager
  productVariantService: ProductVariantService
  productService: ProductService
  taxProviderService: TaxProviderService
  cartService: CartService
  regionService: RegionService
  priceSelectionStrategy: IPriceSelectionStrategy
}

/**
 * Allows retrieval of prices.
 * @extends BaseService
 */
class PricingService extends BaseService {
  protected manager_: EntityManager
  protected readonly cartService: CartService
  protected readonly regionService: RegionService

  constructor({
    manager,
    cartService,
    productVariantService,
    productService,
    taxProviderService,
    regionService,
    priceSelectionStrategy,
  }: InjectedDependencies) {
    super()
    this.manager_ = manager
    this.regionService = regionService
    this.taxProviderService = taxProviderService
    this.cartService = cartService
    this.priceSelectionStrategy = priceSelectionStrategy
    this.productVariantService = productVariantService
    this.productService = productService
  }

  withTransaction(transactionManager: EntityManager): PricingService {
    if (!transactionManager) {
      return this
    }

    const cloned = new PricingService({
      manager: transactionManager,
      cartService: this.cartService,
      productVariantService: this.productVariantService,
      productService: this.productService,
      taxProviderService: this.taxProviderService,
      regionService: this.regionService,
      priceSelectionStrategy: this.priceSelectionStrategy,
    })

    cloned.transactionManager_ = transactionManager

    return cloned
  }

  /**
   * Collects additional information neccessary for completing the price
   * selection.
   * @param context - the price selection context to use
   * @return The pricing context
   */
  async collectPricingContext(
    context: PriceSelectionContext
  ): Promise<PricingContext> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        let automaticTaxes = false
        let taxRate = null
        let regionId = context.region_id
        let currencyCode = context.currency_code

        if (context.cart_id) {
          const cart = await this.cartService
            .withTransaction(transactionManager)
            .retrieve(context.cart_id, {
              select: ["id", "region_id"],
            })

          regionId = cart.region_id
        }

        if (regionId) {
          const region = await this.regionService
            .withTransaction(transactionManager)
            .retrieve(regionId, {
              select: ["id", "currency_code", "automatic_taxes", "tax_rate"],
            })

          currencyCode = region.currency_code
          automaticTaxes = region.automatic_taxes
          taxRate = region.tax_rate
        }

        return {
          price_selection: {
            ...context,
            region_id: regionId,
            currency_code: currencyCode,
          },
          automatic_taxes: automaticTaxes,
          tax_rate: taxRate,
        }
      }
    )
  }

  /**
   * Gets the prices for a product variant
   * @param variantPricing - the prices retrieved from a variant
   * @param productRates - the tax rates that the product has applied
   * @return The tax related variant prices.
   */
  async calculateTaxes(
    variantPricing: ProductVariantPricing,
    productRates: TaxServiceRate[]
  ): Promise<TaxedPricing> {
    const rate = productRates.reduce(
      (accRate: number, nextTaxRate: TaxServiceRate) => {
        return accRate + (nextTaxRate.rate || 0) / 100
      },
      0
    )

    const result: TaxedPricing = {
      original_tax: null,
      calculated_tax: null,
      original_price_incl_tax: null,
      calculated_price_incl_tax: null,
      tax_rates: productRates,
    }

    if (variantPricing.calculated_price !== null) {
      const taxAmount = Math.round(variantPricing.calculated_price * rate)
      result.calculated_tax = taxAmount
      result.calculated_price_incl_tax =
        variantPricing.calculated_price + taxAmount
    }

    if (variantPricing.original_price !== null) {
      const taxAmount = Math.round(variantPricing.original_price * rate)
      result.original_tax = taxAmount
      result.original_price_incl_tax = variantPricing.original_price + taxAmount
    }

    return result
  }

  /**
   * Gets the prices for a product variant
   * @param variantId - the id of the variant to get prices for
   * @param context - the price selection context to use
   * @return The product variant prices
   */
  async getProductVariantPricing(
    variantId: string,
    context: PriceSelectionContext | PricingContext
  ): Promise<ProductVariantPricing> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        let pricingContext: PricingContext
        if ("automatic_taxes" in context) {
          pricingContext = context
        } else {
          pricingContext = await this.collectPricingContext(context)
        }

        const pricing = await this.priceSelectionStrategy
          .withTransaction(transactionManager)
          .calculateVariantPrice(variantId, pricingContext.price_selection)

        const pricingResult: ProductVariantPricing = {
          prices: pricing.prices,
          original_price: pricing.originalPrice,
          calculated_price: pricing.calculatedPrice,
          calculated_price_type: pricing.calculatedPriceType,
          original_price_incl_tax: null,
          calculated_price_incl_tax: null,
          original_tax: null,
          calculated_tax: null,
          tax_rates: null,
        }

        if (
          pricingContext.automatic_taxes &&
          pricingContext.price_selection.region_id
        ) {
          let productRates: TaxServiceRate[]
          if (!pricingContext.product_rates) {
            const product = await this.productVariantService.retrieve(
              variantId,
              { select: ["id", "product_id"] }
            )
            productRates =
              await this.taxProviderService.getRegionRatesForProduct(
                product.id,
                {
                  id: pricingContext.price_selection.region_id,
                  tax_rate: pricingContext.tax_rate,
                }
              )
          } else {
            productRates = pricingContext.product_rates
          }

          const taxResults = await this.calculateTaxes(
            pricingResult,
            productRates
          )

          pricingResult.original_price_incl_tax =
            taxResults.original_price_incl_tax
          pricingResult.calculated_price_incl_tax =
            taxResults.calculated_price_incl_tax
          pricingResult.original_tax = taxResults.original_tax
          pricingResult.calculated_tax = taxResults.calculated_tax
          pricingResult.tax_rates = taxResults.tax_rates
        }

        return pricingResult
      }
    )
  }

  /**
   * Gets all the variant prices for a product
   * @param productId - the id of the product to get prices for
   * @param context - the price selection context to use
   * @return A map of variant ids to their corresponding prices
   */
  async getProductPricing(
    productId: string,
    context: PriceSelectionContext
  ): Promise<Record<string, ProductVariantPricing>> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const pricingContext = await this.collectPricingContext(context)
        const variants = await this.productVariantService
          .withTransaction(transactionManager)
          .list({ product_id: productId }, { select: ["id"] })

        if (
          pricingContext.automatic_taxes &&
          pricingContext.price_selection.region_id
        ) {
          pricingContext.product_rates = await this.taxProviderService
            .withTransaction(transactionManager)
            .getRegionRatesForProduct(productId, {
              id: pricingContext.price_selection.region_id,
              tax_rate: pricingContext.tax_rate,
            })
        }

        const pricings = {}
        await Promise.all(
          variants.map(async ({ id }) => {
            const variantPricing = await this.getProductVariantPricing(
              id,
              pricingContext
            )
            pricings[id] = variantPricing
          })
        )

        return pricings
      }
    )
  }

  /**
   * Set additional prices on a list of product variants.
   * @param variants - list of variants on which to set additional prices
   * @param context - the price selection context to use
   * @return A list of products with variants decorated with prices
   */
  async setVariantPrices(
    variants: ProductVariant[],
    context: PriceSelectionContext
  ): Promise<PricedVariant[]> {
    const pricingContext = await this.collectPricingContext(context)
    return await Promise.all(
      variants.map(async (variant) => {
        const variantPricing = await this.getProductVariantPricing(
          variant.id,
          pricingContext
        )
        return {
          ...variant,
          ...variantPricing,
        }
      })
    )
  }

  /**
   * Set additional prices on a list of products.
   * @param products - list of products on which to set additional prices
   * @param context - the price selection context to use
   * @return A list of products with variants decorated with prices
   */
  async setProductPrices(
    products: Product[],
    context: PriceSelectionContext
  ): Promise<(Product | PricedProduct)[]> {
    return await Promise.all(
      products.map(async (product) => {
        if (!product?.variants?.length) {
          return product
        }

        const variantPricing = await this.getProductPricing(product.id, context)

        const pricedVariants = product.variants.map(
          (productVariant): PricedVariant => {
            const pricing = variantPricing[productVariant.id]
            return {
              ...productVariant,
              ...pricing,
            }
          }
        )

        const pricedProduct = {
          ...product,
          variants: pricedVariants,
        }

        return pricedProduct
      })
    )
  }
}

export default PricingService
