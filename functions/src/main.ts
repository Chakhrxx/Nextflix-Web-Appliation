import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions/v1';

// Create an Express instance
const server = express();

// Determine if running on Firebase Cloud Functions
const isRunningInCloud = !!process.env.FUNCTION_NAME;

async function bootstrap() {
  // Initialize Nest application with Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS for all origins (you can restrict this in production)
  app.enableCors({ origin: true });

  await app.init();

  // Only start local HTTP server if not running inside Firebase
  if (!isRunningInCloud) {
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log(`NestJS (Local Dev) running at http://localhost:${port}`);
    });
  }
}

// Bootstrap the Nest application
const nestAppReady = bootstrap();

// Export Firebase Cloud Function (Gen1) with specified region
export const api = functions
  .region('asia-southeast1')
  .https.onRequest(async (req, res) => {
    await nestAppReady;
    return server(req, res);
  });
