import Navbar from '@/components/Navbar'
import TextArea from '@/components/TextArea'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
    <div className="lg:w-64 lg:h-full h-auto w-full">
      <Navbar mode="sidebar" />
    </div>

    <div className="flex flex-col gap-5 p-4 flex-grow">
      <div className="flex-grow"> 
        <h2 className="text-2xl lg:text-4xl font-bold mt-5">Chat With Joy</h2>
      </div>
      
      <div>
        <TextArea />
      </div>
    </div>
  </div>
  )
}

export default page
