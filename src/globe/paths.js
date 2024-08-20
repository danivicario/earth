// https://threejs.org/examples/webgl_custom_attributes_lines.html
// http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/

import * as THREE from "three";
import * as d3 from "d3";

import { CURVE_SEGMENTS } from "./constants";
import Curve from "./Curve";
import { rootMesh } from "./scene";

export default class Path {
	constructor(allCoords) {
		this.allCoords = allCoords;
		this.curves = [];

		this.allCoords.forEach((coords, idx) => {
			this.curves[idx] = new Curve(coords);
		});
	}

	animate(step) {
		this.destroyPaths();

		this.curveMesh = new THREE.Group();

		const colorScale = d3
			.scaleLinear()
			.domain([0, CURVE_SEGMENTS])
			.range(["green", "white"]);

		const material = new THREE.MeshBasicMaterial({
			color: colorScale(step)
		});

		this.allCoords.forEach((n, idx) => {
			const curve = this.curves[idx];
			curve.animate(step, material);
			this.curveMesh.add(curve.mesh);
			this.curveMesh.add(curve.meshOrigin);
			this.curveMesh.add(curve.meshDestination);
		});

		rootMesh.add(this.curveMesh);
	}

	destroyPaths() {
		for (var i = 1; i < rootMesh.children.length; i++) {
			rootMesh.remove(rootMesh.children[i]);
		}
	}
}
