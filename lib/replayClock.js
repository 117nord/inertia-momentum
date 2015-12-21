/*
    The replayClock module is a clock factory.
    It returns clocks for which the time doesn't advance by itself.
    The clock's time only changes when you call the setTimestamp() function.
    Can be used instead of the clock module when you need to control the time.
*/

/*jslint
node, es6, for, fudge, maxlen: 120
*/

/*property
    exports, getTimestamp, setTimestamp
*/

'use strict';

function replayClockFactory(initialTimestamp) {
    let timestamp = initialTimestamp || 0;

    return {
        getTimestamp: () => timestamp,
        setTimestamp: function (ts) {
            timestamp = ts;
        }
    };
}

module.exports = replayClockFactory;
