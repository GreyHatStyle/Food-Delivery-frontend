import { Menu } from "lucide-react"
import SideBar from "./side-bar";
import { useState } from "react"
import { useIsMobile } from "@/hooks/useMobile";
import Menubar from "./menu-bar";


function Navbar() {
  const [sideBarClosed, setCloseSideBar] = useState<boolean>(true);
  const isMobileDevice = useIsMobile();
  

  return (
    <nav className="sticky top-0 z-[100] variable-padding mb-3 flex flex-row justify-between bg-background">
      <button className="poppins font-extrabold text-2xl hover:cursor-pointer">
        Zomiggy
      </button>

      {
        !isMobileDevice && 
        <Menubar />
      }
    

      {/* The side bar below medium */}
    {
      isMobileDevice &&
      <>
      <button 
      id="side-menu-show-button"
      onClick={() => setCloseSideBar(false)}
      className="hover:cursor-pointer">
      <Menu />
      </button>

      <div 
      id="black-screen"
      onClick={() => setCloseSideBar(true)}
      style={{
        position: sideBarClosed ? "relative" : "fixed",
        display: sideBarClosed ? "none" : "block"
      }}
      className="top-0 left-0 bg-black/20 h-screen w-screen z-10">
      </div>

      <SideBar
      setCloseSidebar={setCloseSideBar} 
      sideBarClosed={sideBarClosed}/>
      </>
      
    }
    

    </nav>
  )
}

export default Navbar