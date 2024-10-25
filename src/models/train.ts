import { db } from '../config/db';

export interface Train {
    id: number;
    train_company: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
}

export const getAllTrains = async () => {
    const [rows] = await db.query('SELECT * FROM trains');
    return rows;
};

export const createTrain = async (train: Train) => {
    const { train_company, origin, destination, departureTime, arrivalTime } = train;
    const [result] = await db.query('INSERT INTO trains (train_company, origin, destination, departureTime, arrivalTime) VALUES (?, ?, ?, ?, ?)', 
    [train_company, origin, destination, departureTime, arrivalTime]);
    return result;
};