import type { FilterSection } from "."
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// teal
interface RatingFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}

function RatingFilter({
    filterSection,
    isAccordion,
}: RatingFilterProps) {
    

  return (
    <div
    id="rating-filter"
    style={{
        display: isAccordion? "flex": filterSection === "rating"? "flex" : "none"
    }}
    className="flex-col gap-4"
    >
        
        <b>FILTER BY</b>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="rating35"
            name="rating35"/>
            <Label htmlFor="rating35">Rating 3.5+</Label>
        </div>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="rating40"
            name="rating40"/>
            <Label htmlFor="rating40">Rating 4.0+</Label>
        </div>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="rating45"
            name="rating45"/>
            <Label htmlFor="rating45">Rating 4.5+</Label>
        </div>

        
        </div>
  )
}

export default RatingFilter