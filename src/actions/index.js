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
    General trigger
 */
export const showPopup = (name = {}) => {
    return {
        type: TYPES.SHOW_POPUP,
        name: name
    }
}

/**
    Collection actions
 */
 export const addNewCollection = (name, token='') => {
    return {
        type: TYPES.ADD_NEW_COLLECTION,
        token: token,
        name: name,
    }
}

export const deleteCollection = (id, token='') => {
    return {
        type: TYPES.DELETE_COLLECTION, // API
        token: token,
        id: id,
    }
}

export const showCollection = (id) => {
    return {
        type: TYPES.SHOW_COLLECTION,
        id: id
    }
}

/**
    Collaborator action
 */
export const deleteCollaborator = (id, token='') => {
    return {
        type: TYPES.DELETE_COLLABORATOR, // API
        token: token,
        id: id
    }
}

export const addNewCollaborator = (name, email, collectionId, token='') => {
    return {
        type: TYPES.ADD_NEW_COLLABORATOR, // API
        token: token,
        name: name,
        email: email,
        collectionId: collectionId,
    }
}

/**
    Resturants actions
 */
export const addRestaurantToCollection = (restaurantId, collectionId) => {
    return {
        type: TYPES.ADD_RESTAURANT_TO_COLLECTION, // API
        restaurantId: restaurantId,
        collectionId: collectionId
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

/**
    Trigger event
 */
export const resetPopup = () => {
    return {
        type: TYPES.RESET_POPUP
    }
}