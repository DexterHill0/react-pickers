import { parse, stringify } from "gradient-parser";

class Gradient {
	gradient: string;

	constructor(string: string) {
		this.gradient = string
	}

	getOriginal(): string {
		return this.gradient;
	}

	stringify(): string {
		return stringify(this.parsed());
	}

	parsed(): any {
		return parse(this.gradient);
	}

}

export default Gradient;