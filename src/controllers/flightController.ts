import { type Request, type Response } from 'express';
import { getAllFlights, createFlight, getFlightById as getFlightByIdDB, updateRemainingSeats, type Flight } from '../models/flight';

export const getFlights = async (req: Request, res: Response) => {
    const { departure, arrival, departureDate, adt }: {
        departure: string;
        arrival: string;
        departureDate: string;
        adt: string;
    } = req.query as any;

    try {
        const flights = await getAllFlights(departure, arrival, departureDate);

        const availableFlights = flights.filter(flight => flight.remainingSeatsNo >= parseInt(adt));

        if (availableFlights.length === 0) {
            return res.status(404).json({ message: 'No flights available' });
        }

        res.json(availableFlights);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch flights' });
    }
};

export const addFlight = async (req: Request, res: Response) => {
    const flight: Flight = req.body;
    try {
        const result = await createFlight(flight);
        res.status(201).json({ message: 'Flight created', data: result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add flight' });
    }
};

export const bookFlight = async (req: Request, res: Response) => {
    const { flightId, adt }: { flightId: number; adt: number } = req.body;

    try {
        const flight = await getFlightByIdDB(flightId);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        if (flight.remainingSeatsNo < adt) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const updatedRemainingSeatsNo = flight.remainingSeatsNo - adt;
        await updateRemainingSeats(flightId, updatedRemainingSeatsNo);

        res.json({ message: 'Flight booked successfully', remainingSeatsNo: updatedRemainingSeatsNo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book flight' });
    }
};

export const getFlightById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const flight = await getFlightByIdDB(parseInt(id));

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.json(flight);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flight' });
    }
};