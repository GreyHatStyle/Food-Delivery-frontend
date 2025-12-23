import type { ComponentProps } from "react"
import type { OrderType } from "./queries/get-orders-query-api"
import { H4 } from "@/components/ui/typography"
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Line from "@/components/ui/line";
import { useNavigate } from "@tanstack/react-router";
import { OrderDrawer } from "./order-drawer";
import { totalPrice } from "../-utils/total-price";


interface OrderCardProps{
  order: OrderType,
}

function OrderCard({
  order,
  ...props
}: OrderCardProps & ComponentProps<"div">) {
  
  const navigate = useNavigate();
  const date = new Date(order.created_at);
  const date_obj = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);


  return (
    <div {...props}
      className='m-2 border-2 p-4 space-y-3 sm:mx-6'>
          
        <div className="flex flex-col gap-4 sm:flex-row ">
            <div className="max-h-30 max-w-50 overflow-hidden">
              <img 
              className="object-cover scale-150"
              src={order.restaurant_img} alt="" />

            </div>

            <div className="flex-1 flex flex-col items-start">
              <H4>{order.restaurant_name}</H4>
              <p className="inline-flex items-center gap-2 text-sm sm:text-base">
                Delivered On: {date_obj} 
                <FaCheckCircle className="size-6 text-green-600"/>  
              </p>
                
                {/* Did this px-1 for mobile user because "View Details" was little of the alignment (typing it just in case I forgot) */}
                <Button  variant={"link"} 
                className="px-1 sm:p-0 text-green-600 hover:text-black"
                onClick={() => navigate({to: `/menu/${order.restaurant}`})}
                >VISIT RESTAURANT</Button>

                
            </div>

        </div>

        <Line className="my-3" />

        <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-3">
          <p
          className="text-sm"
          >{order.item_list.map(item => `${item.name} x ${item.quantity}`).join(",")}</p>
          
            <p className="text-sm font-semibold">
            Total Paid: &#8377;{totalPrice(order)}
            </p>

        </div>

        <OrderDrawer 
        order_id={order.id}
        />
    </div>
  )
}

export default OrderCard