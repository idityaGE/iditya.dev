import React from 'react'
import { SeeAllBlogs } from "@/components/blog/see-all-blogs";

const MDXLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="w-full mx-auto max-w-3xl mt-20 px-3.5 md:px-0">
      {children}
      <div className='flex justify-center mt-8 mb-16 md:mb-32 '>
        <SeeAllBlogs />
      </div>
    </div>
  )
}

export default MDXLayout
