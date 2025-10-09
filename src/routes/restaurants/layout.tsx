import { createFileRoute, Outlet } from '@tanstack/react-router'
import "@/index.css"
import { H2 } from '@/components/ui/typography'
import RestaurantFilters from './-components/filters-components'
import { useCityStore } from '@/store/city-store'
import RestaurantsList from './-components/restaurants-list'

export const Route = createFileRoute('/restaurants')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { city } = useCityStore(state => state);

  return (
    <div className='variable-margin bg-green-50 rounded-md p-4'>
      <H2 className="p-5 poppins">
        Restaurants with online food delivery in {city || "Bikaner"}
      </H2>

      <div id="Filters" className="px-5 py-3">
        <RestaurantFilters />
      </div>


      {/* <RestaurantsList /> */}
      
      <Outlet />
    </div>
  )
}
