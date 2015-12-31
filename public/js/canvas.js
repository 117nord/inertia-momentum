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
        },
        level;

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

    function drawRect(ctx, rect) {
        ctx.save();

        ctx.translate(rect.position[0], rect.position[1]);

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.moveTo(-rect.width / 2, rect.height / 2);
        ctx.lineTo(rect.width / 2, rect.height / 2);
        ctx.lineTo(rect.width / 2, -rect.height / 2);
        ctx.lineTo(-rect.width / 2, -rect.height / 2);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    function drawLine(ctx, line) {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(10, 175, 10)';

        ctx.moveTo(line.p1[0], line.p1[1]);
        ctx.lineTo(line.p2[0], line.p2[1]);
        ctx.stroke();

        ctx.restore();
    }
    
    function init(lev) {
        canvas = document.getElementById('gameCanvas');
        level = lev;
    }

    function draw(state) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        // Put the origin at the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Invert y axix so that positive numbers go up.
        ctx.scale(1, -1);

        // Draw level
        level.items.forEach(function (item) {
            switch (item.type) {
            case 'box':
            case 'rectangle':
                drawRect(ctx, item);
                break;
                
            case 'goal':
                drawLine(ctx, item);
                break;
            }
        });

        drawShip(state);

        ctx.restore();
    }

    return {
        init: init,
        draw: draw
    };
}());
