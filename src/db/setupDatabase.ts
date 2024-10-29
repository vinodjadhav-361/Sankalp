import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Post from '../models/Post';
import Comment from '../models/Comment';
import Organization from '../models/Organization';
import Event from '../models/Event';
import Project from '../models/Project';
import Poll from '../models/Poll';
import Livestream from '../models/Livestream';
import Product from '../models/Product';
import Order from '../models/Order';
import Notification from '../models/Notification';
import Message from '../models/Message';

dotenv.config();

const MONGODB_URI = process.env.VITE_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the VITE_MONGODB_URI environment variable');
}

async function setupDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create collections
    await User.createCollection();
    console.log('User collection created');

    await Post.createCollection();
    console.log('Post collection created');

    await Comment.createCollection();
    console.log('Comment collection created');

    await Organization.createCollection();
    console.log('Organization collection created');

    await Event.createCollection();
    console.log('Event collection created');

    await Project.createCollection();
    console.log('Project collection created');

    await Poll.createCollection();
    console.log('Poll collection created');

    await Livestream.createCollection();
    console.log('Livestream collection created');

    await Product.createCollection();
    console.log('Product collection created');

    await Order.createCollection();
    console.log('Order collection created');

    await Notification.createCollection();
    console.log('Notification collection created');

    await Message.createCollection();
    console.log('Message collection created');

    console.log('All collections created successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

setupDatabase();