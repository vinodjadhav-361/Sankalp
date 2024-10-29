import express from 'express';
import { getPolls, getPollById, createPoll, updatePoll, deletePoll, votePoll } from '../controllers/pollController';

const router = express.Router();

router.get('/', getPolls);
router.get('/:id', getPollById);
router.post('/', createPoll);
router.put('/:id', updatePoll);
router.delete('/:id', deletePoll);
router.post('/:id/vote', votePoll);

export default router;