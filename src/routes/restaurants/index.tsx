import { createFileRoute } from '@tanstack/react-router'
import "@/index.css"
import RestaurantsList from './-components/restaurants-list'

export const Route = createFileRoute('/restaurants/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='variable-margin'>
    <RestaurantsList/>
  </div>
}
