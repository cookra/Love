var App = App || {};
  App.dom = App.dom || {};
  App.socket = App.socket || {};


  App.config = {
    running: false,
    webGLWidth: document.getElementById("webgl").offsetWidth,
    webGLHeight: document.getElementById("webgl").offsetHeight
  };

  /**
  * waits for page load then sets stuff up.
  *
  * @method init
  * @return {void}
  */
  App.init = function(){
    App.log("App.init");

    App.dom.dataDiv = document.getElementById('dataDiv');
    App.dom.toggleWrapper = document.getElementById('toggleWrapper');
    App.dom.playPauseToggle = document.getElementById('playPauseToggle');
    App.dom.playToggle = document.getElementById('playToggle');
    App.dom.pauseToggle = document.getElementById('pauseToggle');
    App.dom.spinner = document.getElementById('spinner');

    App.dom.video = document.getElementById("video");


    App.three = new THREE.Scene();
    // App.three = new Physijs.Scene;

    App.dom.webgl = document.getElementById("webgl");

    // App.cube.init();
    App.camera.init();
    App.lights.init();
  	App.postProcessing.init();
    App.colladaLoader.init();
    // step 1
      App.jsonLoader.init();
      App.dom.video.play();

    // step 2 App.socket.init();
    // socket.init is called from jsonloader callback


    // step 3 App.renderer.init();
    // renderer.init is called from socket.init connection callback.

  };


  /**
  * creates listenrs for dom elements if created in init, called after socket connects
  *
  * @method createListeners
  * @return {void}
  */
  App.createListeners = function(){
    App.log("App.createListeners");

    App.dom.playPauseToggle.addEventListener('click', function(){

      if(App.config.running == true){
        App.config.running = App.config.running = false
        App.dom.pauseToggle.style.display = "none";
        App.dom.playToggle.style.display = "block";
      }else{
        App.config.running = true;
        App.dom.playToggle.style.display = "none";
        App.dom.pauseToggle.style.display = "block";
      }

      App.log('playPauseToggle - '+App.config.running);

    });

  }


  /**
  * adds listener for change in size and re adjusts congif and renderer.
  *
  * @method onresize
  * @return {void}
  */
  window.onresize = function(){
    App.log("window.onresize");

    App.config.webGLWidth = App.dom.webgl.offsetWidth;
    App.config.webGLHeight = App.dom.webgl.offsetHeight;

    if(App.three.renderer) App.three.renderer.setSize(App.config.webGLWidth, App.config.webGLHeight);
    if(App.three.camera) App.camera.update();
  };


  /**
  * be polite, wait for page load.
  *
  * @method onload
  * @return {void}
  */
  window.onload = function(){
    setTimeout(App.init,1000);
  };
