import express from 'express';
import { validate } from '../middleware/validate';
import { Restaurant, RestaurantSchema } from '../schemas/restaurant';
const router = express.Router();

router.post('/', validate(RestaurantSchema), async (req, res) => {
    const data = req.body as Restaurant;
    res.send('List of cuisines');
});

export default router;