import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignSchema } from './campaign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CampaignSchema,
        name: '',
      },
    ]),
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
