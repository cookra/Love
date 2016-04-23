var App = App || {};
    App.three = App.three || {};
    App.camera = App.camera || {};

    App.camera.config = {
      camFOV: 45,
      camNear:1,
      camFar: 1000,
    };

  /**
  * builds threeJs camera
  *
  * @method camera.init
  * @return {void}
  */
  App.camera.init = function(){
    App.log("App.camera.init");

    App.three.camera = new THREE.PerspectiveCamera(App.camera.config.camFOV, App.config.webGLWidth/App.config.webGLHeight, App.camera.config.camNear, App.camera.config.camFar);
    App.three.camera.position.set(0, 0, 5);
    App.three.camera.lookAt(App.three.position);

  };

  /**
  * udpates threeJs camera projectio matrix on window resize
  *
  * @method camera.update
  * @return {void}
  */
  App.camera.update = function(){
    App.three.camera.aspect = App.config.webGLWidth / App.config.webGLHeight;
    App.three.camera.updateProjectionMatrix();
  };
