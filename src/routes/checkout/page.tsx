import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Address from './-components/address'
import Payment from './-components/payment'
import BillToPay from './-components/bill-to-pay'
import { useAuthStore } from '@/store/auth-store'
import { useCartQuery } from '../-navbar/cart-setup/cart-get-query'
import { Button } from '@/components/ui/button'
import { useJoyrideStorage } from '@/store/joyride-session'
import { useState } from 'react'
import Joyride, { type CallBackProps, type Step } from 'react-joyride'

export const Route = createFileRoute('/checkout/')({
  component: RouteComponent,
});

const steps: Step[] = [
  {
    target: "body",
    title: "Checkout Page",
    content: "Simulates a checkout of your cart items (Ordering food)",
    placement: 'center',
    showSkipButton: true,
  },
  {
    target: "#address-section",
    title: "Your Address",
    content: (
      <>
      <p>This is the address of the account you logged in with </p>
      <p className='font-semibold'>Please select "DELIVER HERE" to continue </p>
      </>
    ),
    placement: "top",
    showSkipButton: true,
    spotlightClicks: true,
    // disableScrolling: true,
  },
  {
    target: "#payment-section",
    title: "Payment Section",
    content: (
      <>
      <p>This section only <b>Simulates payment</b> to show, how it will look </p>
      <p>And Your selected cart items <b>will be saved in your orders history</b> for the logged in account </p>
      </>
    ),
    placement: "top",
    disableBeacon: true,
    showSkipButton: true,
  },
  // {
  //   target: '#order-history-button',
  //   title: "Order History",
  //   content: 'After completing order, please visit this page to display to view them',
  //   placement: "bottom",
  //   disableScrolling: true,
  //   disableBeacon: true,
  //   spotlightClicks: true,
  // },
  {
    target: 'body',
    title: "Thankyou",
    content: (
      <>
      <p className='font-semibold'>
        Thankyou for visiting
      </p>
      <p>
         For feedback on improvements kindly contact me on my socials!
      </p>
      </>
    ),
    disableScrolling: true,
    disableBeacon: true,
    spotlightClicks: true,
    placement: 'center' as const,
  },
];

function RouteComponent() {
  const {verifySession, user} = useAuthStore(state => state);
  const {data, isLoading} = useCartQuery();
  const navigate = useNavigate();

  const {checkoutRun, setRunState} = useJoyrideStorage(state => state);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const handleSessionCallback = (data: CallBackProps) => {
    const {status, action, type, index} = data;

    if (status === 'finished' || status === 'skipped'){
      setRunState("checkoutRun", false);
    }

    if (type === 'step:after' && (action === 'next' || action === 'prev')){
      setStepIndex(index + (action === 'next' ? 1 : -1));
    }

    if (action === 'close'){
      setRunState("checkoutRun", false);
    }
  }

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
      <div className='h-[50dvh] min-h-[250px] flex flex-col gap-4 justify-center items-center w-screen'> 
      <p className='text-lg'>USER {user?.username}, PLEASE FILL ITEMS IN CART NOW FROM RESTAURANTS </p>
      <Button
      onClick={() => navigate({ to: "/" })}
      >Go Back To Home</Button>
      </div>

      :

      <>
    <div className='flex-1 m-4 flex flex-col gap-3'>
      <Address />

      <Payment id='payment-section'/>
    </div>

    <BillToPay />

    </>
    }

    <Joyride 
      run={checkoutRun}
      steps={steps}
      stepIndex={stepIndex}
      continuous
      showProgress
      scrollToFirstStep
      callback={handleSessionCallback}
      />

    <Button className='fixed bottom-5 right-5 w-20 h-20 bg-black text-white shadow-2xl z-100 hover:scale-110 hover:text-white hover:bg-web-theme-green'
      variant={"outline"}
      onClick={() => {
        setRunState("checkoutRun", true);
        setStepIndex(0);
      }}
      >
        <span className='text-wrap'>Take a tour</span>
    </Button>
  </div>
}
