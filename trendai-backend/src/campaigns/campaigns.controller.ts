import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './campaign.schema';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async findAll(): Promise<Campaign[]> {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Campaign> {
    return this.campaignsService.findOne(id);
  }

  @Post()
  async create(@Body() campaign: Campaign): Promise<Campaign> {
    return this.campaignsService.create(campaign);
  }
}
