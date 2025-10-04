import { useEffect, useState } from "react";
const MOBILE_BREAKPOINT = 768

export function useIsMobile(){
  const [isMobileDevice, setMobileDevice] = useState<boolean>(window.innerWidth < 768)

  useEffect( ()=>{
    /**
     * Will check if width is low enough to give Phone Display whole screen (instead of scale zoom effect)
     */
    const handleResize = () =>{
        setMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    }

    window.addEventListener('resize', handleResize);
    
    // cleanup event listener on component unmount
    return () =>{
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return isMobileDevice

}