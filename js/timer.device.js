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
                '<div class="timer-device-toggle-mins noselect">min</div>' +
                '<div class="timer-device-toggle-btnSlider">' +
                  '<div class="timer-device-toggle-btn"></div>' +
                '</div>' +
                '<div class="timer-device-toggle-hrs noselect">hrs</div>' +
              '</div>' +
              '<div class="timer-device-power off">' +
                '<div class="timer-device-power-txt noselect">pwr</div>' +
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
        stateMap = { 
            $container: null,
            is_device_off: true
            },
        jqueryMap = {},
        setJqueryMap, togglePower, onClickPower, initModule;
    //---------------- END MODULE SCOPE VARIABLES ----------
    //-------------------- BEGIN UTILITY METHODS -----------------
    // (utility methods for functions that don't interact with DOM)
    //--------------------- END UTILITY METHODS ------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setjQueryMap/
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = { 
            $container : $container,
            $power : $container.find('.timer-device-power'),
            $clock: $container.find('.timer-device-screen-clock'),
            $digits: $container.find('.timer-device-screen-digits'),
            $units: $container.find('.timer-device-screen-units')
        };
    };
    // Begin DOM method /togglePower/
    // Purpose   : turns the device on or off
    // Arguments :
    //   * turn_on - if true, turns device on; if false turns off
    //   * callback  - optional function to execute at end of animation
    // Returns   : boolean
    //   * true  - turn-on animation activated
    //   * false - turn-on animation not activated
    // State     : sets stateMap.is_device_off
    //   * true  - device is off
    //   * false - device is on
    //
    togglePower = function( turn_on ) {
        var 
            is_on = jqueryMap.$power.hasClass('on'),
            is_off = jqueryMap.$power.hasClass('off'),
            isTurningOn = ! is_on && ! is_off;

        // avoiding race condition - it has to be on or off
        if (isTurningOn) {
            return false;
        }

        // begin turn on device
        if (turn_on) {
            jqueryMap.$power.addClass('on').removeClass('off');
            jqueryMap.$clock.css('display', 'block');
            jqueryMap.$digits.css('display', 'block');
            jqueryMap.$units.css('display', 'block');
            stateMap.is_device_off = false;
        }
        else {
            jqueryMap.$power.addClass('off').removeClass('on');
            jqueryMap.$clock.css('display', 'none');
            jqueryMap.$digits.css('display', 'none');
            jqueryMap.$units.css('display', 'none');
            stateMap.is_device_off = true;
        }
        // end turn on

        return true;

    };
    // End DOM method /setJqueryMap/
    //--------------------- END DOM METHODS --------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    onClickPower = function( event ) {
        togglePower(stateMap.is_device_off);
        return false;
    }
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin Public method /initModule/
    initModule = function ($container) {
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html)
        setJqueryMap();

        // intialize the power button and bind click handler
        stateMap.is_device_off = true;
        jqueryMap.$power.click(onClickPower);
    };
    // End PUBLIC method /initModule/
    return {initModule:initModule};
    //------------------- END PUBLIC METHODS ---------------------
}());
