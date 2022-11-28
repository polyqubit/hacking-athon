import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/PointerLockControls.js';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let raycaster;
let camera;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const objects = [];
const xArr = [];
const yArr = [];
const zArr = [];

$(document).ready(function(){
  function startFrame() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
    camera.position.set( 0, 1, 100 );
    camera.lookAt( 0, 0, 0 );
    let scene = new THREE.Scene();

    let controls = new PointerLockControls( camera, document.body );
    const cover = document.getElementById('cover');
		cover.addEventListener('click', function () {
			controls.lock();
		});
    controls.addEventListener( 'lock', function () {
			//use later?
		});
		controls.addEventListener( 'unlock', function () {
			//use later?
		});
    
    scene.add( controls.getObject() );
    
    const onKeyDown = function ( event ) {
			switch ( event.code ) {
				case 'ArrowUp':
				case 'KeyW':
					moveForward = true;
					break;
				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = true;
					break;
				case 'ArrowDown':
				case 'KeyS':
					moveBackward = true;
					break;
				case 'ArrowRight':
				case 'KeyD':
					moveRight = true;
					break;
				case 'Space':
					if ( canJump === true ) velocity.y += 350;
					  canJump = false;
					  break;
			}
	  };

		const onKeyUp = function ( event ) {
			switch ( event.code ) {
				case 'ArrowUp':
				case 'KeyW':
					moveForward = false;
					break;
				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = false;
					break;
				case 'ArrowDown':
				case 'KeyS':
					moveBackward = false;
					break;
				case 'ArrowRight':
				case 'KeyD':
					moveRight = false;
					break;
			}
		};
    document.addEventListener( 'keydown', onKeyDown );
		document.addEventListener( 'keyup', onKeyUp );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    cover.appendChild( renderer.domElement );
  
    //start adding elements here
    const floor = new THREE.PlaneGeometry( 100, 100 );
    floor.rotateX( - Math.PI / 2 );
    floor.translate( 0, -1, 0 );
    const material = new THREE.MeshPhongMaterial( { color: 0xa1a1a1 } );
    const mesh = new THREE.Mesh( floor, material );
    scene.add( mesh );

    for(let i=0;i<20;i++) {
      let spObj = new THREE.SphereGeometry(2, 32, 16);
      let x = Math.floor(Math.random() * 100)-50;
      let y = 1;
      let z = Math.floor(Math.random() * 100)-50;
      
      spObj.translate(x,y,z);
      let sMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
      let sphere = new THREE.Mesh( spObj, sMaterial );
      scene.add( sphere );
      objects.push(sphere);
      xArr.push(x);
      yArr.push(y);
      zArr.push(z);
    }
    const light = new THREE.PointLight( 0xffffff, 4, 150 );
light.position.set( 0, 100, 0 );
scene.add( light );
    //end of elements
    
    camera.position.z = 5;
    
    $('canvas').css('position','absolute');
    $('canvas').css('top','15%');
    
    function animate() {
				requestAnimationFrame( animate );

				const time = performance.now();
				if ( controls.isLocked === true ) {
					//raycaster.ray.origin.copy( controls.getObject().position );
					//raycaster.ray.origin.y -= 10;

					//const intersections = raycaster.intersectObjects( objects, false );
					//const onObject = intersections.length > 0;
					const delta = ( time - prevTime ) / 1000;

					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					//velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

					direction.z = Number( moveForward ) - Number( moveBackward );
					direction.x = Number( moveRight ) - Number( moveLeft );
					direction.normalize(); // this ensures consistent movements in all directions
          if(camera.position.x < 50
          && camera.position.x > -50
          && camera.position.z < 50
          && camera.position.z > -50) {
					  if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
					  if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
          }
          else {
            camera.position.x = 0;
            camera.position.z = 0;
          }

					// if ( onObject === true ) {
					// 	velocity.y = Math.max( 0, velocity.y );
					// 	canJump = true;
					// }

					controls.moveRight( - velocity.x * delta );
					controls.moveForward( - velocity.z * delta );
					//controls.getObject().position.y += ( velocity.y * delta ); // new behavior

					// if ( controls.getObject().position.y < 10 ) {
					// 	velocity.y = 0;
					// 	controls.getObject().position.y = 10;
					// 	canJump = true;
					// }
				}
        for(let i=0;i<objects.length;i++) {
          objects[i].position.x = xArr[0] + 5*Math.sin(time*0.01);
        }
				prevTime = time;
				renderer.render( scene, camera );
			}
    animate();
  }
  
  function removeCanvas() {
    $('canvas').remove();
  }

  $("#startGame1").on('click', ()=>{startFrame()});
  $("#backButton").on('click', ()=>{removeCanvas()});
});