import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { useMemo, type ComponentProps } from 'react';
import type { CartItemAddRemoveApi_BodyType } from '../-api/cart-item-add-remove-api';
import type { useCartItemQuery } from '../-query/cart-item-query';
import type { CartItemType } from '@/store/cart-store';



interface AddMenuButtonProps{
    items: CartItemType[],
    data: Omit<CartItemAddRemoveApi_BodyType, 'mode'>,
    mutate: ReturnType<typeof useCartItemQuery>['mutate']
}

function AddMenuButton({
    items,
    data,
    mutate,
    className,
    ...props
}: AddMenuButtonProps & ComponentProps<"button">) {

    const quantity = useMemo(() => {
        const foundItem = items.find((item) => {
            return item.item_data.item_uuid === data.item_uuid
        })
        
        if (items.length === 0){
            return 0;
        }

        if (foundItem){
            // console.log("item: ", foundItem);
            return foundItem.quantity;
        }

        return 0;
    }, [items, data.item_uuid]);
    
  return (
    <>
    <Button {...props}
    variant={"addMenuCart"}
    size={"lg"}
    className={cn("", className)}
    style={{
        display: (quantity === 0) ? "" : "none"
    }}

    onClick={() => {
        mutate({
            category: data.category,
            item_uuid: data.item_uuid,
            restaurant_id: data.restaurant_id,
            mode: "add",
        })
    }}
    
    >ADD</Button>


    {/* Display this when first time selected */}
    <div
    style={{
        display: (quantity !== 0)? "" : "none",
    }}

    className={cn(`absolute inline-flex items-center justify-start bottom-2 left-5 sm:left-8 border-2 h-10 rounded-md px-1 has-[>svg]:px-4
    bg-secondary text-green-600 font-bold
    `, className)}
    >
        <Button 
        size={"sm"}
        variant={"ghost"}

        onClick={() => {
            mutate({
                category: data.category,
                item_uuid: data.item_uuid,
                restaurant_id: data.restaurant_id,
                mode: "remove",
            })

        }}
        >-</Button>
        
        {quantity}

        <Button 
        size={"sm"}
        variant={"ghost"}
        onClick={() => {
            // do something
                mutate({
                category: data.category,
                item_uuid: data.item_uuid,
                restaurant_id: data.restaurant_id,
                mode: "add",
            })

        }}

        >+</Button>
    
    </div>
    </>
  )
}

export default AddMenuButton