import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import path from 'path';
import { runCriticalChecks } from './lib/runCriticalChecks';
import { limiter } from './lib/rateLimit/globalRateLimit';
import { DocRouter } from './lib/api-doc/doc-route';
import { corsMiddleware } from './config/cors';

const app: Application = express();
export const prisma = new PrismaClient();

app.set("trust proxy", 1);
app.use(corsMiddleware);
app.options("*", corsMiddleware);
app.use(cookieParser());
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Note: Automatic seeding on every start is disabled.
runCriticalChecks();
seedSuperAdmin();

// Rate limiting: Allow 100 requests per 15 minutes from a single IP
app.use(limiter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/v1', RootRouter);



// Simple server health-check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

app.use('/', DocRouter);

// Middleware execution order corrected
app.use(notFound);
app.use(globalErrorHandler);

export default app;
