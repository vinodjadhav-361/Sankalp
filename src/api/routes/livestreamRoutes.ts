import express from 'express';
import { getLivestreams, getLivestreamById, createLivestream, updateLivestream, deleteLivestream } from '../controllers/livestreamController';

const router = express.Router();

router.get('/', getLivestreams);
router.get('/:id', getLivestreamById);
router.post('/', createLivestream);
router.put('/:id', updateLivestream);
router.delete('/:id', deleteLivestream);

export default router;