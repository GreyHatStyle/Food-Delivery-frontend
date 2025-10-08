import type { FilterSection } from "."


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
        display: isAccordion? "block": filterSection === "rating"? "block" : "none"
    }}
    >
        
        RatingFilter</div>
  )
}

export default RatingFilter