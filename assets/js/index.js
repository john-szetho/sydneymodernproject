// Three.js

const place = document.querySelector("section.book");

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 42, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio);
place.appendChild( renderer.domElement );

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Add ambient light
const light = new THREE.AmbientLight( 0x4A4A4A );
scene.add( light );

// Add directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
directionalLight.position.set( 0, 0, 6 );
scene.add( directionalLight );

// Add texture loader
const loader = new THREE.TextureLoader();

// Book sides
const urls = [
    'assets/img/book-side.jpg', 'assets/img/book-spine.jpg',
    'assets/img/book-top.jpg', 'assets/img/book-top.jpg',
    'assets/img/book-cover.jpg', 'assets/img/book-back.jpg'
];

const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url)
    })
})

// Create the cube
const geometry = new THREE.BoxGeometry( 1.65, 2.4, .27 );
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 5.2;

// Render
function animate() {
	requestAnimationFrame( animate );
    // cube.rotation.z = 0.02;
    cube.rotation.y -= 0.007;
	renderer.render( scene, camera );
}
animate();