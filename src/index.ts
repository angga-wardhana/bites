import express from 'express';
import restaurantRoutes from './routes/restaurants.js';
import cuisineRoutes from './routes/cuisines.js';
import { errorHandler } from './middleware/errorHandler.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/restaurants', restaurantRoutes);
app.use('/cuisines', cuisineRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});