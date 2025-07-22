import { Footer } from '@/components/footer'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl items-start mx-auto">
      <div className="flex-grow mt-20 md:mt-20 p-3 md:p-5">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
