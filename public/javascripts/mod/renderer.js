var App = App || {};
    App.three = App.three || {};
    App.renderer = App.renderer || {};

  /**
  * builds threeJs renderer
  *
  * @method renderer.init
  * @return {void}
  */
  App.renderer.init = function(){
    App.log("App.renderer.init");

    // App.three.renderer = new THREE.WebGLRenderer({antialias:true});
    App.three.renderer = new THREE.WebGLRenderer({alpha: true, antialias:true});
    App.three.renderer.setSize(App.config.webGLWidth, (App.config.webGLHeight));

    App.three.renderer.shadowMap.enabled;
    App.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // document.body.appendChild( App.three.renderer.domElement );
    App.dom.webgl.appendChild(App.three.renderer.domElement);

    App.renderer.run();
  };



  /**
  * runs the request animation frame and updates scene/camera
  *
  * @method renderer.run
  * @return {void}
  */
  App.renderer.run = function(){
    // App.log("App.renderer.run");
    requestAnimationFrame( App.renderer.run );

    if(App.config.running === true){
      if(App.three.masterHeart)App.hearts.animate();
      // TODO call animation on all cloned assets in hearts.js

      // App.three.simulate();
      App.three.renderer.render(App.three, App.three.camera);
    }
  }
