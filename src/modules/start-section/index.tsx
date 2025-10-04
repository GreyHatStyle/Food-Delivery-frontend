import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../components/ui/input-group"
import "./ss.css"
import { Button } from "../../components/ui/button"

function StartSection() {
  return (
    <div id="start-section" 
    className="relative variable-margin rounded-2xl bg-[#E7E8DE] flex justify-around">

        <img 
        className="h-[600px] py-2 object-cover lg:object-right"
        src="./restaurant-home.png" alt="restaurant-home" />

        
        <div className="absolute h-full w-[45%] lg:w-[50%] top-[4rem] left-[5rem]">
          <h1 className="title-quote text-[1.3rem] xs:text-[2rem] sm:text-[2.6rem] lg:text-[4rem]">
            Be The Fastest In Delivering Your Food
          </h1>
          <p className="text-[0.8rem] xs:text-sm sm:text-[1rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum a qui totam assumenda, veritatis, quod, id atque ut facilis sunt dolores cumque asperiores fugiat culpa vitae esse sit unde! Magnam, ab sint!</p>

          
          <InputGroup className="bg-card rounded-full mt-6 max-w-[32rem]">
          <InputGroupInput className="text-[0.8rem] sm:text-sm" placeholder="Search.."/>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon className="hidden text-sm sm:block" align="inline-end">12 results</InputGroupAddon>
          </InputGroup>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-1 lg:gap-3 xl:gap-5 lg:mt-7">
            <Button 
            className="px-8 sm:px-16 sm:py-4 bg-web-theme-green"
            variant={"default"}>Delivery</Button>
            <p className="text-web-theme-green">Or</p>
            <Button 
            className="px-8 sm:px-16 sm:py-4 bg-transparent border-2 border-web-theme-green text-web-theme-green hover:bg-white"
            variant={"default"}>Pick Up</Button>
          </div>

        </div>
    </div>
  )
}

export default StartSection