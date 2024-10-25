import { RowDataPacket } from 'mysql2';
import { db } from '../config/db';

export enum AirplaneType {
    BOEING = 'BOEING',
    AIRBUS = 'AIRBUS',
}

export enum AirplaneClassType {
    BUSINESS = 'BUSINESS',
    ECONOMY = 'ECONOMY',
}

export enum AirplaneTicketType {
    SYSTEM = 'SYSTEM',
    CHARTER = 'CHARTER',
}

export interface Flight {
    id: number;
    airline: string;
    originCityId: number;                   // City ID for origin
    destinationCityId: number;              // City ID for destination
    departureTime: string;
    arrivalTime?: string;
    remainingSeatsNo: number;               // Remaining number of passengers available for the flight
    totalPrice: number;                     // Total price for the flight
    airplaneType: AirplaneType;             // Type of airplane (enum)
    airplaneClassType: AirplaneClassType;   // Class of airplane (enum)
    airplaneTicketType: AirplaneTicketType; // Type of ticket (enum)
    logoBase64?: string;                    // Airline logo as base64 string
    isCancel: boolean;                      // Whether the flight is canceled or not
}

export const getAllFlights = async (
    departureCityId?: string,
    destinationCityId?: string,
    departureDate?: string
): Promise<Flight[]> => {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT * FROM flights 
         WHERE originCityId = ? 
           AND destinationCityId = ? 
           AND DATE(departureTime) = ?`,
        [departureCityId, destinationCityId, departureDate]
    );
    return rows as Flight[];
};

export const createFlight = async (flight: Flight) => {
    const { airline, originCityId, destinationCityId, departureTime, arrivalTime, remainingSeatsNo, totalPrice, airplaneType, airplaneClassType, airplaneTicketType, logoBase64, isCancel } = flight;
    
    const [result] = await db.query(
        `INSERT INTO flights (airline, originCityId, destinationCityId, departureTime, arrivalTime, remainingSeatsNo, totalPrice, airplaneType, airplaneClassType, airplaneTicketType, logoBase64, isCancel) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [airline, originCityId, destinationCityId, departureTime, arrivalTime, remainingSeatsNo, totalPrice, airplaneType, airplaneClassType, airplaneTicketType, logoBase64, isCancel]
    );
    
    return result;
};


export const getFlightById = async (id: number): Promise<Flight | null> => {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM flights WHERE id = ?', [id]
    );
    const flight = rows[0] as Flight;
    return flight || null;
};

export const updateRemainingSeats = async (flightId: number, remainingSeatsNo: number): Promise<void> => {
    await db.query('UPDATE flights SET remainingSeatsNo = ? WHERE id = ?', [remainingSeatsNo, flightId]);
};