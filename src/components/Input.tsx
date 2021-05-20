import React from "react";

interface Props {
	text?: string;

	background?: string;
	fontColour?: string;
	width?: string;
	height?: string;
}

const Input: React.FC<Props> = (props) => {

	return (
		<input type="text" value={props.text} style={{
			"border": "none",
			"borderRadius": "2px",
			"background": props.background,
			"width": props.width,
			"height": props.height,
			"color": props.fontColour,
		}}></input >
	)
}

export default Input;

//