import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Link from "next/link";

const page = () => {

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <Navbar mode="navbar" />
      
        {/* Header */}
        <div className="py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Articles</h1>
          <p className="text-gray-600">Discover insights and stories from our team.</p>
        </div>
      
        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-6 px-6 md:px-12 lg:px-20">
          {/* Card 1 */}
          <Card className="max-w-md bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                The Future of Technology
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Exploring innovations shaping tomorrow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Technology is evolving rapidly, bringing new opportunities and
                challenges. Learn about the trends that will define our future.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-blue-500 font-semibold cursor-pointer">
                Read More →
              </p>
            </CardFooter>
          </Card>
      
          {/* Card 2 */}
          <Card className="max-w-md bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Sustainable Living
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Tips and ideas for a greener lifestyle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">
                Embrace sustainability with practical tips for reducing waste, saving
                energy, and living a more eco-friendly life.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-blue-500 font-semibold cursor-pointer">
                Read More →
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
    )
}

export default page
