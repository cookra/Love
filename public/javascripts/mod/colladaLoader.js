var App = App || {};
    App.three = App.three || {};
    App.colladaLoader = App.colladaLoader || {};



/**
* setup for model after it's loaded called in colladaLoader
*
* @method colladaLoader.init
* @return {void}
*/
App.colladaLoader.init = function(){
  App.log("App.colladaLoader.init");

  App.three.goCollada = new THREE.ColladaLoader();

  App.colladaLoader.basicMaterial = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors, ambient: 0xbeeffa, color: 0xbeeffa, specular: 0xffffff, shininess: 50, shading: THREE.SmoothShading } );
  App.colladaLoader.loadAsset("/javascripts/mod/mountain.dae", "mountain");

}




/**
* start loading the Collada
*
* @method colladaLoader.loadAsset
* @return {void}
*/
App.colladaLoader.loadAsset = function(model, name){
  App.log("App.colladaLoader.loadAsset");
  App.three.goCollada.load(model,
  function (collada) {

    if(name === "mountain"){
      App.three.mountainMaster = collada.scene;

      // App.log(App.colladaLoader.mountainMaster.children[0].children[0].material);
      App.three.mountainMaster.children[0].children[0].material = App.colladaLoader.basicMaterial

      App.environment.init();
    }

  }, function (xhr) {
  		App.log(("App.colladaLoader.loading = "+xhr.loaded / xhr.total * 100+"%"));
    });
}
