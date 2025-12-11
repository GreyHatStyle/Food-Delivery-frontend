import { H4 } from '@/components/ui/typography'
import { PaymentProcessDialogButton } from './payment-process-dialog'


function Cod({
    to_pay,
}: {
    to_pay: number | undefined,
}) {
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
          >
            Pay &#8377;{to_pay} with Cash
          </PaymentProcessDialogButton>
        </div>
  )
}

export default Cod