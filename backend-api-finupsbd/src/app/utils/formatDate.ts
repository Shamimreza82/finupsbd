function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export interface FormatOptions {
  /** BCP 47 locale, e.g. 'en-US', 'en-GB', 'bn-BD' */
  locale?: string;
  /** IANA time zone, e.g. 'Asia/Dhaka'. If omitted and useUTC=false, uses system local. */
  timeZone?: string;
  /** If true, overrides timeZone and uses UTC for everything. */
  useUTC?: boolean;
}

/**
 * Format a date according to a pattern.
 *
 * Tokens:
 * - YYYY, YY
 * - MMMM, MMM
 * - MM, M
 * - DD, D
 * - dddd, ddd
 * - HH, H    (24h)
 * - hh, h    (12h)
 * - mm, m
 * - ss, s
 * - A, a     (AM/PM)
 *
 * @param date    Date | timestamp | ISO string
 * @param fmt     format string, e.g. 'YYYY-MM-DD HH:mm:ss'
 * @param opts    formatting options
 */
export function formatDate(
  date: Date | string | number | null,
  fmt: string = 'YYYY-MM-DD HH:mm:ss',
  opts: FormatOptions = {},
): string {
  if (date === null) {
    throw new Error('Invalid date: null');
  }
  const dt = date instanceof Date ? date : new Date(date);
  const locale = opts.locale ?? 'en-US';
  // choose zone: UTC if useUTC, else user-specified, else system
  const tz = opts.useUTC ? 'UTC' : opts.timeZone;

  // build a base DateTimeFormat for numeric parts + weekday
  const baseFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
  });
  const parts = baseFormatter.formatToParts(dt);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      // types: year, month, day, hour, minute, second, weekday
      partMap[p.type] = p.value;
    }
  }

  // also get localized names
  const longMonth = new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    month: 'long',
  }).format(dt);
  const shortMonth = new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    month: 'short',
  }).format(dt);
  const longWeekday = new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    weekday: 'long',
  }).format(dt);
  const shortWeekday = new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    weekday: 'short',
  }).format(dt);

  // numeric values as numbers
  const H = Number(partMap.hour);
  const m12 = H % 12 || 12;

  const tokens: Record<string, string> = {
    YYYY: partMap.year,
    YY: partMap.year.slice(-2),

    MMMM: longMonth,
    MMM: shortMonth,

    MM: partMap.month,
    M: String(Number(partMap.month)),

    DD: partMap.day,
    D: String(Number(partMap.day)),

    dddd: longWeekday,
    ddd: shortWeekday,

    HH: pad2(H),
    H: String(H),

    hh: pad2(m12),
    h: String(m12),

    mm: partMap.minute,
    m: String(Number(partMap.minute)),

    ss: partMap.second,
    s: String(Number(partMap.second)),

    A: H >= 12 ? 'PM' : 'AM',
    a: H >= 12 ? 'pm' : 'am',
  };

  // build a regex that matches any token
  const pattern = new RegExp(Object.keys(tokens).join('|'), 'g');
  return fmt.replace(pattern, (match) => tokens[match]);
}

// // basic local
// console.log(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'));
// // => e.g. "2025-05-18 21:45:07"

// // custom pattern, 12h clock, AM/PM
// console.log(
//   formatDate(new Date(), 'ddd, MMM D, YYYY h:mm A', { locale: 'en-GB' })
// );
// // => e.g. "Sun, May 18, 2025 9:45 PM"

// // forced UTC
// console.log(
//   formatDate('2025-05-18T15:00:00Z', 'YYYY/MM/DD HH:mm:ss [UTC]', { useUTC: true })
// );
// // => "2025/05/18 15:00:00 UTC"

// // IANA timezone
// console.log(
//   formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Dhaka' })
// );
// // => Dhaka-local wall-clock time
