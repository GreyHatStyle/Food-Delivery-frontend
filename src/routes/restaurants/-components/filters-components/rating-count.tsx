import { Checkbox } from "@/components/ui/checkbox"
import type { FilterSection } from "."
import { Label } from "@/components/ui/label"


interface RatingCountFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}
function RatingCountFilter({
    filterSection,
    isAccordion,
}: RatingCountFilterProps) {
  return (
    <div
    id="rating-count-filter"
    style={{
        display: isAccordion? "flex" : filterSection === "ratingCount"? "flex" : "none"
    }}
    className="flex-col gap-4"
    >
        
        <b>FILTER BY</b>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="rating100"
            name="rating100"/>
            <Label htmlFor="rating100">100+ Ratings</Label>
        </div>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="rating500"
            name="rating500"/>
            <Label htmlFor="rating500">500+ Ratings</Label>
        </div>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="rating1000"
            name="rating1000"/>
            <Label htmlFor="rating1000">1000+ Ratings</Label>
        </div>

        
        
    </div>
  )
}

export default RatingCountFilter