import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  organization: Schema.Types.ObjectId;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Upcoming';
  type: 'Event' | 'Mission' | 'Charity';
  location: 'National' | 'District' | 'Local';
  volunteers: Schema.Types.ObjectId[];
  budget: number;
  completedMilestones: number;
  totalMilestones: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed', 'Upcoming'], required: true },
  type: { type: String, enum: ['Event', 'Mission', 'Charity'], required: true },
  location: { type: String, enum: ['National', 'District', 'Local'], required: true },
  volunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  budget: { type: Number, required: true },
  completedMilestones: { type: Number, default: 0 },
  totalMilestones: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', ProjectSchema);