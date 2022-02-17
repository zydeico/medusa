import {
  AdminGetProductsParams,
  AdminPostProductsProductMetadataReq,
  AdminPostProductsProductOptionsOption,
  AdminPostProductsProductOptionsReq,
  AdminPostProductsProductReq,
  AdminPostProductsProductVariantsReq,
  AdminPostProductsProductVariantsVariantReq,
  AdminPostProductsReq,
  AdminProductsDeleteOptionRes,
  AdminProductsDeleteRes,
  AdminProductsDeleteVariantRes,
  AdminProductsListRes,
  AdminProductsListTagsRes,
  AdminProductsListTypesRes,
  AdminProductsRes,
} from "@medusajs/medusa"
import qs from "qs"
import { ResponsePromise } from "../../typings"
import BaseResource from "../base"

class AdminProductsResource extends BaseResource {
<<<<<<< HEAD
  create(
    payload: AdminPostProductsReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
=======
  create(payload: AdminPostProductsReq, customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/products/`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

<<<<<<< HEAD
  retrieve(
    id: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
=======
  retrieve(id: string, customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/products/${id}`
    return this.client.request("GET", path, {}, {}, customHeaders)
  }

  update(
    id: string,
    payload: AdminPostProductsProductReq,
<<<<<<< HEAD
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
=======
    customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/products/${id}`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

<<<<<<< HEAD
  delete(
    id: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsDeleteRes> {
=======
  delete(id: string, customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsDeleteRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/products/${id}`
    return this.client.request("DELETE", path, {}, {}, customHeaders)
  }

<<<<<<< HEAD
  list(
    query?: AdminGetProductsParams,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsListRes> {
=======
  list(query?: AdminGetProductsParams, customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsListRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    let path = `/admin/products`

    if (query) {
      const queryString = qs.stringify(query)
      path = `/admin/products?${queryString}`
    }

    return this.client.request("GET", path, {}, {}, customHeaders)
  }

<<<<<<< HEAD
  listTypes(
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsListTypesRes> {
=======
  listTypes(customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsListTypesRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/products/types`
    return this.client.request("GET", path, {}, {}, customHeaders)
  }

<<<<<<< HEAD
  listTags(
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsListTagsRes> {
=======
  listTags(customHeaders: Record<string, any> = {}): ResponsePromise<AdminProductsListTagsRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/products/tag-usage`
    return this.client.request("GET", path, {}, {}, customHeaders)
  }

  setMetadata(
    id: string,
    payload: AdminPostProductsProductMetadataReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
    const path = `/admin/products/${id}/metadata`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  createVariant(
    id: string,
    payload: AdminPostProductsProductVariantsReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
    const path = `/admin/products/${id}/variants`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  updateVariant(
    id: string,
    variantId: string,
    payload: AdminPostProductsProductVariantsVariantReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
    const path = `/admin/products/${id}/variants/${variantId}`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  deleteVariant(
    id: string,
    variantId: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsDeleteVariantRes> {
    const path = `/admin/products/${id}/variants/${variantId}`
    return this.client.request("DELETE", path, {}, {}, customHeaders)
  }

  addOption(
    id: string,
    payload: AdminPostProductsProductOptionsReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
    const path = `/admin/products/${id}/options`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  updateOption(
    id: string,
    optionId: string,
    payload: AdminPostProductsProductOptionsOption,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsRes> {
    const path = `/admin/products/${id}/options/${optionId}`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  deleteOption(
    id: string,
    optionId: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminProductsDeleteOptionRes> {
    const path = `/admin/products/${id}/options/${optionId}`
    return this.client.request("DELETE", path, {}, {}, customHeaders)
  }
}

export default AdminProductsResource
