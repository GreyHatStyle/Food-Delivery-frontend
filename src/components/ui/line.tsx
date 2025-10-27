
interface LineProps{
    lineColor?: "grey" | "lightgray" | "black" | "blue" | "green",
    heightPx?: number,
}

function Line({
    lineColor,
    heightPx
}: LineProps) {
  return (
    <div 
    style={{
        backgroundColor: lineColor || "lightgray",
        height: heightPx ? `${heightPx}px` : '1px',
    }}
    ></div>
  )
}

export default Line