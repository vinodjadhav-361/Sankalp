import mongoose, { Schema, Document } from 'mongoose';

export interface IPoll extends Document {
  question: string;
  options: string[];
  votes: number[];
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  endsAt: Date;
}

const PollSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  votes: [{ type: Number, default: 0 }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  endsAt: { type: Date, required: true }
});

export default mongoose.model<IPoll>('Poll', PollSchema);