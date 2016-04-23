var App = App || {};
    App.three = App.three || {};
    App.postProcessing = App.postProcessing || {};


	/**
	* set up postprocessing for threeJs camera - WIP - no errors so that's good!
	*
	* @method postProcessing.init
	* @return {void}
	*/
	App.postProcessing.init = function(){
    App.log("App.postProcessing.init");

		App.postThree = new THREE.Scene();

		App.postThree.camera = new THREE.OrthographicCamera( App.config.webGLWidth / - 2, App.config.webGLWidth / 2,  App.config.webGLHeight / 2, App.config.webGLHeight / - 2, -10000, 10000 );
		App.postThree.camera.position.z = 100;

		App.postThree.add(App.postThree.camera);

		var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };

		App.postThree.rtTextureDepth = new THREE.WebGLRenderTarget( window.innerWidth, App.config.webGLHeight, pars );
		App.postThree.rtTextureColor = new THREE.WebGLRenderTarget( window.innerWidth, App.config.webGLHeight, pars );

		App.postThree.bokehShader = THREE.BokehShader;
		App.postThree.bokehUniforms = THREE.UniformsUtils.clone(App.postThree.bokehShader.uniforms);

	}
