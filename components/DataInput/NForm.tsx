'use client'

import type { FC, ReactNode } from 'react'

interface NFormItemProps { name: string; children: ReactNode }

export const NFormItem: FC<NFormItemProps> = ({ name, children }) => {
  // React.Children.map(children, (child) => {
  //   if (React.isValidElement(child))
  //     return React.cloneElement(child, { })
  // })

  return (
    <div className='flex gap-2 items-center max-sm:flex-col max-sm:items-start'>
      <div className='w-48'><label htmlFor={name}>{name}:</label></div>
      <div className='flex-1 flex min-w-0 w-full'>
        {children}
      </div>
    </div>
  )
}
