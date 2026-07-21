import rateLimit from 'express-rate-limit';

export const eligiblityRateLimit = rateLimit({
  windowMs: 60 * 1000, /// 1 minits
  max: 2, //limit eatch ip requite in per minits
  message: {
    success: false,
    message: 'Too many requests. Please wait a minute and try again.',
  },
  statusCode: 429, // Too Many Requests
});
