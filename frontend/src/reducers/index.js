const initialState = {
    collectionList:[],
    restaurantList:[]
}

const cases = {

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

        let newRestaurantList = [...state.collectionList[action.index].restaurants]

        return Object.assign({}, state, {
            restaurantList: newRestaurantList
        })
    },
}

const reducer = (state = initialState, action) => {
    const handler = cases[action.type]
    return handler ? handler(state, action) : state
}

export default reducer;