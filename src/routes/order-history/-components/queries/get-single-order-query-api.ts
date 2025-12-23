import authAxiosInstance from "@/lib/auth-refresh-rotation"
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import type { OrderType } from "./get-orders-query-api";



export type GetSingleOrderResponseType = {
  status: "success" | "error" | "exception",
  message: string,
  order: OrderType,
  restaurant_address: string,
}

async function getUserSingleOrder(order_id: number){
  const response = await authAxiosInstance.get<GetSingleOrderResponseType>(`payment/api/v1/order/${order_id}`)
  console.warn("Called API!!")
  return response.data;
}

export function useGetSingleOrder(order_id: number, enabled: boolean = false){
  const {user} = useAuthStore(state => state);
  return useQuery({
    queryKey: ["single-user-order", user],
    queryFn: () => getUserSingleOrder(order_id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: enabled,
  })
}