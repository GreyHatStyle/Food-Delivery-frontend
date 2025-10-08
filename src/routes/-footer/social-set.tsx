import React, { type ComponentProps } from 'react'


export interface SocialSetProps{
    target: string,
    children: React.ReactNode
}

function SocialSet({
    target,
    children: child,
    ...props
}: SocialSetProps & ComponentProps<"a">) {

  return (
    <a
    href={target}
    className='bg-white h-9 w-9 rounded-full flex items-center justify-center 
    hover:bg-web-theme-green hover:text-white hover:cursor-pointer'
    {...props}
    >

      {child}
      
    </a>

  )
}

export default SocialSet