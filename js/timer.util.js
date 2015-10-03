/*
* spa.util.js
* General JavaScript utilities
*/

timer.util = (function () {
  var setConfigMap;
  // End Public constructor /makeError/

  // Begin Public method /setConfigMap/
  // Purpose: Common code to set configs in feature modules
  // Arguments:
  //   * input_map    - map of key-values to set in config
  //   * settable_map - map of allowable keys to set
  //   * config_map   - map to apply settings to
  // Returns: true
  // Throws : Exception if input key not allowed
  //
  setConfigMap = function ( arg_map ){
    var
      input_map    = arg_map.input_map,
      settable_map = arg_map.settable_map,
      config_map   = arg_map.config_map,
      key_name, error;

    for ( key_name in input_map ){
      if ( input_map.hasOwnProperty( key_name ) ){
        if ( settable_map.hasOwnProperty( key_name ) ){
          config_map[key_name] = input_map[key_name];
        }
        else {
          throw error;
        }
      }
    }
  };
  // End Public method /setConfigMap/

  return {
    setConfigMap : setConfigMap
  };
}());