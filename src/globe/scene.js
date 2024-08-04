import * as THREE from "three";
import * as d3 from "d3";

import { INITIAL_CAMERA_POSITION } from "./constants";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const scene = new THREE.Scene();
export const rootMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 100, 100));

export function init(container) {
	const width = container.offsetWidth || window.innerWidth;
	const height = container.offsetHeight || window.innerHeight;
	const camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
	const renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	const controls = new OrbitControls(camera, renderer.domElement);

	controls.enableDamping = true;
	controls.dampingFactor = 0.1;

	function randomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	function updatePositions(tick) {
		// return;
		// tick = 0;

		if (tick >= 1) tick = 1;

		// console.log(tick);

		const easingFunction = d3.easePolyInOut(tick);

		const camPos = cameraPositionsInterpolation(easingFunction);
		const camRot = cameraRotationsInterpolation(easingFunction);
		const controlsTarget = controlsTargetScaleInterpolation(easingFunction);

		// return;

		camera.position.x = camPos.x;
		camera.position.y = camPos.y;
		camera.position.z = camPos.z;

		camera.rotation.x = camRot.x;
		camera.rotation.y = camRot.y;
		camera.rotation.z = camRot.z;

		// controls.target.x = initialControls.x;
		// controls.target.y = initialControls.y;
		// controls.target.z = initialControls.z;
	}

	let tick = 0;
	let animInit = 0;

	function play() {
		// Main values
		// console.log("Camera Position:", camera.position);
		// console.log("Camera Target:", controls.target); // Only if using c

		animInit++;

		if (animInit > 1500) {
			// console.log("xx");
			tick += 0.0005;
			updatePositions(tick);
		}

		requestAnimationFrame(play);
		rootMesh.rotation.y += 0.00015;
		renderer.render(scene, camera);
		controls.update();
	}

	function addStarField() {
		function addStarFieldChild(radius) {
			var geometry = new THREE.SphereGeometry(radius, 100, 100);
			var veryBigSphereForStars = new THREE.Mesh(geometry, undefined);

			// Access the position attribute from the buffer geometry
			var positionArray = veryBigSphereForStars.geometry.attributes.position.array;

			// Traverse and filter vertex positions
			for (let i = 0; i < positionArray.length; i += 3) {
				// Get vertex coordinates
				let x = positionArray[i];
				let y = positionArray[i + 1];
				let z = positionArray[i + 2];

				// Randomly decide whether to create a star at this vertex
				if (Math.random() > 0.9) {
					// Create a star geometry and material
					const geometry = new THREE.SphereGeometry(
						randomFloat(0.5, 3),
						12,
						12
					);
					const material = new THREE.MeshBasicMaterial({
						color: `rgb(255, 255, 255)`,
						transparent: true,
						opacity: Math.random()
					});
					const star = new THREE.Mesh(geometry, material);

					// Position the star with random offset
					star.position.set(
						x + randomFloat(-100, 100),
						y + randomFloat(-100, 100),
						z + randomFloat(-100, 100)
					);

					// Add the star to the scene
					scene.add(star);
				}
			}
		}

		addStarFieldChild(1700);
		addStarFieldChild(2000);
		addStarFieldChild(2200);
	}

	function addLights() {
		const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1.2);
		light.castShadow = true;
		scene.add(light);
	}

	// init scene
	initResizeListener(container, camera, renderer);

	renderer.setSize(width, height);
	container.appendChild(renderer.domElement);
	rootMesh.rotation.y = 200;

	const initialCamera = {
		x: -19.0027499499094,
		y: 210.69435797905314,
		z: -234.91307733382692
	};
	const initialCameraRot = {
		x: -1.8428231895281582,
		y: -0.7005978749993316,
		z: -1.9791586279782571
	};

	const finalCamera = {
		x: 21.645947327272623,
		y: -183.3748333519309,
		z: -314.6536490302484
	};

	const finalCameraRot = {
		x: 2.1242370886093993,
		y: 0.04036644950604419,
		z: -3.076369238668647
	};

	const initialControls = {
		x: 12.940139250664808,
		y: 8.922817636543334e-15,
		z: -201.35562241945217
	};

	const finalControls = {
		x: 20.031551697356647,
		y: 1.0364886448903307e-14,
		z: -234.32148957989017
	};

	var cameraPositionsInterpolation = d3.interpolate(initialCamera, finalCamera);
	var cameraRotationsInterpolation = d3.interpolate(initialCameraRot, finalCameraRot);
	var controlsTargetScaleInterpolation = d3.interpolate(initialControls, finalControls);

	// add rootMesh to scene
	scene.add(rootMesh);

	updatePositions(0);
	addStarField();

	addLights();

	play();

	window.onkeydown = (x) => {
		if (x.code === "Space") {
			console.log({
				x: camera.position.x,
				y: camera.position.y,
				z: camera.position.z
			});

			console.log({
				x: camera.rotation.x,
				y: camera.rotation.y,
				z: camera.rotation.z
			});

			console.log({
				x: controls.target.x,
				y: controls.target.y,
				z: controls.target.z
			});
		}
	};
}

function initResizeListener(container, camera, renderer) {
	window.addEventListener(
		"resize",
		() => {
			const width = container.offsetWidth || window.innerWidth;
			const height = container.offsetHeight || window.innerHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		},
		false
	);
}
