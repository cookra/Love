var App = App || {};
App.three = App.three || {};
App.jsonLoader = App.jsonLoader || {};

/**
 * loads JSON model
 *
 * @method jsonLoader.init
 * @return {void}
 */
App.jsonLoader.init = function() {
	App.log('App.jsonLoader.init');

	/*USE JSONLoader for single models*/
	App.three.goJSON = new THREE.JSONLoader();
	App.three.goJSON.crossOrigin = '';
	App.three.goJSON.withCredentials = true;

	/*JSON loading manager*/
	// App.three.manager = new THREE.LoadingManager();

	App.three.goJSON.load('/javascripts/mod/lowPolyHeart.json', function(
		geometry,
		materials
	) {
		// App.three.goJSON.load('http://pauliescanlon.io:3000/javascripts/mod/lowPolyHeart.json', function(geometry, materials){
		// App.three.goJSON.load('http://pauliescanlon.io:3000/javascripts/mod/lowPolyHeart.json', function(geometry, materials){

		App.heartMaterial = new THREE.MultiMaterial(materials);
		App.heartGeometry = geometry;

		App.three.masterHeart = new THREE.Mesh(
			App.heartGeometry,
			App.heartMaterial
		);
		App.three.add(App.three.masterHeart);

		App.hearts.init();
		// App.socket.init();
	});
};
