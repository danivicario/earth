import * as THREE from "three";
import { randomFloat } from "./utils";

export default class StarField {
	constructor(scene) {
		var geometry = new THREE.SphereGeometry(2000, 100, 100);
		var veryBigSphereForStars = new THREE.Mesh(geometry, undefined);

		veryBigSphereForStars.geometry.vertices
			.filter((x) => Math.random() > 0.5)
			.forEach((starCoords) => {
				const geometry = new THREE.SphereGeometry(2, 3, 3);
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
	}
}
