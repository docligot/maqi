
export default (state = '1/1/2021', { type, payload }) => {
    switch (type) {

    case 'SET_REGION_DATA':
        return payload

    default:
        return state
    }
}
