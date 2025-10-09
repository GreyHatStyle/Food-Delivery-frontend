import { createFileRoute } from '@tanstack/react-router'
import RestaurantsList from '../-components/restaurants-list'

export const Route = createFileRoute('/restaurants/(main-page)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RestaurantsList/>
}
