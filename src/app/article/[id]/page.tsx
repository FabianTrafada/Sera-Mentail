"use client";

import { useParams, useRouter } from "next/navigation";
import { articles } from "../../../data/articles";
import Navbar from "@/components/Navbar";

const page = () => {
  const router = useRouter();
  const { id } = useParams(); // Mengambil parameter ID dari URL

  if (!id) {
    return <div>Loading...</div>; // Handle saat ID belum tersedia
  }

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <Navbar mode="navbar"/>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }} className="min-h-screen">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
    </div>
   
  );
};

export default page;
