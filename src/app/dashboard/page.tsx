import Dashboard from '@/components/Dashboard'
import Navbar from '@/components/Navbar'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const user = await currentUser();
  return (
    <div className='flex'>
      <Navbar mode='sidebar' />
      <div className='ml-60 flex flex-col gap-5 p-4 w-full'>
        <h2 className='text-black text-4xl font-semibold mt-5'>Dashboard</h2>
        <h3 className='text-xl font-semibold text-gray-800'>Hello, {user?.firstName} {user?.lastName}</h3> 
        <Dashboard />
      </div>
    </div>
  )
}

export default page
