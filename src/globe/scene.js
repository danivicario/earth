import * as THREE from "three";

import { INITIAL_CAMERA_POSITION } from "./constants";
import OrbitControls from "three-orbitcontrols";

export const scene = new THREE.Scene();
export const rootMesh = new THREE.Mesh(new THREE.BufferGeometry());

export function init(container) {
	const width = container.offsetWidth || window.innerWidth;
	const height = container.offsetHeight || window.innerHeight;
	const camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	const controls = new OrbitControls(camera, renderer.domElement);

	controls.enableDamping = true;
	controls.dampingFactor = 0.1;

	function randomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	function play() {
		// Main values
		// console.log("Camera Position:", camera.position);
		// console.log("Camera Target:", controls.target); // Only if using c

		requestAnimationFrame(play);
		rootMesh.rotation.y += 0.00015;
		renderer.render(scene, camera);
		controls.update();
	}

	function addStarField() {
		var geometry = new THREE.SphereGeometry(1000, 300, 300);
		var veryBigSphereForStars = new THREE.Mesh(geometry, undefined);

		veryBigSphereForStars.geometry.vertices
			.filter((x) => Math.random() > 0.5)
			.forEach((starCoords) => {
				const geometry = new THREE.SphereGeometry(3, 10, 10);
				const material = new THREE.MeshBasicMaterial({
					color: `rgb(255, 255, 255)`,
					transparent: true,
					opacity: Math.random()
				});
				const star = new THREE.Mesh(geometry, material);

				star.position.x = starCoords.x + randomFloat(-100, 100);
				star.position.y = starCoords.y + randomFloat(-100, 100);
				star.position.z = starCoords.z + randomFloat(-100, 100);

				scene.add(star);
			});

		// scene.add(veryBigSphereForStars);
	}

	function addLights() {
		const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1.7);
		light.castShadow = true;
		scene.add(light);
	}

	// init scene
	initResizeListener(container, camera, renderer);

	renderer.setSize(width, height);
	container.appendChild(renderer.domElement);
	rootMesh.rotation.y = 800;

	const pos = { x: 20.031411032968805, y: -153.32979251897166, z: -234.3214284563605 };

	const tar = {
		x: 20.031551697356647,
		y: 1.0364886448903307e-14,
		z: -234.32148957989017
	};

	camera.position.x = pos.x;
	camera.position.y = pos.y;
	camera.position.z = pos.z;

	controls.target.x = tar.x;
	controls.target.y = tar.y;
	controls.target.z = tar.z;

	// x: 18.523917489650845, y: 9.005533997539278e-15, z: -177.76560086382747

	// 227.08149229278905, y: -147.31300848454953, z: 64.7908179400700

	// {x: -220.5959788020247, y: -147.31300848454953, z: 223.80412620663054}

	// add rootMesh to scene
	scene.add(rootMesh);

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
