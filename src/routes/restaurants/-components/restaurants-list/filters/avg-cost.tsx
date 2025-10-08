import type { FilterSection } from "."

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
        display: isAccordion? "block" : filterSection === "averageCost"? "block" : "none"
    }}
    >
        
        AvgCostFilter</div>
  )
}

export default AvgCostFilter