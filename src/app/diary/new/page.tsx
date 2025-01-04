'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewDiary = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save diary: ${response.statusText}`);
      }

      const newDiary = await response.json();
      console.log('Diary created:', newDiary);
      router.push('/diary');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex">
      <Navbar mode="sidebar" />
      <div className="ml-60 flex flex-col gap-5 p-4 w-full">
        <h2 className="text-black text-4xl font-semibold mt-5">Add New Diary</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Diary Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Diary Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            rows={5}
            required
          />
          <Button type="submit" className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded">
            Save Diary
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewDiary;
