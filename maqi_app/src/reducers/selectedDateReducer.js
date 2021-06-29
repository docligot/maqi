
export default (state = '1/1/2021', { type, payload }) => {
    switch (type) {

    case 'SET_DATE':
        return payload

    default:
        return state
    }
}
