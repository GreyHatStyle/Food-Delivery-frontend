import { Button } from "@/components/ui/button";
import { User } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CartHoverCard from "./cart-setup/cart-hover-card";
import { Login } from "./login";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useLocation, useNavigate } from "@tanstack/react-router";


function Menubar() {

  const {verifySession, user, logout} = useAuthStore(state => state);
  const {clearCart} = useCartStore(state => state);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-5 items-center">
        <Button 
        className="px-[2rem]"
        variant={"ghost"}>
        </Button>
        
        <Button 
        className="px-[2rem]"
        onClick={() => navigate({to: "/"})}
        variant={"ghost"}>Home</Button>
        
        {/* <Button 
        className="px-[2rem] border-2"
        variant={"ghost"}
        onClick={()=>openLoginForm(true)}
        >
          Sign Up</Button> */}
        
        {
          verifySession() ?  

        <>
          <p className="text-teal-700 font-bold">Welcome {user?.username}</p>
          <Button 
          variant={"outline"}
          onClick={() => {
            logout();
            clearCart();
            // did this {refresh technique} because the login component wasn't changing as per verifySession's boolean value, 
            const location = window.location.href;
            window.location.href = location;
          }}
          >Logout</Button>

        </>
        :
        <Login id="login-button"/>
        }

        {
          !(pathname==="/checkout") && <CartHoverCard />
        }
        
        {
          user &&
        <Tooltip>
        <TooltipTrigger asChild>
            <Button 
            id="order-history-button"
            variant={"outline"} className="hover:bg-web-theme-green hover:text-white"
            onClick={() => navigate({ to: "/order-history"})}
            >
            <User />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Order History</p>
        </TooltipContent>
        </Tooltip>
        }


    </div>
  )
}

export default Menubar