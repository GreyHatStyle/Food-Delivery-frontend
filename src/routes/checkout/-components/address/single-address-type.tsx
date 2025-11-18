import type { ComponentProps } from "react"
import { type UserAddressType } from "./user-address-api"
import { Building, Home } from "lucide-react"
import { MdOutlineLocationOn } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function addressConcatenator(address: UserAddressType): string{
    let line_address = "";
    Object.entries(address).forEach( ([key, value]) => {

        if (key !== "updated_at" && key !== "address_type"){
            line_address += value + ', ';
        }
    })

    return line_address.slice(0, line_address.length-2);
}

interface SingleAddressProps{
    address: UserAddressType,
    buttonProps?: ComponentProps<typeof Button>,
    time: string,
    isSelected?: boolean,
    isNoneSelected: boolean,
}

function SingleAddress({
    address,
    buttonProps,
    time,
    isSelected = false,
    isNoneSelected = true,
    ...props
}: SingleAddressProps & ComponentProps<"div">) {
  return (
    <div
    {...props}
    className={cn("border flex flex-row  gap-3 m-2 p-6 cursor-pointer hover:shadow-md transition-all duration-300", props.className)}
    
    style={{
        display: (isNoneSelected) ? "flex" : (isSelected) ? "flex" : "none",
    }}
    
    >

    {
        address.address_type === "HOM" ? 
        <Home />
        :
        address.address_type === "OFI" ?
        <Building />
        :
        <MdOutlineLocationOn className="size-8"/>
    }

    <div className="flex-1">
        <p
        className="font-semibold"
        >
            {
                address.address_type === "HOM" ? "HOME"
                :
                address.address_type === "OFI" ? "OFFICE"
                : "OTHER"
            }
        </p>

        <p className="text-[12px] text-neutral-400 font-medium">
            {addressConcatenator(address)}
        </p>


        <p className="text-[14px] text-black font-medium my-3">
            {time}
        </p>


        <Button 
        {...buttonProps}
        className="rounded-none"
        disabled={isSelected}
        >
            {isSelected ? "SELECTED" : "DELIVER HERE"}
        </Button>
    </div>


    </div>
  )
}

export default SingleAddress