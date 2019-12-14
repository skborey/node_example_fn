const initialState = {
    currResult: 0,
    collectionList:[]
}

const cases = {
    ADD_MORE: (state, action) => {
        var newResult = state.currResult + action.additionalValue;
        return Object.assign({}, state, {
            currResult: newResult
        })
    },

    ADD_NEW_COLLECTION: (state, action) => {
        // ajax to backend to add new collection
        let newCollection = {
            _id: 'test id',
            title: action.title,
            restaurants: [],
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
}

const reducer = (state = initialState, action) => {
    const handler = cases[action.type]
    return handler ? handler(state, action) : state
}

export default reducer;