/*
 * timer.power.js
 * power button module for SPA
*/

timer.power = (function () {
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String() +
        '<div class="timer-power off">' +
          '<div class="timer-power-button">' +
            '<div class="timer-power-txt noselect">pwr</div>' +
          '</div>' +
          '<div class="timer-screen">' +
            '<div class="timer-screen-clock"></div>' +
            '<div class="timer-screen-digits screen-text numbers">8888</div>' +
            '<div class="timer-screen-units screen-text unit-label">min</div>' +
          '</div>' +
        '</div>',
      settable_map : {}
    },
    stateMap  = {
      $append_target: null,
      is_device_off: true
    },
    jqueryMap = {},

    setJqueryMap, togglePower, onClickPower, configModule, initModule
    ;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var 
      $append_target = stateMap.$append_target,
      $power = $append_target.find('.timer-power');

    jqueryMap = { 
      $power : $power,
      $powerBtn : $power.find('.timer-power-button'),
      $clock: $power.find('.timer-screen-clock'),
      $digits: $power.find('.timer-screen-digits'),
      $units: $power.find('.timer-screen-units')
    };
  };
  // End DOM method /setJqueryMap/
    
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
          jqueryMap.$powerBtn.addClass('on').removeClass('off');
          jqueryMap.$clock.css('display', 'block');
          jqueryMap.$digits.css('display', 'block');
          jqueryMap.$units.css('display', 'block');
          stateMap.is_device_off = false;
      }
      else {
          jqueryMap.$powerBtn.addClass('off').removeClass('on');
          jqueryMap.$clock.css('display', 'none');
          jqueryMap.$digits.css('display', 'none');
          jqueryMap.$units.css('display', 'none');
          stateMap.is_device_off = true;
      }
      // end turn on

      return true;

  };
  // End DOM method /togglePower/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  onClickPower = function( event ) {
      togglePower(stateMap.is_device_off);
      return false;
  };
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /configModule/
  // Purpose    : Adjust configuration of allowed keys
  // Arguments  : A map of settable keys and values
  //   * color_name - color to use
  // Settings   :
  //   * configMap.settable_map declares allowed keys
  // Returns    : true
  // Throws     : none
  //
  configModule = function ( input_map ) {
    timer.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $append_target ) {
    $append_target.append( configMap.main_html );
    stateMap.$append_target = $append_target;
    setJqueryMap();
        
    stateMap.is_device_off = true;
    jqueryMap.$power.click(onClickPower);

    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
