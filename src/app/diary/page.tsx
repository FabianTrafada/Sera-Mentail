"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Jika Anda memiliki komponen ini
import Link from "next/link"; // Untuk navigasi antar halaman
import React, { useEffect, useState } from "react";

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch("/api/diary");
        if (!res.ok) throw new Error("Failed to fetch diaries");

        const data = await res.json();
        setDiaries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex">
      <Navbar mode="sidebar" />
      <div className="ml-60 flex flex-col gap-5 p-4 w-full">
        <div className="flex justify-between items-center mt-5">
          <h2 className="text-black text-4xl font-semibold">Your diary</h2>
          {/* Button untuk menuju halaman tambah diary */}
          <Link href="/diary/new">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
              Add Diary
            </Button>
          </Link>
        </div>
        {diaries.map((diary: any) => (
          <Card key={diary.id}>
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-bold">{diary.title}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{diary.content}</p>
              <small className="text-gray-500">{new Date(diary.createdAt).toLocaleDateString()}</small>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Diary;
