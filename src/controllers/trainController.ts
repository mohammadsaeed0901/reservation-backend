import { Request, Response } from 'express';
import { getAllTrains, createTrain, Train } from '../models/train';

export const getTrains = async (req: Request, res: Response) => {
    try {
        const trains = await getAllTrains();
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get trains' });
    }
};

export const addTrain = async (req: Request, res: Response) => {
    const train: Train = req.body;
    try {
        const result = await createTrain(train);
        res.status(201).json({ message: 'Train created', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add train' });
    }
};
