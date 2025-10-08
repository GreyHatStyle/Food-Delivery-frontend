import type { FilterSection } from "."


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
        display: isAccordion? "block" : filterSection === "ratingCount"? "block" : "none"
    }}
    >
        
        RatingCountFilter</div>
  )
}

export default RatingCountFilter