import Color from "color";
import { ReactPickers } from "../../types";
import { map, splitEvent } from "./Utils";

export const calculateSaturation = (e: any, container: HTMLDivElement, _pointer: HTMLDivElement): { s: number, v: number } => {
	const { width: cWidth, height: cHeight, left, top } = container.getBoundingClientRect();
	// const { width: pWidth, height: pHeight } = pointer.getBoundingClientRect();

	let { x, y } = splitEvent(e);

	x = Math.max(0, Math.min(x - 2 - left + window.pageXOffset, cWidth));
	y = Math.max(0, Math.min(y - 2 - top + window.pageYOffset, cHeight));

	const saturation = (x / cWidth) * 100;
	const brightness = (1 - (y / cHeight)) * 100;

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

export const equals = (col1: ReactPickers.Colour, col2: ReactPickers.Colour): boolean => {
	//Checks if the colours are completely equal
	return (
		(col1.hue() === col2.hue() ||
			(col1.hue() === 0 && col2.hue() === 360) ||
			(col1.hue() === 360 && col2.hue() === 0)) &&
		col1.saturationv() === col2.saturationv() &&
		col1.value() === col2.value()
	)
}

export const isValidColour = (col: any): boolean => {
	if (!col) return false;

	//Checks if the colour is valid
	try {
		const c = Color(col).array();

		//Sometimes the colour will be parsed but will return NaN, so this check is in place to stop that
		if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2])) return false;

		return true;
	} catch (e) {
		return false;
	}
}

export const toString = (col: ReactPickers.Colour, mode: ReactPickers.ColourMode, alpha?: boolean): string => {
	const map = {
		"HEX": col,
		"HEX8": col,
		"RGB": col.rgb(),
		"HSL": col.hsl(),
		"HSV": col.hsv(),
	}
	//Constructing my own string since the rounding is broken in the library
	const strF = map[mode];

	if (mode === "HEX" || mode === "HEX8") {
		//For HEX8 just display the normal hex, then multiple alpha by 100, round it, convert it to hex, then pad it with 0's
		return `${strF.hex()}${mode === "HEX8" ? Math.round(col.alpha() * 100).toString(16).padStart(2, "0") : ""}`
	}
	else {
		const arr = strF.array().map((v: number) => v.toFixed(1));
		const alphaV = col.alpha();
		//return all 3 values of the array joined together, and then check if there's an alpha channel
		return `${arr[0]}, ${arr[1]}, ${arr[2]}${alpha ? `, ${alphaV.toFixed(1)}` : arr[4] ? arr[4] : ""}`;
	}
}

export const toValue = (col: any, mode?: ReactPickers.ColourMode): ReactPickers.Colour | undefined => {
	//Also need to write a custom to value converter because `color-string` doesn't always work

	if (mode === "HEX") {
		if (col.startsWith("#") && isValidColour(col)) return Color(col);

		if (isValidColour("#" + col)) return Color("#" + col)
	}
	else if (mode === "HEX8" && col.length === 9) {
		const hex = col.substr(0, 7);
		const alpha = col.substr(7, 2);

		if (isValidColour(hex)) return Color(hex).hsv().alpha(parseInt(alpha, 16) / 100);
	}
	else {
		if (isValidColour(col)) return Color(col);

		//Need to split from comma when the user changes the text in the input
		const n = col.split(",").map((v: string) => parseFloat(v));

		if (isValidColour(n) && mode) return Color[mode.toLowerCase()]([n[0], n[1], n[2]]).alpha(n[3]);
	}
}