export function getKeyName(...args: string[]) {
    return `bites:${args.join(':')}`;
}

export const restaurantKeyById = (id: string) => getKeyName('restaurant', id);
export const cuisineKeyByName = (name: string) => getKeyName('cuisine', name);
export const reviewKeyById = (id: string) => getKeyName('review', id);
export const restaurantReviewsKey = (restaurantId: string) => getKeyName('restaurant', restaurantId, 'reviews');
export const cuisineRestaurantsKey = (cuisineName: string) => getKeyName('cuisine', cuisineName, 'restaurants');