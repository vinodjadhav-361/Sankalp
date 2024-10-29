import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>('Message', MessageSchema);