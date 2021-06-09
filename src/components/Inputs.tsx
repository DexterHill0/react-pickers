import React, { useState } from "react";
import reactCSSExtra from "reactcss-extra";

import { toString } from "../helpers/Colour";
import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

interface Props extends ReactPickers.PickerThemeProps {
	colourMode: ReactPickers.ColourMode;
	currentColour: ReactPickers.Colour;

	showAlpha?: boolean;

	onValueChanged?: (text: string) => void;
}

const Input: React.FC<Props> = (props: Props) => {
	const [focus, setFocus] = useState(false);

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
				height: "20px",
				color: props.$theme.colours.text,
			}
		}
	});

	const constructString = () => {
		return toString(props.currentColour, props.colourMode, props.showAlpha || true);
	}

	const [value, setValue] = useState(constructString());

	return (
		<div style={styles.container}>
			<div>{props.colourMode}</div>
			<input type="text" value={focus ? value : constructString()} style={styles.input}
				onChange={(event) => { setValue(event.target.value); props.onValueChanged && props.onValueChanged(event.target.value) }}
				onFocus={() => { setFocus(true); setValue(constructString()) }}
				onBlur={() => setFocus(false)}
			></input >
		</div >
	)
}

export default withTheme(Input);
