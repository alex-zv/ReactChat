const serializeData = (data) => {
    let key, ret = '';
    for (key in data) {
        ret += key + '=' + data[key] + '&';
    }
    return ret.substring(0, ret.length - 1);
};

export {serializeData};