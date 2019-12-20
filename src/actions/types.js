// Use this type collection because there are more than one place will use the same types.
// such as in action and reducer.

const types = {
    
    API_INITIALIZE_SESSION: 'API_INITIALIZE_SESSION',
    INITIALIZE_SESSION: 'INITIALIZE_SESSION',

    // rest api
    API_REGISTER: 'API_REGISTER',
    REGISTER: 'REGISTER',
    API_LOGIN: 'API_LOGIN',
    LOGIN: 'LOGIN',
    API_LOGOUT: 'API_LOGOUT',
    LOGOUT: 'LOGOUT',
    API_GET_RESTAURANT_LISTS: 'API_GET_RESTAURANT_LISTS',

    // eventrigger
    SHOW_POPUP: 'SHOW_POPUP',

    // collection
    ADD_NEW_COLLECTION: 'ADD_NEW_COLLECTION',
    DELETE_COLLECTION: 'DELETE_COLLECTION',
    SHOW_RESTAURANT_IN_COLLECTION: 'SHOW_RESTAURANT_IN_COLLECTION',
    ADD_RESTAURANT_TO_COLLECTION: 'ADD_RESTAURANT_TO_COLLECTION',
}

export default types;