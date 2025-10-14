import type { FilterSection } from "."
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRestaurantFilterStore2 } from "@/store/restaurant-filter-store"

// Doing this optional for accordion filter page
interface AvgCostFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}

function AvgCostFilter({
    filterSection,
    isAccordion,
}: AvgCostFilterProps) {

    const {avg_cost__lte, avg_cost__gte, toggleFilter} = useRestaurantFilterStore2(state => state);
    // console.log("Avg cost GTE: ", avg_cost__gte);
    // console.log("Avg cost LTe: ", avg_cost__lte);

  return (
    <div
    id="avg-cost-filter"
    style={{
        display: isAccordion? "flex" : filterSection === "averageCost"? "flex" : "none"
    }}
    className="flex-col gap-4"

    >
        <b>FILTERS</b>
            
        <div className="inline-flex">
            <Checkbox value="less300" id="less300" 
            onClick={() => toggleFilter("avg_cost__lte", 300)}
            checked={Array.isArray(avg_cost__lte) && avg_cost__lte.includes(300)}
            />
            <Label className="pl-2" htmlFor="less300">Less Than Rs. 300</Label>
        </div>
    
        <div className="inline-flex">
            <Checkbox value="bet300-600" id="bet300-600" 
            checked={Array.isArray(avg_cost__gte) && Array.isArray(avg_cost__lte) && avg_cost__gte.includes(300) && avg_cost__lte.includes(600)}
            onClick={() => {
                toggleFilter("avg_cost__gte", 300);
                toggleFilter("avg_cost__lte", 600);
            }}
            />
            <Label className="pl-2" htmlFor="bet300-600">Rs. 300 - Rs. 600</Label>
        </div>

        <div className="inline-flex">
            <Checkbox value="more600" id="more600" 
            onClick={() => toggleFilter("avg_cost__gte", 600)}
            checked={Array.isArray(avg_cost__gte) && avg_cost__gte.includes(600)}
            />
            <Label className="pl-2" htmlFor="more600">More than Rs. 600</Label>
        </div>
        
    </div>
  )
}

export default AvgCostFilter