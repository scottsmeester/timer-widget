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
                '<div class="timer-device-screen-digits screen-text numbers"></div>' +
                '<div class="timer-device-screen-units screen-text unit-label">min</div>' +
              '</div>' +
              '<div class="timer-device-toggle">' +
                '<div class="timer-device-toggle-mins noselect">min</div>' +
                '<div class="timer-device-toggle-btnSlider">' +
                  '<div class="timer-device-toggle-btn mins"></div>' +
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
            is_device_off: true,
            is_units_mins: true,
            timer_digits: null,
            slider_val: null
            },
        jqueryMap = {},
        slider_scale = {
            unit_count_tot: 55,
            pixels_per_unit: 3
        },
        blink_timeout = 1400,
        setJqueryMap, togglePower, onClickPower, onClickUnits, onClickUpDwn,  initModule, resizeDigits;
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
            $units: $container.find('.timer-device-screen-units'),
            $units_toggle: $container.find('.timer-device-toggle-btn'),
            $slider_btn: $container.find('.timer-device-slider-btn'),
            $slider: $container.find('.timer-device-slider'),
            $upBtn: $container.find('.timer-device-updwn-btns-up'),
            $downBtn: $container.find('.timer-device-updwn-btns-down')
        };
    };
    // Begin DOM method /togglePower/
    togglePower = function (turn_on) {
        var 
            is_on = jqueryMap.$power.hasClass('on'),
            is_off = jqueryMap.$power.hasClass('off'),
            is_turning_on = ! is_on && ! is_off;

        // set default numbers on screen
        jqueryMap.$digits.html('8888');

        // avoiding race condition - it has to be on or off
        if (is_turning_on) {
            return false;
        }

        // begin turn on device
        if (turn_on) {
            jqueryMap.$power.addClass('on').removeClass('off');
            jqueryMap.$clock.css('display', 'block');
            jqueryMap.$digits.css('display', 'block');
            jqueryMap.$units.css('display', 'block');
            stateMap.is_device_off = false;

            // make digits set to zero - after 1 second (for effect)
            setTimeout(function() {
                jqueryMap.$digits.html(stateMap.slider_val);
            }, blink_timeout);

            jqueryMap.$slider.slider('enable');

        }
        else {
            jqueryMap.$power.addClass('off').removeClass('on');
            jqueryMap.$clock.css('display', 'none');
            jqueryMap.$digits.css('display', 'none');
            jqueryMap.$units.css('display', 'none');
            stateMap.is_device_off = true;
            jqueryMap.$slider.slider('disable');
        }
        // end turn on

        return true;

    };
    // Begin DOM method /toggleUnits/
    toggleUnits = function (switch_units) {
        is_mins = jqueryMap.$units_toggle.hasClass('mins');
        is_hrs = jqueryMap.$units_toggle.hasClass('hrs');
        is_changing_units = ! is_mins && ! is_hrs

        if ( is_changing_units ) {
            return false;
        }

        if ( switch_units ) {
            jqueryMap.$units_toggle.addClass('hrs').removeClass('mins');
            jqueryMap.$units.html('<span class="hrsLbl">h</span><span class="hrsLbl">r</span><span class="hrsLbl">s</span>');
            stateMap.is_units_mins = false;
        }
        else {
            jqueryMap.$units_toggle.addClass('mins').removeClass('hrs');
            jqueryMap.$units.html('min');
            stateMap.is_units_mins = true;
        }

        return true;
    };
    // End DOM method /setJqueryMap/
    //--------------------- END DOM METHODS --------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    onClickPower = function (event) {
        togglePower(stateMap.is_device_off);
        return false;
    }
    onClickUnits = function (event) {
        if (stateMap.is_device_off !== true) {
            toggleUnits(stateMap.is_units_mins);
            return false;
        }
    }
    onClickUp = function (event) {
        stateMap.slider_val = stateMap.slider_val + 1;
        jqueryMap.$digits.html(stateMap.slider_val);
        jqueryMap.$slider.slider(
        {
          value: stateMap.slider_val
        });
    }
    onClickDwn = function (event) {
        if (stateMap.is_device_off !== true) {
            stateMap.slider_val = stateMap.slider_val - 1;
            jqueryMap.$digits.html(stateMap.slider_val);
            jqueryMap.$slider.slider(
            {
              value: stateMap.slider_val
            });
        }
    }
    sliderMove = function( event, ui ) {
        if (stateMap.is_device_off !== true) {
            stateMap.slider_val = ui.value;
            jqueryMap.$digits.html(stateMap.slider_val);
            jqueryMap.$slider.slider(
            {
              orientation: "horizontal",
              range: "min",
              min: 0,
              max: 55,
              value: stateMap.slider_val
            });
            return false;
        }
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

        // initialzie the unit toggle and bind click handler
        stateMap.is_units_mins = true;
        jqueryMap.$units_toggle.click(onClickUnits);

        stateMap.slider_val = 0;
        jqueryMap.$slider.slider(
        {
            disabled: true,
            slide: sliderMove
        });

        jqueryMap.$upBtn.click(onClickUp);
        jqueryMap.$downBtn.click(onClickDwn);
    };
    // End PUBLIC method /initModule/
    return {initModule:initModule};
    //------------------- END PUBLIC METHODS ---------------------
}());
