import { db } from '../config/db';

export interface Hotel {
    id: number;
    hotel_company: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
}

export const getAllHotels = async () => {
    const [rows] = await db.query('SELECT * FROM hotels');
    return rows;
};

export const createHotel = async (hotel: Hotel) => {
    const { hotel_company, origin, destination, departureTime, arrivalTime } = hotel;
    const [result] = await db.query('INSERT INTO hotels (hotel_company, origin, destination, departureTime, arrivalTime) VALUES (?, ?, ?, ?, ?)', 
    [hotel_company, origin, destination, departureTime, arrivalTime]);
    return result;
};