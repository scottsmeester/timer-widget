/*
 * timer.device.js
 * Shell module for timer
*/
timer.device = (function() {
    //-------- BEGIN MODULE SCOPE VARIABLES ----------
    var 
        configMap = {
            main_html : String() +
            '<div class="timer-device">' +
              '<div class="timer-device-screen">' +
                '<div class="timer-device-screen-clock"></div>' +
                '<div class="timer-device-screen-digits screen-text numbers">8888</div>' +
                '<div class="timer-device-screen-units screen-text unit-label">min</div>' +
              '</div>' +
              '<div class="timer-device-toggle">' +
                '<div class="timer-device-toggle-mins">min</div>' +
                '<div class="timer-device-toggle-btnSlider">' +
                  '<div class="timer-device-toggle-btn"></div>' +
                '</div>' +
                '<div class="timer-device-toggle-hrs">hrs</div>' +
              '</div>' +
              '<div class="timer-device-power">' +
                '<div class="timer-device-power-txt">pwr</div>' +
              '</div>' +
              '<div class="timer-device-updwn-btns">' +
                '<div class="timer-device-updwn-btns-up"></div>' +
                '<div class="timer-device-updwn-btns-down"></div>' +
              '</div>' +
              '<div class="timer-device-slider">' +
                '<div class="timer-device-slider-btn"></div>' +
              '</div>' +
            '</div>'
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
