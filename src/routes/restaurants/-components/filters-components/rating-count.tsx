import type { FilterSection } from "."
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRestaurantFilterStore2 } from "@/store/restaurant-filter-store"


interface RatingCountFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}
function RatingCountFilter({
    filterSection,
    isAccordion,
}: RatingCountFilterProps) {

    const {rating_count_int__gte, setFilter} = useRestaurantFilterStore2(state => state);

  return (
    <div
    id="rating-count-filter"
    style={{
        display: isAccordion? "flex" : filterSection === "ratingCount"? "flex" : "none"
    }}
    className="flex-col gap-4"
    >
        
        <b>FILTER BY</b>
        <RadioGroup defaultValue="rating-count-filter">
            <div className="inline-flex gap-2">
                <RadioGroupItem
                id="rating100" value="rating100"
                
                checked={rating_count_int__gte === 100}
                onClick={() => setFilter("rating_count_int__gte", 100)}
                />
                <Label htmlFor="rating100">100+ Ratings</Label>
            </div>
            
            <div className="inline-flex gap-2">
                <RadioGroupItem
                id="rating500" value="rating500"

                checked={rating_count_int__gte === 500}
                onClick={() => setFilter("rating_count_int__gte", 500)}
                />
                <Label htmlFor="rating500">500+ Ratings</Label>
            </div>
            
            <div className="inline-flex gap-2">
                <RadioGroupItem
                id="rating1000" value="rating1000"

                checked={rating_count_int__gte === 1000}
                onClick={() => setFilter("rating_count_int__gte", 1000)}
                />
                <Label htmlFor="rating1000">1000+ Ratings</Label>
            </div>
        </RadioGroup>
        
        
    </div>
  )
}

export default RatingCountFilter