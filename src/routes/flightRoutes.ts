import { Router } from 'express';
import { getFlights, addFlight, getFlightById, bookFlight } from '../controllers/flightController';

const router = Router();

router.get('/', getFlights);
router.get("/:id", getFlightById);
router.post('/', addFlight);
router.post("/book", bookFlight);

export default router;
