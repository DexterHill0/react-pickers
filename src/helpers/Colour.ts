import { map, splitEvent } from "./Utils";

export const calculateSaturation = (e: any, container: HTMLDivElement, pointer: HTMLDivElement) => {
	const { width: cWidth, height: cHeight, left, top } = container.getBoundingClientRect();
	const { width: pWidth, height: pHeight } = pointer.getBoundingClientRect();

	let { x, y } = splitEvent(e);

	x = Math.max(0, Math.min(x - (pWidth / 2) - left + window.pageXOffset, cWidth));
	y = Math.max(0, Math.min(y - (pHeight / 2) - top + window.pageYOffset, cHeight));

	const saturation = x / cWidth;
	const brightness = 1 - (y / cHeight);

	return {
		s: saturation,
		v: brightness,
	}
}

export const calculateHueAlpha = (e: any, container: HTMLDivElement, pointer: HTMLDivElement, type: "HUE" | "ALPHA") => {
	const cWidth = container.getBoundingClientRect().width;
	const pWidth = pointer.getBoundingClientRect().width;

	let { x } = splitEvent(e);
	x = Math.max(0, Math.min(x - (pWidth / 2), cWidth - pWidth));

	console.log(cWidth, pWidth)

	return map(x, 0, cWidth - pWidth, 0, type === "HUE" ? 360 : 1);
}