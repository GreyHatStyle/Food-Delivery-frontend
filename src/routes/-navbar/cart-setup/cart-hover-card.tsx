import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Line from "@/components/ui/line"
import NonVegIcon from "@/components/ui/non-veg-icon"
import { H1, H3, H4 } from "@/components/ui/typography"
import VegIcon from "@/components/ui/veg-icon"

import { ShoppingBagIcon } from "lucide-react"
import { useCartQuery } from "./cart-get-query"
import { useCartStore } from "@/store/cart-store"
import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

interface CartBadgeProps {
    count: number;
    className?: string;
}

export function CartBadge({ count, className }: CartBadgeProps) {
    if (count === 0) return null;
    
    return (
        <span className={cn(
            "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-in zoom-in-75",
            className
        )}>
            {count > 99 ? '99+' : count}
        </span>
    );
}


function CartHoverCard() {

    const {items, restaurant_name, restaurant_id} = useCartStore(state => state);
    const {data, isError, error, status} = useCartQuery();
    const {user} = useAuthStore(state => state);

    const navigate = useNavigate();

    if(isError){
        console.log("Cart api error: ", error);
    }

    // console.log("Cart Data: ", data);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="relative">
            <ShoppingBagIcon />
            <CartBadge count={items.length} />
        </Button>
      </HoverCardTrigger>

    
      <HoverCardContent

      // Did this complex logic because, even though cart items was empty the api was still returning successfully response, with 
      // empty c_items list
      style={{
        display: (user && status === "success" && data.results?.c_items.length!== 0) ? "block" : "none"
      }}
      className="w-100 z-120 " 
      sideOffset={20}
      align="end"
      >
        <div id="cart-restaurant"
        className="inline-flex gap-5 p-1 "
        >
            <img 
            className="size-20"
            src={data?.results?.c_items[data.results.c_items.length-1]?.item_data.image_url} alt="restaurant image" />

            <div>
                <H4>{restaurant_name}</H4>
                <p className="text-neutral-500 text-sm" >Race Course</p>
                <Button 
                variant={"link"} className="text-blue-600 pl-0" 
                onClick={() => navigate({
                  to: `/menu/${restaurant_id}`
                })}
                >
                  View Full Menu
                </Button>
            </div>

        </div>
        
        <Line />

        <div className="flex flex-col p-2 gap-3 text-sm text-neutral-700 mb-3">
            {
                items.map((item, index) => (
                    <div 
                    key={index}
                    className="inline-flex items-start">
                        {
                            item.item_data.food_type === "V" ? <VegIcon/> : <NonVegIcon/>
                        }

                        <p className="pl-11 flex-1 pt-1"> {item.item_data.name} X {item.quantity} </p>
                        <p>&#8377;{item.item_data.price}</p>
                    </div>
                ))
            }
        </div>

        <Line/>

        <div className="inline-flex items-center w-full p-2">
            <div className="flex-1">
                <H4>Sub Total</H4>
                <p className="text-neutral-400" >Extra Charges may apply</p>
            </div>

            <H3>&#8377;{data?.results?.total_price.toFixed(2)}</H3>
        </div>

        <Button
        className="rounded-none w-full p-2"
        >CHECKOUT</Button>

      </HoverCardContent>

      <HoverCardContent
      style={{
        display: ((user && status === "error") || (data?.results?.c_items.length === 0)) ? "block" : "none",
      }}
      >

        <H1>Cart Is Empty</H1>

      </HoverCardContent>

      <HoverCardContent
      style={{
        display: (!user) ? "block" : "none",
      }}
      >

        <H3>Please Click on Login button, and login with user <b>test1</b> to use this cart feature</H3>

      </HoverCardContent>

    </HoverCard>
  )
}

export default CartHoverCard