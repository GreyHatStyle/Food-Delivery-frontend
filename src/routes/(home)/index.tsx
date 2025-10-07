import { createFileRoute } from '@tanstack/react-router'
import StartSection from './-components/start-section'
import SelfQualitySection from './-components/self-qualities'
import "./home.css"
import MemberShipCard from './-components/membership'

export const Route = createFileRoute('/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='variable-margin flex flex-col items-center gap-[4rem]'>

    <StartSection />

    <SelfQualitySection/>

    <MemberShipCard/>

    <div></div>
    
    </div>
}
