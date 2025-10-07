import "./ss.css"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query";
import { GetAllCitiesAPI } from "../../-api/get-cities";
import { ToastContainer, toast } from 'react-toastify';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";


function StartSection() {

  const [searchBoxOpened, setOpenSearchBox] = useState<boolean>(false);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const isMobile = useIsMobile();
  
  const {data, isError, error, isSuccess} = useQuery({
    queryKey: ["cities"],
    queryFn: GetAllCitiesAPI,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });



  useEffect( () => {
    if (isSuccess){
      toast.success("Server is connected!!!", {
        theme: "colored",
      });
       setCities(data.cities);
      console.log("Cities: ", data.cities)
    }
    else if(isError){
      toast.error("Server is not working for now :_) kindly switch to static page", {
        theme: "colored"
      });
      console.log(error)
    }
  }, [isSuccess, isError, data, error]);


  return (
    <div id="start-section" 
    className="relative rounded-2xl bg-[#E7E8DE] flex justify-around xl:w-[75rem]">

         <ToastContainer 
         
         />

        <img 
        className="h-[600px] py-2 object-cover lg:object-right"
        src="./restaurant-home.png" alt="restaurant-home" />

        
        <div className="absolute h-full w-[45%] lg:w-[50%] top-[4rem] left-[5rem]">
          
          <h1 className="title-quote text-[1.3rem] xs:text-[2rem] sm:text-[2.6rem] lg:text-[4rem] leading-tight">
            Be The Fastest In Delivering Your Food
          </h1>
          
          <p className="text-[0.8rem] xs:text-sm sm:text-[1rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum a qui totam assumenda, veritatis, quod, id atque ut facilis sunt dolores cumque asperiores fugiat culpa vitae esse sit unde! Magnam, ab sint!</p>

          <div className="relative h-[4em]">


            <Command className="absolute top-0 left-0 mt-6 max-w-[32rem] border md:min-w-[450px] h-auto">

              <CommandInput 
              input_value={selectedCity}
              result_count_show={!isMobile ? `${cities.length} cities` : ""}
              onValueChange={ (value) => {
                setSelectedCity(value);

                if(value.length != 0){
                  setOpenSearchBox(true);
                }
                else{
                  setOpenSearchBox(false);
                }
              }}

              placeholder="Search City..." />

                <CommandList
                style={{
                  display: searchBoxOpened ? "block" : "none"
                }}
                className=""
                >
                  <CommandEmpty>No results found.</CommandEmpty>
                    {
                      cities.map((city, index) => (
                        <CommandItem 
                          onSelect={() => {
                            setOpenSearchBox(false);
                            setSelectedCity(city);
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
            className="px-8 sm:px-16 sm:py-4 bg-web-theme-green"
            variant={"default"}>Delivery</Button>
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