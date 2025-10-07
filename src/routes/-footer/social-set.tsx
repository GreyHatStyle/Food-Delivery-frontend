import { Link, type LinkComponent } from '@tanstack/react-router'
import React from 'react'


export interface SocialSetProps{
    target: string,
    children: React.ReactNode
}

function SocialSet({
    target,
    children: child,
    ...props
}: SocialSetProps & LinkComponent<"a", string>) {

  return (
    <Link 
    className='bg-white h-9 w-9 rounded-full flex items-center justify-center 
    hover:bg-web-theme-green hover:text-white hover:cursor-pointer'
    to={target}
    {...props}
    >

      {child}
      
    </Link>

  )
}

export default SocialSet