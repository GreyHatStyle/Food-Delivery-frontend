import { H4 } from '@/components/ui/typography'
import { PaymentProcessDialogButton } from './payment-process-dialog'
import { usePaymentOrderQuery } from './payment-order-query-api';
import { useUserAddressStore } from '@/store/user-address-store';


function Cod({
    to_pay,
}: {
    to_pay: number | undefined,
}) {

    const {mutate} = usePaymentOrderQuery();
    const {addressStoredId} = useUserAddressStore(state => state);

  return (
    <div id="upi-payment"
    className="p-7 border-1 flex flex-col gap-5"
    >
        <div>
        <H4>Pay on Delivery (Cash or UPI)</H4>
        <p className="text-neutral-500 text-sm">Pay cash or ask for QR Code</p>
        </div>
      
        <PaymentProcessDialogButton
          buttonClassName="rounded-md w-full"
          to_pay={to_pay}
          order_fn={mutate}
          data_for_fn={{
            user_address_id: addressStoredId || 1,
            payment_type: "COD",
          }}
          >
            Pay &#8377;{to_pay} with Cash
          </PaymentProcessDialogButton>
        </div>
  )
}

export default Cod