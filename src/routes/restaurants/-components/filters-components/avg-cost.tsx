import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FilterSection } from "."
import { Label } from "@/components/ui/label"

// Doing this optional for accordion filter page
interface AvgCostFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}

function AvgCostFilter({
    filterSection,
    isAccordion,
}: AvgCostFilterProps) {
  return (
    <div
    id="avg-cost-filter"
    style={{
        display: isAccordion? "flex" : filterSection === "averageCost"? "flex" : "none"
    }}
    className="flex-col gap-4"

    >
        <b>FILTERS</b>

        <RadioGroup defaultValue="comfortable">
            
            <div className="inline-flex">
                <RadioGroupItem value="less300" id="less300" />
                <Label className="pl-2" htmlFor="less300">Less Than Rs. 300</Label>
            </div>
      
            <div className="inline-flex">
                <RadioGroupItem value="bet300-600" id="bet300-600" />
                <Label className="pl-2" htmlFor="bet300-600">Rs. 300 - Rs. 600</Label>
            </div>

            <div className="inline-flex">
                <RadioGroupItem value="more600" id="more600" />
                <Label className="pl-2" htmlFor="more600">More than Rs. 600</Label>
            </div>
    </RadioGroup>
        
        </div>
  )
}

export default AvgCostFilter