var App = App || {};
    App.three = App.three || {};
    App.environment = App.environment || {};



/**
* setup for model after it's loaded called in jsonLoader
*
* @method environment.init
* @return {void}
*/
App.environment.init = function(){
  App.log("App.coenvironmentlladaLoader.init");

  App.three.add(App.three.mountainMaster);

  App.three.mountainMaster.recieveShadow = true;
  App.three.mountainMaster.castShadow = true;

  App.three.mountainMaster.position.z = -5;
  App.three.mountainMaster.position.y = -8;

  App.three.mountainMaster.scale.x = 0.03;
  App.three.mountainMaster.scale.y = 0.008;
  App.three.mountainMaster.scale.z = 0.03;

}
