import { Schema, Document } from 'mongoose';

export const SubmissionSchema = new Schema({
  influencer: {
    type: Schema.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  submissionDate: { type: Date, default: Date.now },
});

export interface Submission extends Document {
  influencer: string; // Influencer ID
  campaign: string; // Campaign ID
  content: string; // Link to the post
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: Date;
}
