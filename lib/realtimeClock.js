/*jslint
node, es6, for, fudge, maxlen: 120
*/

/*property
    exports, getTimestamp, now, create
*/

'use strict';

let clock = {
    getTimestamp: function () {
        return Date.now();
    }
};

function realtimeClockFactory() {
    return Object.create(clock);
}

module.exports = realtimeClockFactory;
