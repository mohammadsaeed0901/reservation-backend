import { db } from "../config/db";

export interface City {
    name: string;
    faDisplayName: string;
    enDisplayName: string;
}

export const getAllCities = async () => {
    const [rows] = await db.query('SELECT * FROM cities');
    return rows;
};

export const createCity = async (city: City) => {
    const { name, faDisplayName, enDisplayName } = city;
    const [result] = await db.query('INSERT INTO cities (name, faDisplayName, enDisplayName) VALUES (?, ?, ?)', 
    [name, faDisplayName, enDisplayName]);
    return result;
};