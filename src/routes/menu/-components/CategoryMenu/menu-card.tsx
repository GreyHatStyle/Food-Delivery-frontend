import NonVegIcon from "@/components/ui/non-veg-icon"
import VegIcon from "@/components/ui/veg-icon"
import { type ComponentProps } from "react"
import type { MenuItemsType } from "../../-api/menu-api"
import { useCartItemQuery } from "../../-query/cart-item-query"
import AddMenuButton from "../add-menu-button"
import { useCartStore } from "@/store/cart-store"

interface MenuCartProps{
    menu_item: MenuItemsType,
    restId: string,
    category: string,
}

function MenuCard({
    menu_item,
    restId,
    category,
    ...props
}: MenuCartProps & ComponentProps<"div">){

    const {items} = useCartStore(state => state);
    const {mutate} = useCartItemQuery(restId);

  return (
    <div 
    {...props}
    className='inline-flex md:mx-[3rem] py-7 px-7 sm:px-11 bg-white border-2 rounded-xl justify-between '>
        <div className='flex flex-col gap-2 justify-center max-w-[50%]'>

            {
                menu_item.food_type === "V" ? 
                <VegIcon />
                :
                <NonVegIcon/>
            }

            <p
            className='text-sm text-teal-800 font-bold mt-7 md:text-2xl'
            >{menu_item.name}</p>

            <p
            className="text-xl font-semibold"
            >&#8377; {menu_item.price}</p>
            
            <p
            className='text-[12px] md:text-sm'
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic iusto delectus nobis nulla pariatur.</p>
        
        </div>

        <div className='relative overflow-hidden rounded-md max-w-[140px]'>
            <img 
            className='object-cover scale-120'
            src={menu_item.image_url !== "no_url_image"? menu_item.image_url : "/placeholder.png"} alt="" />
            
            <AddMenuButton
            className="absolute bottom-2 left-5 sm:left-8 border-2"
            items={items}
            data={{
                category: category,
                item_uuid: menu_item.item_uuid,
                restaurant_id: restId,
            }}
            
            mutate={mutate}
            />
        </div>

    </div>
  )
}

export default MenuCard