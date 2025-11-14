import type { MenuItemsType } from "@/routes/menu/-api/menu-api"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItemType = {
    cart_item_id: number,
    category_name: string,
    item_data: MenuItemsType,
    quantity: number,
}

type CartStoreType = {
    restaurant_id: string,
    restaurant_name: string,
    items: CartItemType[] | [],

    setRestaurantName: (rest_name: string) => void,
    setRestaurantId: (rest_id: string) => void,
    setItems: (items: CartItemType[]) => void,
    addItem: (item: CartItemType) => void,
    removeItem: (cart_item_id: number) => void,
    clearCart: () => void,
}


export const useCartStore = create<CartStoreType>()(
    persist(
        (set) => ({
            items: [],
            restaurant_id: "",
            restaurant_name: "",
            
            setRestaurantName: (rest_name) => {
                set({
                    restaurant_name: rest_name,
                })
            },

            setRestaurantId: (rest_id) => {
                set({
                    restaurant_id: rest_id,
                })
            },
            setItems: (items_: CartItemType[]) => {
                
                // console.log('Setting items after refetch in Zustand:', items_);
                set({
                    items: items_,
                })
            },

            addItem: (item: CartItemType) => {
                set((state) => ({
                    items: [...state.items, item]
                }))
            },

            removeItem: (cart_item_id: number) => {
                set( (state) => ({
                    items: state.items.filter( (item: CartItemType) => item.cart_item_id !== cart_item_id)
                }))
            },
            clearCart: () => {
                set({
                    items: [],
                })
            }
        }),
        {
            name: "Cart-Store"
        }
    )
)
