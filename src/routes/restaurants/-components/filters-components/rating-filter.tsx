import type { FilterSection } from "."
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRestaurantFilterStore2 } from "@/store/restaurant-filter-store";

// teal
interface RatingFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}

const isFilterSelected = (filterType: unknown, value: number): boolean => {
    return typeof filterType === "number" && filterType === value 
            || 
            Array.isArray(filterType) && filterType.includes(value);
}

function RatingFilter({
    filterSection,
    isAccordion,
}: RatingFilterProps) {
    
    const {rating__gte, setFilter} = useRestaurantFilterStore2(state => state);

  return (
    <div
    id="rating-filter"
    style={{
        display: isAccordion? "flex": filterSection === "rating"? "flex" : "none"
    }}
    className="flex-col gap-4"
    >
        
        <b>FILTER BY</b>
        
        <RadioGroup defaultValue="rating-filter">
            <div className="inline-flex gap-2">
                <RadioGroupItem
                id="rating35"
                value="rating35"
                
                onClick={()=> setFilter("rating__gte", 3.5) }
                checked={isFilterSelected(rating__gte, 3.5)}

                />
                <Label htmlFor="rating35">Rating 3.5+</Label>
            </div>
            
            <div className="inline-flex gap-2">
                <RadioGroupItem
                id="rating40"
                value="rating40"
                
                onClick={()=> setFilter("rating__gte", 4.0) }
                checked={isFilterSelected(rating__gte, 4.0)}

                />
                <Label htmlFor="rating40">Rating 4.0+</Label>
            </div>
            
            <div className="inline-flex gap-2">
                <RadioGroupItem
                id="rating45"
                value="rating45"
                onClick={()=> setFilter("rating__gte", 4.5) }
                checked={isFilterSelected(rating__gte, 4.5)}
                />
                <Label htmlFor="rating45">Rating 4.5+</Label>
            </div>
        </RadioGroup>
        
        </div>
  )
}

export default RatingFilter