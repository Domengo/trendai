/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('NestApplication');

let cachedServer: any;

async function bootstrap() {
  try {
    if (!cachedServer) {
      const expressApp = express();

      const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
        { logger: ['error', 'warn', 'log'] },
      );

      // Setup CORS - Allow all origins for development
      app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      });

      // Setup Swagger documentation
      const config = new DocumentBuilder()
        .setTitle('TrendAI API')
        .setDescription('The TrendAI API - Influencer Campaign Management Platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);

      // Initialize the app
      await app.init();

      // Setup error handlers
      process.on('unhandledRejection', (reason, promise) => {
        logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
      });

      process.on('uncaughtException', (error: Error) => {
        logger.error(`Uncaught Exception: ${error.message}`);
      });

      // Create serverless handler
      cachedServer = serverless(expressApp);
      logger.log('NestJS app initialized successfully for Vercel');
    }
    return cachedServer;
  } catch (error) {
    logger.error(`Bootstrap error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

// Vercel Serverless handler
export default async function handler(req: any, res: any) {
  try {
    const server = await bootstrap();
    return server(req, res);
  } catch (error) {
    logger.error(`Handler error: ${error instanceof Error ? error.message : String(error)}`);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
}
