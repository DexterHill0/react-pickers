import React from "react";
import reactCSSExtra from "reactcss-extra";

import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

interface Props extends ReactPickers.PickerThemeProps {
	colourMode: ReactPickers.ColourMode;
	currentColour: ReactPickers.Colour;

	showAlpha?: boolean;

	onValueChanged?: (text: string) => void;
}

const Input: React.FC<Props> = (props: Props) => {

	const styles = reactCSSExtra({
		"default": {
			container: {
				color: props.$theme.colours.text,
			},
			input: {
				border: "none",
				borderRadius: "4px",
				background: props.$theme.colours.input,
				width: "inherit",
				height: "inherit",
				color: props.$theme.colours.text,
			}
		}
	});

	const values = {
		"HEX": props.currentColour,
		"HEX8": props.currentColour,
		"RGB": props.currentColour.rgb(),
		"HSL": props.currentColour.hsl(),
	}

	const constructString = () => {
		//Constructing my own string since the rounding is broken in the library
		const col = values[props.colourMode];

		if (props.colourMode === "HEX") {
			return col.hex().toString();
		}
		else if (props.colourMode === "HEX8") {
			//Firstly just display the normal hex, then multiple alpha by 100, round it, convert it to hex, then pad it with 0's
			return `${col.hex().toString()}${Math.round(col.alpha() * 100).toString(16).padStart(2, "0")}`;
		}
		else {
			const arr = col.array().map(v => v.toFixed(1));
			const alpha = col.alpha();
			//Use the colour mode with an "a" to make a string like "rgba(....)", or just "rgb" if alpha is disabled
			return `${props.colourMode.toLowerCase()}${props.showAlpha ? "a" : ""}(${arr[0]}, ${arr[1]}, ${arr[2]}${props.showAlpha ? `, ${alpha.toFixed(1)}` : ""})`;
		}
	}

	return (
		<div style={styles.container}>
			<div>{props.colourMode}</div>
			<input type="text" value={constructString()} style={styles.input}
				onChange={(event) => props.onValueChanged && props.onValueChanged(event.target.value)}
			></input >
		</div >
	)
}


export default withTheme(Input);
