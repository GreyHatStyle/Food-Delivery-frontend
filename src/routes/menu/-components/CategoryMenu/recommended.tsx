
import { H3 } from "@/components/ui/typography";
import RecommendedCard from "./recommended-card";
import type { MenuItemsType } from "../../-api/menu-api";
import "./recommended.css"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface RecommendedProps{
  recommendedFoods: MenuItemsType[],
  firstCategory: string,
  restId: string,
}

function Recommended({
  recommendedFoods,
  firstCategory,
  restId,

}: RecommendedProps) {

    // const foodName = "Veg Burger";
    // const price = 90;
    // const foodType = "V"
    // const imgUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/68db9320002150bd6130/files/1158b636-01f7-4fc0-936b-d9aedaa10455/view?project=68dad5db002a710b59a4";

  return (
    <div className="sm:variable-margin self-start w-full flex flex-col sm:items-center">
        
        <H3
        className="my-11 sm:ml-20 font-bold self-start"
        >{firstCategory}</H3>

        <Carousel className="recommended-carousel-min-width-fix sm:max-w-dvw">
          <CarouselContent className='my-4 px-11 pr-13'>
          {
            recommendedFoods.map( (food, index) => (

              <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 "
              >
                <RecommendedCard
                key={`r-${index}`} 
                menu_item={food}
                category={firstCategory}
                restId={restId}
                menu_items_length={recommendedFoods.length}
                />

              </CarouselItem >
              
            ) )
          }

        </CarouselContent>

        <CarouselPrevious 
        className='left-1 md:-left-12'
        />

        <CarouselNext 
        className='right-14 md:-right-12'
        />
        </Carousel>
     
    </div>
  )
}

export default Recommended