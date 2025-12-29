import { createFileRoute } from '@tanstack/react-router'
import AboutRestaurantSection from './-components/AboutRestaurantSection'
import CategoryMenu from './-components/CategoryMenu'
import { useSelectRestaurantQuery } from './-query/rest-menu-query';
import Joyride, { type CallBackProps, type Step } from 'react-joyride';
import { useJoyrideStorage } from '@/store/joyride-session';
import { useState } from 'react';
import { Button } from '@/components/ui/button';


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
    target: '#menu-item',
    title: "Menu Item",
    content: 'Please Select "Add" Button to add it to menu',
    placement: "top",
    disableScrolling: true,
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    target: 'body',
    title: "Cart",
    content: (
      <>
      <p className='font-semibold'>
        The item has been successfully Added to cart!!
      </p>
      <p>
         Select or hover on button to view it
      </p>
      </>
    ),
    placement: "center" as const,
    disableScrolling: true,
    disableBeacon: true,
    spotlightClicks: true,
  },
];


function RouteComponent() {
  // Thinking of doing API call here to divide data in following components
  const { id } = Route.useParams();
  
  const {restaurantData, availableCategories} = useSelectRestaurantQuery({restId: id});
  const {menuRun, setRunState} = useJoyrideStorage(state => state);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const handleSessionCallback = (data: CallBackProps) => {
    const {status, action, type, index} = data;

    if (status === 'finished' || status === 'skipped'){
      setRunState("menuRun", false);
    }

    if (type === 'step:after' && (action === 'next' || action === 'prev')){
      setStepIndex(index + (action === 'next' ? 1 : -1));
    }

    if (action === 'close'){
      setRunState("menuRun", false);
    }
  }

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
    run={menuRun}
    steps={steps}
    stepIndex={stepIndex}
    continuous
    showProgress
    callback={handleSessionCallback}
    />

    <Button className='fixed bottom-5 right-5 w-20 h-20 bg-black text-white shadow-2xl z-100 hover:scale-110 hover:text-white hover:bg-web-theme-green'
    variant={"outline"}
    onClick={() => {
      setRunState("menuRun", true);
      setStepIndex(0);
    }}
    >
      <span className='text-wrap'>Take a tour</span>
    </Button>

  </div>
}
