var App = App || {};
    App.three = App.three || {};
    App.cube = App.cube || {};

  /**
  * builds threeJs cube
  *
  * @method cube.init
  * @return {void}
  */
  App.cube.init = function(){
    App.log("App.cube.init");

    var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: false });

    App.three.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    App.three.cube.receiveShadow = true;

    App.three.cube.position.x = 0;
    App.three.cube.position.y = 0;
    App.three.cube.position.z = 0;

    App.three.add(App.three.cube);

  }
