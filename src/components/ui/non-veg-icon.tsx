import { LuSquare, LuTriangle } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

function NonVegIcon({
  className,
}: ComponentProps<"div">) {
  return (
    <div 
    className={cn("relative text-red-400 text-3xl", className)}>
        <LuSquare className="absolute" />
        <LuTriangle className="absolute fill-red-400 top-[7px] left-[7px] text-[15px]" />
    </div>
  )
}

export default NonVegIcon