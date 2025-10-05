import { FastForward, Smartphone, Verified } from "lucide-react"
import type { QualityProps } from "./quality"
import Quality from "./quality"

const data: QualityProps[] = [
    {
        title: "Easy to Order",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, facilis! Id tempore cupiditate amet eum fugit",
        children: (
            <Smartphone/>
        )
    },
    {
        title: "Fastest Delivery",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, facilis! Id tempore cupiditate amet eum fugit",
        children: (
            <FastForward/>
        )
    },
    {
        title: "Best Quality",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, facilis! Id tempore cupiditate amet eum fugit",
        children: (
            <Verified/>
        )
    }
]

function SelfQualitySection() {
  return (
    <div className="flex flex-col md:flex-row">

        {
            data.map((card, index) => (
                <Quality key={index}
                title={card.title}
                content={card.content}
                children={card.children} 
                />
            ))
        }

    </div>
  )
}

export default SelfQualitySection