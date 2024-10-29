import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  description: string;
  organization: Schema.Types.ObjectId;
  date: Date;
  time: string;
  location: string;
  attendees: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IEvent>('Event', EventSchema);