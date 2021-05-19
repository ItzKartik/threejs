import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

var scene, renderer, camera, controls, object, texture, loader;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 800);
    camera.position.z = 100;
    camera.position.y = 40;
    camera.position.x = -80;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.9;

    controls.minDistance = 35;
    controls.maxDistance = 30;

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    var light = new THREE.PointLight(0xffffcc, 20, 200);
    light.position.set(0, 20, -10);
    light.castShadow = true;
    scene.add(light);

    loader = new THREE.GLTFLoader();
    loader.crossOrigin = true;

    load_obj('tex/9.jpeg');

    render();

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
}


function load_obj(imgfile) {
    var textureLoader = new THREE.TextureLoader();
    textureLoader.encoding = THREE.sRGBEncoding;
    texture = textureLoader.load(imgfile);
    texture.flipY = false;

    loader.load('foo.glb', function (data) {
        object = data.scene;
        object.scale.set(2, 2, 2);
        object.traverse((o) => {
            if (o.isMesh) {
                o.material.map = texture;
            }
        });
        scene.add(object);
    });
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
}

$(document).ready(function(){
    init();
}); 