
import { H4 } from '@/components/ui/typography'
import { TbCirclePercentageFilled } from 'react-icons/tb'
// import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type DiscountCardType = {
    title: string,
    content: string,
}

const discounts: DiscountCardType[] = [
    {
        title: "Flat 40% Off",
        content: "NO CODE REQUIRED",
    },
    {
        title: "60% Off Upto ₹135",
        content: "USE SPECIALS",
    },
    {
        title: "Flat 25% Off",
        content: "USE XTRAPARTY",
    },
    {
        title: "40% Off Upto ₹115",
        content: "USE FOURTY115",
    },
    {
        title: "Flat 85% Off",
        content: "USE EIGHTYOFF",
    },
]

function DealBox() {
  return (
    <div id="deals-box">
    <H4 className="font-bold my-4">Deals for you</H4>
    
    <Carousel className="w-full">
        <CarouselContent className='my-4 px-11 pr-13'>
        {
            discounts.map( (card, index) => (
                <CarouselItem 
                key={index}
                className="sm:basis-1/2 lg:basis-1/3 inline-flex gap-2 items-center border-2 border-teal-800/30 rounded-xl mx-2 sm:pl-5 py-3 cursor-pointer hover:scale-105 transition-all bg-green-50 hover:bg-green-100">
                
                <TbCirclePercentageFilled className="size-[24px] sm:size-[48px] fill-green-600"/>
                    <div className='text-[0.6rem]'>
                        <b className="sm:text-lg">{card.title}</b>
                        <p>{card.content}</p>
                    </div>
                </CarouselItem >
            ))    
        }

        </CarouselContent>
        
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>

    </div>
  )
}

export default DealBox