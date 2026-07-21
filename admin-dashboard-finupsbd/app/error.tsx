"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      {/* Icon */}
      <div className="p-4 bg-red-100 rounded-full">
        <AlertTriangle className="h-12 w-12 text-red-600 animate-pulse" />
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800">
        Oops! Something went wrong
      </h2>

      {/* Error message */}
      <p className="mt-2 text-sm text-gray-500 max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>

      {/* Retry button */}
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2.5 bg-black text-white font-medium rounded-lg shadow hover:bg-gray-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}
