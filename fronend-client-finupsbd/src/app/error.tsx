// app/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string }; // Next.js errors sometimes have a digest
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error (could also send to monitoring service like Sentry)
    console.error("Unhandled exception:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      {/* Icon */}
      <div className="p-4 bg-red-100 rounded-full">
        <AlertTriangle className="h-12 w-12 text-red-600 animate-pulse" />
      </div>

      {/* Title */}
      <h1 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800">
        Something went wrong 😢
      </h1>

      {/* Error message */}
      <p className="mt-2 text-sm text-gray-500 max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>

      {/* Error digest (for debugging in dev/prod logs) */}
      {error?.digest && (
        <p className="mt-1 text-xs text-gray-400">Error ID: {error.digest}</p>
      )}

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
