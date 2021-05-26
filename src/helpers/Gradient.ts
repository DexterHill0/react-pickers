import { parse, stringify } from "gradient-parser";

import { ReactPickers } from "../../types/index";

class Gradient {
	type: ReactPickers.GradientMode;
	orientation: {
		type: "angular";
		value: string;
	}
	colourStops: {
		type: "hex" | "rgb" | "rgba",
		value: string,
	}[];

	constructor(g: string | ReactPickers.GradientObject) {
		if (typeof g === "string") {
			g = Gradient.toGradientObject(g);
			Object.assign(this, g);
		}
		else {
			Object.assign(this, g);
		}
	}

	static toGradientObject(gradient: string): any {
		let parsed;

		try {
			parsed = parse(gradient)[0];
		} catch (e) {
			return {};
		}

		if (!Array.isArray(parsed.orientation) && parsed.orientation) {
			return {
				type: parsed.type,
				orientation: parsed.orientation,
				colourStops: parsed.colorStops,
			};
		}

		return {};
	}

	toString(): string {
		return stringify([{ type: this.type, orientation: this.orientation, colorStops: this.colourStops }] as any);
	}

	static isValid(gradient: string): boolean {
		return Object.keys(Gradient.toGradientObject(gradient)).length > 0;
	}

}

export default Gradient;