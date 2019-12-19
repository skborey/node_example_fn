export const register = (data) => {
    console.log(data);
    return {
        type: 'API_REGISTER',
        data: data
    }
}