import { createFileRoute } from '@tanstack/react-router'
import AboutRestaurantSection from './-components/AboutRestaurantSection'
import CategoryMenu from './-components/CategoryMenu'
import { useSelectRestaurantQuery } from './-query/rest-menu-query';

export const Route = createFileRoute('/menu/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  // Thinking of doing API call here to divide data in following components
  const { id } = Route.useParams();
  
  const {restaurantData, availableCategories} = useSelectRestaurantQuery({restId: id});



  return <div 
  className='variable-margin'
  >
    {
      // <>
      // <pre>{JSON.stringify(restaurantData, null, 4)}</pre>
      // <pre>{JSON.stringify(categoryData, null, 4)}</pre>
      // <p>{availableCategories?.join(", ")}</p>
      
      // </>
    }

    <AboutRestaurantSection
    title={restaurantData?.r_name || "Restaurant Name"}
    rating={restaurantData?.rating || 4.1}
    rating_count={restaurantData?.rating_count_str || "100+ ratings"}
    cuisines={restaurantData?.cuisine || ["Chinese", "North Indian"]}
    address={restaurantData?.address || "Address of shop"}
    />

    <CategoryMenu 
    restId={id}
    categories={availableCategories}
    recomFoodItems={restaurantData?.menu_data[0].categories.menu_items || []}
    />

  </div>
}
