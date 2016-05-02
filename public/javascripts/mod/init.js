var App = App || {};
  App.dom = App.dom || {};
  App.socket = App.socket || {};


  App.config = {
    running: false,
    webGLWidth: window.innerWidth,
    webGLHeight: window.innerHeight,
    connectCalled: false,
    menuStatus: "in",
    hidden: false,
    media: "",
    navStatus: "closed"
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
    App.dom.playPauseButton = document.getElementById('playPauseButton');
    App.dom.sideWrapperBg = document.getElementById('sideWrapperBg');
    App.dom.sideWrapper = document.getElementById('sideWrapper');
    App.dom.fullScreenOut = document.getElementById('fullScreenOut');
    App.dom.fullScreenIn = document.getElementById('fullScreenIn');
    App.dom.promoWrapper = document.getElementById('promoWrapper');


    App.dom.navButton = document.getElementById('navButton');
    App.dom.navOpen = document.getElementById('navOpen');
    App.dom.navClose = document.getElementById('navClose');
    App.dom.promoInner = document.getElementById('promoInner');

    // App.dom.navOpen = document.getElementById('navOpen');
    // App.dom.navClose = document.getElementById('navClose');
    App.dom.webgl = document.getElementById("webgl");



    Modernizr.on('videoautoplay', function(result) {
      App.log("Modernizr.on.videoautoplay "+result);
      if (result) {
        App.config.media = "video";
        App.addVideo();
        // App.config.media = "audio";
        // App.addFallback();
      } else {
        App.addFallback();
        App.config.media = "audio";
      }
    });

    App.three = new THREE.Scene();
    App.camera.init();
    App.lights.init();

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


    App.dom.navButton.addEventListener('click', function(){
      if(App.config.navStatus == "closed"){
        App.config.navStatus = "open";

        App.dom.promoInner.style.maxHeight = 400+'px'
        App.dom.navOpen.style.opacity = 0;
        App.dom.navClose.style.opacity = 1;
        // App.dom.promoWrapper.style.marginBottom = 20+'px'

      }else{
        App.config.navStatus = "closed";
        App.dom.promoInner.style.maxHeight = 0+'px';
        App.dom.navOpen.style.opacity = 1;
        App.dom.navClose.style.opacity = 0;
        // App.dom.promoWrapper.style.marginBottom = 180+'px'
      }
      // App.log("navClicked");
    });

    App.dom.toggle.addEventListener('click', function(){
      App.pauseApp("click");
    });

    App.dom.fullScreen.addEventListener('click', function(){
      if(App.config.menuStatus == "in"){
        App.config.menuStatus = "out";
        App.dom.fullScreenOut.style.opacity = 0;
        App.dom.fullScreenIn.style.opacity = 1;
        App.dom.playPauseButton.style.left = 20+'px';
        App.dom.sideWrapperBg.style.left = 0+'px';
        App.dom.sideWrapper.style.left = -365+'px';
        App.dom.promoWrapper.style.bottom = -400+'px'
      }else{
        App.config.menuStatus = "in";
        App.dom.fullScreenOut.style.opacity = 1;
        App.dom.fullScreenIn.style.opacity = 0;
        App.dom.playPauseButton.style.left = 290+'px';
        App.dom.sideWrapperBg.style.left = 0+'px';
        App.dom.sideWrapper.style.left = 0+'px';
        App.dom.promoWrapper.style.bottom = 30+'px'
      }

      // App.log("fullscreen - clicked");
    });

    document.addEventListener("visibilitychange", function() {
      // App.log( document.visibilityState );
      if(document.visibilityState == "hidden"){
          App.pauseApp("document");
      }
    });
  }

  /**
  * creates background video
  *
  * @method addVideo
  * @return {void}
  */
  App.addVideo = function(){
    App.log("App.addVideo");

    // App.dom.video = document.getElementById('video');
    App.dom.videoBg = document.getElementById('videoBg');

    App.dom.video = document.createElement("video");
    App.dom.video.setAttribute("id", "video");
    // App.dom.video.setAttribute("autoplay", true);
    App.dom.video.setAttribute("loop", true);
    // App.dom.video.setAttribute('poster','/videos/Adore_You_720x480.jpg');

    App.dom.vidSource = document.createElement("source");
    App.dom.vidSource.type = "video/mp4";
    App.dom.vidSource.src = "/videos/Adore_You_720x480_800kbps.mp4";

    App.dom.video.appendChild(App.dom.vidSource);
    App.dom.videoBg.appendChild(App.dom.video);
}

  /**
  * creates mp3 fallback
  *
  * @method addVideo
  * @return {void}
  */
  App.addFallback = function(){
    App.log("App.addFallback");

    App.dom.audio = document.createElement("audio");
    App.dom.audio.setAttribute("id", "audio");
    // App.dom.audio.setAttribute("autoplay", true);
    App.dom.audio.setAttribute("loop", true);

    App.dom.audSource = document.createElement("source");
    // App.dom.audSource.type = "audio/mp3";
    App.dom.audSource.src = "/audio/Adore_You.mp3";

    App.dom.audio.appendChild(App.dom.audSource);
  }




  /**
  * master function to pause all app elements - can be called from button or on visibilityState change
  *
  * @method createListeners
  * @return {void}
  */
  App.pauseApp = function(trigger){
    App.log("App.pauseApp "+trigger);

    if(App.config.running == true){

      if(App.dom[App.config.media].paused == false){
        App.dom[App.config.media].pause();
      }

      App.config.running = App.config.running = false
      App.dom.pauseIcon.style.display = "none";
      App.dom.playIcon.style.display = "block";

    }else if(App.config.running == false && trigger == "click"){

      if(App.dom[App.config.media].paused == true){
        App.dom[App.config.media].play();
      }

      App.config.running = true;
      App.dom.playIcon.style.display = "none";
      App.dom.pauseIcon.style.display = "block";
    }

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
