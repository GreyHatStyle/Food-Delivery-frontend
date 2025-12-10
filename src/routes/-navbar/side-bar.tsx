import { ChevronRight, Heart, Home, LogOut, ShoppingBagIcon, User, UserCog} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Login } from "./login"
import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "@/store/auth-store";

interface SideBarProps{
    sideBarClosed: boolean,
    setCloseSidebar: (val: boolean) => void,
}

function SideBar({
    sideBarClosed,
    setCloseSidebar,
}: SideBarProps) {

    const navigate = useNavigate();
    const {logout, user} = useAuthStore(state => state);
    
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

        <Button 
        variant={"sideMenu"}
        onClick={() => {
            navigate({
                to: "/",
            })
            setCloseSidebar(true);
        }}
        ><Home/> Home </Button>
        <Button variant={"sideMenu"}><UserCog/> Help </Button>
        {/* <Button variant={"sideMenu"}><User/> Sign In</Button> */}
        
        {
            !user ?
            <Login 
            variant={"sideMenu"} 
            children={<User/>} className="inline-flex" 
            onClick={() => setCloseSidebar(true)}
            />

            :

            <Button 
            variant={"sideMenu"}
            onClick={() => {
                logout();
                setCloseSidebar(true);
            }}
            >
                <LogOut/>
                Logout
            </Button>
        }


        <Button 
        variant={"sideMenu"}
        onClick={() => {
            navigate({
                to: "/checkout",
            })
            setCloseSidebar(true);
        }}
        ><ShoppingBagIcon/> Cart</Button>
        
        <Button variant={"sideMenu"}> <Heart/> Favorites</Button>

    </div>
  )
}

export default SideBar