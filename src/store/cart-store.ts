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
    restaurant_image: string | null,
    items: CartItemType[] | [],

    setRestaurantName: (rest_name: string) => void,
    setRestaurantId: (rest_id: string) => void,
    setRestaurantImage: (image_url: string) => void,
    setItems: (items: CartItemType[]) => void,
    addItem: (item: CartItemType) => void,
    removeItem: (cart_item_id: number) => void,
    getItemsCount: () => number,
    clearCart: () => void,
}


export const useCartStore = create<CartStoreType>()(
    persist(
        (set, get) => ({
            items: [],
            restaurant_id: "",
            restaurant_name: "",
            restaurant_image: null,
            
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
            
            setRestaurantImage: (image_url) => {
                set({
                    restaurant_image: image_url,
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

            getItemsCount: () =>  get().items.length,

            clearCart: () => {
                set({
                    items: [],
                });
            }
        }),
        {
            name: "Cart-Store"
        }
    )
)
