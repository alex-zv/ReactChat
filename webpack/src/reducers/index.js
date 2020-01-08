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
    history: [
        {
            history_id: 1,
            userName: 'John',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur fugiat pariatur placeat quam? Amet facilis odio perferendis quam similique tempora.',
            date: '21:48:12',
        },
        {
            history_id: 2,
            userName: 'Jane',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorum earum ipsa nisi unde voluptates!',
            date: '21:49:48',
        },
        {
            history_id: 3,
            userName: 'John',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur fugiat pariatur placeat quam? Amet facilis odio perferendis quam similique tempora.',
            date: '21:48:12',
        },
        {
            history_id: 4,
            userName: 'Jane',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorum earum ipsa nisi unde voluptates!',
            date: '21:49:48',
        },
        {
            history_id: 5,
            userName: 'John',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur fugiat pariatur placeat quam? Amet facilis odio perferendis quam similique tempora.',
            date: '21:48:12',
        },
        {
            history_id: 6,
            userName: 'Jane',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorum earum ipsa nisi unde voluptates!',
            date: '21:49:48',
        },
    ]

};
function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_USERS_DATA':
            return {
                ...state,
                users: action.payload
            };
        case 'LOAD_HISTORY_DATA':
            return {
                ...state,
                history: action.payload
            };
        default:
            return state;
    }
    // return state;
}
export default rootReducer;