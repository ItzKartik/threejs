import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

default_objs = ['MW_1.glb', 'MF_1.glb', 'MH_1.glb', 'MW_2.glb', 'MH_2.glb', 'MH_1 (Exterior Skin).glb', 'MH_2 (Exterior Skin).glb', 'MW_1 (Exterior Skin).glb', 'MW_2 (Exterior Skin).glb'];
S110F_objs = ['MF_1.glb', 'MR_1Copy1.glb', 'MW_1_exteriorskin.glb', 'MW_1.glb', 'MW_2_exteriorskin.glb', 'MW_2.glb', 'MW_3_exteriorskin.glb', 'MW_3.glb', 'MW_4_exteriorskin.glb', 'MW_4.glb']
vars = [obj_in1, obj_in2, obj_in3, obj_in4, obj_in5, obj_out1, obj_out2, obj_out3, obj_out4]

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 10, 1800);
    camera.position.z = 100;
    camera.position.y = 20;
    camera.position.x = -180;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.9;

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    var hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 2);
    scene.add(hemiLight);
    light = new THREE.SpotLight(0xffa95c, 0.2);
    light.position.set(-50, 50, 50);
    light.castShadow = true;
    scene.add(light);

    // light = new THREE.PointLight(0xffffcc, 10, 200);
    // light.position.set(0, 150, 0);
    // light.castShadow = true;
    // scene.add(light);

    // var light2 = new THREE.PointLight(0xffffcc, 10, 200);
    // light2.position.set(0, -200, 0);
    // light2.castShadow = true;
    // scene.add(light2);

    // var light3 = new THREE.PointLight(0xffffcc, 10, 200);
    // light3.position.set(0, 0, 0);
    // light3.castShadow = true;
    // scene.add(light3);

    loader = new THREE.GLTFLoader();
    loader.crossOrigin = true;

    load_obj(default_objs, 'objs/default/');

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

export function load_obj(obj, type) {
    for (var i = 0; i < obj.length; i++) {
        loader.load(type + obj[i], function (data) {
            vars[i] = data.scene;
            vars[i].scale.set(2, 2, 2);
            vars[i].rotation.x = Math.PI / 2;
            vars[i].rotation.y = Math.PI;
            vars[i].rotation.z = Math.PI / 2;
            scene.add(vars[i]);
        });
    }
}

export function change_tex(tex, type) {
    textureLoader = new THREE.TextureLoader();
    textureLoader.encoding = THREE.sRGBEncoding;
    texture = textureLoader.load("tex/" + tex);
    if (type == 'interior') {
        for (var i = 0; i < 5; i++) {
            loader.load('objs/default/' + default_objs[i], function (data) {
                vars[i] = data.scene;
                vars[i].scale.set(2, 2, 2);
                vars[i].rotation.x = Math.PI / 2;
                vars[i].rotation.y = Math.PI;
                vars[i].rotation.z = Math.PI / 2;
                vars[i].traverse((o) => {
                    if (o.isMesh) {
                        o.material.map = texture;
                    }
                });
                scene.add(vars[i]);
            });
        }
    } else if(type == 'exterior') {
        for (var i = 5; i < 9; i++) {
            vars[i] = null;
            loader.load('objs/default/' + default_objs[i], function (data) {
                vars[i] = data.scene;
                vars[i].scale.set(2, 2, 2);
                vars[i].rotation.x = Math.PI / 2;
                vars[i].rotation.y = Math.PI;
                vars[i].rotation.z = Math.PI / 2;
                vars[i].traverse((o) => {
                    if (o.isMesh) {
                        o.material.map = texture;
                    }
                });
                scene.add(vars[i]);
            });
        }
    } else if(type == 'color') {
        for (var i = 0; i < default_objs.length; i++) {
            vars[i] = null;
            loader.load('objs/default/' + default_objs[i], function (data) {
                vars[i] = data.scene;
                vars[i].scale.set(2, 2, 2);
                vars[i].rotation.x = Math.PI / 2;
                vars[i].rotation.y = Math.PI;
                vars[i].rotation.z = Math.PI / 2;
                vars[i].traverse((o) => {
                    if (o.isMesh) {
                        o.material.map = null;
                        o.material.needsUpdate = true;
                        o.material.color.setHex(tex);
                    }
                });
                scene.add(vars[i]);
            });
        }
    } else {
        alert("No Function");
    }
}

// export function change_color(hex) {
//     for (var i = 0; i < default_objs.length; i++) {
//         obj_in5.traverse((o) => {
//             if (o.isMesh) {
//                 o.material.map = null;
//                 o.material.needsUpdate = true;
//                 o.material.color.setHex(hex);
//             }
//         });
//     }
// }

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