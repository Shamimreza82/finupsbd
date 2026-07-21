import { Server } from 'http';
import app from './app';
import { ConfigFile } from './config';
import { logger } from './app/utils/logger/logger';

let server: Server;

function main() {
  server = app.listen(ConfigFile.PORT, () => {
    logger.info(`🚀 Server is running on port ${ConfigFile.PORT}`);
  });

  server.on('error', (error) => {
    logger.error('Server startup error', error);
    process.exit(1);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shutdown = (reason: string, details: any) => {
  logger.warn(`${reason}! Shutting down the server...`);
  if (details) {
    logger.error('Details:', details);
  }

  if (server) {
    server.close(() => {
      logger.info('Server closed. Exiting process.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  shutdown('Unhandled Promise Rejection', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
  shutdown('Uncaught Exception', err);
});
