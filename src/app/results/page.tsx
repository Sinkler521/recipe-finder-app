"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useResultsFound } from "@/hooks/resultsContext";

export default function Results() {
  const router = useRouter();
  const { results } = useResultsFound();

  useEffect(() => {
    if (!results || results.length === 0) {
      router.push('/');
    }
  }, [results, router]);

  if (!results || results.length === 0) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-200">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
      <div className="w-1/2 max-h-[80vh] overflow-auto space-y-4">
        {results.map((result: { id: number; title: string; image: string; imageType: string }) => (
          <div
            key={result.id}
            className="bg-gray-900 rounded-lg shadow-md p-4 flex items-center cursor-pointer hover:bg-gray-700 transition"
            onClick={() => router.push(`/recipes/${result.id}`)}
          >
            <img
              src={result.image}
              alt={result.title}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="text-gray-200">
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p className="text-sm text-gray-400">ID: {result.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
