import { Router } from 'express';
import { getHotels, addHotel } from '../controllers/hotelController';

const router = Router();

router.get('/', getHotels);
router.post('/', addHotel);

export default router;
