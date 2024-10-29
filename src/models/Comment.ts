import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IComment>('Comment', CommentSchema);