import { createFileRoute } from '@tanstack/react-router'
import { SearchQuerySchema } from "@/store/restaurant-filter-zod"
import RestaurantsList from '../-components/restaurants-list'
import { ToastContainer } from 'react-toastify'
import { H3 } from '@/components/ui/typography'
import { useRestaurantsQuery } from './-query'


export type QueryParamsType = {
  city: string,
  limit: number,
  offset: number,
  rating__gte?: number | number[],
  rating__lte?: number | number[],
  cuisine?: string,
  rating_count_int__gte: number,
  avg_cost__lte: number | number[],
  avg_cost__gte: number | number[],
}

const buildSearchQuery = (validatedObj: Record<string, unknown> | undefined): string =>{
  if(typeof validatedObj === "undefined") return "";

  const params = new URLSearchParams();

  Object.entries(validatedObj).forEach( ([key, value]) => {
    if(value === undefined || value === null) return "";
    
    if(Array.isArray(value)){

      if(key === "cuisine"){
        params.append(key, value.join(','));
      }

      else{
        // append like normally (to deal with "rating__gte=3.5,4.5" format)
        value.forEach( (val) => {
          params.append(key, val.toString());
        });
      }
    }
    else{
      params.append(key, value.toString());
    }
  });

  return params.toString();
}


export const Route = createFileRoute('/restaurants/filters/')({
  component: RouteComponent,
  validateSearch: (search) => SearchQuerySchema.parse(search),
})



function RouteComponent() {
  
  const currentUrlObj = Route.useSearch();

  if(!Object.keys(currentUrlObj).includes("limit")) currentUrlObj.limit = "10";
  if(!Object.keys(currentUrlObj).includes("offset")) currentUrlObj.offset = "0";

  console.log("Current url by use search: ", currentUrlObj);

  const validationResult = SearchQuerySchema.safeParse(currentUrlObj);

  console.log("validation results: ", validationResult);
  
  const paramStringValidation = buildSearchQuery(validationResult.data);
  

  // console.log("Cuisines: ", cuisines);

  // const navigate = useNavigate({from: Route.fullPath});

  const {receivedData, isLoading} = useRestaurantsQuery(decodeURIComponent(paramStringValidation));
  
  
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
    //   <>
    //   <H3>The json from Use search</H3>
    //   <pre>{JSON.stringify(currentUrlObj, null, 4, )}</pre>

    //   <H3>Validated Zod object</H3>
    // <pre>{JSON.stringify(validationResult, null, 4)}</pre>

    //  <H3>Validated zod object search query</H3>
    //  <p>{decodeURIComponent(paramStringValidation)}</p> 
    //   </>
    }

    
    
  </div>
}
