import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"


interface LineProps{
    lineColor?: "grey" | "lightgray" | "black" | "blue" | "green" | "white",
    heightPx?: number,
    direction?: "vertical" | "horizontal",
}

function Line({
    lineColor,
    heightPx,
    direction="horizontal",
    className,
}: LineProps & ComponentProps<"div">) {
  return (
    <div 
    className={cn("", className)}
    style={{
        backgroundColor: lineColor || "lightgray",
        height: (direction == "horizontal" && heightPx === undefined) ? 
                `1px` 
                : 
                (direction == "vertical" && heightPx === undefined)
                  ?
                  `200px`
                  :
                  `${heightPx}px` 
                ,
        width: (direction == "vertical") ? "2px" : "full"
    }}
    ></div>
  )
}

export default Line