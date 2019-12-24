/*class Lib {
    constructor () {
        console.log('lib init');
    }

    testFunc() {
        console.log('test func');
    }
}

let lib = {
    testFunc: function () {

    }
};*/
//let lib = new Lib();

function parseJsonData(data) {
    let key, ret = '';
    for (key in data) {
        ret += key + '=' + data[key] + '&';
    }
    return ret.substring(0, ret.length - 1);
}

function secondsToTime(seconds) {

    /*let hours = Math.round(seconds / 60 / 60);

    let min = Math.round(( seconds - (hours * 60) ) / 60);

    let sec = Math.round(( seconds - (hours * 60) - (min * 60) ));*/

    let hours = Math.floor(seconds / 60 / 60),
        min = Math.floor((seconds / 60) - (hours * 60) ),
        sec = Math.floor(( seconds - (hours * 60 * 60) - (min * 60) ));

    min = addLeadingZero(min);
    sec = addLeadingZero(sec);


    return {
        hours: hours,
        min: min,
        sec: sec,
        timeInSec: seconds
    };

    function addLeadingZero(num) {

        if (num.toString().length < 2) {
            return  '0' + num;
        } else {
            return num;
        }
    }
}

function countTaskTime(data, offset) {

    let time = 0;

    for (let i = 0, l = data.length; i < l; i++) {
        let item = data[i];

        let task_start, task_end, diff;
        task_start = new Date(item.task_start);
        task_end = new Date(item.task_end);

        diff = task_end - task_start;
        time += diff;
    }


    if (offset) {
        time += offset;
    }

    time = time / 1000;

    /*let hours = Math.floor(time / 60 / 60);

    let min = Math.floor(( time - (hours * 60) ) / 60);

    let sec = Math.floor(( time - (hours * 60) - (min * 60) ));*/

    return secondsToTime(time);

}



export {secondsToTime, countTaskTime, parseJsonData};