import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { H2 } from "@/components/ui/typography"
import { useState } from "react"
import RatingFilter from "./rating-filter"
import AvgCostFilter from "./avg-cost"
import RatingCountFilter from "./rating-count"
import CuisineFilter from "./cuisine"
import { FilterButton } from "./filter-button"
import { MobileAccordionFilterSet } from "./mobile-accordion-filter-set"



export type FilterSection = "rating" | "averageCost" | "ratingCount" | "cuisine"


function RestaurantFilters() {
    const [filterSection, setFilterSection] = useState<FilterSection>("rating")

  return (
     <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-web-theme-green border-2">Filter</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[50rem] z-200 gap-0">
            
            <H2 className="border-b-1 pb-3"> Filter </H2>

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
                <Button variant={"outline"} className="border-web-theme-green">Clear Filters</Button>
                <Button>Apply</Button>
            </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default RestaurantFilters