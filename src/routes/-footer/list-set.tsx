import { H4 } from "@/components/ui/typography"
import { Link } from "@tanstack/react-router"


type TargetLink = string;

export type ContentListType = {
  content: string,
  target: TargetLink,
}

export interface ListSetProps{
  key?: number,
  title: string,
  contentList: ContentListType[],
}

function ListSet({
  key,
  title,
  contentList,
}: ListSetProps) {

  return (
    <div className="flex flex-col gap-5"
    key={key}
    >
        
        <H4>{title}</H4>

        {
          contentList.map((content) => (
            <Link 
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