import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, type ComponentProps } from "react"
import { Check, X } from "lucide-react";
import { H2 } from "@/components/ui/typography";
import Line from "@/components/ui/line";
import { useGetSingleOrder } from "../queries/get-single-order-query-api";
import DeliverFromTo from "./deliver-from-to";
import OrderItemsDetails from "./order-items-details";
import { totalPrice } from "../../-utils/total-price";


function dateFormatter(timeStr: string | undefined){
  if (timeStr){
    const date = new Date(timeStr);
    const date_obj = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);

    return date_obj
  }
  return "";
}

interface OrderDrawerProps{
  order_id: number,
}

export function OrderDrawer({
  order_id,
  ...props
}: OrderDrawerProps & ComponentProps<typeof Drawer>) {

  const [orderQueryState, setOrdQueryState] = useState<boolean>(false);
  const {data: order_details} = useGetSingleOrder(order_id, orderQueryState);
  console.log("Order details: ", order_details);

  // console.log("Selected Items: ", order_details);
  console.log("Order Id selected: ", order_id);

  return (
    <Drawer direction="right" {...props}>
      <DrawerTrigger asChild>
        
        <Button 
        className="rounded-none"
        onClick={() => setOrdQueryState(true)}
        >
          View Details
        </Button>

      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              <DrawerClose asChild>
                <button  className="absolute left-1 top-1 sm:left-3 sm:top-3 rounded-full p-1 bg-red-600 text-white cursor-pointer">
                  <X className="size-3 sm:size-5"/>
                </button>
              </DrawerClose>
              <H2>
              Order #{order_details?.order.id}
              </H2>
            </DrawerTitle>
            <DrawerDescription>Your Order Details</DrawerDescription>
          </DrawerHeader>

          {/* Did this to give space to footer (bill total) */}
          <div className="p-4 pb-0 max-h-[calc(100dvh-11em)] overflow-y-auto">
            
            <DeliverFromTo 
            order_details={order_details}
            />
            
            <Line className="mt-3"/>

            <div id="delivered-on"
            className="inline-flex gap-5 items-center text-sm mt-2"
            >
              <Check className="text-green-500"/>
              <p>Delivered On {dateFormatter(order_details?.order.created_at)}</p>
            </div>

            <Line className="mt-3"/>


            <OrderItemsDetails 
            orderItems={order_details?.order.item_list}
            service_charges={order_details?.order.service_charges}
            />

          </div>

          <DrawerFooter>
            <Line />

             <div className="flex flex-row mt-3 font-semibold justify-between items-center">
                <p className="text-sm text-neutral-700">
                  Paid via {order_details?.order.payment_type}
                </p>
                <div className="inline-flex gap-3">
                  <p>
                    BILL TOTAL
                  </p>
                  <p className="font-bold">
                    &#8377;
                    {totalPrice(order_details?.order)}
                  </p>
                </div>
            </div>
            
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
