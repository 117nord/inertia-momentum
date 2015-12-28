/*jslint
    browser, for, fudge, maxlen: 120
*/

/*global
    window, document, console
*/

/*property
*/

window.INERTIA_MOMENTUM = window.INERTIA_MOMENTUM || {};
window.INERTIA_MOMENTUM.canvas = (function () {
    'use strict';
    var canvas,
        ctx,
        input;

    function drawShip(x, y, state) {
        ctx.save();

        ctx.translate(x, y);
        //ctx.rotate((Math.PI/180)*90);

        // hull
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.moveTo(0, -30);
        ctx.lineTo(30, 30);
        ctx.lineTo(-30, 30);
        ctx.closePath();
        ctx.stroke();

        // engine fire
        if (state.thrust) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.moveTo(-10, 30);
            ctx.lineTo(0, 40);
            ctx.lineTo(10, 30);
            ctx.stroke();
        }

        ctx.restore();
    }

    function init() {
        input = INERTIA_MOMENTUM.input;
        canvas = document.getElementById('gameCanvas');

        draw();
    }

    function draw() {
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawShip(50, 50, input.getCurrentState());
    }

    return {
        init: init,
        draw: draw
    };
}());
