/*
 * timer.js
 * root namespace module
*/

var timer = (function() {
    var initModule = function($container) {
        timer.shell.initModule($container);
    }

    return {initModule:initModule};
}());