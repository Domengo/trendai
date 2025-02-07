import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from './submission.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel('Submission') private submissionModel: Model<Submission>,
  ) {}

  async findAll(): Promise<Submission[]> {
    return this.submissionModel.find().populate('influencer campaign').exec();
  }

  async findOne(id: string): Promise<Submission | null> {
    return this.submissionModel
      .findById(id)
      .populate('influencer campaign')
      .exec();
  }

  async create(submission: Submission): Promise<Submission> {
    const newSubmission = new this.submissionModel(submission);
    return newSubmission.save();
  }

  async updateStatus(
    id: string,
    status: 'approved' | 'rejected',
  ): Promise<Submission | null> {
    return this.submissionModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }
}
