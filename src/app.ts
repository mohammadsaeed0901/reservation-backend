import express from 'express';
import cors from 'cors';
import flightRoutes from './routes/flightRoutes';
import trainRoutes from './routes/trainRoutes';
import hotelRoutes from './routes/hotelRoutes';
import cityRoutes from './routes/cityRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/flights', flightRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/cities', cityRoutes);

export default app;