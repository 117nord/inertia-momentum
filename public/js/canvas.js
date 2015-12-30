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
        hull = {
            top: {x: 0, y: -40},
            bleft: {x: -30, y: 20},
            bright: {x: 30, y: 20},
            midleft: {x: -15, y: -10},
            midright: {x: 15, y: -10},
            midbottom: {x: 0, y: 20}
        };

    function drawShip(state) {
        ctx.save();

        ctx.translate(state.x, state.y);
        ctx.rotate(state.angle);
        ctx.scale(0.5, 0.5);

        // hull
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.moveTo(0, 40);
        ctx.lineTo(31, -25);
        ctx.lineTo(-31, -25);
        ctx.closePath();
        ctx.stroke();

        // engine fire
        if (state.thrust) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.moveTo(-10, -25);
            ctx.lineTo(0, -35);
            ctx.lineTo(10, -25);
            ctx.stroke();
        }

        // bounding circle 
        /*
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.arc(0, 0, 40, 0, 2 * Math.PI, true);
        ctx.stroke();
        */
        
        ctx.restore();
    }

    function init() {
        canvas = document.getElementById('gameCanvas');
    }

    function draw(state) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        // Draw bounds
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.stroke();


        // Put the origin at the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Invert y axix so that positive numbers go up.
        ctx.scale(1, -1);
        
        drawShip(state);
        
        ctx.restore();
    }

    return {
        init: init,
        draw: draw
    };
}());
