
const initialState = {
    sessions: {
        email: null
    },
    popupPage: null,
    collectionList:[
        {id: '507f1f77bcf86cd799439001', title: 'My collection 1', restaurants:[{id: '507f1f77bcf86cd799439011', title: 'Restaurant 1', open_time: '10am - 10pm'}, {id: '507f1f77bcf86cd799439012', title: 'Restaurant 2', open_time: '11am - 9pm'}], collaborations:[]},
        {id: '507f1f77bcf86cd799439002', title: 'My collection 2', restaurants:[{id: '507f1f77bcf86cd799439012', title: 'Restaurant 2', open_time: '11am - 9pm'}, {id: '507f1f77bcf86cd799439013', title: 'Restaurant 3', open_time: '12am - 8pm'}], collaborations:[]},
        {id: '507f1f77bcf86cd799439003', title: 'My collection 3', restaurants:[{id: '507f1f77bcf86cd799439013', title: 'Restaurant 3', open_time: '12am - 8pm'}, {id: '507f1f77bcf86cd799439014', title: 'Restaurant 4', open_time: '13am - 7pm'},], collaborations:[]},
        {id: '507f1f77bcf86cd799439004', title: 'My collection 4', restaurants:[{id: '507f1f77bcf86cd799439014', title: 'Restaurant 4', open_time: '13am - 7pm'}, {id: '507f1f77bcf86cd799439015', title: 'Restaurant 5', open_time: '14am - 6pm'}], collaborations:[]},
        {id: '507f1f77bcf86cd799439005', title: 'My collection 5', restaurants:[{id: '507f1f77bcf86cd799439015', title: 'Restaurant 5', open_time: '14am - 6pm'}, {id: '507f1f77bcf86cd799439011', title: 'Restaurant 1', open_time: '10am - 10pm'}], collaborations:[]},
    ],
    restaurantList:[
        // {id: '507f1f77bcf86cd799439011', title: 'Restaurant 1', open_time: '10am - 10pm'},
        // {id: '507f1f77bcf86cd799439012', title: 'Restaurant 2', open_time: '11am - 9pm'},
        // {id: '507f1f77bcf86cd799439013', title: 'Restaurant 3', open_time: '12am - 8pm'},
        // {id: '507f1f77bcf86cd799439014', title: 'Restaurant 4', open_time: '13am - 7pm'},
        // {id: '507f1f77bcf86cd799439015', title: 'Restaurant 5', open_time: '14am - 6pm'},
        // {id: '507f1f77bcf86cd799439011', title: 'Restaurant 1', open_time: '10am - 10pm'},
        // {id: '507f1f77bcf86cd799439012', title: 'Restaurant 2', open_time: '11am - 9pm'},
        // {id: '507f1f77bcf86cd799439013', title: 'Restaurant 3', open_time: '12am - 8pm'},
        // {id: '507f1f77bcf86cd799439014', title: 'Restaurant 4', open_time: '13am - 7pm'},
        // {id: '507f1f77bcf86cd799439015', title: 'Restaurant 5', open_time: '14am - 6pm'}
    ]
}

const cases = {

    /**
     * Header
     */
    'SHOW_POPUP': (state, action) => {
        return Object.assign({}, state, {
            popupPage: action.name,
        })
    },

    'RESET_POPUP': (state, action) => {
        return Object.assign({}, state, {
            popupPage: null,
        })
    },

    /**
     * Collection List
     */

    ADD_NEW_COLLECTION: (state, action) => {
        // ajax to backend to add new collection
        let newCollection = {
            _id: 'test id',
            title: action.title,
            restaurants: [{id: 'restaurant-' + Math.floor(Math.random() * 100)}],
            collaborations: []
        }

        return Object.assign({}, state, {
            collectionList: [...state.collectionList, newCollection]
        })
    },

    DELETE_COLLECTION: (state, action) => {
        // ajax to backend to delete collection
        
        let newCollectionList = [...state.collectionList]; //in state use immutable state
        newCollectionList.splice(action.id, 1);

        return Object.assign({}, state, {
            collectionList: newCollectionList
        })
    },

    SHOW_RESTAURANT_IN_COLLECTION: (state, action) => {

        // show all restaurant inside the selected collection
        let newRestaurantList = [...state.collectionList[action.index].restaurants]

        return Object.assign({}, state, {
            restaurantList: newRestaurantList
        })
    },

    /**
     * Restaurant List
     */
    ADD_RESTAURANT_TO_COLLECTION: (state, action) => {

        // ajax to backend to add new collection

        return state;
    },

    GET_RESTAURANT_LISTS: (state, action) => {
        return Object.assign({}, state, {
            restaurantList: action.restaurants
        })
    }

}

const reducer = (state = initialState, action) => {
    const handler = cases[action.type]
    return handler ? handler(state, action) : state
}

export default reducer;