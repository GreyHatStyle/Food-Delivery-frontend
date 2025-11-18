import { createFileRoute, Outlet } from '@tanstack/react-router'
import "@/index.css"
import { H2 } from '@/components/ui/typography'
import RestaurantFilters from './-components/filters-components'
// import { useCityStore } from '@/store/city-store'
import { useRestaurantFilterStore2 } from '@/store/restaurant-filter-store'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Joyride, {type CallBackProps, type Step } from 'react-joyride'
import { useJoyrideSession } from '@/store/joyride-session'



const steps: Step[] = [
  {
    target: 'body',
    title: "Restaurants View Page",
    content: 'Here you can view the restaurants of the city you have selected',
    placement: 'center' as const,
    showSkipButton: true,
  },
  {
    title: "Food Search Bar",
    target: '#search-food-component',
    content: 'You can enter any food name here, and backend will find the restaurants, that serves it.',
    placement: "bottom",
    disableScrolling: true,
    disableBeacon: true,
    showSkipButton: true,
  },
  {
    title: "Filters",
    target: '#filter-component',
    content: 'Using this filter component you can filter your searched restaurants more according to "ratings", "average price", etc..',
    placement: "bottom",
    disableScrolling: true,
    disableBeacon: true,
  },
  {
    title: "Restaurants",
    target: '#restaurant-list-component',
    content: 'After Searching or filtering please select any one restaurant to view the menu',
    placement: "top",
    disableScrolling: true,
    disableBeacon: true,
  },
];

export const Route = createFileRoute('/restaurants')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const [searchInput, setSearchInput] = useState<string>("");
  const { city__iexact, setFilter, search, count, clearFilterState} = useRestaurantFilterStore2(state => state);
  const {restaurantRun, setRunState} = useJoyrideSession(state => state);

  const handleSessionCallback = (data: CallBackProps) => {
    const {status, action} = data;
    
    if (status === 'skipped' || status === 'finished'){
      setRunState("restaurantRun", false);
    }

    if (action === 'close'){
      setRunState("restaurantRun", false);
    }
  }


  // to clean up search filter after component unmounts (was searching for pizza again in different city)
  useEffect( () => {
    return () => {
      setFilter("search", undefined)
      clearFilterState();
    };
  }, [])

  return (

    <div id="restaurant-page" className='flex flex-col gap-3'>
    <div id="search-food"
    className='variable-margin bg-web-theme-ylgn-light rounded-t-2xl border-2 border-[#E7E8DE]'
    >

      <div className='inline-flex gap-2 items-center p-5'>
        <H2 className="text-lg sm:text-2xl md:text-3xl poppins">
          Search
        </H2>

        <p
        className='text-sm sm:text-lg'
        >{search && `(Results for ${search})`}</p>
      </div>

      <form id='search-food-component'
      onSubmit={(e) => {
        e.preventDefault();
        setFilter("search", searchInput);
      }}
      
      className='pl-5 pr-15 pb-8 inline-flex w-full gap-5 flex-wrap sm:flex-nowrap'>

        <InputGroup className='bg-white'>
          <InputGroupInput 
          value={searchInput}
          onChange={(e)=> setSearchInput(e.target.value)}
          className='text-sm sm:text-lg' placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">{count} results</InputGroupAddon>
        </InputGroup>
        
        <Button
        type='submit'
        className='rounded-md bg-black'
        >Search</Button>
      </form>

    </div>

    <div className='variable-margin bg-green-50 rounded-b-2xl p-4 border-2 border-green-200 '>
      <H2 
      className="text-lg sm:text-2xl md:text-3xl p-5 poppins">
        Restaurants with online food delivery in {city__iexact}
      </H2>

      <div id="filters" className="px-5 py-3">
        <RestaurantFilters 
        buttonTriggerId='filter-component'
        />
      </div>
      
      <Joyride 
      showProgress
      steps={steps}
      continuous
      run={restaurantRun}
      callback={handleSessionCallback}
      />
      
      <Outlet />
    </div>
    </div>
  )
}
