import Dashboard from '@/components/Dashboard'
import Navbar from '@/components/Navbar'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const user = await currentUser();
  return (
    <div className="flex flex-col md:flex-row">
    {/* Navbar */}
    <Navbar mode="sidebar"/>
    {/* Main Content */}
    <div className="md:ml-64 flex flex-col gap-5 p-4 w-full">
      <h2 className="text-black text-3xl md:text-4xl font-semibold mt-5">
        Dashboard
      </h2>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800">
        Hello, {user?.firstName} {user?.lastName}
      </h3>
      <Dashboard />
    </div>
  </div>
  )
}

export default page
