import React from "react";

import { ReactPickers } from "../../types";
import Checker from "./Checkerboard";

interface Props {
	previousColour: ReactPickers.Colour;
	currentColour: ReactPickers.Colour;
}

const Preview: React.FC<Props> = (props: Props) => {

	return (
		<div style={{ position: "relative", width: "100%", height: "100%", marginRight: "5px" }}>
			<div style={{
				background: `linear-gradient(360deg, ${props.previousColour.hsl().string()} 50%, 
											${props.currentColour.hsl().string()} 50%)`,
				border: "none",
				borderRadius: "4px",
				width: "inherit",
				height: "inherit",
				position: "absolute",
				zIndex: 3,
			}}></div >
			<Checker></Checker>
		</div>
	)
}

export default Preview;