import { createFileRoute } from '@tanstack/react-router'
import { SearchQuerySchema } from "@/store/restaurant-filter-zod"
import DisplayFilteredRestaurants from './-components/display-filtered-restaurants'
import type { QueryParamsType } from '@/store/restaurant-filter-store'


export const Route = createFileRoute('/restaurants/filters/')({
  component: RouteComponent,
  validateSearch: (search) => SearchQuerySchema.parse(search),
})



function RouteComponent() {
  
  const currentUrlObj = Route.useSearch();

  return (
    <>
      <DisplayFilteredRestaurants 
      currentUrlObj={currentUrlObj as QueryParamsType}
      />

    </>
  )
  
}
