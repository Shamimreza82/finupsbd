"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface NoDataFoundProps {
  title?: string;
  reason?: string; // 👈 explain why data not found
  suggestion?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function NoDataFound({
  title = "No Data Found",
  reason = "The requested data could not be located.",
  suggestion = "Try refreshing, checking filters, or adding new data.",
  actionLabel = "Go Back",
  onAction,
}: NoDataFoundProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-slate-100 border border-slate-300 shadow-md rounded-2xl">
          <CardContent className="flex flex-col items-center p-8 text-center text-slate-800">
            <AlertTriangle className="w-14 h-14 text-amber-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>

            {/* reason */}
            <p className="text-slate-600 mb-1">
              <strong>Reason:</strong> {reason}
            </p>

            {/* suggestion */}
            <p className="text-slate-500 text-sm mb-6">{suggestion}</p>

            <Button
              onClick={onAction || (() => router.back())}
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              {actionLabel}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
