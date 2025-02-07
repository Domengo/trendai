import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsModule } from './campaigns/campaigns.module';
import { InfluencersModule } from './influencers/influencers.module';
import { AuthModule } from './auth/auth.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://domengo:domengo@cluster0.mhrzhjx.mongodb.net/trendai?retryWrites=true&w=majority&appName=Cluster0',
    ),
    CampaignsModule,
    InfluencersModule,
    AuthModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
