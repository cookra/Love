var App = App || {};
    App.utils = App.utils || {};

    App.utils.config = {
      debugMode: true
    }

  /**
   *	Logs a message to the console
   *
   *  @method log
   *	@param message The message to log
   * 	@return {void}
   */
  App.log = function(message){
  	if (App.utils.config.debugMode && window.console){
  		console.log(message);
  	}
  };


  /**
   *	Returns random value between min (inclusive) and max (inclusive)
   *
   *  @method RandRange
   *	@param receive mix and max values, returns random value
   * 	@return {void}
   */
  App.randRange = function (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  /**
   *	Scales a threegroup proportionally
   *
   *  @method proportionScale
   *	@param receive threegroup and amt to scale
   * 	@return {void}
   */
  App.proportionScale = function(type, amt){
    App.three[type].scale.x = amt
    App.three[type].scale.y = amt
    App.three[type].scale.z = amt
  }
