/**
 * ## This store is too strict and value based won't be able to find the rating if user even ask for 3.6
 * Need to deal with this issue in future.. for now it will work
 */

import { create } from "zustand"


export type RatingFilterType = "rating__gte=3.5" | "rating__gte=4" | "rating__gte=4.5"

export type AvgCostFilterType = "avg_cost__lte=300" | "avg_cost__gte=300&avg_cost__lte=600" | "avg_Cost__gte=600" | ""

export type RatingCountFilterType = "rating_count_int__gte=100" | "rating_count_int__gte=500" | "rating_count_int__gte=1000" | "rating_count_int__gte=1500"

export type CuisineFilterType = "North Indian" | "South Indian" | "Chinese" | "Pizzas" | "Sweets" |  "American" | "Bakery" | "Desserts"


type RestaurantsFilterStoreType = {
    ratings: RatingFilterType[],
    avgCost: AvgCostFilterType,
    ratingCounts: RatingCountFilterType[],
    cuisines: CuisineFilterType[],
    finalQuery: string,

    setRatings: (vals: RatingFilterType[]) => void,
    setAvgCost: (val: AvgCostFilterType) => void,
    setRatingCounts: (vals: RatingCountFilterType[]) => void,
    setCuisines: (vals: CuisineFilterType[]) => void,

    searchQueryDecodeAndSet: (query: string) => void,
    buildFinalQuery: () => void,
}

function isCuisineType(cuisine: string): cuisine is CuisineFilterType {
    return ['North Indian', 'South Indian', 'Chinese', 'Pizzas', 
            'Sweets', 'American', 'Bakery', 'Desserts'].includes(cuisine);
}

export const useRestaurantFilterStore = create<RestaurantsFilterStoreType>()(
    ((set, get) => ({
        ratings: [],
        avgCost: "",
        ratingCounts: [],
        cuisines: [],
        finalQuery: "",

        setRatings: (vals: RatingFilterType[]) => set( (state) => ({
            ratings: state.ratings.concat(vals),
        })),

        setAvgCost: (val: AvgCostFilterType) => set({ avgCost: val}),

        setRatingCounts: (vals: RatingCountFilterType[]) => set( (state) => ({
            ratingCounts: state.ratingCounts.concat(vals),
        })),

        setCuisines: (vals: CuisineFilterType[]) => set((state) => ({
            cuisines: state.cuisines.concat(vals),
        })),

        searchQueryDecodeAndSet: (query: string) => {
            
            if(!query) return;

            const params = new URLSearchParams(query);
            
            
            const ratingToSet: RatingFilterType[] = [];
            if (params.has('rating__gte')){
                const ratingValue = params.get('rating__gte');
                if(ratingValue === '3.5') ratingToSet.push("rating__gte=3.5")
                if(ratingValue === '4.0') ratingToSet.push("rating__gte=4")
                if(ratingValue === '4.5') ratingToSet.push("rating__gte=4.5")
            }


            let avgCostToSet: AvgCostFilterType = "";
            if (params.has("avg_cost__gte") && params.has("avg_cost__lte")){
                avgCostToSet = "avg_cost__gte=300&avg_cost__lte=600";
            }
            else if (params.has("avg_cost__gte")){
                avgCostToSet = "avg_Cost__gte=600";
            }
            else if(params.has("avg_cost__lte")){
                avgCostToSet = "avg_cost__lte=300";
            }


            const ratingCountsToSet: RatingCountFilterType[] = [];
            if (params.has("rating_count_int__gte")){
                const countVal = params.get("rating_count_int__gte");
                
                if(countVal === "100") ratingCountsToSet.push("rating_count_int__gte=100")
                if(countVal === "500") ratingCountsToSet.push("rating_count_int__gte=500")
                if(countVal === "1000") ratingCountsToSet.push("rating_count_int__gte=1000")
                if(countVal === "1500") ratingCountsToSet.push("rating_count_int__gte=1500")
            }

            const cuisinesToSet: CuisineFilterType[] = []
            if(params.has("cuisine")){
                const cuisineValues = params.get("cuisine");
                
                if(cuisineValues){
                    const cuisinesList = cuisineValues.split(",");

                    cuisinesList.forEach( cuisine => {
                        if(isCuisineType(cuisine)){
                            cuisinesToSet.push(cuisine);
                        }
                    });
                }
            }


            // The final set where all values meet :)
            set({
                ratings: ratingToSet,
                avgCost: avgCostToSet,
                ratingCounts: ratingCountsToSet,
                cuisines: cuisinesToSet,
            });
        },



        buildFinalQuery: () => {
            let finalQuery = "";

            if(get().ratings.length > 0){
                finalQuery += get().ratings.join("&");
            }
            
            if(get().avgCost){
                if (finalQuery) finalQuery += "&";
                finalQuery += get().avgCost;
            }

            if(get().ratingCounts.length > 0){
                if (finalQuery) finalQuery += "&";
                finalQuery += get().ratingCounts.join("&");
            }

            if(get().cuisines.length > 0){
                if (finalQuery) finalQuery += "&";
                finalQuery += get().cuisines.map(
                    (cuisine: CuisineFilterType) => `cuisine=${encodeURIComponent(cuisine)}`
                ).join("&");
            }
            
            set({
                finalQuery: finalQuery,
            })
        }
        
    }))
)