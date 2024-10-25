import { Router } from 'express';
import { getCities, addFlight } from '../controllers/cityController';

const router = Router();

router.get('/', getCities);
router.post('/', addFlight);

export default router;