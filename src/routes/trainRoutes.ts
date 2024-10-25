import { Router } from 'express';
import { getTrains, addTrain } from '../controllers/trainController';

const router = Router();

router.get('/', getTrains);
router.post('/', addTrain);

export default router;