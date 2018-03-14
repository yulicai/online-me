/* self learning three js */
/* basic mesh and vertices control */
/* Yuli Cai 17 Feb 5 */

var container;
var camera, scene, renderer;
var PI = 3.1215926;

var geometry, mesh;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 7;
    scene = new THREE.Scene();

    //  var color = new THREE.Color("rgb(200,15,200)");
    var color = new THREE.Color("skyblue");
    geometry = new THREE.DodecahedronGeometry(2, 1);
    var material = new THREE.MeshStandardMaterial({
        color: color.getHex(),
        wireframe: true,
        metalness:0.1
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    scene.add(mesh);



    //lighting
    var lightRight = new THREE.PointLight(0x00ddff);
    lightRight.position.set(2, 1, 3);
    lightRight.castShadow = true;

    var lightLeft = new THREE.PointLight(0x00ddff);
    lightLeft.position.set(-2, 1, 3);
    var ambientLight = new THREE.AmbientLight(0x00ddff, 0.5)
    scene.add(lightRight);
    scene.add(lightLeft);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

}


function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var time = Date.now() * 0.001;

    camera.position.z = 5 + 2.5 * Math.cos(time) / Math.sin(time);

    //move the position of vertices
    for (var i = 0; i < mesh.geometry.vertices.length; i++) {
        mesh.geometry.vertices[i].x += (Math.random() * 2 - 1) * Math.sin(time * PI) * 0.01;
        mesh.geometry.vertices[i].y += (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.01;
        mesh.geometry.vertices[i].z += (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.01;
    }
    mesh.geometry.verticesNeedUpdate = true;
    //if using bufferGeometry, use the following pattern instead
    //geometry.attributes.position.needsUpdate = true;


    renderer.render(scene, camera);
}


function onWindowResize(event) {
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}