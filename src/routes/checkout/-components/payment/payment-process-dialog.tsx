import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatefulComponent } from "@/components/ui/stateful-button"
import { H1, H4 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useCartDeleteQuery } from "./clear-cart-query-api"

interface PPDialogButProps{
    buttonClassName: string,
    children?: ReactNode,
}

 const handleClick = () => {
    return new Promise(() => {
        // setTimeout(() => setPaymentStatus("Completed Payment!!"), 2000);
        // setPaymentStatus("Completed Payment!!")

        // This is confusing I know, for now just think of it like
        // 1. This handle click returns promise
        // 2. As soon as its opened Stateful Component uses useEffect() such that it loads animation.
        // 3. setIsOpen() function here plays main role to control the stateFul component from parent (this current one).
    });
};

export function PaymentProcessDialogButton({
    buttonClassName,
    children,
}: PPDialogButProps) {

    const [paymentStatus, setPaymentStatus] = useState<"Processing Payment" | "Completed Payment!!" | "">("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const {mutate: clearCartQ} = useCartDeleteQuery();

    useEffect(() => {
        //  I used useRef to trigger the button click, because I couldn't understand the other way, i needed both buttons to trigger onClick on single click
        if (isOpen && buttonRef.current){
            buttonRef.current.click();
            console.log("Should Work now!!")
        }
    }, [isOpen])


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button 
          onClick={() => {
            setPaymentStatus("Processing Payment")
        }}
          className={cn("", buttonClassName)}
          >{children}</Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[425px] min-h-[325px] z-1000 h-[65dvh]">
          
          <div className="flex flex-col gap-2">
            <StatefulComponent
            className="flex-1"
            onClick={handleClick}
            ref={buttonRef}
            setPaymentStatus={setPaymentStatus}
            >
            </StatefulComponent>

                
            <H1
            className="text-xl sm:text-3xl"
            >{paymentStatus}</H1>

            {
                paymentStatus === "Completed Payment!!" &&
                <>
                <H4
                className="text-center text-sm"
                >Thankyou for Using this project</H4>

                <Button variant={"sideMenu"} className="border-2"
                onClick={() => navigate({
                    to: "/"
                })}
                >
                    Go Back to Home
                </Button>

                <Button variant={"outline"} className="border-2 rounded-sm hover:bg-red-400 hover:text-white"
                onClick={() => clearCartQ()}
                >
                    Clear Cart
                </Button>
                
                </>
                
            }
          </div>
            

        </DialogContent>
      </form>
    </Dialog>
  )
}
