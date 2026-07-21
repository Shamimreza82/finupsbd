'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-2xl font-semibold text-red-600">Something went wrong in Dashboard</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}
