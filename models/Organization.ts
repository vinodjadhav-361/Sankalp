import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  handle: string;
  description: string;
  image: string;
  followers: number;
  members: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
  events: Schema.Types.ObjectId[];
  projects: Schema.Types.ObjectId[];
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  followers: { type: Number, default: 0 },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);