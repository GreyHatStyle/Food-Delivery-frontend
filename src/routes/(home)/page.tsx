import { createFileRoute} from '@tanstack/react-router'
import StartSection from './-components/start-section'
import SelfQualitySection from './-components/self-qualities'
import "./home.css"
import MemberShipCard from './-components/membership'
import Joyride, { type CallBackProps, type Step } from 'react-joyride'
import { H3 } from '@/components/ui/typography'
import { useJoyrideStorage } from '@/store/joyride-session'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/(home)/')({
  component: RouteComponent,
})



const steps: Step[] = [
  {
    target: 'body',
    content: (
      <div className='flex flex-col gap-2'>
      <H3 className='text-web-theme-green'>Welcome to Zomiggy</H3>
      <p>A food delivery <b>Full Stack</b> hobby project</p>
      <p className='self-start font-bold text-teal-800'>Features</p>
      <ul 
      className='text-start list-disc self-start pl-7'
      >
          <li>Database contains actual 
            <a
            href='https://www.swiggy.com/'
            className='text-orange-600 underline'
            target='_blank'
            > Swiggy </a>
            
            dataset of <b>5000+ restaurants data</b> in <b>6 cities</b></li>
          <li> Used this
            <a
            href='https://www.kaggle.com/datasets/ashishjangra27/swiggy-restaurants-dataset'
            className='text-blue-600 underline'
            target='_blank'
            > Swiggy Kaggle Dataset Link </a>
            to extract the data.
          </li>
          <li>The Frontend uses Restful APIs, developed in <b>Django Rest Frameworks</b> to run.</li>
          <li> 
            <a
            href='https://github.com/GreyHatStyle/Food-Delivery-frontend'
            className='text-blue-600 underline'
            target='_blank'
            > Frontend ReactJS+TS Github Repo Link </a>  
          </li>

          <li>
            <a
            href='https://github.com/GreyHatStyle/Food-Delivery-Backend'
            className='text-teal-600 underline'
            target='_blank'
            > Backend Django Github Repo Link </a>
          </li>
          
        </ul>
      </div>
    ),
    placement: 'center' as const,
    showSkipButton: true,
  },
  {
    target: '#city-search-component',
    content: 'Please select one of the city to view restaurants and then click on "Deliver" button',
    placement: "top",
    disableScrolling: true,
    disableBeacon: true,
    spotlightClicks: true,

    // styles: {
    //   tooltip: {
    //     backgroundColor: '#fff3cd',
    //     border: '1px solid #ffeaa7'
    //   }
    // }
  },
  {
    target: '#login-button',
    title: "Login",
    content: (
      <>
        <p className='font-semibold'>Now please login</p>
        <p>Two <b>demo accounts "test1" and "test2"</b> are provided with following password, to <b>access registered user's features</b>, without your personally registering it</p>
      </>
    ),
    placement: "bottom",
    disableScrolling: true,
    hideFooter: true,
    disableBeacon: true,
  },
];

function RouteComponent() {

  const {homeRun, setRunState} = useJoyrideStorage(state => state);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const handleSessionCallback = (data: CallBackProps) => {
    const {status, action, index, type} = data;

    if (status === 'finished' || status === 'skipped'){
      setRunState("homeRun", false);
      setStepIndex(0);
    }
    
    if (type === 'step:after' && (action === 'next' || action === 'prev')){
      setStepIndex(index + (action === 'next' ? 1 : -1));
    }

    if (action === 'close'){
      setRunState("homeRun", false);
      setStepIndex(0);
    }
  }



  return <div id='homepage' className='variable-margin flex flex-col items-center gap-[4rem]'>

    <StartSection />

    <SelfQualitySection/>

    <MemberShipCard/>

    <Joyride 
    run={homeRun}
    steps={steps}
    stepIndex={stepIndex}
    continuous
    showProgress
    callback={handleSessionCallback}
    />
    
    <Button className='fixed bottom-5 right-5 w-20 h-20 bg-black text-white shadow-2xl z-100 hover:scale-110 hover:text-white hover:bg-web-theme-green'
    variant={"outline"}
    onClick={() => {
      setRunState("homeRun", true);
      setStepIndex(0);
    }}
    >
      <span className='text-wrap'>Take a tour</span>
    </Button>


    <div></div>
    
    </div>
}
