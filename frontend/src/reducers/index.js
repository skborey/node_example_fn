const initialState = {
    currResult: 0
}

const cases = {
    ADD_MORE: (state, action) => {
        var newResult = state.currResult + action.additionalValue;
        return Object.assign({}, state, {
            currResult: newResult
        })
    },
}

const reducer = (state = initialState, action) => {
    const handler = cases[action.type]
    return handler ? handler(state, action) : state
}

export default reducer;