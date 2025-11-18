import { createFileRoute } from '@tanstack/react-router'
import Address from './-components/address'
import Payment from './-components/payment'
import BillToPay from './-components/bill-to-pay'
import { useAuthStore } from '@/store/auth-store'
import { useCartQuery } from '../-navbar/cart-setup/cart-get-query'

export const Route = createFileRoute('/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {verifySession, user} = useAuthStore(state => state);
  const {data, isLoading} = useCartQuery();
  return <div 
  className='bg-teal-700/10 flex flex-col-reverse md:flex-row xl:px-11'
  >
    { (!verifySession()) 
      ?

      <div className='h-[50dvh] min-h-[250px] inline-flex justify-center items-center w-screen'> 
      <p className='text-lg text-center'>PLEASE LOGIN WITH (TEST1) TO USE THIS FEATURE <br/> Click on Login button above </p>

      </div>
    
    :

    (isLoading)
    ?

    <div className='h-[50dvh] min-h-[250px] inline-flex justify-center items-center w-screen'> 
      <p className='text-lg'> LOADING.... </p>

      </div>

    :

    (data?.results?.c_items.length === 0)
      ?
      <div className='h-[50dvh] min-h-[250px] inline-flex justify-center items-center w-screen'> 
      <p className='text-lg'>USER {user?.username}, PLEASE FILL ITEMS IN CART NOW FROM RESTAURANTS </p>

      </div>

      :

      <>
    <div className='flex-1 m-4 flex flex-col gap-3'>
      <Address />

      <Payment />
    </div>

    <BillToPay />

    </>
    }


  </div>
}
