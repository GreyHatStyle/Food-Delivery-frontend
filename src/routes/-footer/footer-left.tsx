import { H3 } from "@/components/ui/typography"
import SocialSet, { type SocialSetProps } from "./social-set"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials: SocialSetProps[] = [
  {
    children: <FaFacebookF/>,
    target: "/"
  },
  {
    children: <FaInstagram/>,
    target: "/"
  },
  {
    children: <FaXTwitter/>,
    target: "/"
  },
  {
    children: <FaLinkedinIn/>,
    target: "https://www.linkedin.com/in/manasbisht/"
  }
];

function FooterLeft() {
  return (
    <div id="footer-right-side"
      className="flex flex-col gap-5 w-[30rem]"
      >
        <H3>
          Zomiggy
        </H3>

        <p className="text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius minima atque illum numquam amet?</p>

        <div className="inline-flex gap-2">

            {
              socials.map((card, index) => (
                
                <SocialSet key={index} target={card.target}>
                  {card.children}  
                </SocialSet>
              ))
            }

        </div>

      </div>
  )
}

export default FooterLeft