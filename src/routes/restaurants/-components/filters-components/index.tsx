import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import RatingFilter from "./rating-filter"
import AvgCostFilter from "./avg-cost"
import RatingCountFilter from "./rating-count"
import CuisineFilter from "./cuisine"
import { FilterButton } from "./filter-button"
import { MobileAccordionFilterSet } from "./mobile-accordion-filter-set"
import { useRestaurantFilterStore2 } from "@/store/restaurant-filter-store"
import { useNavigate } from "@tanstack/react-router"



export type FilterSection = "rating" | "averageCost" | "ratingCount" | "cuisine"


function RestaurantFilters({
  buttonTriggerId,
}: {
  buttonTriggerId: string,
}) {
    const [filterSection, setFilterSection] = useState<FilterSection>("rating");
    const [isFilterOpen, openFilter] = useState<boolean>(false);

    const {getFilterState, clearFilterState} = useRestaurantFilterStore2(state => state);

    const navigate = useNavigate({from: "/restaurants/filters"});
    // console.log("This console is from Selecting filters!!!!: ", getFilterState());

  return (
     <Dialog open={isFilterOpen} onOpenChange={openFilter}>
      <form>
        <DialogTrigger asChild>
          <Button id={buttonTriggerId} variant="outline" className="border-web-theme-green border-2">Filter</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[50rem] z-200 gap-0">
            
            {/* <H2 className="border-b-1 pb-3"> Filter </H2> */}
            <DialogTitle className="text-3xl border-b-1 pb-3"> Filter</DialogTitle>

            <div className="filter-grid-responsive ">
                <aside className="flex flex-col gap-3 side border-r-1 border-gray-300">
                    
                    <FilterButton 
                    onClick={() => setFilterSection("rating")}
                    isSelected={filterSection === "rating"} 
                    content="Rating"
                    />

                    <FilterButton 
                    onClick={() => setFilterSection("averageCost")}
                    isSelected={filterSection === "averageCost"} 
                    content="Average Cost"
                    />

                    <FilterButton 
                    onClick={() => setFilterSection("ratingCount")}
                    isSelected={filterSection === "ratingCount"} 
                    content="Rating Count"
                    />

                    <FilterButton 
                    onClick={() => setFilterSection("cuisine")}
                    isSelected={filterSection === "cuisine"} 
                    content="Cousine"
                    />

                    
                </aside>
                <MobileAccordionFilterSet 
                className="mobile-accordion"
                />

                <div id="content"
                className="cont p-4"
                >
                    <RatingFilter 
                    filterSection={filterSection}
                    />
                    
                   <AvgCostFilter
                   filterSection={filterSection}
                   />

                   <RatingCountFilter
                   filterSection={filterSection}
                   />

                   <CuisineFilter
                   filterSection={filterSection}
                   />

                </div>


            </div>
          
            <div id="apply-clear-filters"
            className="inline-flex gap-4 justify-end"
            >
                <Button variant={"outline"} className="border-web-theme-green"
                onClick={() => {
                  clearFilterState();
                  navigate({
                    search: getFilterState(),
                  })
                }}
                >Clear Filters</Button>
                
                <Button
                onClick={()=> {
                  navigate({
                    search: () => getFilterState(),
                  })
                  openFilter(false);
              }
              }
                >Apply</Button>
            </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default RestaurantFilters