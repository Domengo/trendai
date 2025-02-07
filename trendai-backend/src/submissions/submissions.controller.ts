import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { Submission } from './submission.schema';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  async findAll(): Promise<Submission[]> {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Submission | null> {
    return this.submissionsService.findOne(id);
  }

  @Post()
  async create(@Body() submission: Submission): Promise<Submission> {
    return this.submissionsService.create(submission);
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string): Promise<Submission | null> {
    return this.submissionsService.updateStatus(id, 'approved');
  }

  @Patch(':id/reject')
  async reject(@Param('id') id: string): Promise<Submission | null> {
    return this.submissionsService.updateStatus(id, 'rejected');
  }
}
