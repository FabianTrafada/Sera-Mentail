"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // State for search term
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch(`/api/diary?search=${search}&page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch diaries");

        const data = await res.json();
        setDiaries(data.diaries);
        setTotalPages(data.totalPages); // Set total pages from response
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, [search, page]); // Trigger fetch when search or page changes

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (

    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-64 w-full h-auto" >
      <Navbar mode="sidebar"/>
      </div>
      <div className="flex flex-col gap-5 p-4 flex-grow">
        <div className="items-center mt-5">
          <h2 className="text-black text-2xl lg:text-4xl font-semibold">
            Your diary
          </h2>
          <div className="flex flex-col lg:flex-row justify-between gap-3 mt-5">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search diaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded w-full lg:w-72"
            />
            {/* Button to go to Add Diary page */}
            <Link href="/diary/new">
              <Button className="bg-primaryColor text-white hover:bg-blue-600 px-4 py-2 rounded w-full lg:w-auto">
                Add Diary
              </Button>
            </Link>
          </div>
        </div>

        {/* Display diaries */}
        {diaries.map((diary: any) => (
          <Link key={diary.id} href={`/diary/${diary.id}`}>
            <Card className="cursor-pointer hover:transition hover:shadow-lg">
              <CardHeader>
                <CardTitle>
                  <h2 className="text-xl font-bold">{diary.title}</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{diary.content}</p>
                <small className="text-gray-500">
                  {new Date(diary.updatedAt).toLocaleDateString()}
                </small>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Pagination controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="p-2 border rounded w-full sm:w-auto"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="p-2 border rounded w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diary;
