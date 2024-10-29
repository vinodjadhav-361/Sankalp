import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  user: Schema.Types.ObjectId;
  content: string;
  likes: number;
  shares: number;
  comments: Schema.Types.ObjectId[];
  level: 'national' | 'state' | 'local';
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  hashtags: string[];
}

const PostSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  level: { type: String, enum: ['national', 'state', 'local'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  image: { type: String },
  hashtags: [{ type: String }]
});

export default mongoose.model<IPost>('Post', PostSchema);