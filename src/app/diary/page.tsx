import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
    <Navbar mode="sidebar" />
    <div className="ml-60 flex flex-col gap-5 p-4  w-full">
    <h2 className='text-black text-4xl font-semibold'>Your diary</h2>
      <Card className=''>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Bebek Goreng Hj Slamet</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Kapal Karam</p>
          <small className="text-gray-500">Additional Info</small>
        </CardContent>
      </Card>
      <Card className=''>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Kapal Lawud</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Card Content</p>
          <small className="text-gray-500">Additional Info</small>
        </CardContent>
      </Card>
    </div>
    
  </div>
  )
}

export default page
