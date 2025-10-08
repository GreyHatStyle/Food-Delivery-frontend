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

            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger><H4>Average Cost</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            
          <AvgCostFilter isAccordion />

            <p>
              All orders are carefully packaged and fully insured. Track your
              shipment in real-time through our dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger><H4>Rating Count</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            
            <RatingCountFilter isAccordion />

            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger><H4>Cuisine</H4></AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            
            <CuisineFilter 
            isAccordion
            />

            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
