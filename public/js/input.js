/*jslint
    browser, for, fudge, maxlen: 120
*/

/*global
    window, document
*/

/*property
*/

window.INERTIA_MOMENTUM = window.INERTIA_MOMENTUM || {};
window.INERTIA_MOMENTUM.input = function () {
    'use strict';
    var ROTATE_NONE = 0,
        ROTATE_LEFT = -1,
        ROTATE_RIGHT = 1,
        state = {
            thrusting: false,
            rotate: ROTATE_NONE
        };

    /* Returns a representation of the current input state. */
    function getCurrentState() {
        return {
            thrusting: state.thrusting,
            rotate: state.rotate
        };
    }

    function onKeyDown(event) {
        console.log('keyDown:');
        console.log(event);
    }

    function onKeyUp(event) {
        console.log('keyUp:');
        console.log(event);
    }

    // Register key event handlers
    document.addEventListener('keyDown', onKeyDown, true);
    document.addEventListener('keyUp', onKeyUp, true);
    
    return {
        getCurrentState: getCurrentState
    };
}();
