import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  name: string;
  description: string;
  playedCount: number;
}

const GameSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  playedCount: { type: Number, default: 0 },
});

export default mongoose.model<IGame>('Game', GameSchema);