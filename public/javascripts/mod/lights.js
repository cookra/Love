var App = App || {};
    App.three = App.three || {};
    App.lights = App.lights || {};

    App.lights.config = {
      lightColour: "#b87186"
    }


  /**
  * builds threeJs lights
  *
  * @method lights.init
  * @return {void}
  */
  App.lights.init = function(){
    App.log("App.lights.init");

    App.three.ambLight = new THREE.AmbientLight( 0x404040 );
    App.three.add(App.three.ambLight);

    App.three.pointLight = new THREE.PointLight( App.lights.config.lightColour, 10, 100 );
    App.three.pointLight.position.set( 50, 50, 50 );
    App.three.pointLight.castShadow = true;
    // App.three.pointLight.shadowCameraVisible = true;
    App.three.add( App.three.pointLight );


    App.three.directionalLight = new THREE.DirectionalLight( App.lights.config.lightColour, 1 );
    App.three.directionalLight.position.set(0, 150, 0).normalize();
    App.three.directionalLight.castShadow = true

    App.three.directionalLight.shadow.mapSize.width = 2048; // default is 512
    App.three.directionalLight.shadow.mapSize.height = 2048; // default is 512
    App.three.add(App.three.directionalLight);


    /*Helpers*/
    // App.three.directionalLightHelper = new THREE.DirectionalLightHelper(App.three.directionalLight, 500);
    // App.three.add(App.three.directionalLightHelper);


  }
