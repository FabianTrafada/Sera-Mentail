import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Link from "next/link";
import { articles } from "../../data/articles";

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
        {/* Render cards dynamically */}
        {articles.map((article) => (
          <div key={article.id}> {/* Tambahkan key unik di sini */}
            <Card className="max-w-md bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {article.title} 
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {article.content} 
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">
                  {article.content}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/article/${article.id}`} className="text-blue-500 font-semibold cursor-pointer">
                  Read More →
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page;
