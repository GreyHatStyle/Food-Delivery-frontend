import { H3 } from "@/components/ui/typography";
import { useGetAddressQuery } from "./user-address-query"
import SingleAddress from "./single-address-type";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import "./address.css"
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const selectedAddressLocalKey = 'selected-address';

function Address() {
  const {data} = useGetAddressQuery();
  
  const [selectedAddressID, setSelectedAddressID] = useState<number | null>(() => {
    
    // Used local storage directly because I don't want to create a whole Zustand just to stored address's id :)
    // It will find the previously selected address by user in local storage.
    // And it uses direct database id of server, so there is no chance of ambiguous address selection in different users. 
    const savedIndex = localStorage.getItem(selectedAddressLocalKey);

    return savedIndex ? parseInt(savedIndex) : null;
  });
  
  return (
    <div className="bg-white p-6 flex flex-col gap-5">
      <H3>Choose a Delivery Address</H3>

      <div className="address-list-grid">

        {
          data?.results.map((address, index) => (
            <SingleAddress 
            isNoneSelected={selectedAddressID === null}
            time={"15 mins"}
            key={`${address.pin_code}-${index}`}
            address={address}
            isSelected={selectedAddressID === address.id}
            buttonProps={{
              onClick: () => {
                setSelectedAddressID(address.id)
                localStorage.setItem(selectedAddressLocalKey, address.id.toString())
              }
            }}
            />
          ))
        }


        <div className="border flex flex-row  gap-3 m-2 p-6 cursor-pointer hover:shadow-md transition-all duration-300"
        style={{
          display: (selectedAddressID !== null) ? "none" : "flex",
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

      {selectedAddressID !== null && (
        <Button 
        variant="outline"
        className="rounded-md mx-2"
        onClick={() => {
          setSelectedAddressID(null);
          localStorage.removeItem(selectedAddressLocalKey);
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