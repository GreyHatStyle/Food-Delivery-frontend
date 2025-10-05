import FooterLeft from "./footer-left"
import type { ListSetProps } from "./list-set"
import ListSet from "./list-set"

const footerLeftLists: ListSetProps[] = [
  {
    title: "Company",
    contentList: [
      {
        content: "About Us",
        target: "/"
      },
      {
        content: "Careers",
        target: "/"
      },
      {
        content: "Team",
        target: "/"
      },
      {
        content: "Zomiggy News",
        target: "/"
      },
    ]
  },
  {
    title: "Legal",
    contentList: [
      {
        content: "Terms & Conditions",
        target: "/"
      },
      {
        content: "Privacy Policy",
        target: "/"
      },
      {
        content: "Cookie Policy",
        target: "/"
      },
    ]
  },
  {
    title: "Support",
    contentList: [
      {
        content: "Account",
        target: "/"
      },
      {
        content: "Support Center",
        target: "/"
      },
      {
        content: "Feedback",
        target: "/"
      },
      {
        content: "Accessibility",
        target: "/"
      },
    ]
  },
  {
    title: "Get In Touch",
    contentList: [
      {
        content: "portfolio",
        target: "https://manas-bisht-114.vercel.app/"
      },
      {
        content: "Dehradun, India",
        target: "/"
      },
    ]
  },
  
]

function Footer() {
  return (
    <footer className="bg-[#E7E8DE] p-[5rem] rounded-t-4xl flex flex-row gap-14 flex-wrap">
      
      <FooterLeft/>

      <div className="flex flex-col gap-20 sm:flex-row">

        {
          footerLeftLists.map((content, index) => (
            
            <ListSet 
            key={index}
            title={content.title}
            contentList={content.contentList}
            />


          ))
        }

      </div>


    </footer>
  )
}

export default Footer