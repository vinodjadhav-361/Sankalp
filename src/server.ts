import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';
import postRoutes from './routes/postRoutes';
import eventRoutes from './routes/eventRoutes';
import gameRoutes from './routes/gameRoutes';
import pollRoutes from './routes/pollRoutes';
import livestreamRoutes from './routes/livestreamRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


console.log(process.env.MONGODB_USERNAME);
console.log(process.env.MONGODB_PASSWORD);
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    app.use('/api/users', userRoutes);
    app.use('/api/organizations', organizationRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/events', eventRoutes);
    app.use('/api/games', gameRoutes);
    app.use('/api/polls', pollRoutes);
    app.use('/api/livestreams', livestreamRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    app.get('/api/test', (req, res) => {
      res.json({ message: 'Test route is working', mongodbStatus: mongoose.connection.readyState });
    });

    app.get('/api/mongodb-status', (req, res) => {
      const status = ['disconnected', 'connected', 'connecting', 'disconnecting'];
      res.json({ status: status[mongoose.connection.readyState] });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });