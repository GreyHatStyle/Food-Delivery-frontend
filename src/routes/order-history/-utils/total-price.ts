import type { OrderType } from "../-components/queries/get-orders-query-api";

/**
 * Calculates **total cost** for all *menu items with service taxes*.
 * @param orderDetails The order details returned by api
 * @returns total cost including all menu items and service taxes.
 */
export function totalPrice(orderDetails: OrderType | undefined){
  if (orderDetails){
    let costPaid = orderDetails.item_list.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    Object.entries(orderDetails.service_charges).forEach((item) => costPaid += item[1]);
    return costPaid;
  }

}