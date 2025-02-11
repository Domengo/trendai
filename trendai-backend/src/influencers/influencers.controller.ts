import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Influencer } from './influencer.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('influencers')
@UseGuards(JwtAuthGuard)
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() influencer: Partial<Influencer>,
  ): Promise<Influencer | null> {
    return await this.influencersService.update(id, influencer);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.influencersService.delete(id);
  }
}
