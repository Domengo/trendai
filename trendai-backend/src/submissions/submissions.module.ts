import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { SubmissionSchema } from './submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
    ]),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
