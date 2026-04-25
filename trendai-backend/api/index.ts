import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Logger, NestApplicationOptions } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('NestApp');

// Global app instance to avoid recreation on every request
let appInstance: any = null;
let isInitializing = false;
const initializationPromise: Promise<any> = new Promise((resolve, reject) => {
  const checkApp = setInterval(() => {
    if (appInstance) {
      clearInterval(checkApp);
      resolve(appInstance);
    }
  }, 100);
  
  setTimeout(() => {
    clearInterval(checkApp);
    reject(new Error('App initialization timeout'));
  }, 30000); // 30 second timeout
});

async function initializeApp() {
  if (appInstance) {
    return appInstance;
  }

  if (isInitializing) {
    return initializationPromise;
  }

  isInitializing = true;

  try {
    logger.log('Initializing NestJS application...');

    // Create NestJS app with minimal logging
    const nestOptions: NestApplicationOptions = {
      logger: process.env.NODE_ENV === 'development' ? ['log', 'error', 'warn'] : ['error'],
    };

    appInstance = await NestFactory.create(AppModule, nestOptions);

    // Enable CORS for all origins
    appInstance.enableCors({
      origin: '*',
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    });

    // Setup Swagger only in development
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('TrendAI API')
        .setDescription('Influencer Campaign Management Platform')
        .setVersion('1.0')
        .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        })
        .build();

      const document = SwaggerModule.createDocument(appInstance, config);
      SwaggerModule.setup('api', appInstance, document);
      logger.log('Swagger UI available at /api');
    }

    // Initialize the app
    await appInstance.init();

    logger.log('✅ NestJS application initialized successfully');
    isInitializing = false;
    return appInstance;
  } catch (error) {
    isInitializing = false;
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to initialize app: ${errorMessage}`, error instanceof Error ? error.stack : '');
    throw error;
  }
}

// Main Vercel handler
export default async function handler(req: any, res: any) {
  // Set timeout for the entire function
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      logger.error('Request timeout - no response sent');
      res.status(504).json({
        statusCode: 504,
        message: 'Gateway Timeout',
        error: 'Request took too long to process',
      });
    }
  }, 25000); // 25 second timeout (before Vercel's 30 second limit)

  try {
    // Initialize app on first request
    const app = await initializeApp();

    // Get the express app instance
    const expressApp = app.getHttpAdapter().getInstance();

    // Handle the request using Express
    expressApp(req, res);
  } catch (error) {
    clearTimeout(timeout);

    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Handler error: ${errorMessage}`);

    if (!res.headersSent) {
      res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      });
    }
  } finally {
    clearTimeout(timeout);
  }
}
