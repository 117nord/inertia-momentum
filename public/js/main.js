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
        engine,
        canvas;

    function tick(timestamp) {
        var state = input.getCurrentState();
        state.timestamp = timestamp;
        engine.update(state);
        canvas.draw(state);
     // console.log(state);
        requestAnimationFrame(tick);
    }

    document.addEventListener("DOMContentLoaded", function () {
        var canvasEl = document.getElementById('gameCanvas');
        
        input = INERTIA_MOMENTUM.input;
        canvas = INERTIA_MOMENTUM.canvas;
        engine = INERTIA_MOMENTUM.engine;
        engine.init(canvasEl.width, canvasEl.height);
        canvas.init();
        input.start();
        
    }, false);

    requestAnimationFrame(tick);
}();
