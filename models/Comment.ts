import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  content: string;
  likes: number;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IComment>('Comment', CommentSchema);