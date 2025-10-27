import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CartHoverCard from "./cart-hover-card";
import { Login } from "./login";

function Menubar() {

  return (
    <div className="flex flex-row gap-5">
        <Button 
        className="px-[2rem]"
        variant={"ghost"}>
        </Button>
        
        <Button 
        className="px-[2rem]"
        variant={"ghost"}>Help</Button>
        
        {/* <Button 
        className="px-[2rem] border-2"
        variant={"ghost"}
        onClick={()=>openLoginForm(true)}
        >
          Sign Up</Button> */}
        
        <Login />

        <CartHoverCard />

        <Tooltip>
        <TooltipTrigger asChild>
            <Button>
            <Heart />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Favorites</p>
        </TooltipContent>
        </Tooltip>


    </div>
  )
}

export default Menubar