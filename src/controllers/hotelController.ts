import { Request, Response } from 'express';
import { getAllHotels, createHotel, Hotel } from '../models/hotel';

export const getHotels = async (req: Request, res: Response) => {
    try {
        const hotels = await getAllHotels();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get hotels' });
    }
};

export const addHotel = async (req: Request, res: Response) => {
    const hotel: Hotel = req.body;
    try {
        const result = await createHotel(hotel);
        res.status(201).json({ message: 'Hotel created', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add hotel' });
    }
};
