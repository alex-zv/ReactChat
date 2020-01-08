function arraySort (array, sortType, fieldName) {
    let sortFunc;
    if (!fieldName) fieldName = 'id';
    if (sortType === 'ASC') {
        sortFunc = function (a,b) {
            if (a[fieldName] < b[fieldName]) return -1;
            if (a[fieldName] > b[fieldName]) return 1;
            return 0;
        }
    } else if (sortType === 'DESC')  {
        sortFunc = function (a,b) {
            if (a[fieldName] > b[fieldName]) return -1;
            if (a[fieldName] < b[fieldName]) return 1;
            return 0;
        }
    } else {
        sortFunc = function (a,b) {
            if (a[fieldName] > b[fieldName]) return -1;
            if (a[fieldName] < b[fieldName]) return 1;
            return 0;
        }
    }

    return array.sort(sortFunc);
}

export default arraySort;