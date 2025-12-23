import { H4 } from "@/components/ui/typography"
import type { GetSingleOrderResponseType } from "../queries/get-single-order-query-api"
import VegIcon from "@/components/ui/veg-icon"
import NonVegIcon from "@/components/ui/non-veg-icon"

interface OrderItemsDetailsProps{
  orderItems: GetSingleOrderResponseType['order']['item_list'] | undefined,
  service_charges: GetSingleOrderResponseType['order']['service_charges'] | undefined,
}

function OrderItemsDetails({
  orderItems,
  service_charges,
}: OrderItemsDetailsProps) {
  return (
    <div
    className="mt-4 border-2 pb-5 pt-3 px-3"
    >
      <H4>Order Details</H4>
      <p className="text-neutral-700">Items: {orderItems?.length}</p>
      
      <div className="flex flex-col mt-2 gap-4">
        {
          orderItems?.map((item, idx) => (
            <div key={idx}
            className="relative text-sm inline-flex justify-between gap-3"
            > 
                {
                item.veg === true ?
                <VegIcon />
                :
                <NonVegIcon />
                }
              <p className="font-bold flex-1 pl-6">
                {item.name} x {item.quantity}
              </p>
              <p className="text-neutral-500 font-semibold">
                &#8377; {item.price}
              </p>
            </div>
          ))
        }
        
        {
          Object.entries(service_charges || {}).map(([key, value]) => (
            <div className="ml-3 text-sm inline-flex justify-between gap-3"> 
              <p className="font-bold flex-1 pl-6">
                {key.replaceAll('_', ' ')}
              </p>
              <p className="text-neutral-500 font-semibold">
                &#8377; {value}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default OrderItemsDetails