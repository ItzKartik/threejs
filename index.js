import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 800);
    camera.position.z = 100;
    camera.position.y = 10;
    camera.position.x = -80;

    renderer = new THREE.WebGLRenderer({antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio); 

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.9;

    controls.minDistance = 20;
    controls.maxDistance = 30;

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    light = new THREE.PointLight(0xffffcc, 20, 200);
    light.position.set(0, 20, -10);
    light.castShadow = true;
    scene.add(light);

    // var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    // hemiLight.position.set(0, 50, 0);
    // // Add hemisphere light to scene   
    // scene.add(hemiLight);

    // var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    // dirLight.position.set(10, 10, 10);
    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    // scene.add(dirLight);

    // var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    // var floorMaterial = new THREE.MeshPhongMaterial({
    // color: 0xffffff,
    // shininess: 0
    // });

    // var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.rotation.x = -0.5 * Math.PI;
    // floor.receiveShadow = true;
    // floor.position.y = -1;
    // scene.add(floor);

    loader = new THREE.GLTFLoader();
    loader.crossOrigin = true;

    load_obj('9.jpeg');

    render();

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

export function load_obj(imgfile) {
    textureLoader = new THREE.TextureLoader();
    textureLoader.encoding = THREE.sRGBEncoding;
    texture = textureLoader.load("tex/"+imgfile);
    texture.flipY = false;

    loader.load('foo.glb', function (data) {
        object = data.scene;
        object.scale.set(2, 2, 2);
        // object.rotation.y = Math.PI;
        object.traverse((o) => {
            if (o.isMesh) {
                o.material.map = texture;
                o.material.map.needsUpdate = true;
            }
        });
        scene.add(object);
    });

}

export function change_color(hex) {
    object.traverse((o) => {
        if (o.isMesh) {
            o.material.map = null;
            o.material.needsUpdate = true;
            o.material.color.setHex(hex);
        }
    });
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}
init();