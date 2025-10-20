import { Button } from "@/components/ui/button"
import NonVegIcon from "@/components/ui/non-veg-icon"
import VegIcon from "@/components/ui/veg-icon"
import { type ComponentProps } from "react"

function MenuCard({
    foodName,
    cost,
    foodType,
    imgUrl,
    key,
}: {
    foodName: string,
    cost: number,
    foodType: "V" | "NV",
    imgUrl: string,
}& ComponentProps<"div">){

    // const foodName = "Paneer Burger";
    // const cost = 100;
    // const foodType = "V";
    // const imgUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/68db9320002150bd6130/files/cca80fbc-d915-4bae-9daf-b03729b87351/view?project=68dad5db002a710b59a4";


  return (
    <div 
    key={key}
    className='inline-flex md:mx-[3rem] py-7 px-7 sm:px-11 bg-white border-2 rounded-xl justify-between '>
        <div className='flex flex-col gap-2 justify-center max-w-[50%]'>

            {
                foodType === "V" ? 
                <VegIcon />
                :
                <NonVegIcon/>
            }

            <p
            className='text-sm text-teal-800 font-bold mt-7 md:text-2xl'
            >{foodName}</p>

            <p
            className="text-xl font-semibold"
            >&#8377; {cost}</p>
            
            <p
            className='text-[12px] md:text-sm'
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic iusto delectus nobis nulla pariatur.</p>
        
        </div>

        <div className='relative overflow-hidden rounded-md max-w-[140px]'>
            <img 
            className='object-cover scale-120'
            src={imgUrl} alt="" />
            
            <Button
            variant={"addMenuCart"}
            size={"lg"}
            className="absolute bottom-2 left-5 sm:left-8 border-2"
            >ADD</Button>
        </div>

    </div>
  )
}

export default MenuCard