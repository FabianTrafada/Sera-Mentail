'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BadgeCheck } from 'lucide-react';

const NewDiary = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [analysis, setAnalysis] = useState(''); // For storing analysis result
  const [analyzing, setAnalyzing] = useState(false); // For tracking analyze process
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
    <div className="flex-1 w-screen h-screen mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Diary</h1>
      <form onSubmit={handleSubmit}>
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
          <Button type="submit" className="bg-primaryColor text-white hover:bg-purple-700 px-4 rounded">
            Save Diary
          </Button>

          <Button
            type="button"
            onClick={handleAnalyze}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            disabled={analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
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
    // <div className="flex flex-col items-center min-h-screen">
    //   <Navbar mode="sidebar" />
    //   <div className="flex flex-col items-center justify-center w-full p-4">
    //     <h2 className="text-black text-4xl font-semibold mt-5">Add New Diary</h2>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
    //       <input
    //         type="text"
    //         placeholder="Diary Title"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         className="p-3 border border-gray-300 rounded-xl w-full"
    //         required
    //       />
    //       <textarea
    //         placeholder="Diary Content"
    //         value={content}
    //         onChange={(e) => setContent(e.target.value)}
    //         className="p-3 border border-gray-300 rounded-xl w-full"
    //         rows={5}
    //         required
    //       />
    //       <Button type="submit" className="bg-primaryColor text-white hover:bg-purple-700 px-4 py-4 rounded">
    //         Save Diary
    //       </Button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default NewDiary;
