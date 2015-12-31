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
        canvas,
        level = {
            "name": "zero",
            "width": 640,
            "height": 480,
            "startingPosition": [-240, 0],
            "startingAngle": 0,
            "items": [
                {
                    "name": "outer bound",
                    "type": "rectangle",
                    "position": [0, 0],
                    "width": 640,
                    "height": 480
                }, {
                    "name": "inner bound",
                    "type": "rectangle",
                    "position": [0, 0],
                    "width": 320,
                    "height": 240
                },
                {
                    "name": "goal",
                    "type": "goal",
                    "p1": [160, 0],
                    "p2": [320, 0]
                }
            ]
        };

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
        engine.init(level);
        canvas.init(level);
        input.start();
        
    }, false);

    requestAnimationFrame(tick);
}();
