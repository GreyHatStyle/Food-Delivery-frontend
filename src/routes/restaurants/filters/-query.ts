import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getRestaurantsFromCity, type GetRestaurantFromCityApiResponse } from "./-api";
import { useRestaurantFilterStore2, type QueryParamsType } from "@/store/restaurant-filter-store";


// Adding current search query because, using [decodedQueryString from zustand] was calling this api every time filter
// was being changed (toggled in zustand) without clicking apply button
export const useRestaurantsQuery = (decodedQueryString: string, currentSearchQuery: string, restStoreState: Partial<QueryParamsType>) => {

  const [receivedData, setReceivedData] = useState<GetRestaurantFromCityApiResponse>();
  const [queryRanCount, setQueryRanCount] = useState<number>(0);
  const {setFilter} = useRestaurantFilterStore2(state => state);

  const {data, isError, error, isSuccess, isLoading} = useQuery({
    queryKey: ["restaurants", currentSearchQuery, restStoreState.search],
    queryFn: () => getRestaurantsFromCity(queryRanCount===0? currentSearchQuery: decodedQueryString),
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (isSuccess) {
      // INFO: (Toaster Info) Even after using toaster here, the <Toaster> component is showing output on different tsx file... check it if this causes problem in future
      toast.success("Server is connected!!!", { 
        theme: "colored",
      });
      setQueryRanCount(prev=>prev+1);
      setReceivedData(data);
      setFilter("count", data.count);
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