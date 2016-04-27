var App = App || {};
  App.dom = App.dom || {};
  App.socket = App.socket || {};


  App.config = {
    running: false,
    webGLWidth: window.innerWidth,
    webGLHeight: window.innerHeight,
    connectCalled: false,
    menuStatus: "in"
    // webGLWidth: document.getElementById("webgl").offsetWidth,
    // webGLHeight: document.getElementById("webgl").offsetHeight
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
    App.dom.spinner = document.getElementById('spinner');

    App.dom.fullScreen = document.getElementById('fullScreen');

    App.dom.toggle = document.getElementById('toggle');
    App.dom.pauseIcon = document.getElementById('pauseIcon');
    App.dom.playIcon = document.getElementById('playIcon');

    App.dom.video = document.getElementById('video');

    App.dom.playPauseButton = document.getElementById('playPauseButton');
    App.dom.sideWrapperBg = document.getElementById('sideWrapperBg');
    App.dom.sideWrapper = document.getElementById('sideWrapper');





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
  App.addListeners = function(){
    App.log("App.addListeners");

    App.dom.toggle.addEventListener('click', function(){
      if(App.config.running == true){

        if(App.dom.video.paused == false){
          App.dom.video.pause();
        }

        App.config.running = App.config.running = false
        App.dom.pauseIcon.style.display = "none";
        App.dom.playIcon.style.display = "block";

      }else{

        if(App.dom.video.paused == true){
          App.dom.video.play();
        }

        App.config.running = true;
        App.dom.playIcon.style.display = "none";
        App.dom.pauseIcon.style.display = "block";
      }
      App.log("toggle - clicked "+App.config.running);
    });

    App.dom.fullScreen.addEventListener('click', function(){

      if(App.config.menuStatus == "in"){
        App.config.menuStatus = "out";
        App.dom.playPauseButton.style.left = -60+'px';
        App.dom.sideWrapperBg.style.left = -365+'px';
        App.dom.sideWrapper.style.left = -365+'px';
      }else{
        App.config.menuStatus = "in";
        App.dom.playPauseButton.style.left = 310+'px';
        App.dom.sideWrapperBg.style.left = 0+'px';
        App.dom.sideWrapper.style.left = 0+'px';
      }



      App.log("fullscreen - clicked");
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

    // App.config.webGLWidth = App.dom.webgl.offsetWidth;
    // App.config.webGLHeight = App.dom.webgl.offsetHeight;

    App.config.webGLWidth = window.innerWidth;
    App.config.webGLHeight = window.innerHeight;

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
