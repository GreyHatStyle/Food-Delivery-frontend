import { H2 } from "@/components/ui/typography"
import { MdStars } from "react-icons/md";
import DealBox from "./discount-cards";

interface AboutRestaurantSectionProps {
  title: string,
  rating: number,
  rating_count: string,
  cuisines: string[],
  address: string,
}

function AboutRestaurantSection({
  title,
  rating,
  rating_count,
  cuisines,
  address
}: AboutRestaurantSectionProps) {

  // const title = "Pizza Hut";
  // const rating = 4.1;
  // const rating_count = "7.6K+ ratings";
  // const cuisines = ["North India", "South Indian"];
  // const address = "Pa Ji Family Restro, 85/355 Laxmi purwa duputy padav, Saina Purwa, Cooperganj, Kanpur, Uttar Pradesh 208003"

  return (
    <div className="m-3 sm:m-11 flex flex-col gap-5 ">
      <H2 className="font-bold">{title}</H2>

      <div id="about-restaurant"
      className="border-2 rounded-xl p-6 flex flex-col gap-1 shadow-card">

        <div className="inline-flex items-center gap-1 text-sm sm:text-xl">
          <MdStars 
            style={{
                color: (rating >= 0 && rating <= 2) ? "red" : (rating>2 && rating<3.5) ? "yellow" : "green",
            }}
            
          />
          <b>{rating} ({rating_count})</b>

        </div>

        <p
        className="text-green-800 font-bold text-sm sm:text-lg"
        >{cuisines.join(", ")}</p>

        <p
        className=" text-sm"
        ><b>Outlet:</b> {address}</p>
      </div>


      <DealBox />


    </div>
  )
}

export default AboutRestaurantSection