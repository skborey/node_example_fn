const initialState = {
    result: 0,
    collectionList: []
}

const cases = {

    ADD_MORE: (state, action) => {

        var newResult = state.result + action.additionalValue;

        return Object.assign({}, state, {
            result: newResult
        })
    },
}

const reducer = (state = initialState, action) => {
    const handler = cases[action.type]
    return handler ? handler(state, action) : state
}

export default reducer;