import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {} from "@/store/restaurant-filter-store"
import RestaurantsList from '../-components/restaurants-list'
import { useRestaurantsQuery } from './-query'


type RatingType = "3.5+" | "4.0+" | "4.5+"

export type QueryParamsType = {
  city: string,
  rating?: RatingType,
  pageOffset: number,
  pageLimit: number,
}


export const Route = createFileRoute('/restaurants/filters/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): QueryParamsType => {
    return {
      city: search.city as string,
      rating: search.rating as RatingType,
      pageLimit: search.pageLimit as number,
      pageOffset: search.pageOffset as number,
    }
  }
})



function RouteComponent() {
  const {city, rating, pageLimit, pageOffset } = Route.useSearch();

  // const navigate = useNavigate({from: Route.fullPath});

  const {receivedData, isLoading} = useRestaurantsQuery({
    city: city,
    pageLimit: pageLimit,
    pageOffset: pageOffset,
    searchQuery: Route.fullPath,
  });
  
  
  return <div>

    {
      isLoading ? (
        <div>Loading Restaurants...</div>
      )
      :
      (
        <RestaurantsList restaurantsApiData={receivedData} />
      )

    }


    <pre>{JSON.stringify({city, rating, pageOffset, pageLimit}, null, 4)}</pre>
    
  </div>
}
