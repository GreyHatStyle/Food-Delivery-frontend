import { Input } from "@/components/ui/input"
import { H4 } from "@/components/ui/typography"
import { useState } from "react"
import { PaymentProcessDialogButton } from "./payment-process-dialog"


function UPI({
    to_pay,
}: {
    to_pay: number | undefined
}) {
  const [upiId, setUpiId] = useState<string>("test1_tttgggtt@abcdbank");

  return (
    <div id="upi-payment"
      className="p-7 border-1 gap-5 flex flex-col-reverse lg:flex-row"
      >
        <div className="flex flex-col flex-1 gap-5 ">
          <div>
          <H4>Pay with UPI</H4>
          <p className="text-neutral-500 text-sm">Enter UPI ID <b>(Note: Please don't use your real or any UPI ID this is just for demo)</b></p>
          </div>

          <Input
          value={upiId}
          placeholder="UPI ID"
          onChange={(e) => setUpiId(e.target.value)}
          ></Input>

          <PaymentProcessDialogButton
          buttonClassName="rounded-md w-full"
          >
            Pay &#8377;{to_pay} with UPI
          </PaymentProcessDialogButton>

        </div>

        <img src="./upi-logo.png" alt="" height={80} width={100}/>
      </div>
  )
}

export default UPI