import { Schema, Document } from 'mongoose';

export const CampaignSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  deadline: { type: Date, required: true },
});

export interface Campaign extends Document {
  name: string;
  status: string;
  deadline: Date;
}
