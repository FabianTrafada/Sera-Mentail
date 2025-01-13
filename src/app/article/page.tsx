import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Link from "next/link";
import { articles } from "../../data/articles";
import Image from 'next/image';

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    {/* Navbar */}
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <Navbar mode="navbar" />
    </div>

    {/* Main Content */}
    <div className="pt-20"> {/* Tambahkan padding top untuk menghindari overlap */}
      {/* Header */}
      <div className="py-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Articles</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 lg:px-24 py-8">
        {articles.map((article) => (
          <Card key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="p-0">
              <img
                src={article.image}
                alt={article.title}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {article.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-2">
                {article.content}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4">
              <Link href={`/article/${article.id}`} className="text-blue-500 font-semibold">
                Read More →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </div>
  )
}

export default page;
