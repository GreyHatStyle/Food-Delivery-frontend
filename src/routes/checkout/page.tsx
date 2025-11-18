import { createFileRoute } from '@tanstack/react-router'
import Address from './-components/address'
import Payment from './-components/payment'
import BillToPay from './-components/bill-to-pay'

export const Route = createFileRoute('/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div 
  className='bg-neutral-100 flex flex-col-reverse md:flex-row'
  >

    <div>
      <Address />

      <Payment />
    </div>

    <BillToPay />


  </div>
}
