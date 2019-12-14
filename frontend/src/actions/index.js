export const increment = (additionalValue) => {
    return {
        type: 'ADD_MORE',
        additionalValue: additionalValue
    }
}