
import { LuDot, LuSquare } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'



function VegIcon({
  className,
}: ComponentProps<"div">) {

  return (
    <div 
    className={cn("relative text-green-400 text-3xl", className)}
    >
        <LuSquare className="absolute" />
        <LuDot className="absolute top-[-21.5px] left-[-21.5px] text-7xl" />
    </div>
  )
}

export default VegIcon