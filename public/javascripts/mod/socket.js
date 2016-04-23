var App = App || {};
    App.socket = App.socket || {};
    App.dom = App.dom || {};


  /**
  * called by socket.init creates socket io connection and listening / emit events.
  *
  * @method init
  * @return {void}
  */
  App.socket.init = function(){
    App.log("App.socket.init");

    App.listen = io('http://localhost:3000/');

    App.listen.on('init', function (data) {
      App.log("App.socket.on.connection");
      // if stream is connected carry on
      App.config.running = true;
      App.createListeners();
      App.renderer.init();
    });

    App.listen.on('sending-data', function (data) {
    if(App.config.running === true){
          App.socket.callOnce();
        App.socket.createDomElement(data);
        App.hearts.clone();
      }
    });

  }

  /**
  * sets buttons and spinners up but on call rather than on connect, needs the 'called' flag
  *
  * @method socket.callOnce
  * @return {void}
  */
  App.socket.callOnce = function (){
    var called = false;
    if(called === false){
      App.dom.spinner.style.display = "none";
      App.dom.toggleWrapper.style.display = "block";
      App.dom.pauseToggle.style.display = "block";
      called = true;
    }
  }

  /**
  * called on data received from socket, creates and appends dom elements.
  *
  * @method createDomElement
  * @return {void}
  */

  App.socket.createDomElement = function(data){
    var tweetEle = document.createElement('div');
    tweetEle.id = "tweetEle"
    tweetEle.className = "tweet-ele transition"
    // tweetEle.style.backgroundColor = "#e41969";

    var h5 = document.createElement('h5');
    tweetEle.appendChild(h5);
    h5.innerHTML = data.userName;

    var p = document.createElement('p');
    tweetEle.appendChild(p);
    p.innerHTML = data.tweetText;


    var str = p.innerHTML,
    reg = /love|Love|#love|#Love/ig; //g is to replace all occurances

    //fixing a bit
    var toStr = String(reg);
    var color = (toStr.replace('\/g', '|')).substring(1);

    //split it baby
    var colors = color.split("|");

    if (colors.indexOf("love") > -1) {
        str = str.replace(/love/g, '<span class="love">love</span>');
    }

    if (colors.indexOf("Love") > -1) {
        str = str.replace(/Love/g, '<span class="love">love</span>');
    }

    if (colors.indexOf("LOVE") > -1) {
        str = str.replace(/LOVE/g, '<span class="love">love</span>');
    }

    if (colors.indexOf("#love") > -1) {
        str = str.replace(/#love/g, '<span class="love">love</span>');
    }

    if (colors.indexOf("#Love") > -1) {
        str = str.replace(/#Love/g, '<span class="love">love</span>');
    }

    if (colors.indexOf("#LOVE") > -1) {
        str = str.replace(/#LOVE/g, '<span class="love">love</span>');
    }

    p.innerHTML = str;

    App.dom.dataDiv.insertBefore(tweetEle, App.dom.dataDiv.childNodes[0]);
  }
