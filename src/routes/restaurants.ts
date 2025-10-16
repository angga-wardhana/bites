import express from 'express';
import { validate } from '../middleware/validate';
import { Restaurant, RestaurantSchema } from '../schemas/restaurant';
import { initialRedisClient } from '../util/client';
import { nanoid } from 'nanoid';
import { restaurantKeyById } from '../util/keys';
import { sendError, sendSuccess } from '../util/responses';
const router = express.Router();

router.post('/', validate(RestaurantSchema), async (req, res, next) => {
    const data = req.body as Restaurant;
    try {
        const client = await initialRedisClient();
        const id  = nanoid();
        const restaurantKey = restaurantKeyById(id);
        const hashData = {
            id, 
            name: data.name, 
            location: data.location
        }
        const addResult = await client.hSet(restaurantKey, hashData);
        console.log('Add Result:', addResult);
        return sendSuccess(res, hashData);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const client = await initialRedisClient();
        const restaurantKey = restaurantKeyById(id);
        const [_, restaurant] = await Promise.all ([
            client.hIncrBy(restaurantKey, 'viewCount', 1),
            client.hGetAll(restaurantKey),
        ]);
        if (Object.keys(restaurant).length === 0) {
            sendError(res, 'Restaurant not found', 404);
        }
        return sendSuccess(res, restaurant);
    } catch (error) {
        next(error);
    }
});

export default router;