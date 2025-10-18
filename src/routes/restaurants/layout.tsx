import { createFileRoute, Outlet } from '@tanstack/react-router'
import "@/index.css"
import { H2 } from '@/components/ui/typography'
import RestaurantFilters from './-components/filters-components'
// import { useCityStore } from '@/store/city-store'
import { useRestaurantFilterStore2 } from '@/store/restaurant-filter-store'


export const Route = createFileRoute('/restaurants')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { city__iexact } = useRestaurantFilterStore2(state => state);

  return (
    <div className='variable-margin bg-green-50 rounded-md p-4'>
      <H2 className="p-5 poppins">
        Restaurants with online food delivery in {city__iexact}
      </H2>

      <div id="Filters" className="px-5 py-3">
        <RestaurantFilters />
      </div>
      
      <Outlet />
    </div>
  )
}
