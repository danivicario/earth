import * as Materials from "./materials";
import * as THREE from "three";

import { CURVE_SEGMENTS, MESH_DEFAULT_SCALE } from "./constants";

import { getSplineFromCoords } from "./utils";

export default class Curve {
	constructor(coords) {
		const { spline } = getSplineFromCoords(coords);

		// add curve geometry
		this.curveGeometry = new THREE.BufferGeometry();

		this.points = new Float32Array(CURVE_SEGMENTS * 3);
		this.vertices = spline.getPoints(CURVE_SEGMENTS - 1);

		const geometryOrigin = new THREE.SphereGeometry(1, 0.2, 0.2);
		const materialOrigin = new THREE.MeshBasicMaterial(Materials.pointOfOrigin);
		const geometryDestination = new THREE.SphereGeometry(1, 0.2, 0.2);
		const materialDestination = new THREE.MeshBasicMaterial(
			Materials.pointOfDestination
		);

		this.meshOrigin = new THREE.Mesh(geometryOrigin, materialOrigin);
		this.meshOrigin.position.x = this.vertices[0].x;
		this.meshOrigin.position.y = this.vertices[0].y;
		this.meshOrigin.position.z = this.vertices[0].z;

		this.meshDestination = new THREE.Mesh(geometryDestination, materialDestination);
		this.meshDestination.position.x = this.vertices[this.vertices.length - 1].x;
		this.meshDestination.position.y = this.vertices[this.vertices.length - 1].y;
		this.meshDestination.position.z = this.vertices[this.vertices.length - 1].z;

		for (let i = 0, j = 0; i < this.vertices.length; i++) {
			const vertex = this.vertices[i];
			this.points[j++] = vertex.x;
			this.points[j++] = vertex.y;
			this.points[j++] = vertex.z;
		}

		this.curveGeometry.addAttribute(
			"position",
			new THREE.BufferAttribute(this.points, 3)
		);

		this.factor = 0.1;
		this.sense = 1;
		this.scale = 1;
	}

	_affectMeshes(arr, scale) {
		arr.forEach((element) => {
			element.x = scale;
			element.y = scale;
			element.z = scale;
		});
	}

	animate(currentCurveStep, material) {
		this.curveGeometry.setDrawRange(0, currentCurveStep);
		this.scale += this.factor * this.sense;

		this._affectMeshes(
			[this.meshDestination.scale, this.meshOrigin.scale],
			this.scale
		);

		if (this.scale >= 1.5 || this.scale <= 0.25) {
			this.sense *= -1;
		}

		this.meshDestination.material.opacity = this.meshOrigin.material.opacity = Math.random();

		if (currentCurveStep >= CURVE_SEGMENTS) {
			this.meshOrigin.material.opacity = 1;
			this.meshDestination.material.opacity = 1;
			this._affectMeshes(
				[this.meshDestination.scale, this.meshOrigin.scale],
				MESH_DEFAULT_SCALE
			);
		}

		this.mesh = new THREE.Line(this.curveGeometry, material);
	}
}
