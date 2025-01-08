'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { BadgeCheck } from 'lucide-react';

export default function EditDiaryPage() {
  const router = useRouter();
  const { id } = useParams(); // Mendapatkan ID diary dari URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState(''); // For storing analysis result
  const [analyzing, setAnalyzing] = useState(false); // For tracking analyze process
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setDeleting(true);

    try {
      const response = await fetch('/api/diary', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        router.push('/diary');
        toast.success('Diary created successfully!', {
          icon: <BadgeCheck />,
          className: 'bg-red-500  text-white',
        })

        
      } else {
        const data = await response.json();
        console.error('Failed to delete diary:', data.error);
      }
    } catch (error) {
      console.error('Failed to delete diary:', error);
    } finally {
      setDeleting(false);
    }
  }

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

  async function handleAnalyze() {
    setAnalyzing(true);
    setAnalysis(''); // Clear previous analysis
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.reply || 'No analysis result found.'); // Assuming `result` contains the analysis
      } else {
        const error = await response.json();
        toast.error(`Error analyzing content: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to analyze content:', error);
      toast.error('An error occurred while analyzing content.');
    } finally {
      setAnalyzing(false);
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500  text-white rounded disabled:opacity-50"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            disabled={analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {analysis && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-bold">Analysis Result</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}
