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
  
  const {restaurantData, categoryData} = useSelectRestaurantQuery({restId: id});



  return <div 
  className='variable-margin'
  >
    <pre>{JSON.stringify(restaurantData, null, 4)}</pre>
    <pre>{JSON.stringify(categoryData, null, 4)}</pre>

    <AboutRestaurantSection/>

    <CategoryMenu />

  </div>
}
