import { Button } from "@/components/ui/button";
import { H4 } from "@/components/ui/typography";
import { useCartQuery } from "@/routes/-navbar/cart-setup/cart-get-query";
import AddMenuButton from "@/routes/menu/-components/add-menu-button";
import { useCartItemQuery } from "@/routes/menu/-query/cart-item-query";
import { useCartStore } from "@/store/cart-store"
import { useCityStore } from "@/store/city-store";
import { useNavigate } from "@tanstack/react-router";
import { PercentSquare } from "lucide-react";
import BillDetails from "./bill-details";


function BillToPay() {
    const {restaurant_name, restaurant_image, items, restaurant_id} = useCartStore(state => state);
    const {city} = useCityStore(state => state);
    const {mutate} = useCartItemQuery(restaurant_id);
    const navigate = useNavigate();

    const {data} = useCartQuery();
    
    

  return (
    <div className="bg-white  m-4 p-4 flex flex-col gap-2">

        <div className="inline-flex items-center gap-2">
            <img src={restaurant_image || undefined} alt="restaurant image" 
            className="size-20 "
            />
            <div>
                <H4>{restaurant_name}</H4>
                <p>{city}</p>
            </div>
        </div>

        <Button variant={"link"} className="underline self-start"
        onClick={() => {
            navigate({
                to: `/menu/${restaurant_id}`,
            })
        }}
        >
            View Restaurant
        </Button>

        <div className="flex flex-col gap-4">

            {
                items.map((item, id) => (
                    <div 
                    key={id}
                    className="inline-flex gap-5 items-center"> 
                        <p className="text-sm flex-1">{item.item_data.name}</p>
                        
                        <AddMenuButton 
                        className="static"
                        items={items}
                        data={{
                            category: item.category_name,
                            item_uuid: item.item_data.item_uuid,
                            restaurant_id: restaurant_id,
                        }}
                        mutate={mutate}
                        />

                        <p>&#8377;{item.item_data.price}</p>

                    </div>
                ))
            }

        </div>

        <Button 
        variant={"outline"}
        className="rounded-none justify-start border-neutral-400 mt-5"
        >   
        <PercentSquare />
        Apply Coupon
        </Button>


        <div className="mt-4 p-3">
            <H4>Bill Details</H4>

            <BillDetails 
            items_total={data?.results?.total_price}
            data={data?.results?.service_charges}
            />
        </div>
        
        <H4
        className="px-3 inline-flex justify-between"
        >
        <p>TO PAY: </p>
        <p>&#8377;{data?.results?.to_pay}</p>
        </H4>
    </div>
  )
}

export default BillToPay