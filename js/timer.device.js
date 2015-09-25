/*
 * timer.device.js
 * Shell module for timer
*/
timer.device = (function() {
    //-------- BEGIN MODULE SCOPE VARIABLES ----------
    var 
        configMap = {
            main_html : String()
            + '<div class="timer-device">'
                + '<div class="timer-device-screen"></div>'
            + '</div>'
        },
        stateMap = { $container: null },
        jqueryMap = {},
        setJqueryMap, initModule;
    //---------------- END MODULE SCOPE VARIABLES ----------
    //-------------------- BEGIN UTILITY METHODS -----------------
    // (utility methods for functions that don't interact with DOM)
    //--------------------- END UTILITY METHODS ------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setjQueryMap/
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };
    // End DOM method /setJqueryMap/
    //--------------------- END DOM METHODS --------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin Public method /initModule/
    initModule = function ($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html)
        setJqueryMap();
    };
    // End PUBLIC method /initModule/
    return {initModule:initModule};
    //------------------- END PUBLIC METHODS ---------------------
}());
