export const addRestaurantToCollection = (restaurant, collectionIndex) => {
    console.log(restaurant, collectionIndex);
    return {
        type: 'ADD_RESTAURANT_TO_COLLECTION',
        restaurant: restaurant,
        collectionIndex: collectionIndex
    }
}