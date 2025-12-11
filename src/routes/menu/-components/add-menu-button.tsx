import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { useEffect, useState, type ComponentProps } from 'react';
import type { CartItemAddRemoveApi_BodyType } from '../-api/cart-item-add-remove-api';
import type { useCartItemQuery } from '../-query/cart-item-query';
import type { CartItemType } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';


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
    
    // FIX: In Prod this component was giving latency on updating menu button state,
    // fixed it to first update state -> then call api -> then use response data to re-update state.
    // Advantage:
    //    1. User will see instant update in selected item.
    //    2. Same item in Recommended Carousel component's button will also be updated.
    const [quantity, setQuantity] = useState<number>(0);
    const {user} = useAuthStore(state => state);

    useEffect(() => {
        const foundItem = items.find((item) => {
            return item.item_data.item_uuid === data.item_uuid
        })
        
        if (items.length === 0){
            setQuantity(0);
        }

        if (foundItem){
            // console.log("item: ", foundItem);
            // return foundItem.quantity;
            setQuantity(foundItem.quantity);
        }

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
        if (user){
            setQuantity(prev => prev + 1);
            // console.log("Data to go after clicking => ", data);
            mutate({
                category: data.category,
                item_uuid: data.item_uuid,
                restaurant_id: data.restaurant_id,
                mode: "add",
            })
        }
        else {
            alert("Please Click on Login button, to continue this action!!");
        }
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
            setQuantity(prev => prev - 1);
            console.log("Remove Mode");
            // console.log("Data to go after clicking => ", data);
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
            setQuantity(prev => prev + 1);
            console.log("Add Mode");
            // console.log("Data to go after clicking => ", data);
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