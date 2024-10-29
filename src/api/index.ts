import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import organizationRoutes from './routes/organizationRoutes';
import eventRoutes from './routes/eventRoutes';
import projectRoutes from './routes/projectRoutes';
import pollRoutes from './routes/pollRoutes';
import livestreamRoutes from './routes/livestreamRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/organizations', organizationRoutes);
router.use('/events', eventRoutes);
router.use('/projects', projectRoutes);
router.use('/polls', pollRoutes);
router.use('/livestreams', livestreamRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;