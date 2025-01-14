'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { BadgeCheck, FileX } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function EditDiaryPage() {
  const router = useRouter();
  const { id } = useParams(); // Mendapatkan ID diary dari URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState(''); // For storing analysis result
  const [analyzing, setAnalyzing] = useState(false); // For tracking analyze process
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [typingDots, setTypingDots] = useState(''); // Typing animation

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;

    if (analyzing) {
      dotsInterval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500); // Updates the dots every 500ms
    } else {
      setTypingDots('');
    }

    return () => {
      clearInterval(dotsInterval);
    };
  }, [analyzing]);

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
        toast.success('Diary successfully deleted!', {
          icon: <FileX/>,
          className: 'bg-red-500 text-white',
        });
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
        router.push('/diary'); 
        toast.success('diary successfully Updated!', {
          icon: <BadgeCheck />,
          className: 'bg-green-500 text-white',
        })// Redirect ke halaman list diary
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
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-gray-200 shadow-md">
      <Navbar mode="sidebar" />
    </div>
  
    {/* Konten Utama */}
    <div className="flex-1 mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Diary</h1>
      <form onSubmit={handleUpdate}>
        {/* Title Input */}
        <div className="mb-5 flex flex-col gap-4">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your diary title"
            required
          />
  
          <textarea
            id="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your diary content"
            required
          />
        </div>
  
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded-lg disabled:opacity-50"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-primaryColor text-white font-medium rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
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
  
        {/* Analysis Result */}
        <div className="mt-6">
          {analyzing ? (
            <div className="w-full p-4 bg-gray-300 shadow-md rounded-lg">
              <h2 className="text-lg font-bold">Analysis Result</h2>
              <p className="text-gray-700">Analyzing{typingDots}</p>
            </div>
          ) : (
            analysis && (
              <div className="w-full p-4 bg-gray-300 shadow-md rounded-lg">
                <h2 className="text-2xl text-primaryColor font-bold">Analysis Result</h2>
                <p>{analysis}</p>
              </div>
            )
          )}
        </div>
      </form>
    </div>
  </div>
  
  );
}
