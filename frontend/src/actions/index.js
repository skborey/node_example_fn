export const increment = (additionalValue) => {
    return {
        type: 'ADD_MORE',
        additionalValue: additionalValue
    }
}

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