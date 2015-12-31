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
            angularVelocity: 0,
            damping: 0,
            angularDamping: 0
        },
        lastTimeSeconds = 0,
        width,
        height;

    // If the body is out of space bounds, warp it to the other side
    function warp(body) {
        var p = body.position;
        if (p[0] >  width / 2) {
            p[0] = -width / 2;
        }
        if (p[1] >  height/ 2) {
            p[1] = -height / 2;
        }
        if (p[0] < -width / 2) {
            p[0] = width / 2;
        }
        if (p[1] < -height/ 2) {
            p[1] = height / 2;
        }
    }

    /*
        Adds a level item to the physics world.
            "name": "outer bound",
            "type": "rectangle",
            "position": [0, 0],
            "width": 640,
            "height": 480

    */
    function addToWorld(world, item) {
        var shape,
            body,
            x,
            y;
            
        console.log('Creating ' + item.name);
        
        switch(item.type) {
        case 'box':
            body = new p2.Body({
                mass: 0,
                position: item.position
            });
            
            shape = new p2.Box({
                width: item.width,
                height: item.height
            });
            
            shape.collisionGroup = ENV_GROUP;
            shape.collisionMask = SHIP_GROUP;
            body.addShape(shape);
            break;
            
        case 'rectangle':
            x = item.position[0];
            y = item.position[1];
            // top
            body = new p2.Body({
                mass: 0,
                position: [x, y + item.height / 2],
                angle: 0
            });
            shape = new p2.Line({
                length: item.width
            });
            shape.collisionGroup = ENV_GROUP;
            shape.collisionMask = SHIP_GROUP;
            body.addShape(shape);
            world.addBody(body);
            // bottom
            body = new p2.Body({
                mass: 0,
                position: [x, y - item.height / 2],
                angle: 0
            });
            shape = new p2.Line({
                length: item.width
            });
            shape.collisionGroup = ENV_GROUP;
            shape.collisionMask = SHIP_GROUP;
            body.addShape(shape);
            world.addBody(body);
            // left
            body = new p2.Body({
                mass: 0,
                position: [x - item.width / 2, y],
                angle: Math.PI / 2
            });
            shape = new p2.Line({
                length: item.height
            });
            shape.collisionGroup = ENV_GROUP;
            shape.collisionMask = SHIP_GROUP;
            body.addShape(shape);
            world.addBody(body);
            // right
            body = new p2.Body({
                mass: 0,
                position: [x + item.width / 2, y],
                angle: Math.PI / 2
            });
            shape = new p2.Line({
                length: item.height
            });
            shape.collisionGroup = ENV_GROUP;
            shape.collisionMask = SHIP_GROUP;
            body.addShape(shape);
            world.addBody(body);
            break;
            
        case 'goal':
            console.log('goal not implemented in engine');
            break;
        }
    }
    
    function init(level) {
        var body,
            shape;

        width = level.width;
        height = level.height;

        // Init p2.js
        world = new p2.World({
          gravity : [0,0]
        });
        world.applyGravity = false;

        // set perfect collisions as the default
        world.defaultContactMaterial.friction = 0;
        world.defaultContactMaterial.restitution = 1;

        // add the level items
        level.items.forEach(function (item) {
            addToWorld(world, item);
        });
        
        // create the player's ship
        shipProps.position = level.startingPosition;
        shipProps.angle = level.startingAngle;
        ship = new p2.Body(shipProps);
        shape = new p2.Circle({
            radius: 20
        });
        shape.collisionGroup = SHIP_GROUP;
        shape.collisionMask = ENV_GROUP;
        ship.addShape(shape);
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
    }

    return {
        init: init,
        update: update
    };
}());
