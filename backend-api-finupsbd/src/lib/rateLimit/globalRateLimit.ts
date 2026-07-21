import rateLimit from 'express-rate-limit';

// Rate limiting: Allow 100 requests per 15 minutes from a single IP
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
