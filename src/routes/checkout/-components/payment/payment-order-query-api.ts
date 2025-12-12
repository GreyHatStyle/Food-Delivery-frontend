import authAxiosInstance from "@/lib/auth-refresh-rotation";
import { useMutation } from "@tanstack/react-query";

export type PaymentType = "UPI" | "COD" | "CAR"

type PaymentOrderApiResponse = {
    status: "success" | "error",
    message: string,
}

export type PaymentApiDataType = {
    user_address_id: number,
    payment_type : PaymentType,
    card_name?: string,
}

async function PaymentOrderApi(data: PaymentApiDataType){
    const response = await authAxiosInstance.post<PaymentOrderApiResponse>("/payment/api/v1/order/", data);

    return response.data;
}

export function usePaymentOrderQuery(){
    return useMutation({
        mutationFn: PaymentOrderApi,
        gcTime: 0,
        onSuccess: (response) => {

            alert(response.message);
        },
        onError: (error) => {
            alert("Order couldn't be created!!");
            console.error("Order create error: ", error);
        }
    })
}