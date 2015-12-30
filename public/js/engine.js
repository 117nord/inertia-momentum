/*jslint
    browser, for, fudge, maxlen: 120
*/

/*global
    window, document, console
*/

/*property
*/

window.INERTIA_MOMENTUM = window.INERTIA_MOMENTUM || {};
window.INERTIA_MOMENTUM.engine = (function () {
    'use strict';
    var SHIP_GROUP = Math.pow(2,1),
        ENV_GROUP = Math.pow(2,2),
        dt = 1/60,
        input = window.INERTIA_MOMENTUM.input,
        world,
        ship,
        shipProps = {
            mass: 4,
            position: [0, 0],
            angularVelocity: 0,
            damping: 0,
            angularDamping: 0
        },
        lastTimeSeconds = 0,
        width,
        height;

    // If the body is out of space bounds, warp it to the other side
    function warp(body){
        var p = body.position;
        if (p[0] >  width / 2) p[0] = -width / 2;
        if (p[1] >  height/ 2) p[1] = -height / 2;
        if (p[0] < -width / 2) p[0] = width / 2;
        if (p[1] < -height/ 2) p[1] = height / 2;
    }

    function init(w, h) {
        var shape = new p2.Circle({
                radius: 40
            });
            
        width = w;
        height = h;
        
        // Init p2.js
        world = new p2.World({
          gravity : [0,0]
        });

        ship = new p2.Body(shipProps);
        ship.addShape(shape);
        shape.collisionGroup = SHIP_GROUP;
        shape.collisionMask = ENV_GROUP;
        
        world.applyGravity = false;
        world.addBody(ship);
    }

    function update(state) {
        var timeSeconds = state.timestamp / 1000,
            elapse = lastTimeSeconds && (timeSeconds - lastTimeSeconds);

        lastTimeSeconds = timeSeconds;
        
        if (state.thrust) {
            ship.applyForceLocal([0, 100]);
        }
        
        ship.angularVelocity = 2 * state.rotation;
        
        
        world.step(dt, elapse, 10);
        
        state.x = ship.interpolatedPosition[0];
        state.y = ship.interpolatedPosition[1];
        
        state.angle = ship.interpolatedAngle;
        
        warp(ship);
    }

    return {
        init: init,
        update: update
    };
}());
