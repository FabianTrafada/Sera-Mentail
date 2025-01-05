'use client'

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryCount = async () => {
      try {
        const res = await fetch("/api/diary/count");
        if (!res.ok) throw new Error("Failed to fetch diary count");

        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryCount();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="w-full h-48 flex flex-col justify-between bg-primaryColor">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold text-white">Your Diary</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-slate-200 text-6xl font-semibold mb-2">{count}</h2>
          <small className="text-slate-200">More Info</small>
        </CardContent>
      </Card>
      <Card className="w-full h-48 flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold text-black">Your Mental health</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-black text-6xl font-semibold mb-2">40%</h2>
          <small className="text-gray-400">More Info</small>
        </CardContent>
      </Card>
      {/* Additional Cards */}
      <Card className="w-full h-48 flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold text-black">Your Activity</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-black text-5xl font-semibold mb-2">
            12 Activity
          </h2>
          <small className="text-gray-400">More Info</small>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
