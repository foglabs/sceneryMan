import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'
import { Session } from './Session.js'
import { Shape } from './Shape.js'
import { Cube } from './Cube.js'
import { Sphere } from './Sphere.js'
import { Util } from './Util.js'

console.log( 'test', new Util().rgbToHex(10,20,30) )

var renderer = new THREE.WebGLRenderer()
renderer.autoClear = false
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.001, 10000 );
camera.position.set( 0, 0, 0 );

// orbits
var controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// what key doin what
var keyStates = {}

var scene = new THREE.Scene()

scene.background = new THREE.Color( '#333333' )

// onelight
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 )
directionalLight.position.set(0.5,1,0.5)
scene.add( directionalLight )

var light = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
scene.add( light );

// var directionalLight2 = new THREE.DirectionalLight( 0xffffff, .5 )
// scene.add( directionalLight2 )

var session = new Session([0,0,0])

/////// WORKFLOW STUFF
function randomSign(){
  return Math.random() > 0.5 ? 1 : -1
}

function addRandomCube(){
  let geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  let newcube = new THREE.Mesh( geometry, material );
  newcube.position.set(randomSign() * Math.random()*3, randomSign() * Math.random()*6, randomSign() * Math.random()*3)
  scene.add( newcube );
}

/////// DUH
function animate() {
  // addRandomCube()
  controls.update()
  
  session.drawShapesList()
  session.drawColorPick()

  requestAnimationFrame( animate )
  // draw de cool scene
  renderer.render( scene, camera )
}

function onDocumentKeyDown(event){
  keyStates[event.key] = true
  // console.log( 'keys', event.key, true )

  if(document.getElementById("color") === document.activeElement){
    // setting color

    // only change... if its changin 
    if(event.key == "Enter"){
      let val = document.getElementById("color").value

      if(val != session.shapes[session.currentShapeId].color){
        console.log( 'setting val', val )
        session.shapes[session.currentShapeId].setColor(val)

        // unfocus if we changed the color
        document.getElementById("color").blur()
      }
    }
  } else {
    
    // shift makes a move go Y axis
    let shift = keyStates["Shift"]  

    let all = keyStates["1"]
    let fine = keyStates["2"]
    let reset = keyStates["3"]

    if(all){
      // move alllll session.shapes
      let shape, shapeKeys
      shapeKeys = Object.keys(session.shapes)
      for(var i=0; i<shapeKeys.length; i++){
        shape = session.shapes[shapeKeys[i]]
        session.handleKey(shape, event.key, shift, fine, reset)
      }
    } else {
       
      session.handleKey(session.shapes[session.currentShapeId], event.key, shift, fine, reset)
    }

  }
}


function onDocumentKeyUp(event){
  keyStates[event.key] = false
  // console.log( 'keysU', event.key, false )
}

document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

animate()



export { scene }