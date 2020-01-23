import {customChatApi} from '../libs/api';
export function setLoginStatus(payload) {
    return { type: "SET_LOGIN_STATUS", payload };
}

export function toggleIsLoadingData(payload) {
    return { type: "IS_GETTING_HISTORY", payload };
}

export const getHistoryData = (chat_id) => {
    return (dispatch) => {
        dispatch(toggleIsLoadingData(true));

        return customChatApi.getMessageHistory(chat_id)
            .then((response) => {
                if (!response.data.error) {

                    dispatch(toggleIsLoadingData(false));
                    dispatch(getHistoryDataSuccess(response.data))

                } else {
                    dispatch(toggleIsLoadingData(false));
                    dispatch(getHistoryDataError(response.data.error));
                }

            }).catch(function (error) {

            dispatch(toggleIsLoadingData(false));
            dispatch(getHistoryDataError(error));
        });
    }
};

const getHistoryDataSuccess = (payload) => {
    return { type: "GET_HISTORY_DATA_SUCCESS", payload };
};

const getHistoryDataError = (payload) => {
    return { type: "GET_HISTORY_DATA_ERROR", payload };
};


// send message
export const sendMessage = (message) => {
    return (dispatch) => {
        dispatch(toggleIsSendingMessage(true));

        return customChatApi.sendMessage(message)
            .then((response) => {
                if (!response.data.error) {

                    dispatch(toggleIsSendingMessage(false));
                    dispatch(sendingMessageSuccess(response.data))

                } else {
                    dispatch(toggleIsLoadingData(false));
                    dispatch(sendingMessageError(response.data.error));
                }

            }).catch(function (error) {

                dispatch(toggleIsSendingMessage(false));
                dispatch(sendingMessageError(error));
            });
    }
};

const toggleIsSendingMessage = (payload) => {
    return { type: "IS_SENDING_MESSAGE", payload };
};
const sendingMessageSuccess = (payload) => {
    return { type: "SENDING_MESSAGE_SUCCESS", payload };
};

const sendingMessageError = (payload) => {
    return { type: "SENDING_MESSAGE_ERROR", payload };
};
// send message END