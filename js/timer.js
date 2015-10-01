/*
 * timer.js
 * root namespace module
*/

var timer = (function() {
    var initModule = function($container) {
        console.log('$container', $container);
        timer.device.initModule($container);
    }

    return {initModule:initModule};
}());