"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-12">
      <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-4" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;
