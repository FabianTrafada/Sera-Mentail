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

    <div className="flex flex-col lg:flex-row h-screen ">
  {/* Sidebar/Navbar */}
  <div className="lg:w-64 w-full h-auto bg-gray-100">
    <Navbar mode="sidebar" />
  </div>

  {/* Main Content */}
  <div className="flex flex-col gap-5 p-4 flex-grow">
    {/* Header */}
    <div className="items-center mt-5">
      <h2 className="text-black text-2xl lg:text-4xl font-semibold">
        Your Diary
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-3 mt-5">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search diaries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full lg:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Add Diary Button */}
        <Link href="/diary/new">
          <Button className="bg-primaryColor text-white hover:bg-blue-600 px-4 py-2 rounded w-full lg:w-auto">
            Add Diary
          </Button>
        </Link>
      </div>
    </div>

    {/* Diaries Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {diaries.map((diary: any) => (
        <Link key={diary.id} href={`/diary/${diary.id}`}>
          <Card className="cursor-pointer hover:transition hover:shadow-lg">
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg lg:text-xl font-bold">{diary.title}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 truncate">{diary.content}</p>
              <small className="text-gray-500">
                {new Date(diary.createdAt).toLocaleDateString()}
              </small>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>

    {/* Pagination Controls */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className={`p-2 border rounded w-full sm:w-auto ${
          page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
      >
        Previous
      </button>
      <span className="text-center">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className={`p-2 border rounded w-full sm:w-auto ${
          page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  </div>
</div>

  );
};

export default Diary;
