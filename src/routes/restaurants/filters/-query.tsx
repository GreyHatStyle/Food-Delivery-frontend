import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getRestaurantsFromCity, type GetRestaurantFromCityApiResponse } from "./-api";
import type { QueryParamsType } from "./page";



export const useRestaurantsQuery = (decodedQueryString: string) => {

  const [receivedData, setReceivedData] = useState<GetRestaurantFromCityApiResponse>();
  

  const {data, isError, error, isSuccess, isLoading} = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurantsFromCity(decodedQueryString),
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