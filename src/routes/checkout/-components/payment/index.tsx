import { H3 } from "@/components/ui/typography"
import { useCartQuery } from "@/routes/-navbar/cart-setup/cart-get-query"
import Cod from "./cod";
import UPI from "./upi";
import CardPayment from "./card-payment";
import { useUserAddressStore } from "@/store/user-address-store";
import type { ComponentProps } from "react";


function Payment({
  ...props
}: ComponentProps<"div">) {
  const {data} = useCartQuery();
  const {addressStoredId: addressIndex} = useUserAddressStore(state => state);

  return (
    <div 
    {...props}
    className="bg-white p-6 flex flex-col gap-5">
      <H3>Payment</H3>
      
      {
        addressIndex &&
        <>
        <Cod
        to_pay={data?.results?.to_pay}
        />
  
        <UPI
        to_pay={data?.results?.to_pay}
        />
        
        <CardPayment
        to_pay={data?.results?.to_pay}
        />
        
        </>
      }

      </div>
  )
}

export default Payment