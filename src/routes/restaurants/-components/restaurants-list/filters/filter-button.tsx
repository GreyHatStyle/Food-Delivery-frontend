import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type FilterType = {
    content: string,
    isSelected?: boolean,
} & ComponentProps<"button">



export function FilterButton({
    content,
    isSelected,
    ...props
}: FilterType){
    
    return (
        <button 
        className={cn(`py-4 mr-4  hover:bg-neutral-100 rounded-md cursor-pointer font-semibold poppins
         ${isSelected ? "border-green-600 border-l-4 bg-neutral-200 hover:bg-neutral-200" : ""}
        `)}
        {...props}
        >
            {content}
        </button>
    )
}
 