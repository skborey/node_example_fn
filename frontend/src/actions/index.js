export const addNewCollection = (title) => {
    return {
        type: 'ADD_NEW_COLLECTION',
        title: title
    }
}

export const deleteCollection = (id) => {
    return {
        type: 'DELETE_COLLECTION',
        id: id
    }
}

export const showRestaurantInCollection = (index) => {
    return {
        type: 'SHOW_RESTAURANT_IN_COLLECTION',
        index: index
    }
}