import { GoLocation } from 'react-icons/go'
import type { GetSingleOrderResponseType } from '../queries/get-single-order-query-api'
import { H4 } from '@/components/ui/typography'
import Line from '@/components/ui/line'

function addressFirstSetGet(address: string | undefined){
  
  if(address){
    const index = address.indexOf(',');
    if (index !== -1){
      return address.slice(0, index);
    }
  }
  
  return ""
}


function DeliverFromTo({
  order_details,
}: {
  order_details: GetSingleOrderResponseType | undefined,
}) {
  return (
    <div id="location-to-to" className="relative flex flex-col gap-9">
              
      <div className="inline-flex gap-3">
        <GoLocation className="size-13"/>
        <div>
          <H4>{order_details?.order.restaurant_name}</H4>
          <p className="text-sm">{order_details?.restaurant_address}</p>
        </div>
      </div>

      <Line
      lineColor="white"
      direction="vertical" 
      heightPx={50} 
      className="absolute top-13 left-4.5 border-l-2 border-black border-dashed"/>

      <div className="inline-flex gap-3">
        <GoLocation className="size-10"/>
        <div>
          <H4>{addressFirstSetGet(order_details?.order.delivery_address)}</H4>
          <p className="text-sm">{order_details?.order.delivery_address}</p>
        </div>
      </div>
    </div>
  )
}

export default DeliverFromTo