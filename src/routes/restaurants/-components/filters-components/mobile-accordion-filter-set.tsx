import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { H4 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"
import RatingFilter from "./rating-filter"
import AvgCostFilter from "./avg-cost"
import RatingCountFilter from "./rating-count"
import CuisineFilter from "./cuisine"



export function MobileAccordionFilterSet({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
    className={cn("", className)}
    {...props}
    >
      

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" >
          <AccordionTrigger><H4>Rating</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">

            <RatingFilter 
            isAccordion
            />

            
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger><H4>Average Cost</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            
          <AvgCostFilter isAccordion />

            
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger><H4>Rating Count</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            
            <RatingCountFilter isAccordion />

          
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger><H4>Cuisine</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            
            <CuisineFilter 
            isAccordion
            />

            
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
