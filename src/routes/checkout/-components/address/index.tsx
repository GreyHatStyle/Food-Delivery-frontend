import { H3 } from "@/components/ui/typography";
import { useGetAddressQuery } from "./user-address-query"
import SingleAddress from "./single-address-type";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import "./address.css"
import { Button } from "@/components/ui/button";
import { useUserAddressStore } from "@/store/user-address-store";



function Address() {
  const {data} = useGetAddressQuery();

  // removed the useState() using zustand instead (for payment page to access the address too)
  // It will find the previously selected address by user in local storage.
  // And it uses direct database id of server, so there is no chance of ambiguous address selection in different users. 
  const {addressIndex, setAddressId} = useUserAddressStore(state => state);
  
  return (
    <div className="bg-white p-6 flex flex-col gap-5">
      <H3>Choose a Delivery Address</H3>

      <div className="address-list-grid">

        {
          data?.results.map((address, index) => (
            <SingleAddress 
            isNoneSelected={addressIndex === null}
            time={"15 mins"}
            key={`${address.pin_code}-${index}`}
            address={address}
            isSelected={addressIndex === address.id}
            buttonProps={{
              onClick: () => {
                setAddressId(address.id);
              }
            }}
            />
          ))
        }


        <div className="border flex flex-row  gap-3 m-2 p-6 cursor-pointer hover:shadow-md transition-all duration-300"
        style={{
          display: (addressIndex !== null) ? "none" : "flex",
        }}
        
        >
            <MdOutlineAddLocationAlt className="size-8"/>
            <div >
            <p className="font-semibold">ADD NEW ADDRESS</p>
            <p className="text-[12px] text-neutral-400 font-medium">
              Click below to add new address, (this feature won't work for now)
            </p>

              <p className="my-11"></p>
              <Button
              variant={"outline"}
              className="rounded-none"
              >ADD NEW</Button>
            </div>
        </div>
       
      </div>

      {addressIndex !== null && (
        <Button 
        variant="outline"
        className="rounded-md mx-2"
        onClick={() => {
          setAddressId(null);
        }
        
        } 
          >
            Change Address
          </Button>
        )}
    </div>
  )
}

export default Address