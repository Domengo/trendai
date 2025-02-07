import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './campaign.schema';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel('Campaign') private campaignModel: Model<Campaign>,
  ) {}

  async findAll(): Promise<Campaign[]> {
    return this.campaignModel.find().exec();
  }

  async findOne(id: string): Promise<Campaign> {
    return this.campaignModel.findById(id).exec();
  }

  async create(campaign: Campaign): Promise<Campaign> {
    const newCampaign = new this.campaignModel(campaign);
    return newCampaign.save();
  }

  async update(id: string, campaign: Campaign): Promise<Campaign> {
    return this.campaignModel
      .findByIdAndUpdate(id, campaign, { new: true })
      .exec();
  }
}
