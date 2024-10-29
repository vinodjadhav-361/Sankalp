import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, getUserPosts, getUserOrganizations } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/posts', getUserPosts);
router.get('/:id/organizations', getUserOrganizations);

export default router;