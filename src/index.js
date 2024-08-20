import "./style.css";

import initGlobe from "./globe";

initGlobe(document.getElementById("globe-app"));

const body = document.querySelector("body");

const text = "Press enter to animate";
const time = 2000;

if (body !== null) {
	const toastElement = document.createElement("div");
	toastElement.innerHTML = text;
	toastElement.style.position = "absolute";
	toastElement.style.top = "100px";
	toastElement.style.width = "100%";
	toastElement.style.color = "white";
	toastElement.style.textAlign = "center";
	toastElement.style.fontSize = "100px";

	body.appendChild(toastElement);

	setTimeout(() => {
		toastElement.remove();
	}, time);
}
