const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xff0000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector("#loading-section").appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;
 var controls = new THREE.FlyControls( camera, renderer.domElement );
 controls.movementSpeed = 1;
 controls.rollSpeed = Math.PI / 24;
 controls.autoForward = false;
 controls.dragToLook = true;

var keyboardModel;
var keyboardLoaded = false;
var size;
loader.load("../assets/models/keyboard.glb", function(gltf){
 keyboardModel = gltf.scene;
 keyboardLoaded = true;
 console.log(keyboardModel)
 scene.add(keyboardModel);
 var keyboardModelBox = new THREE.Box3().setFromObject(keyboardModel);
 var measures = new THREE.Vector3();
 size = keyboardModelBox.getSize(measures);
 camera.lookAt(keyboardModel.position.x, keyboardModel.position.y, keyboardModel.position.z)
})

camera.position.x = 0.12542701859227667;
camera.position.y = 4.257132332812411;
camera.position.z = 1.2164548462070952;
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set(camera.position.x,camera.position.y,camera.position.z);
scene.add( light );


var lightMovement = "right";
function animate() {
	requestAnimationFrame( animate );
 if(keyboardLoaded){
 // keyboardModel.rotation.x -= 0.01
 // keyboardModel.rotation.y -= 0.01
 // keyboardModel.rotation.z -= 0.01
 if(light.position.x > (keyboardModel.position.x + (size.x / 2))){
  lightMovement = "left;"
 }else if(light.position.x < (keyboardModel.position.x + (size.x / 2))){
  lightMovement = "right";
 }
 if(lightMovement == "right"){
  light.position.x += 0.1;
 }else if(lightMovement == "left"){
  light.position.x -= 0.1;
 }
 }
 console.log(camera.position)
 controls.update(0.1);
	renderer.render( scene, camera );
}

animate();