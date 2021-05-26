import React from "react";

import { ReactPickers } from "../../types";

import { withTheme } from "../providers/ThemeProvider";

interface Props extends ReactPickers.PickerThemeProps {
	text: string;

	background?: string;
	fontColour?: string;
	width?: string;
	height?: string;
}

const Input: React.FC<Props> = (props: Props) => {

	return (
		<input type="text" defaultValue={props.text} style={{
			border: "none",
			borderRadius: "4px",
			background: props.$theme.colours.input,
			width: props.width,
			height: props.height,
			color: props.$theme.colours.text,
		}}></input >
	)
}

export default withTheme(Input);
