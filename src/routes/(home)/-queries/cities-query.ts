import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { GetAllCitiesAPI } from "../-api/get-cities";

export const useCitiesQuery = () => {
  const [cities, setCities] = useState<string[]>([]);

  const {data, isError, error, isSuccess} = useQuery({
    queryKey: ["cities"],
    queryFn: GetAllCitiesAPI,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  useEffect(() => {
    if (isSuccess) {
      // INFO: (Toaster Info) Even after using toaster here, the <Toaster> component is showing output on different tsx file... check it if this causes problem in future
      toast.success("Server is connected!!!", { 
        theme: "colored",
      });
      
      setCities(data.cities);
    }
  }, [isSuccess, data]);


  useEffect(() => {
    if (isError) {
      toast.error("Server is not working for now :_) kindly switch to static page", {
        theme: "colored"
      });
      console.log(error);
    }
  }, [isError, error]);

  return { cities, };
};