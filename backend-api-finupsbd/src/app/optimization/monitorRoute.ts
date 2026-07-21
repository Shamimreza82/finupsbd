// monitor.ts
import { Request, Response, NextFunction } from 'express';

// holds counts per minute, e.g. { "2025-05-24T23:57": 42, … }
const perMinuteCounts: Record<string, number> = {};

// middleware to bump the counter
export function monitorAndCount(req: Request, res: Response, next: NextFunction) {
  const now = new Date();
  // YYYY-MM-DDTHH:MM  (drops seconds)
  const minuteKey = now.toISOString().slice(0, 16);
  perMinuteCounts[minuteKey] = (perMinuteCounts[minuteKey] || 0) + 1;
  next();
}

// every 60s, log last minute’s count and clean it up
setInterval(() => {
  // figure out last full minute
  const last = new Date(Date.now() - 60_000);
  const key = last.toISOString().slice(0, 16);
  const count = perMinuteCounts[key] || 0;
  // optional: free memory
  delete perMinuteCounts[key];
}, 60_000);
