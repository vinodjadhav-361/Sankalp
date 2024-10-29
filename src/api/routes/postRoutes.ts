import express from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost, likePost } from '../controllers/postController';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);

export default router;