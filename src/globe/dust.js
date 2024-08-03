import * as THREE from "three";

import { randomFloat, randomInt } from "./utils";

import { PLANET_RADIUS } from "./constants";

export default class Dust {
	constructor() {
		var geometry = new THREE.TorusGeometry(PLANET_RADIUS + 10, 50, 100, 100);
		var veryBigSphereForStars = new THREE.Mesh(geometry, undefined);

		let group = new THREE.Group();

		veryBigSphereForStars.geometry.vertices
			.filter((x) => Math.random() > 0.95)
			.forEach((starCoords) => {
				const geometry = new THREE.ConeGeometry(0.9, 3, 3);
				const material = new THREE.MeshBasicMaterial({
					color: `rgb(255, 255, 255)`,
					transparent: true,
					opacity: 1
				});
				const star = new THREE.Mesh(geometry, material);

				star.position.x = randomInt(0, 360);
				star.position.y = randomInt(0, 360);
				star.position.z = randomInt(0, 360);

				star.position.x = starCoords.x + randomFloat(-10, 10);
				star.position.y = starCoords.y + randomFloat(-10, 10);
				star.position.z = starCoords.z + randomFloat(-10, 10);

				group.add(star);
			});

		group.rotation.x = -135;
		return group;
	}
}
