import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './campaign.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async findAll(): Promise<Campaign[]> {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Campaign | null> {
    return this.campaignsService.findOne(id);
  }

  @Post()
  async create(@Body() campaign: Campaign): Promise<Campaign> {
    return this.campaignsService.create(campaign);
  }
}
