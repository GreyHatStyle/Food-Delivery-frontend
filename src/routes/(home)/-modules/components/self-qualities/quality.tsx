import { H3 } from '@/components/ui/typography'
import React from 'react'

export interface QualityProps{
    key?: number,
    title: string,
    content: string,
    children: React.ReactNode,
}

function Quality({
    key,
    title,
    content,
    children,
}: QualityProps) {

  return (
    <div key={key} className='flex flex-col items-center p-[3rem] gap-2'>

        <div className='bg-web-theme-ylgn-light h-10 w-10 rounded-full flex justify-center items-center text-web-theme-green'>
            {children}
        </div>

        <H3>{title}</H3>

        <p className='text-center text-neutral-500'>{content}</p>
    </div>
  )
}

export default Quality