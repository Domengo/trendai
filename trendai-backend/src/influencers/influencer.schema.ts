import { Schema, Document } from 'mongoose';

export const InfluencerSchema = new Schema({
  name: { type: String, required: true },
  joinedCampaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
});

export interface Influencer extends Document {
  name: string;
  joinedCampaigns: string[];
}
