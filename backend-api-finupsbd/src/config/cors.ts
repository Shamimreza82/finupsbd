import cors, { CorsOptions } from "cors";

/**
 * ✅ Exact allow-list (keep these tight)
 */
const allowedOrigins = new Set<string>([
  "https://finupsbd.com",
  "https://admin.finupsbd.com",
  "https://stage.finupsbd.com",
  "https://api.finupsbd.com",

  // Vercel deploys (exact)
  "https://finupsbd-fronend-developer.vercel.app",
  "https://finupsbd-admin-dashboard.vercel.app",

  // local dev
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
]);

/**
 * ✅ Optional: allow patterns (more production-friendly than “allow all vercel”)
 * Example:
 *  - finupsbd-<anything>.vercel.app
 *  - localhost any port
 */
const allowedOriginPatterns: RegExp[] = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  // If you have preview deploys:
  // /^https:\/\/finupsbd-.*\.vercel\.app$/,
];

function isOriginAllowed(origin?: string | null): boolean {
  if (!origin) return true; // Postman / server-to-server requests
  if (allowedOrigins.has(origin)) return true;
  return allowedOriginPatterns.some((re) => re.test(origin));
}

/**
 * ✅ Production-grade options
 */
export const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (isOriginAllowed(origin)) return cb(null, true);

    // Return "false" instead of throwing Error → cleaner and avoids noisy stack traces
    // Browser will treat it as blocked.
    return cb(null, false);
  },

  credentials: true,

  // Keep this explicit when you do cookies/auth
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  // Allow common headers; add your custom headers here
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Finups-Mode",
    "X-Api-Doc-Secret",
  ],

  // If you need client to read any extra headers
  exposedHeaders: ["set-cookie"],

  // Cache preflight response in browser (seconds)
  maxAge: 60 * 10, // 10 minutes

  // Preflight should return success quickly
  optionsSuccessStatus: 204,
};

export const corsMiddleware = cors(corsOptions);