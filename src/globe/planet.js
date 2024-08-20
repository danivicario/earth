import * as THREE from "three";

import { PLANET_QUALITY, PLANET_RADIUS } from "./constants";

import { rootMesh } from "./scene";

export function init() {
	const geometry = new THREE.SphereGeometry(
		PLANET_RADIUS,
		PLANET_QUALITY,
		PLANET_QUALITY
	);
	const loader = new THREE.TextureLoader();
	const material = new THREE.MeshPhongMaterial({
		map: loader.load("1_earth_8k.jpg")
	});
	const mesh = new THREE.Mesh(geometry, material);

	rootMesh.add(mesh);
}
