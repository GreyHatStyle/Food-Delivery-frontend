import { H3 } from "@/components/ui/typography"
import { TbArrowWaveLeftDown, TbArrowWaveRightDown } from "react-icons/tb";
import Recommended from "./recommended";
import MenuItemsList from "./menu-items-list";
import type { MenuItemsType } from "../../-api/menu-api";

interface CategoryMenuProps{
  recomFoodItems: MenuItemsType[],
  categories: string[],
  displayFoodItems: MenuItemsType[],
}

function CategoryMenu({
  recomFoodItems,
  categories,
  displayFoodItems,
}: CategoryMenuProps) {
  return (
    <div className=" flex flex-col items-center">

      <div className="inline-flex items-center gap-2">
        <TbArrowWaveLeftDown className="size-[30px]"/>  
        <H3>M E N U</H3>
        <TbArrowWaveRightDown className="size-[30px]"/>  
      </div>


      <div id="menu-search-bar">
      
      </div>      

      <Recommended 
      recommendedFoods={recomFoodItems}
      />

      <MenuItemsList 
      categories={categories}
      menuList={displayFoodItems}
      />

    </div>
  )
}

export default CategoryMenu