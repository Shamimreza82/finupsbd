// utils/date.ts
const parseDateFromSearch = (raw?: string) => {
  if (!raw) return null;

  const term = raw.trim();
  // Accepts: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  const dmySlash = /^\d{2}\/\d{2}\/\d{4}$/;
  const dmyDash = /^\d{2}-\d{2}-\d{4}$/;

  let d: Date | null = null;

  if (iso.test(term))
    d = new Date(term); // YYYY-MM-DD
  else if (dmySlash.test(term)) {
    const [dd, mm, yyyy] = term.split('/').map(Number);
    d = new Date(yyyy, mm - 1, dd);
  } else if (dmyDash.test(term)) {
    const [dd, mm, yyyy] = term.split('-').map(Number);
    d = new Date(yyyy, mm - 1, dd);
  } else {
    // Try loose parse (works for many formats like "Aug 21 2025")
    const tryDate = new Date(term);
    if (!isNaN(tryDate.getTime())) d = tryDate;
  }

  if (!d || isNaN(d.getTime())) return null;

  const start = new Date(d);
  start.setHours(0, 0, 0, 0);

  const end = new Date(d);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};
