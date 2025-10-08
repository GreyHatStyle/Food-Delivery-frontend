import type { FilterSection } from "."


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
        display: isAccordion? "block" : filterSection === "cuisine"? "block" : "none"
    }}
    >
        
        CuisineFilter</div>
  )
}

export default CuisineFilter