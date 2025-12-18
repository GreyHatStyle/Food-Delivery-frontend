/* 
- Order API and query for Get orders.
- Order card design  for past order (color decision).
- Order nested page or side drawer for viewing the specifications of particular order (shadeCN).
- Order nested page api integration with Get order.
*/

import authAxiosInstance from "@/lib/auth-refresh-rotation";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export type OrderItemListType = {
  name: string,
  quantity: number,
  price: number,
}

export type OrderType = {
  id: number,
  restaurant_img: string,
  restaurant_name: string,
  item_list: OrderItemListType[],
  created_at: string,
  status: "DEL" | "PEN" | "CAN",
  delivery_address: string,
  payment_type: "COD" | "CAR" | "UPI",
  card_name: string | null,
  restaurant: string,
}

async function getOrdersAPI(){
  const response = await authAxiosInstance.get<OrderType[]>("/payment/api/v1/order/all/");
  return response.data;
}


export function useGetUserOrders(){
  const {user} = useAuthStore.getState();
  return useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: getOrdersAPI,
    staleTime: 20000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    retry: 2,
  })
}