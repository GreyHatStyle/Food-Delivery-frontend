import { H3 } from "@/components/ui/typography"
import { TbArrowWaveLeftDown, TbArrowWaveRightDown } from "react-icons/tb";
import Recommended from "./recommended";

function CategoryMenu() {
  return (
    <div className="variable-margin flex flex-col items-center">

      <div className="inline-flex items-center gap-2">
        <TbArrowWaveLeftDown className="size-[30px]"/>  
        <H3>M E N U</H3>
        <TbArrowWaveRightDown className="size-[30px]"/>  
      </div>


      <div id="menu-search-bar">
      
      </div>      

      <Recommended />

    </div>
  )
}

export default CategoryMenu