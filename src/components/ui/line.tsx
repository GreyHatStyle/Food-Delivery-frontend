import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"


interface LineProps{
    lineColor?: "grey" | "lightgray" | "black" | "blue" | "green",
    heightPx?: number,
}

function Line({
    lineColor,
    heightPx,
    className,
}: LineProps & ComponentProps<"div">) {
  return (
    <div 
    className={cn("", className)}
    style={{
        backgroundColor: lineColor || "lightgray",
        height: heightPx ? `${heightPx}px` : '1px',
    }}
    ></div>
  )
}

export default Line