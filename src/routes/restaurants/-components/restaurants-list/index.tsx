import RestaurantCard from "./rest-card"
import dummyData from "../../dummy.json"
import "@/routes/restaurants/restaurants.css"
import { H2 } from "@/components/ui/typography"
import { useCityStore } from "@/store/city-store"

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

function RestaurantsList() {
  const myData: DummyDataType = dummyData as DummyDataType;
  const { city } = useCityStore(state => state);

  return (
    <div
    className="bg-green-50 rounded-md p-4"
    >
    
    <H2 
    className="p-5 poppins"
    > Restaurants with online food delivery in {city || "Bikaner"}</H2>

    <div id="Filters" className="px-5 py-3">
      All filters
    </div>

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