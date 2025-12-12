import { Input } from "@/components/ui/input"
import { H4 } from "@/components/ui/typography"
import { useState } from "react"
import { PaymentProcessDialogButton } from "./payment-process-dialog"
import { usePaymentOrderQuery } from "./payment-order-query-api"
import { useUserAddressStore } from "@/store/user-address-store"

const handleCardInputFormat = (value: string, setCardNum: (val: string) => void): void => {
    const cleanValue = value.replace(/\D/g, ' ');
    const formattedVal = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setCardNum(formattedVal.trim());
}

function CardPayment({
    to_pay,
}: {
    to_pay: number | undefined
}) {
    const [cvv, setCvv] = useState<string>("111");
    const [cardNum, setCardNum] = useState<string>("1111 1111 1111 1111");
    const {mutate} = usePaymentOrderQuery();
    const {addressStoredId} = useUserAddressStore(state => state);

  return (
    <div id="card-payment"
      className="p-7 border-1 gap-5 flex flex-col-reverse lg:flex-row"
      >
        <div className="flex flex-col flex-1 gap-5 ">
          <div>
          <H4>Pay with Debit/Credit Card</H4>
          <p className="text-neutral-500 text-sm">Enter Card Details <b>(Note: Please don't use your real Card details this is just for demo)</b></p>
          </div>

            <div className="inline-flex gap-2">
                <Input
                placeholder="CVV"
                className="w-[5em]"
                value={cvv}
                maxLength={3}
                onChange={(e) => setCvv(e.target.value)}
                ></Input>

                <Input className=""
                placeholder="Visa Card Number"
                value={cardNum}
                onChange={(e) => handleCardInputFormat(e.target.value, setCardNum)}
                maxLength={19}
                ></Input>

            </div>

          <PaymentProcessDialogButton
          buttonClassName="rounded-md w-full"
          to_pay={to_pay}
          order_fn={mutate}
          data_for_fn={{
            payment_type: "CAR",
            user_address_id: addressStoredId  || 1, // adding '1' if address not found (don't worry this component won't be visible till address isn't selected, so addressStoredId will always be there, if component is visible)
            card_name: cardNum,
          }}
          >
            Pay &#8377;{to_pay} with UPI
          </PaymentProcessDialogButton>

        </div>

        <img src="./visa-logo.png" alt="" height={50} width={120}/>
      </div>
  )
}

export default CardPayment