import { Router } from "express"
import { CustomerGroup } from "../../../.."
import { DeleteResponse, PaginatedResponse } from "../../../../types/common"
import middlewares from "../../../middlewares"

const route = Router()

export default (app) => {
  app.use("/customer-groups", route)

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 21d99a44 (feat: GET customer group endpoint)
  route.get("/:id", middlewares.wrap(require("./get-customer-group").default))
  route.post("/", middlewares.wrap(require("./create-customer-group").default))
  route.delete(
<<<<<<< HEAD
    "/:id/customers/batch",
    middlewares.wrap(require("./delete-customers-batch").default)
  )

  route.delete(
    "/:id",
    middlewares.wrap(require("./delete-customer-group").default)
  )
  route.post(
    "/:id",
    middlewares.wrap(require("./update-customer-group").default)
  )

=======
  route.post("/", middlewares.wrap(require("./create-customer-group").default))
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
=======
    "/:id",
    middlewares.wrap(require("./delete-customer-group").default)
  )
>>>>>>> e35a4fb2 (Feat: Delete customer group (#1102))
  return app
}

export type AdminCustomerGroupsRes = {
  customer_group: CustomerGroup
}

export type AdminCustomerGroupsDeleteRes = DeleteResponse

export type AdminCustomerGroupsListRes = PaginatedResponse & {
  customer_groups: CustomerGroup[]
}

<<<<<<< HEAD
<<<<<<< HEAD
export const defaultAdminCustomerGroupsRelations = []

=======
>>>>>>> b16976a6 (Feat: Create customer group (#1074))
=======
export const defaultAdminCustomerGroupsRelations = []

>>>>>>> ecd6ed82 (feat: add `extend` param for customer groups)
export * from "./create-customer-group"
