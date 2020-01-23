const domain = '';
const initialState = {
    users: [
        {
            id: 1,
            name: 'John',
            isOnline: false,
            isTyping: false,
        },
        {
            id: 2,
            name: 'Jane',
            isOnline: true,
            isTyping: false,
        }
    ],
    history: [],
    userInfo: {
        name: '',
    },
    isLogged: false,
    isGettingHistory: false,
    gettingHistoryDataError: '',
    chatId: 1,

};
function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_USERS_DATA':
            return {
                ...state,
                users: action.payload
            };
        case 'GET_HISTORY_DATA_SUCCESS':
            return {
                ...state,
                history: action.payload
            };
        case 'IS_GETTING_HISTORY':
            return {
                ...state,
                isGettingHistory: action.payload
            };
        case 'GET_HISTORY_DATA_ERROR':
            return {
                ...state,
                gettingHistoryDataError: action.payload
            };
        case 'SET_LOGIN_STATUS':
            return {
                ...state,
                isLogged: action.payload
            };
        default:
            return state;
    }
    // return state;
}
export default rootReducer;