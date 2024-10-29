import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user: Schema.Types.ObjectId;
  type: 'like' | 'comment' | 'follow' | 'event' | 'achievement' | 'announcement';
  content: string;
  relatedItem: Schema.Types.ObjectId;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['like', 'comment', 'follow', 'event', 'achievement', 'announcement'], required: true },
  content: { type: String, required: true },
  relatedItem: { type: Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: { type: String, enum: ['Post', 'Comment', 'User', 'Event', 'Organization'] },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<INotification>('Notification', NotificationSchema);