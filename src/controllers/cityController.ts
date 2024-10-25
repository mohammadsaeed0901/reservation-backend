import { type Request, type Response } from 'express';
import { type City, createCity, getAllCities } from '../models/city';

export const getCities = async (_: Request, res: Response) => {
    try {
        const cities = await getAllCities();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cities' });
    }
};

export const addFlight = async (req: Request, res: Response) => {
    const city: City = req.body;
    try {
        const result = await createCity(city);
        res.status(201).json({ message: 'City created', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add city' });
    }
};