import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <Navbar mode='sidebar' />
      <div className='ml-60 flex flex-col gap-5 p-4 w-full'>
        <h2 className='text-black text-4xl font-semibold'>Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='w-full h-48 flex flex-col justify-between bg-primaryColor'>
            <CardHeader>
              <CardTitle>
              <h2 className='text-xl font-bold text-white'>Your Diary</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className='text-slate-200 text-6xl font-semibold mb-2'>10</h2>
              <small className='text-slate-200'>More Info</small>
            </CardContent>
          </Card>
          <Card className='w-full h-48 flex flex-col justify-between'>
            <CardHeader>
              <CardTitle>
              <h2 className='text-xl font-bold text-black'>Your Mental health</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
            <h2 className='text-black text-6xl font-semibold mb-2'>40%</h2>
            <small className='text-gray-400'>More Info</small>
            </CardContent>
          </Card>
          {/* Additional Cards */}
          <Card className='w-full h-48 flex flex-col justify-between'>
            <CardHeader>
              <CardTitle>
              <h2 className='text-xl font-bold text-black'>Your Activity</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
            <h2 className='text-black text-5xl font-semibold mb-2'>12 Activity</h2>
            <small className='text-gray-400'>More Info</small>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default page
