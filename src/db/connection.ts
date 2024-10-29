import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.VITE_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the VITE_MONGODB_URI environment variable');
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export default connectToDatabase;