import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsModule } from './campaigns/campaigns.module';
import { InfluencersModule } from './influencers/influencers.module';
import { AuthModule } from './auth/auth.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        
        if (!mongoUri) {
          throw new Error('MONGODB_URI environment variable is not defined');
        }

        return {
          uri: mongoUri,
          retryAttempts: 3,
          retryDelay: 500,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 10000,
          family: 4, // Use IPv4
        };
      },
      inject: [ConfigService],
    }),
    CampaignsModule,
    InfluencersModule,
    AuthModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
