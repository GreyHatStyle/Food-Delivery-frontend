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
        className={cn(`py-4 mr-4  hover:bg-web-theme-green/40 rounded-md cursor-pointer font-semibold poppins
         ${isSelected ? "border-teal-700 border-l-4 bg-web-theme-green/30 hover:bg-web-theme-green/30" : ""}
        `)}
        {...props}
        >
            {content}
        </button>
    )
}
 