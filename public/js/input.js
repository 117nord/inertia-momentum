/*jslint
    browser, for, fudge, maxlen: 120
*/

/*global
    window, document, console
*/

/*property
*/

window.INERTIA_MOMENTUM = window.INERTIA_MOMENTUM || {};
window.INERTIA_MOMENTUM.input = (function () {
    'use strict';
    var ROTATE_NONE = 0,
        ROTATE_LEFT = 1,
        ROTATE_RIGHT = -1,
        state = {
            thrust: false,
            rotation: ROTATE_NONE
        },
        canvas;

    function onStateChange() {
        // TODO: Should use an event emitter instead.
        console.log(state);
    }

    function thrusting(thrust) {
        if (state.thrust !== thrust) {
            state.thrust = thrust;
            onStateChange();
        }
    }

    function rotate(rotation) {
        if (state.rotation !== rotation) {
            state.rotation = rotation;
            onStateChange();
        }
    }

    /* Returns a representation of the current input state. */
    function getCurrentState() {
        return {
            thrust: state.thrust,
            rotation: state.rotation
        };
    }

    function onKeyDown(event) {
        switch (event.key) {
        case 'ArrowUp':
            thrusting(true);
            break;
        case 'ArrowLeft':
            rotate(ROTATE_LEFT);
            break;
        case 'ArrowRight':
            rotate(ROTATE_RIGHT);
            break;
        }
    }

    function onKeyUp(event) {
        switch (event.key) {
        case 'ArrowUp':
            thrusting(false);
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            rotate(ROTATE_NONE);
            break;
        }
    }

    function start() {
        canvas = INERTIA_MOMENTUM.canvas;
        
        // Register key event handlers
        console.log('Registering key event handlers');
        document.addEventListener('keydown', onKeyDown, true);
        document.addEventListener('keyup', onKeyUp, true);
    }

    function stop() {
        // Remove key event handlers
        document.removeEventListener('keyDown', onKeyDown, true);
        document.removeEventListener('keyUp', onKeyUp, true);
    }

    return {
        getCurrentState: getCurrentState,
        start: start,
        stop: stop
    };
}());
