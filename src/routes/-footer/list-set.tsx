import { H4 } from "@/components/ui/typography"
import { Link } from "@tanstack/react-router"
import type { ComponentProps } from "react";


type TargetLink = string;

export type ContentListType = {
  content: string,
  target: TargetLink,
}

export interface ListSetProps{
  title: string,
  contentList: ContentListType[],
}

function ListSet({
  title,
  contentList,
  ...props
}: ListSetProps & ComponentProps<"div">) {

  return (
    <div className="flex flex-col gap-5"
    {...props}
    >
        
        <H4>{title}</H4>

        {
          contentList.map((content, index) => (
            <Link 
            key={index}
            target="_blank"
            to={content.target}
            className="text-gray-500 cursor-pointer"
            >{content.content}</Link>
          ))
        }
    </div>
  )
}

export default ListSet