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
              '<div class="timer-device-toggle">' +
                '<div class="timer-device-toggle-mins noselect">min</div>' +
                '<div class="timer-device-toggle-btnSlider">' +
                  '<div class="timer-device-toggle-btn"></div>' +
                '</div>' +
                '<div class="timer-device-toggle-hrs noselect">hrs</div>' +
              '</div>' +
              '<div class="timer-device-updwn">' +
                '<div class="timer-device-updwn-up"></div>' +
                '<div class="timer-device-updwn-down"></div>' +
              '</div>' +
              '<div class="timer-device-slider">' +
                '<div class="timer-device-slider-btn"></div>' +
              '</div>' +
            '</div>'
        },
        stateMap = { 
            $container: undefined
            },
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
        jqueryMap = { 
            $container : $container
            // $power : $container.find('.timer-device-power'),
            // $clock: $container.find('.timer-device-screen-clock'),
            // $digits: $container.find('.timer-device-screen-digits'),
            // $units: $container.find('.timer-device-screen-units')
        };
    };
    // End DOM method /setJqueryMap/
    //--------------------- END DOM METHODS --------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin Public method /initModule/
    initModule = function ($container) {
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html)
        setJqueryMap();

        // configure and initialize feature modules
        timer.power.configModule( {} );
        timer.power.initModule( jqueryMap.$container );
    };
    // End PUBLIC method /initModule/
    return {initModule:initModule};
    //------------------- END PUBLIC METHODS ---------------------
}());
