import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  handle: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinDate: Date;
  following: number;
  followers: number;
  posts: Schema.Types.ObjectId[];
  organizations: Schema.Types.ObjectId[];
  rank: string;
  points: number;
  badges: string[];
  streak: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  joinDate: { type: Date, default: Date.now },
  following: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  rank: { type: String, default: 'Bronze' },
  points: { type: Number, default: 0 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 }
});

export default mongoose.model<IUser>('User', UserSchema);