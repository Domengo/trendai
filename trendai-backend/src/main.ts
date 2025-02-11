/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'https://trendai-5jy1.vercel.app',
    'http://localhost:3000',
  ];

  app.enableCors({
    origin: (origin: string | undefined, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const logger = new Logger('Mongoose');

  app.enableShutdownHooks();

  process.on('unhandledRejection', (reason, promise) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error: Error) => {
  Logger.error(`Error starting server: ${error.message}`);
});
