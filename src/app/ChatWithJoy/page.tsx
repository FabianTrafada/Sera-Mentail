import Navbar from '@/components/Navbar'
import TextArea from '@/components/TextArea'
import React from 'react'

const page = () => {
  return (
    <div className='flex h-screen'>
      <Navbar mode='sidebar'/>
      <div className="ml-64 flex flex-col gap-5 p-4 w-full">
        <div className="flex-grow"> {/* Kontainer utama untuk konten lainnya */}
          <h2 className='text-4xl font-bold mt-5'>Chat With Joy</h2>
        </div>
        <div> 
          <TextArea />
        </div>
      </div>
    </div>
  )
}

export default page
