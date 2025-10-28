import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CartHoverCard from "./cart-hover-card";
import { Login } from "./login";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "@tanstack/react-router";


function Menubar() {

  const {verifySession, user, logout} = useAuthStore(state => state);
  const navigate = useNavigate();


  return (
    <div className="flex flex-row gap-5 items-center">
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
        
        {
          verifySession() ?  

        <>
          <p className="text-teal-700 font-bold">Welcome {user?.username}</p>
          <Button 
          variant={"outline"}
          onClick={() => {
            logout();
            // did this navigate because the login component wasn't changing as per verifySession's boolean value
            navigate({
              to: "/",
            });
          }}
          >Logout</Button>

        </>
        :
        <Login />
        }


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