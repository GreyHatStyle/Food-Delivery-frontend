import { createFileRoute } from '@tanstack/react-router'
import AboutRestaurantSection from './-components/AboutRestaurantSection'
import CategoryMenu from './-components/CategoryMenu'

export const Route = createFileRoute('/menu/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div 
  className='variable-margin'
  >

    <AboutRestaurantSection/>

    <CategoryMenu />

  </div>
}
