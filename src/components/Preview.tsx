import React from "react";

import { ReactPickers } from "../../types";

interface Props {
	previousColour: ReactPickers.Colour;
	currentColour: ReactPickers.Colour;

	width?: string;
	height?: string;
}

const Preview: React.FC<Props> = (props) => {

	return (
		<div style={{
			"background": `linear-gradient(360deg, ${props.previousColour.toHexString()} 50%,
										rgba(0,0,0) 50%, 
										${props.currentColour.toHexString()} 50%)`,
			"border": "none",
			"borderRadius": "5px",
			"width": props.width,
			"height": props.height,
		}}></div >
	)
}

export default Preview;

// "background": `linear-gradient(to top, rgb(0, 0, 0), transparent), 
// 										rgba(0, 0, 0, 0) 
// 										linear-gradient(to left, ${props.colour},
// 														rgb(255, 255, 255))`,