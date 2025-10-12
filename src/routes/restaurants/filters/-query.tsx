import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getRestaurantsFromCity, type GetRestaurantFromCityApiResponse } from "./-api";
import type { QueryParamsType } from "./page";
import { useRestaurantFilterStore } from "@/store/restaurant-filter-store";



export const useRestaurantsQuery = ({
    city,
    pageLimit,
    pageOffset,
    searchQueryByParent,
}: QueryParamsType & {searchQueryByParent: string}) => {

  const [receivedData, setReceivedData] = useState<GetRestaurantFromCityApiResponse>();
  const { finalQuery } = useRestaurantFilterStore();

  console.log("Search Query By parent: ", searchQueryByParent);
  console.log("Final query recieved (zustand): ", finalQuery);

  

  const {data, isError, error, isSuccess, isLoading} = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurantsFromCity({
        city: city,
        pageLimit: pageLimit,
        pageOffset: pageOffset,
        finalSearchQuery: searchQueryByParent,
    }),
    refetchOnMount: true,
    retry: 2,
  });

  useEffect(() => {
    if (isSuccess) {
      // INFO: (Toaster Info) Even after using toaster here, the <Toaster> component is showing output on different tsx file... check it if this causes problem in future
      toast.success("Server is connected!!!", { 
        theme: "colored",
      });
      
      setReceivedData(data);
    }
  }, [isSuccess, data]);


  useEffect(() => {
    if (isError) {
      toast.error("Server is not working for now :_), Showing Static page instead", {
        theme: "colored"
      });
      console.log(error);
    }
  }, [isError, error]);

  return { receivedData, isLoading};
};