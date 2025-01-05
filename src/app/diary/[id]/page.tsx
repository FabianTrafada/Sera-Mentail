'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditDiaryPage() {
  const router = useRouter();
  const { id } = useParams(); // Mendapatkan ID diary dari URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data diary berdasarkan ID
    async function fetchDiary() {
      try {
        const response = await fetch(`/api/diary?id=${id}`);
        const data = await response.json();

        if (response.ok) {
          setTitle(data.title);
          setContent(data.content);
        } else {
          console.error(data.error);
          router.push('/diary'); // Redirect jika diary tidak ditemukan
        }
      } catch (error) {
        console.error('Failed to fetch diary:', error);
      }
    }

    fetchDiary();
  }, [id, router]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/diary', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, content }),
      });

      if (response.ok) {
        router.push('/diary'); // Redirect ke halaman list diary
      } else {
        const data = await response.json();
        console.error('Failed to update diary:', data.error);
      }
    } catch (error) {
      console.error('Failed to update diary:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Diary</h1>
      <form onSubmit={handleUpdate} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}
