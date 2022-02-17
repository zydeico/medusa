import {
  AdminGetReturnsParams,
  AdminPostReturnsReturnReceiveReq,
  AdminReturnsCancelRes,
  AdminReturnsListRes,
  AdminReturnsRes,
} from "@medusajs/medusa"
import qs from "qs"
import { ResponsePromise } from "../../typings"
import BaseResource from "../base"

class AdminReturnsResource extends BaseResource {
  /**
   * @description cancels a return
   * @param id id of return to cancel
   * @param customHeaders
   * @returns the order for which the return was canceled
   */
<<<<<<< HEAD
  cancel(
    id: string,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminReturnsCancelRes> {
=======
  cancel(id: string, customHeaders: Record<string, any> = {}): ResponsePromise<AdminReturnsCancelRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    const path = `/admin/returns/${id}/cancel`
    return this.client.request("POST", path, {}, {}, customHeaders)
  }

  /**
   * @description receive a return
   * @param id id of the return to receive.
   * @param payload items to receive and an optional refund amount
   * @param customHeaders
   * @returns the return
   */
  receive(
    id: string,
    payload: AdminPostReturnsReturnReceiveReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminReturnsRes> {
    const path = `/admin/returns/${id}/receive`
    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  /**
   * @description lists returns matching a query
   * @param query query for searching returns
   * @param customHeaders
   * @returns a list of returns matching the query
   */
<<<<<<< HEAD
  list(
    query?: AdminGetReturnsParams,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminReturnsListRes> {
=======
  list(query?: AdminGetReturnsParams, customHeaders: Record<string, any> = {}): ResponsePromise<AdminReturnsListRes> {
>>>>>>> 22d387dc (Feat(medusajs) Allow to pass custom headers (#1009))
    let path = `/admin/returns/`

    if (query) {
      const queryString = qs.stringify(query)
      path = `/admin/returns?${queryString}`
    }

    return this.client.request("GET", path, {}, {}, customHeaders)
  }
}

export default AdminReturnsResource
