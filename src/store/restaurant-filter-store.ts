/**
This is the file which will mainly be used to setup and access the filters
 */

import { create } from "zustand"

// Doing avg_cost as number array (might regret it)
export type QueryParamsType = {
  city__iexact: string,
  limit: number,
  offset: number,
  rating__gte?: number | number[],
  rating_count_int__gte?: number,
  avg_cost__lte?: number[],
  avg_cost__gte?: number[],
  cuisine?: string[],
}


export type RestaurantFilterQueryParamStoreType = {
  setFilter: <K extends keyof QueryParamsType>(
    key: K,
    value: QueryParamsType[K] // QueryParamType["city__iexact"] = "string" (generic example)
  ) => void;

  toggleFilter: <K extends keyof Omit<QueryParamsType, "cuisine">>(
    key: K,
    value: unknown,
  ) => void;

  toggleCuisine: <K extends keyof Pick<QueryParamsType, "cuisine">>(
    key: K,
    value: string,
  ) => void;

  storeUsingObject: (validatedObj: Record<string, unknown> | undefined) => void;

  getFilterState: () => Partial<QueryParamsType>;

  clearFilterState: () => void

} & QueryParamsType;

export const useRestaurantFilterStore2 = create<RestaurantFilterQueryParamStoreType>()(
    ((set, get) => ({
        city__iexact: "",
        limit: 10,
        offset: 0,

        setFilter: (key, value) => {
          set( { 
            [key] : value
          });
        },

        toggleFilter: (key, value) => {
          
          set((state) => {
            const currentValArray = state[key];

            if(currentValArray === undefined){
              return {
                [key]: [value],
              }
            }

            if (Array.isArray(currentValArray)){

              if(currentValArray.includes(value as number)){
                // basically removing the current value (for toggle)
                return {
                  [key]: currentValArray.filter(item => item !== value),
                };
              }
              
              return { 
                [key]: [...currentValArray, value as number],
              }

            }

            return {
              [key]: [currentValArray, value],
            }
          })
        },
        
        toggleCuisine: (key, value:string) => {
          set((state) => {
            const currentValArr = state[key];

            if(currentValArr === undefined){
              return {
                [key]: [value],
              }
            }

            if(currentValArr.includes(value)){
              return {
                [key]: currentValArr.filter(item => item !== value),
              };
            }

            return {
              [key]: [...currentValArr, value],
            }
          })
        },

        storeUsingObject: (validatedObj: Record<string, unknown> | undefined): void =>{
          if(typeof validatedObj === "undefined") return;

          Object.entries(validatedObj).forEach( ([key, value]) => {
            if(value === undefined || value === null) return "";
            
            if(key === "cuisine" && typeof value==="string"){
              const cuisineArray = value.split(',')
              .map( c=> c.trim())
              .filter( c => c!== "");

              set({
                [key]: cuisineArray,
              });

              return;
            };

            set({
              [key]: value,
            })
            
          });
        },

        getFilterState: () => {
          const state = get();
          return {
            city__iexact: state.city__iexact,
            limit: state.limit,
            offset: state.offset,
            rating__gte: state.rating__gte,
            rating_count_int__gte: state.rating_count_int__gte,
            avg_cost__lte: state.avg_cost__lte,
            avg_cost__gte: state.avg_cost__gte,
            cuisine: state.cuisine
          };
        },

        clearFilterState: () => {
          set({
            limit: 10,
            offset: 0,
            rating__gte: undefined,
            rating_count_int__gte: undefined,
            avg_cost__lte: undefined,
            avg_cost__gte: undefined,
            cuisine: undefined,
          });
        
      },
  }))
)