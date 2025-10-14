import { Checkbox } from "@/components/ui/checkbox"
import type { FilterSection } from "."
import { Label } from "@/components/ui/label"
import { useRestaurantFilterStore2, type QueryParamsType } from "@/store/restaurant-filter-store"



interface CuisineCheckboxProps{
    id: string,
    cuisine: string[] | undefined,
    toggleCuisine: <K extends keyof Pick<QueryParamsType, "cuisine">> (key: K, val: string) => void
    name: string,
}

function CuisineCheckbox({
    id,
    cuisine,
    toggleCuisine,
    name,
}: CuisineCheckboxProps){

    return <div className="inline-flex gap-2">
            <Checkbox
            id={id} name={id}
            
            checked={Array.isArray(cuisine) && cuisine.includes(name)}
            onClick={() => toggleCuisine("cuisine", name)}
            />
            <Label htmlFor={id}>{name}</Label>
        </div>
}


interface CuisineFilterProps{
    filterSection?: FilterSection
    isAccordion?: boolean
}


function CuisineFilter({
    filterSection,
    isAccordion,
}: CuisineFilterProps) {

    const { cuisine, toggleCuisine } = useRestaurantFilterStore2(state => state);

    // console.log("Cuisine: ", cuisine);

  return (
    <div
    id="rating-count-filter"
    style={{
        display: isAccordion? "flex" : filterSection === "cuisine"? "flex" : "none"
    }}
    className="flex-col gap-4 overflow-y-auto max-h-[14rem]"
    >
    
        <b>FILTER BY</b>
        
        
        <CuisineCheckbox 
        id="northInd"
        cuisine={cuisine}
        name="North Indian"
        toggleCuisine={toggleCuisine}
        />
        
        <CuisineCheckbox 
        id="southInd"
        cuisine={cuisine}
        name="South Indian"
        toggleCuisine={toggleCuisine}
        />
        
        
        <CuisineCheckbox 
        id="chinese"
        cuisine={cuisine}
        name="Chinese"
        toggleCuisine={toggleCuisine}
        />
        
        <CuisineCheckbox 
        id="pizzas"
        cuisine={cuisine}
        name="Pizzas"
        toggleCuisine={toggleCuisine}
        />
        
        <CuisineCheckbox 
        id="bakery"
        cuisine={cuisine}
        name="Bakery"
        toggleCuisine={toggleCuisine}
        />
        
        <CuisineCheckbox 
        id="american"
        cuisine={cuisine}
        name="American"
        toggleCuisine={toggleCuisine}
        />
   
        <CuisineCheckbox 
        id="italianAmerican"
        cuisine={cuisine}
        name="Italian American"
        toggleCuisine={toggleCuisine}
        />
        
    </div>
  )
}

export default CuisineFilter