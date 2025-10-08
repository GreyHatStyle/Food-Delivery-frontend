import { H4 } from "@/components/ui/typography"
import type { ComponentProps } from "react";
import { MdStars } from "react-icons/md";


interface RestaurantCardProps{
    image: string,
    restaurantName: string,
    rating: number,
    ratingCount: string,
    cuisines: string[],   
}

function RestaurantCard({
    image,
    restaurantName,
    rating,
    ratingCount,
    cuisines,
    ...props
}: RestaurantCardProps & ComponentProps<"div">) {

  return (
    <div 
    className="flex flex-col min-w-[200px] max-w-[320px] p-3 rounded-xl hover:scale-105
    bg-background cursor-pointer shadow-card"
    {...props}
    >

        <div className="overflow-hidden rounded-2xl self-center">
            <img 
            className="object-cover object-center scale-140 hover:scale-100 transition-all"
            src={image} alt="" />

        </div>

        <div className="p-4">
            <H4> {restaurantName} </H4>
            <div className="inline-flex gap-1 items-center">

                <MdStars 
                style={{
                    color: (rating >= 0 && rating <= 2) ? "red" : (rating>2 && rating<3.5) ? "yellow" : "green",
                }}
                
                />
                <b>{rating}</b>
                <span></span>
                <p className="flex-1">{ratingCount}</p>

            </div>

            <p className="text-neutral-600">{cuisines.join(", ")}</p>

        </div>
    </div>
  )
}

export default RestaurantCard