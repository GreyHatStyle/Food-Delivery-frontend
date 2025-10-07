import { Button } from "@/components/ui/button"



function MemberShipCard() {
  return (
    <div className="relative shadow-2xl">
        <img 
        className="h-[30rem] w-[75rem] rounded-lg object-cover"
        src="./membership.png" alt="" />

        <div className="absolute rounded-lg bg-black/70 top-0 left-0 h-full w-full text-background flex flex-col items-center justify-center poppins gap-11">
            
            <h1 className="text-[1rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem]">Join Our Zogy Membership!!</h1>
            <Button variant={"ghost"}
            className="text-[1rem] px-[2rem] py-[1.5rem] border-2"
            >Check Out</Button>
        </div>

    </div>
  )
}

export default MemberShipCard