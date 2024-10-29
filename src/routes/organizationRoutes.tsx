import express from 'express';
import { getOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization, followOrganization, getOrganizationPosts } from '../controllers/organizationController';

const router = express.Router();

router.get('/', getOrganizations);
router.get('/:id', getOrganizationById);
router.post('/', createOrganization);
router.put('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);
router.post('/:id/follow', followOrganization);
router.get('/:id/posts', getOrganizationPosts);

export default router;