export const addRestaurantToCollection = (restaurant, collectionIndex) => {
    return {
        type: 'ADD_RESTAURANT_TO_COLLECTION',
        restaurant: restaurant,
        collectionIndex: collectionIndex
    }
}

export const apiGetRestaurantLists = (filter = {}) => {
    return {
        type: 'API_GET_RESTAURANT_LISTS'
    }
}