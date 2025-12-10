import "./ss.css"
import { Button } from "@/components/ui/button"
import { ToastContainer } from 'react-toastify';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { useIsMobile } from "@/hooks/useMobile";
import { useCitiesQuery } from "../../-queries/cities-query";
import { useState } from "react";
import { useCityStore } from "@/store/city-store";
import { useNavigate } from "@tanstack/react-router";


function StartSection() {

  const [searchBoxOpened, setOpenSearchBox] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  
  const { setCurrentCity } = useCityStore(state => state); // To make sure re-render happens in change of variable
  const { isMobileDevice } = useIsMobile();
  const {cities} = useCitiesQuery();
  const navigate = useNavigate();
  

  return (
    <div id="start-section" 
    className="relative rounded-2xl bg-[#E7E8DE] flex justify-around xl:w-[75rem]">

         <ToastContainer 
         position="bottom-left"
         />

        <img 
        className="h-[600px] py-2 object-cover lg:object-right"
        src="./restaurant-home.png" alt="restaurant-home" />

        
        <div className="absolute h-full w-[45%] lg:w-[50%] top-[4rem] left-[5rem]">
          
          <h1 className="title-quote text-[1.3rem] xs:text-[2rem] sm:text-[2.6rem] lg:text-[4rem] leading-tight">
            Be The Fastest In Delivering Your Food
          </h1>
          
          <p className="text-[0.8rem] xs:text-sm sm:text-[1rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum a qui totam assumenda, veritatis, quod, id atque ut facilis sunt dolores cumque asperiores fugiat culpa vitae esse sit unde! Magnam, ab sint!</p>

          <div 
          className="relative h-[4em]">

            {/* Did z-5 because  button was coming over Command component for some reason*/}
            <Command 
            id="city-search-component"
            className="absolute top-0 left-0 mt-6 max-w-[32rem] border md:min-w-[450px] h-auto z-5"
            >

              <CommandInput 
              input_value={selectedCity}
              result_count_show={!isMobileDevice ? `${cities.length} cities` : ""}
              onBlur={() => {
                // removed the setTimeOut function, because waiting for program to updated selectedCity state was device dependent,
                // and was not updating in some devices, "The 200ms gap was not enough for slow devices",
                // while "More than 200ms was visually slower for fast devices", so not a good choice
                setOpenSearchBox(false);

              }}

              onFocus={() => setOpenSearchBox(true)}
               // On blur is opposite of onFocus (when user clicks somewhere else)
              onValueChange={ (value) => setSelectedCity(value)}

              placeholder="Search City..." />

                <CommandList
                
                style={{
                  display: searchBoxOpened ? "block" : "none",
                }}
                className=""
                >
                  <CommandEmpty>No results found.</CommandEmpty>
                    {
                      cities.map((city, index) => (
                        <CommandItem 
                          // shifted from 'onSelect' to 'onMouseDown' to deal with a bug, onBlur was running before onSelect here somehow, 
                          // because of which searchBox was closing down with selecting the city and updating state, even though clicked.
                          // to deal with this used onMouseDown() with preventing default event behavior.
                          onMouseDown={(e) => {
                            e.preventDefault();
                            
                            setSelectedCity(city);
                            setOpenSearchBox(false);
                          }}

                          key={index}
                          >
                              <span></span>
                              <span>{city}</span>
                        </CommandItem>
                      ))
                    }

                </CommandList>

              
            </Command>
          </div>



          <div className="mt-4 flex flex-col sm:flex-row items-center gap-1 lg:gap-3 xl:gap-5 lg:mt-7">

            <Button 
            disabled={!cities.includes(selectedCity)}

            onClick={() => {
              setCurrentCity(selectedCity);

              navigate({
                to: "/restaurants/filters",
                search: {
                  city__iexact: `${selectedCity}`
                }
              })
              
            }}
            className="px-8 sm:px-16 sm:py-1.5 disabled:bg-black"
            >
              
              Delivery
              
              </Button>

            <p className="text-web-theme-green">Or</p>
            <Button 
            className="px-8 sm:px-16 sm:py-4 bg-transparent border-2 border-web-theme-green text-web-theme-green hover:bg-white"
            variant={"default"}>Pick Up</Button>
          </div>

        </div>
    </div>
  )
}

export default StartSection