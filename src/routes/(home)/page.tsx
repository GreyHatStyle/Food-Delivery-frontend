import { createFileRoute} from '@tanstack/react-router'
import StartSection from './-components/start-section'
import SelfQualitySection from './-components/self-qualities'
import "./home.css"
import MemberShipCard from './-components/membership'
import Joyride, { type Step } from 'react-joyride'
import { H3 } from '@/components/ui/typography'

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
    content: 'Please select one of the city to view restaurants',
    placement: "top",
    disableScrolling: true,
    hideFooter: true,
    disableBeacon: true,

    styles: {
      tooltip: {
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7'
      }
    }
  },
];

function RouteComponent() {
  // const [runJoyFirstTime, ] = useState<boolean>(() => {
  //   const hasRunBefore = localStorage.getItem('joyride-run-status');
  //   return hasRunBefore !== "true";
  // });

  // const handleFirstTimeCallback = (data: CallBackProps) => {
  //   const {status} = data;

  //   if (status === 'finished' || status === 'skipped'){
  //     localStorage.setItem('joyride-run-status', 'true');
  //     setRunJoy(false);
  //   }
  // }



  return <div id='homepage' className='variable-margin flex flex-col items-center gap-[4rem]'>

    <StartSection />

    <SelfQualitySection/>

    <MemberShipCard/>

    <Joyride 
    run={true}
    steps={steps}
    continuous
    showProgress
    // callback={handleFirstTimeCallback}
    />

    <div></div>
    
    </div>
}
