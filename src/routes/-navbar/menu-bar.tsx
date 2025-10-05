import { Button } from "@/components/ui/button";
import { Heart, ShoppingBagIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function Menubar() {
  return (
    <div className="flex flex-row gap-5">
        <Button 
        className="px-[2rem]"
        variant={"ghost"}>Home</Button>
        
        <Button 
        className="px-[2rem]"
        variant={"ghost"}>Help</Button>
        
        <Button 
        className="px-[2rem] border-2"
        variant={"ghost"}>Sign Up</Button>
        
        <Tooltip>
        <TooltipTrigger asChild>
            <Button className="bg-web-theme-green">
            <ShoppingBagIcon />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Cart</p>
        </TooltipContent>
        </Tooltip>

        <Tooltip>
        <TooltipTrigger asChild>
            <Button className="bg-web-theme-green">
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