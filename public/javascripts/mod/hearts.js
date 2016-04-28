var App = App || {};
    App.three = App.three || {};
    App.hearts = App.hearts || {};

    App.hearts.config = {
      heartCount: 0,
      heartScale: 0.6,
      heartRotYSpeed: 0.01,
      heartPosZSpeed: 0.01
    }

    App.clonesArray = [];



/**
* setup for hearts after it's loaded called in jsonLoader
*
* @method hearts.init
* @return {void}
*/
App.hearts.init = function(){
  App.log("App.model.init");

  App.three.masterHeart.castShadow = true;
  App.three.masterHeart.receiveShadow = false;
  App.three.masterHeart.scale.set (1,1,1);
  App.three.masterHeart.position.set (0,-30.3,-5);

}



/**
* called in rendrer to animate the main heart
*
* @method hearts.animate
* @return {void}
*/
App.hearts.animate = function(){
  // App.log("App.hearts.animate");
  if(App.three.masterHeart)App.three.masterHeart.rotation.y -= App.hearts.config.heartRotYSpeed;

  for(i=0; i<App.clonesArray.length; i++){
    App.clonesArray[i].position.z += App.hearts.config.heartPosZSpeed;
    App.clonesArray[i].rotation.y -= App.hearts.config.heartRotYSpeed;
  }
}



/**
* clones the maste model called from socket.js -- flying toward cameara - gsap
*
* @method hearts.clone
* @return {void}
*/
App.hearts.clone = function(){
  // App.log("App.hearts.clone");

  App.three.clonedHeart = new THREE.Mesh(App.heartGeometry, App.heartMaterial);

  App.three.clonedHeart.scale.x = App.hearts.config.heartScale;
  App.three.clonedHeart.scale.y = App.hearts.config.heartScale;
  App.three.clonedHeart.scale.z = App.hearts.config.heartScale;


  App.three.clonedHeart.position.x = App.randRange(-30,30);
  App.three.clonedHeart.position.y = App.randRange(-10,10);
  App.three.clonedHeart.position.z = -50;


  App.three.add(App.three.clonedHeart);
  App.clonesArray.push(App.three.clonedHeart);

}



/**
* clones the maste model called from socket.js
*
* @method jsonLoader.init
* @return {void}
*/
// App.model.clone = function(){
//   App.log("App.model.clone");
//   App.model.config.heartCount ++
//
//   App.model.clonesArray[App.model.config.heartCount] = App.three.model.clone();
//   App.model.clonesArray[App.model.config.heartCount].position.x = App.randRange(5,10);
//   App.model.clonesArray[App.model.config.heartCount].position.y = App.randRange(5,0);
//   App.model.clonesArray[App.model.config.heartCount].position.z = App.randRange(-15,2);
//
//   App.three.add(App.model.clonesArray[App.model.config.heartCount]);
//
// }


/**
* clones the maste model called from socket.js - flying from the right - gsap
*
* @method jsonLoader.init
* @return {void}
*/
// App.model.clone = function(){
//   App.log("App.model.clone");
//   App.model.config.heartCount ++
//
//   App.model.clonesArray[App.model.config.heartCount] = App.three.model.clone();
//
//   App.model.clonesArray[App.model.config.heartCount].position.x = App.randRange(20,30);
//   App.model.clonesArray[App.model.config.heartCount].position.y = App.randRange(5,0);
//   App.model.clonesArray[App.model.config.heartCount].position.z = App.randRange(-15,2);
//
//   TweenMax.to(App.model.clonesArray[App.model.config.heartCount].position, App.randRange(20,50),{x:-50, ease:Linear.easeNone});
//   TweenMax.to(App.model.clonesArray[App.model.config.heartCount].position, App.randRange(20,50),{y:-10, ease:Linear.easeNone});
//   TweenMax.to(App.model.clonesArray[App.model.config.heartCount].rotation, App.randRange(30,50),{y:50, ease:Linear.easeNone});
//
//   App.three.add(App.model.clonesArray[App.model.config.heartCount]);
//
// }
