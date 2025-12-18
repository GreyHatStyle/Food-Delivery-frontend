import NonVegIcon from "@/components/ui/non-veg-icon"
import { H4 } from "@/components/ui/typography"
import VegIcon from "@/components/ui/veg-icon"
import type { ComponentProps } from "react"
import type { MenuItemsType } from "../../-api/menu-api"
import { useCartItemQuery } from "../../-query/cart-item-query"
import AddMenuButton from "../add-menu-button"
import { useCartStore } from "@/store/cart-store"


interface RecommendedCardProps{
    menu_item: MenuItemsType,
    category: string,
    restId: string,
    menu_items_length: number,
}

function RecommendedCard({
    menu_item,
    category,
    restId,
    menu_items_length,
    ...props
}: RecommendedCardProps & ComponentProps<"div">) {

    const {mutate} = useCartItemQuery(restId);
    const {items} = useCartStore();

  return (
    <div 
    key={props.key}
    // Fixed: Carousel Item shrinking bug for less number of items (large width screen)
    style={{
        minHeight: menu_items_length <= 3 ? "240px" : "0px",
        minWidth: menu_items_length <= 3 ? "280px" : "0px",
    }}
    className="relative overflow-hidden rounded-md max-w-[260px] sm:max-w-[350px]">

        <img 
        className="object-cover scale-150"
        src={menu_item.image_url !== "no_url_image" ? menu_item.image_url : "/placeholder.png"} alt="" />

        <div 
        className="absolute top-0 left-0 h-full w-full bg-black/50 z-20 p-3 flex flex-col justify-between">
            {
                menu_item.food_type === "V" ? 
                <VegIcon
                />
                : 
                <NonVegIcon
                />
            }

            <H4
            className="mt-8 font-bold text-white flex-1"
            >{menu_item.name}</H4>

            <div className="inline-flex justify-between items-center">
                <b className="text-white text-xl">&#8377; {menu_item.price}</b>
                {/* <Button
                variant={"addMenuCart"}
                className="px-11"
                onClick={() => mutate({
                    category: category,
                    item_uuid: menu_item.item_uuid,
                    mode: "add",
                    restaurant_id: restId,
                })}

                >ADD</Button> */}

                <AddMenuButton
                items={items}
                className="px-11 static"
                data={{
                    category: category,
                    item_uuid: menu_item.item_uuid,
                    restaurant_id: restId,
                }}
                mutate={mutate}
                />

            </div>
        </div>

    </div>
  )
}

export default RecommendedCard