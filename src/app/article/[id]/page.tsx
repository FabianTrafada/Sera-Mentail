"use client";

import { useParams } from "next/navigation";
import { articles } from "../../../data/articles";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const ArticlePage = () => {
  const { id } = useParams(); // Mengambil parameter ID dari URL

  // Optional: You can add a loading state if fetching data asynchronously
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(false);
    }
  }, [id]);

  if (!id || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    ); // Handle saat ID belum tersedia atau loading
  }

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar mode="navbar" />
      </div>
      <div className="pt-20 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={800}
            className="mb-4 rounded-lg shadow-md"
          />
          <p className="text-lg leading-relaxed">{article.content}</p>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="sticky top-20">
            <h2 className="text-2xl font-bold mb-4">Other Articles</h2>
            {articles
              .filter((otherArticle) => otherArticle.id !== article.id)
              .slice(0, 2) /* Limit to 2 articles */
              .map((otherArticle) => (
                <Card key={otherArticle.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-5">
                  <CardHeader className="p-0">
                    <Image
                      src={otherArticle.image}
                      alt={otherArticle.title}
                      width={500}
                      height={300}
                      className="w-full h-52 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {otherArticle.title}
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link href={`/article/${otherArticle.id}`} className="text-blue-500 font-semibold">
                      Read More →
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;