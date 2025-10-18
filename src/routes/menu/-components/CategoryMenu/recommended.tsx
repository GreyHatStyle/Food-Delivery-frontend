
import { H3 } from "@/components/ui/typography";
import RecommendedCard from "./recommended-card";


function Recommended() {

    const foodName = "Veg Burger";
    const price = 90;
    const foodType = "V"
    const imgUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/68db9320002150bd6130/files/1158b636-01f7-4fc0-936b-d9aedaa10455/view?project=68dad5db002a710b59a4";

  return (
    <div className="self-start bg-green-50">
        
        <H3
        className="my-11 font-bold"
        >Recommended</H3>


        <div id="recommended-list">

            <RecommendedCard 
            foodName={foodName}
            price={price}
            foodType={foodType}
            imgUrl={imgUrl}
            />


        </div>
        
    </div>
  )
}

export default Recommended