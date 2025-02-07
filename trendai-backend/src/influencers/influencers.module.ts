import { Module } from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { InfluencersController } from './influencers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InfluencerSchema } from './influencer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: InfluencerSchema,
        name: 'Influencer',
      },
    ]),
  ],
  providers: [InfluencersService],
  controllers: [InfluencersController],
})
export class InfluencersModule {}
