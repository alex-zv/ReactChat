const domain = '';
const initialState = {


};
function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_ORDERS_DATA':
            return {
                ...state,
                orderBooksData: action.payload
            };
        default:
            return state;
    }
    // return state;
}
export default rootReducer;