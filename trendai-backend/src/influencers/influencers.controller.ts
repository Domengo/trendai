import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Influencer } from './influencer.schema';

@Controller('influencers')
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @Get()
  async findAll(): Promise<Influencer[]> {
    return this.influencersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Influencer | null> {
    return this.influencersService.findOne(id);
  }

  @Post()
  async create(@Body() influencer: Influencer): Promise<Influencer> {
    return this.influencersService.create(influencer);
  }
}
