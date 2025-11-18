import Line from "@/components/ui/line"




interface BillDetailsProps{
    data: {
        [key: string] : number,
    } | undefined,
    items_total: number | undefined,
}

function BillDetails({
    data,
    items_total,
}: BillDetailsProps) {
    
    const new_data = {
        item_total: items_total, 
        ...data,
    }
    // console.log("Service Data result: ", data);

  return (
    <>
    { data &&
        Object.entries(new_data).map( ([serviceName, servicePrice], index) => (
            <>
            <div 
            key={`${serviceName}_${index}`}
            className="inline-flex justify-between w-full">
                {/* Formatting the key coming from python to a Displayable format */}
                <p>{serviceName.charAt(0).toUpperCase() + serviceName.slice(1).replace("_", " ")}: </p> 

                <p>&#8377;{servicePrice}</p>
            </div>

            <Line className="my-2"/>
            </>
        ))
    }

    </>
  )
}

export default BillDetails