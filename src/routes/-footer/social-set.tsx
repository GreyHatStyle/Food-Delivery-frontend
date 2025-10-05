import { Link } from '@tanstack/react-router'
import React from 'react'


export interface SocialSetProps{
    key?: number,
    target: string,
    children: React.ReactNode
}

function SocialSet({
    key,
    target,
    children: child,
}: SocialSetProps) {

  return (
    <Link 
    className='bg-white h-9 w-9 rounded-full flex items-center justify-center 
    hover:bg-web-theme-green hover:text-white hover:cursor-pointer'
    key={key}
    to={target}>

      {child}
      
    </Link>

  )
}

export default SocialSet