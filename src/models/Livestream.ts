import mongoose, { Schema, Document } from 'mongoose';

export interface ILivestream extends Document {
  title: string;
  description: string;
  organization: Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  viewers: number;
  status: 'upcoming' | 'live' | 'ended';
}

const LivestreamSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  viewers: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'live', 'ended'], required: true }
});

export default mongoose.model<ILivestream>('Livestream', LivestreamSchema);