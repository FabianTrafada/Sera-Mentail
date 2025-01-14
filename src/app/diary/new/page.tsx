'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BadgeCheck } from 'lucide-react';

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
      toast.success('Diary created successfully!', {
        icon: <BadgeCheck />,
        className: 'bg-emerald-300 text-white',
        
      })
      router.push('/diary');
    } catch (error) {
      toast.error('Failed to created diary. Please try again.')
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Navbar mode="sidebar" />
      <div className="flex flex-col items-center justify-center w-full p-4">
        <h2 className="text-black text-4xl font-semibold mt-5">Add New Diary</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
          <input
            type="text"
            placeholder="Diary Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl w-full"
            required
          />
          <textarea
            placeholder="Diary Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl w-full"
            rows={5}
            required
          />
          <Button type="submit" className="bg-primaryColor text-white hover:bg-purple-700 px-4 py-4 rounded">
            Save Diary
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewDiary;
