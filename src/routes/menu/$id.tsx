import { createFileRoute } from '@tanstack/react-router'
import AboutRestaurantSection from './-components/AboutRestaurantSection'
import CategoryMenu from './-components/CategoryMenu'
import { useSelectRestaurantQuery } from './-query/rest-menu-query';
import Joyride, { type Step } from 'react-joyride';


export const Route = createFileRoute('/menu/$id')({
  component: RouteComponent,
})

// TODO: These steps are not working for now in $id file (for now using the Joyride in child components instead) 
const steps: Step[] = [
  {
    target: "body",
    title: "Restaurant Menu",
    content: "This is your selected restaurant's menu, which can be used to order food!!",
    placement: 'center',
    showSkipButton: true,
  },
  {
    target: "#about-restaurant-component",
    title: "About Restaurant",
    content: "Each Restaurant's data is received by Backend Django RestAPI",
    placement: "bottom",
    showSkipButton: true,
  },
  {
    target: "#categories-component",
    title: "Categories Component",
    content: "Please select these category buttons to view different menu items",
    placement: "top",
    disableBeacon: true,
    showSkipButton: true,
  },
  {
    target: "body",
    title: "Last But Not least",
    content: "Thanks for visiting website!! I am working on other features like Cart, and Order which will be available soon!!",
    placement: 'center',
  },
]


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
    id='about-restaurant-component'
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

    <Joyride 
    run
    steps={steps}
    continuous
    showProgress
    
    />

  </div>
}
