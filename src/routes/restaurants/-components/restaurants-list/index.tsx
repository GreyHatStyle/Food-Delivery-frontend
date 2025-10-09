import RestaurantCard from "./rest-card"
import dummyData from "../../dummy.json"
import "@/routes/restaurants/restaurants.css"
import type { GetRestaurantFromCityApiResponse } from "../../filters/-api"


type DummyRestaurantType = {
  id: string,
  r_name: string,
  rating: string,
  rating_count_str: string,
  cuisine: string[],
  menu_image: string,
  r_image_url: string | null,
}

type DummyDataType = {
  status: "success" | "exception",
  count: number,
  next?: string,
  previous?: string,
  results: DummyRestaurantType[],
}

interface RestaurantsListProps{
  restaurantsApiData?: GetRestaurantFromCityApiResponse
}

function RestaurantsList({
  restaurantsApiData,
}: RestaurantsListProps) {
  
  let myData = null;
  
  if (restaurantsApiData){
    myData = restaurantsApiData;
  }
  else{
    myData = dummyData as DummyDataType;
  }

  
  return (
    <div
    className=""
    >
    

    <div className="m-4 restaurant-list-grid justify-items-center md:justify-items-normal">
      {
        myData.results.map((restaurant, index) => (
          <RestaurantCard 
          key={index}
          image={ restaurant.r_image_url || restaurant.menu_image}
          restaurantName={restaurant.r_name}
          rating={+restaurant.rating}
          ratingCount={restaurant.rating_count_str}
          cuisines={restaurant.cuisine}
          />
        ))
      }

    </div>
    
    </div>
  )
}

export default RestaurantsList