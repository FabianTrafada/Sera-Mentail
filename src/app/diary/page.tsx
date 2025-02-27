"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Define interfaces for type safety
interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  // Add other relevant fields if necessary
}

interface FetchDiariesResponse {
  diaries: DiaryEntry[];
  totalPages: number;
  // Include other response fields if present
}

const Diary: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(""); // State for search term
  const [page, setPage] = useState<number>(1); // State for current page
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages for pagination

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch(`/api/diary?search=${encodeURIComponent(search)}&page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch diaries");
  
        const data: FetchDiariesResponse = await res.json();
        setDiaries(data.diaries);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching diaries:", error);
        // Optionally, set an error state here to inform the user
      } finally {
        setLoading(false);
      }
    };
  
    fetchDiaries();
  }, [search, page]); // Trigger fetch when search or page changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-64 w-full h-auto">
        <Navbar mode="sidebar" />
      </div>
      <div className="flex flex-col gap-5 p-4 flex-grow">
        <div className="items-center mt-5">
          <h2 className="text-black text-2xl lg:text-4xl font-semibold">
            Your Diary
          </h2>
          <div className="flex flex-col lg:flex-row justify-between gap-3 mt-5">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search diaries..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to first page on new search
              }}
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
        <div className="flex flex-col gap-5 p-4 w-full">
          {diaries.length === 0 ? (
            <p className="text-center text-gray-500">No diaries found.</p>
          ) : (
            diaries.map((diary) => (
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
            ))
          )}
        </div>
  
        {/* Pagination controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prevPage) => prevPage - 1)}
            className="p-2 border rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="p-2 border rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diary;