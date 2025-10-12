import { createFileRoute, useLocation } from '@tanstack/react-router'
import { useRestaurantFilterStore } from "@/store/restaurant-filter-store"
import { SearchQuerySchema } from "@/store/restaurant-filter-zod"
import RestaurantsList from '../-components/restaurants-list'
import { useRestaurantsQuery } from './-query'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { H3 } from '@/components/ui/typography'

type RatingType = "3.5+" | "4.0+" | "4.5+"

export type QueryParamsType = {
  city: string,
  rating?: RatingType,
  pageOffset: number,
  pageLimit: number,
}


export const Route = createFileRoute('/restaurants/filters/')({
  component: RouteComponent,
  validateSearch: (search) => SearchQuerySchema.parse(search),
})



function RouteComponent() {
  
  // const {city, rating, pageLimit, pageOffset } = Route.useSearch();

  // const { searchQueryDecodeAndSet, buildFinalQuery, ratings, finalQuery, cuisines, ratingCounts } = useRestaurantFilterStore(state => state);
  
  // 
  const { searchStr } = useLocation();
  const decodedSearchStr = decodeURIComponent(searchStr);
  
  const currentUrlObj = Route.useSearch();

  if(!Object.keys(currentUrlObj).includes("limit")) currentUrlObj.limit = "10";
  if(!Object.keys(currentUrlObj).includes("offset")) currentUrlObj.offset = "0";

  console.log("Current url by use search: ", currentUrlObj);

  const validationResult = SearchQuerySchema.safeParse(currentUrlObj);

  console.log("validation results: ", validationResult);

  
  // Hopefully this should set the store with new params
  // useEffect(() => {
  //   // const originalState = {...useRestaurantFilterStore.getState() };
  //   console.log("Query is setting in Zustand: ", decodedSearchStr);

  //   if(decodedSearchStr){
  //     searchQueryDecodeAndSet(decodedSearchStr);
  //     buildFinalQuery();
  //   }


  // }, [decodedSearchStr]);

  // console.log("Cuisines: ", cuisines);

  // const navigate = useNavigate({from: Route.fullPath});

  // const {receivedData, isLoading} = useRestaurantsQuery({
  //   city: city,
  //   pageLimit: pageLimit,
  //   pageOffset: pageOffset,
  //   searchQueryByParent: decodedSearchStr,
  // });
  
  
  return <div>
    <ToastContainer theme='colored' />

    {
      // isLoading ? (
      //   <div>Loading Restaurants...</div>
      // )
      // :
      // (
      //   <RestaurantsList restaurantsApiData={receivedData} />
      // )

    }

    {
      <>
      <pre>{decodedSearchStr}</pre>
      <H3>The json from Use search</H3>
      <pre>{JSON.stringify(currentUrlObj, null, 4, )}</pre>
      </>
    }

    <H3>Validated Zod object</H3>
    <pre>{JSON.stringify(validationResult, null, 4)}</pre>
    
  </div>
}
