import NonVegIcon from "@/components/ui/non-veg-icon"
import VegIcon from "@/components/ui/veg-icon"


function MenuCard() {

    const foodName = "Paneer Burger";
    const cost = 100;
    const foodType = "V";
    const imgUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/68db9320002150bd6130/files/cca80fbc-d915-4bae-9daf-b03729b87351/view?project=68dad5db002a710b59a4";


  return (
    <div className='inline-flex sm:mx-[3rem] py-7 px-7 sm:px-11 bg-white border-2 rounded-xl justify-between '>
        <div className='flex flex-col gap-2 justify-center max-w-[50%]'>

            {
                foodType === "V" ? 
                <VegIcon />
                :
                <NonVegIcon/>
            }

            <p
            className='text-teal-800 font-bold mt-7 text-2xl'
            >{foodName}</p>

            <p
            className="text-xl font-semibold"
            >&#8377; {cost}</p>
            
            <p
            className='text-sm'
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic iusto delectus nobis nulla pariatur.</p>
        
        </div>

        <div className='overflow-hidden rounded-md max-w-[140px]'>
            <img 
            className='object-cover scale-120'
            src={imgUrl} alt="" />

        </div>

    </div>
  )
}

export default MenuCard