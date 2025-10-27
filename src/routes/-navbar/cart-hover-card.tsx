import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Line from "@/components/ui/line"
import NonVegIcon from "@/components/ui/non-veg-icon"
import { H3, H4 } from "@/components/ui/typography"
import VegIcon from "@/components/ui/veg-icon"
import { ShoppingBagIcon } from "lucide-react"

type CartItemType = {
    name: string,
    quantity: number,
    price: number,
    type: "V" | "NV"
}

function CartHoverCard() {
    const restName = "Burger King";
    const cartItems: CartItemType[] = [
        {
            name: "Paneer Tikka",
            quantity: 2,
            price: 300.00,
            type: "V"
        },
        {
            name: "Big Chicken burger",
            quantity: 2,
            price: 200.00,
            type: "NV",
        },
        {
            name: "Double Cheese Burger",
            quantity: 3,
            price: 700.00,
            type: "V",
        },
    ];

    const total_price = 1200.00;


  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button>
            <ShoppingBagIcon />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent 
      className="w-100 z-120 " 
      sideOffset={20}
      align="end"
      >
        <div id="cart-restaurant"
        className="inline-flex gap-5 p-1 "
        >
            <img 
            className="size-20"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/3/20/cd4cfb8f-a2dd-4af7-a662-7bab15cf0494_1064266.jpg" alt="restaurant image" />

            <div>
                <H4>{restName}</H4>
                <p className="text-neutral-500 text-sm" >Race Course</p>
                <Button variant={"link"} className="text-blue-600 pl-0" >View Full Menu</Button>
            </div>

        </div>
        
        <Line />

        <div className="flex flex-col p-2 gap-3 text-sm text-neutral-700 mb-3">
            {
                cartItems.map((item, index) => (
                    <div 
                    key={index}
                    className="inline-flex items-start">
                        {
                            item.type === "V" ? <VegIcon/> : <NonVegIcon/>
                        }

                        <p className="pl-11 flex-1 pt-1"> {item.name} X {item.quantity} </p>
                        <p>&#8377;{item.price}</p>
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

            <H3>&#8377;{total_price}</H3>
        </div>

        <Button
        className="rounded-none w-full p-2"
        >CHECKOUT</Button>

      </HoverCardContent>

    </HoverCard>
  )
}

export default CartHoverCard