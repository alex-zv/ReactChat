export function loadUsersData(payload) {
    return { type: "LOAD_USERS_DATA", payload };
}

export function loadHistoryData(payload) {
    return { type: "LOAD_HISTORY_DATA", payload };
}