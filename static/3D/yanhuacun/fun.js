
		function onResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		function animate() {

			requestAnimationFrame( animate );

			render();

		}

		function render() {

			renderer.render( scene, camera );

		}

		function init() {

			// scene

			scene = new THREE.Scene();

			// camera

			camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.position.set( 10, 15, 15 );
//			camera.lookAt( scene.position );

			// ground

			var groundGeometry = new THREE.PlaneBufferGeometry( 50, 50, 10, 10 );
			var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
			var ground = new THREE.Mesh( groundGeometry, groundMaterial );
			ground.rotation.x = Math.PI * - 0.5;
			scene.add( ground );

			var textureLoader = new THREE.TextureLoader();
			textureLoader.load( 'textures/floors/FloorsCheckerboard_S_Diffuse.jpg', function ( map ) {

				map.wrapS = THREE.RepeatWrapping;
				map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;
				map.repeat.set( 4, 4 );
				groundMaterial.map = map;
				groundMaterial.needsUpdate = true;

			} );

			// water

			var waterGeometry = new THREE.PlaneBufferGeometry( 10, 30, 2, 2);
			var flowMap = textureLoader.load( 'textures/water/Water_2_1_Normal.jpg' );
var x = 0, y = 0;

var heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

var geometry = new THREE.ShapeGeometry( heartShape );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var mesh = new THREE.Mesh( geometry, material ) ;
            
			water = new THREE.Water( geometry, {
				scale: 2,
				textureWidth: 124,
				textureHeight: 124,
				flowMap: flowMap,
                color: 0x89AEB2
			} );

			water.position.y = 1;
			water.rotation.x = Math.PI * - 0.5;
			scene.add( water );

			// flow map helper

//			var helperGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
//			var helperMaterial = new THREE.MeshBasicMaterial( { map: flowMap } );
//			var helper = new THREE.Mesh( helperGeometry, helperMaterial );
//			helper.position.y = 1.01;
//			helper.rotation.x = Math.PI * - 0.5;
//			helper.visible = false;
//			scene.add( helper );

			// renderer

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setPixelRatio( window.devicePixelRatio );
			document.body.appendChild( renderer.domElement );

			//

//			var gui = new dat.GUI();
//			gui.add( helper, 'visible' ).name( 'Show Flow Map' );
//			gui.open();

			//

			var controls = new THREE.OrbitControls( camera, renderer.domElement );

			//

			window.addEventListener( 'resize', onResize, false );

		}


