import React from "react";

import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

interface Props extends ReactPickers.PickerThemeProps {
	text: string;

	disabled?: boolean;

	width?: string;
	height?: string;

	onClick?: (e: any) => void;
}

const Input: React.FC<Props> = (props: Props) => {

	return (
		<button style={{
			border: "none",
			borderRadius: "4px",
			background: props.$theme.colours.button,
			width: props.width,
			height: props.height,
			color: props.$theme.colours.text,
		}}
			disabled={props.disabled || false}
			onClick={props.onClick}
		>
			{props.text}
		</button >
	)
}

export default withTheme(Input);
