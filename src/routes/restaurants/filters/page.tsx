import { createFileRoute } from '@tanstack/react-router'
import { SearchQuerySchema } from "@/store/restaurant-filter-zod"
import RestaurantsList from '../-components/restaurants-list'
import { ToastContainer } from 'react-toastify'
import { useRestaurantsQuery } from './-query'
import { useEffect } from 'react'
import { useRestaurantFilterStore2 } from '@/store/restaurant-filter-store'
import { buildSearchQuery } from '@/utils/build-search-query'


export const Route = createFileRoute('/restaurants/filters/')({
  component: RouteComponent,
  validateSearch: (search) => SearchQuerySchema.parse(search),
})



function RouteComponent() {
  
  const currentUrlObj = Route.useSearch();
  
  if(!Object.keys(currentUrlObj).includes("limit")) currentUrlObj.limit = 10;
  if(!Object.keys(currentUrlObj).includes("offset")) currentUrlObj.offset = 0;

  console.log("Current url by use search: ", currentUrlObj);
  
  const validationResult = SearchQuerySchema.safeParse(currentUrlObj);
  
  console.log("validation results: ", validationResult);
  // console.log("URL object results: ", currentUrlObj);
  
  // const paramStringValidation = buildSearchQuery(validationResult.data);
  const restState = useRestaurantFilterStore2(state => state);
  
  useEffect( () => {
    if(validationResult.success){
      restState.storeUsingObject(validationResult.data);
      
      console.log("Stored new object")
    }
    
  }, [])
  
  const zustandStringParam = decodeURIComponent(buildSearchQuery(restState));
  const currentSearchUrl = decodeURIComponent(buildSearchQuery(currentUrlObj));
  

  // console.log("Cuisines: ", cuisines);

  // const navigate = useNavigate({from: Route.fullPath});
  
  console.log("URL Decoded from zustand: ", decodeURIComponent(zustandStringParam));
  console.log("Zustand object: ", restState.getFilterState())
  
  // sending this current url instead of zustand url (because for some reason the above useEffect() doesn't work for first time)
  // welp its saving after next render and working so no problem :)
  const {receivedData, isLoading} = useRestaurantsQuery(currentSearchUrl, currentSearchUrl);


  // console.log("Limit from zustand: ", typeof restState.limit)
  
  return <div>
    <ToastContainer theme='colored' />

    {
      isLoading ? (
        <div>Loading Restaurants...</div>
      )
      :
      (
        <RestaurantsList restaurantsApiData={receivedData} />
      )

    }

    {
//       <>
//       <H3>The json from Use search</H3>
//       <pre>{JSON.stringify(currentUrlObj, null, 4, )}</pre>

//       <H3>Validated Zod object</H3>
//     <pre>{JSON.stringify(validationResult, null, 4)}</pre>

//       <H3>Restaurant Zustand state</H3>
//       <pre>{JSON.stringify(restState, null, 4)}</pre>

//       <H3>Zustand state to url conversion</H3>
//       <pre>{decodeURIComponent(zustandStringParam)}</pre>
// {/* 
//      <H3>Validated zod object search query</H3>
//      <p>{decodeURIComponent(paramStringValidation)}</p>  */}
//       </>
    }

    
    
  </div>
}
