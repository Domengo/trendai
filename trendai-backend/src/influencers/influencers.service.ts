import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Influencer } from './influencer.schema';

@Injectable()
export class InfluencersService {
  constructor(
    @InjectModel('Influencer') private influencerModel: Model<Influencer>,
  ) {}

  async findAll(): Promise<Influencer[]> {
    return this.influencerModel.find().populate('joinedCampaigns').exec();
  }

  async findOne(id: string): Promise<Influencer> {
    return this.influencerModel.findById(id).populate('joinedCampaigns').exec();
  }

  async create(influencer: Influencer): Promise<Influencer> {
    const newInfluencer = new this.influencerModel(influencer);
    return newInfluencer.save();
  }
}
