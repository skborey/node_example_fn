export const showPopup = (name = {}) => {
    return {
        type: 'SHOW_POPUP',
        name: name
    }
}