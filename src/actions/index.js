import TYPES from './types';

/**
    Authorization actions
 */

export const initializeSession = (token) => {
    return {
        type: TYPES.API_INITIALIZE_SESSION,
        token: token
    }
}

export const register = (data) => {
    return {
        type: TYPES.API_REGISTER,
        data: data
    }
}

export const login = (data) => {
    return {
        type: TYPES.API_LOGIN,
        email: data.email,
        password: data.password
    }
}

export const logout = (token) => {
    return {
        type: TYPES.API_LOGOUT,
        token: token
    }
}

/**
    Popup
 */
export const showPopup = (name = {}) => {
    return {
        type: TYPES.SHOW_POPUP,
        name: name
    }
}

export const resetPopup = () => {
    return {
        type: TYPES.RESET_POPUP
    }
}

/**
    Collection
 */
 export const addNewCollection = (name, token='') => {
    return {
        type: TYPES.API_ADD_NEW_COLLECTION,
        token: token,
        name: name,
    }
}

export const showCollection = (id) => {
    return {
        type: TYPES.SHOW_COLLECTION,
        id: id
    }
}

export const deleteCollection = (id, token='') => {
    return {
        type: TYPES.API_DELETE_COLLECTION, // API
        token: token,
        id: id,
    }
}

/**
    Collaborator
 */

export const addNewCollaborator = (name, email, collectionId, token='') => {
    return {
        type: TYPES.API_ADD_NEW_COLLABORATOR, // API
        token: token,
        body: {
            name: name,
            email: email,
            collection_id: collectionId,
        }
    }
}
 
export const renameCollaborator = (name, id, token='') => {
    return {
        type: TYPES.RENAME_COLLABORATOR, // API
        token: token,
        id: id,
        name: name,
    }
}

export const deleteCollaborator = (id, token='') => {
    return {
        type: TYPES.API_DELETE_COLLABORATOR,
        token: token,
        id: id
    }
}

/**
    Restaurant
 */
export const addRestaurantToCollection = (restaurantId, collectionId, token='') => {
    return {
        type: TYPES.API_ADD_RESTAURANT_TO_COLLECTION, // API
        token: token,
        body: {
            restaurant_id: restaurantId,
            collection_id: collectionId
        }
    }
}

export const removeRestaurantFromCollection = (restaurantId, collectionId) => {
    return {
        type: TYPES.REMOVE_RESTAURANT_FROM_COLLECTION, // API
        restaurantId: restaurantId,
        collectionId: collectionId
    }
}

export const apiGetRestaurants = (filter = {}) => {
    return {
        type: TYPES.API_GET_RESTAURANTS
    }
}