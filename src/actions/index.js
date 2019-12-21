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
    Event trigger actions
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
 export const addNewCollection = (name, token = '') => {
    return {
        type: TYPES.API_ADD_NEW_COLLECTION,
        token: token,
        name: name,
    }
}

export const deleteCollection = (id, token = '') => {
    return {
        type: TYPES.API_DELETE_COLLECTION,
        token: token,
        id: id,
    }
}

export const showRestaurantInCollection = (index) => {
    return {
        type: TYPES.SHOW_RESTAURANT_IN_COLLECTION,
        index: index
    }
}

/**
    Resturants actions
 */
export const addRestaurantToCollection = (restaurant, collectionIndex) => {
    return {
        type: TYPES.ADD_RESTAURANT_TO_COLLECTION,
        restaurant: restaurant,
        collectionIndex: collectionIndex
    }
}

export const apiGetRestaurantLists = (filter = {}) => {
    return {
        type: TYPES.API_GET_RESTAURANT_LISTS
    }
}

/**
    Trigger event
 */
export const resetPopup = () => {
    return {
        type: 'RESET_POPUP'
    }
}