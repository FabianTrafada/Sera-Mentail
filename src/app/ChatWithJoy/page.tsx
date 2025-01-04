import Navbar from '@/components/Navbar'
import TextArea from '@/components/TextArea'
import React from 'react'

const page = () => {
  return (
    <div className='flex h-screen'>
      <Navbar mode='sidebar'/>
      <div className="ml-60 flex flex-col gap-5 p-4 w-full">
        <div className="flex-grow"> {/* Kontainer utama untuk konten lainnya */}
          <h2 className='text-4xl font-bold mt-5'>Chat With Joy</h2>
          {/* Tambahkan konten lainnya di sini */}
        </div>
        <div className='px-20'> 
          <TextArea />
        </div>
      </div>
    </div>
  )
}

export default page
