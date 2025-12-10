import { Button } from '@/components/ui/button'
import { H4 } from '@/components/ui/typography'


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
        <Button
        className="rounded-md"
        >Pay &#8377;{to_pay} with Cash</Button>
        </div>
  )
}

export default Cod