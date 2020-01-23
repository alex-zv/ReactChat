import axios from "axios";

export const customChatApi = {
    getMessageHistory(chat_id) {
        return axios({
            method: 'post',
            url: '/api/get_chat_history.php',
            data: 'chat_id=' + chat_id
        })
    },
    sendMessage (message) {
        return axios({
            method: 'post',
            url: '/api/send_message.php',
            data: 'message=' + message
        });
    }
};