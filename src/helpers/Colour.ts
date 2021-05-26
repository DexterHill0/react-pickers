import { map, splitEvent } from "./Utils";

export const calculateSaturation = (e: any, container: HTMLDivElement, _pointer: HTMLDivElement): { s: number, v: number } => {
	const { width: cWidth, height: cHeight, left, top } = container.getBoundingClientRect();
	// const { width: pWidth, height: pHeight } = pointer.getBoundingClientRect();

	let { x, y } = splitEvent(e);

	x = Math.max(0, Math.min(x - 2 - left + window.pageXOffset, cWidth));
	y = Math.max(0, Math.min(y - 2 - top + window.pageYOffset, cHeight));

	const saturation = x / cWidth;
	const brightness = 1 - (y / cHeight);

	return {
		s: saturation,
		v: brightness,
	}
}

export const calculateHueAlpha = (e: any, container: HTMLDivElement, _pointer: HTMLDivElement, type: "HUE" | "ALPHA"): number => {
	const { width: cWidth, left } = container.getBoundingClientRect();
	let { x } = splitEvent(e);
	x = Math.max(0, Math.min(x - left, cWidth));

	//If type is `HUE`, map from 0 to 360. If type is `ALPHA` map from 1 to 0
	return map(x, 0, cWidth, type === "HUE" ? 0 : 1, type === "HUE" ? 360 : 0);
}