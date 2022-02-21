<<<<<<< HEAD
import { IsString, ValidateNested } from "class-validator"
=======
import { ValidateNested } from "class-validator"
>>>>>>> 75fb2ce9 (feat: update customer groups (#1075))
import { IsType } from "../utils/validators/is-type"

import { StringComparisonOperator } from "./common"

export class FilterableCustomerGroupProps {
  @ValidateNested()
  @IsType([String, [String], StringComparisonOperator])
  id?: string | string[] | StringComparisonOperator
}
<<<<<<< HEAD

export class CustomerGroupsBatchCustomer {
  @IsString()
  id: string
}
export class CustomerGroupUpdate {
  name?: string
  metadata?: object
}
=======
>>>>>>> 75fb2ce9 (feat: update customer groups (#1075))
