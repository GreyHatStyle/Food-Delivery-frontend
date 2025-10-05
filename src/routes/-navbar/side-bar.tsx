import { ChevronRight, Heart, Home, ShoppingBagIcon, User, UserCog} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SideBarProps{
    sideBarClosed: boolean,
    setCloseSidebar: (val: boolean) => void,
}

function SideBar({
    sideBarClosed,
    setCloseSidebar,
}: SideBarProps) {
    
  return (
    <div 
    className={`fixed z-50 top-0 w-[10rem] py-6 bg-web-theme-green/60 h-full flex flex-col gap-4
        transition-all duration-500
        ${sideBarClosed ? "right-[-100%]" : "right-0"}
    `}>
        <button 
        onClick={() => setCloseSidebar(true)}
        className="pl-4 hover:cursor-pointer">
            <ChevronRight/>
        </button>

        <Button variant={"sideMenu"}><Home/> Home </Button>
        <Button variant={"sideMenu"}><UserCog/> Help </Button>
        <Button variant={"sideMenu"}><User/> Sign In</Button>
        <Button variant={"sideMenu"}><ShoppingBagIcon/> Cart</Button>
        <Button variant={"sideMenu"}> <Heart/> Favorites</Button>

    </div>
  )
}

export default SideBar