import React from "react";

import { ReactPickers } from "../../types";
import Checker from "./Checkerboard";

interface Props {
	previousColour: ReactPickers.Colour;
	currentColour: ReactPickers.Colour;

	width?: string;
	height?: string;
}

const Preview: React.FC<Props> = (props: Props) => {

	return (
		<div style={{ "width": props.width, "height": props.height }}>
			<div style={{
				background: `linear-gradient(360deg, ${props.previousColour.hsl().string()} 50%, 
											${props.currentColour.hsl().string()} 50%)`,
				border: "none",
				borderRadius: "4px",
				width: props.width,
				height: props.height,
				position: "absolute",
				zIndex: 3,
			}}></div >
			<Checker></Checker>
		</div>
	)
}

export default Preview;