import { z } from "zod";

export const RestaurantSchema = z.object({
    name: z.string().min(1).max(100),
    location: z.string().min(1).max(200),
    cuisines: z.array(z.string().min(1).max(50))
});

export const RestaurantDetailsSchema = z.object({
    links: z.array(z.object({
        name: z.string().min(1).max(50),
        url: z.string().url()
    })),
    contact: z.object({
        phone: z.string().min(7).max(15).optional(),
        email: z.string().email().optional()
    })
});

export type Restaurant = z.infer<typeof RestaurantSchema>;
export type RestaurantDetails = z.infer<typeof RestaurantDetailsSchema>;