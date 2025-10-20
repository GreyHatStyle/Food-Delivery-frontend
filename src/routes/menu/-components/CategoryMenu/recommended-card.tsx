import { Button } from "@/components/ui/button"
import NonVegIcon from "@/components/ui/non-veg-icon"
import { H4 } from "@/components/ui/typography"
import VegIcon from "@/components/ui/veg-icon"
import type { ComponentProps } from "react"


interface RecommendedCardProps{
    foodName: string,
    imgUrl: string,
    price: number,
    foodType: "V" | "NV"
}

function RecommendedCard({
    foodName,
    imgUrl,
    price,
    foodType,
    key,
}: RecommendedCardProps & ComponentProps<"div">) {
  return (
    <div 
    key={key}
    className="relative overflow-hidden rounded-md max-w-[260px] sm:max-w-[350px]">

        <img 
        className="object-cover scale-150"
        src={imgUrl} alt="" />

        <div 
        className="absolute top-0 left-0 h-full w-full bg-black/50 z-20 p-3 flex flex-col justify-between">
            {
                foodType === "V" ? 
                <VegIcon
                />
                : 
                <NonVegIcon
                />
            }

            <H4
            className="mt-8 font-bold text-white flex-1"
            >{foodName}</H4>

            <div className="inline-flex justify-between items-center">
                <b className="text-white text-xl">&#8377; {price}</b>
                <Button
                variant={"addMenuCart"}
                className="px-11"
                >ADD</Button>

            </div>
        </div>

    </div>
  )
}

export default RecommendedCard