/*jslint
    browser, for, fudge, maxlen: 120
*/

/*global
    window, document
*/

/*property
*/

window.INERTIA_MOMENTUM = window.INERTIA_MOMENTUM || {};
window.INERTIA_MOMENTUM.main = function () {
    'use strict';

    var input,
        canvas;

    function tick() {
        var state = input.getCurrentState();
        state.timestamp = Date.now();
        console.log(state);
    }

    document.addEventListener("DOMContentLoaded", function () {
        //setInterval(tick, 1000 / 40);
        input = INERTIA_MOMENTUM.input;
        canvas = INERTIA_MOMENTUM.canvas;
        canvas.init();
        input.start();
        
    }, false);

}();
