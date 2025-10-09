import { Checkbox } from "@/components/ui/checkbox"
import type { FilterSection } from "."
import { Label } from "@/components/ui/label"


interface CuisineFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}
function CuisineFilter({
    filterSection,
    isAccordion,
}: CuisineFilterProps) {
  return (
    <div
    id="rating-count-filter"
    style={{
        display: isAccordion? "flex" : filterSection === "cuisine"? "flex" : "none"
    }}
    className="flex-col gap-4 overflow-y-auto max-h-[14rem]"
    >
    
        <b>FILTER BY</b>
        
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="northInd"
            name="northInd"/>
            <Label htmlFor="northInd">North Indian</Label>
        </div>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="southInd"
            name="southInd"/>
            <Label htmlFor="southInd">South Indian</Label>
        </div>
        
        <div className="inline-flex gap-2">
            <Checkbox
            id="chinese"
            name="chinese"/>
            <Label htmlFor="chinese">Chinese</Label>
        </div>

        
        <div className="inline-flex gap-2">
            <Checkbox
            id="pizza"
            name="pizza"/>
            <Label htmlFor="pizza">Pizza</Label>
        </div>


        <div className="inline-flex gap-2">
            <Checkbox
            id="bakery"
            name="bakery"/>
            <Label htmlFor="bakery">Bakery</Label>
        </div>

        
        <div className="inline-flex gap-2">
            <Checkbox
            id="american"
            name="american"/>
            <Label htmlFor="american">American</Label>
        </div>

        
        <div className="inline-flex gap-2">
            <Checkbox
            id="italianAmerican"
            name="italianAmerican"/>
            <Label htmlFor="italianAmerican">Italian American</Label>
        </div>

        
    </div>
  )
}

export default CuisineFilter