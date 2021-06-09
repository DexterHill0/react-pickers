import React from "react";

import { ReactPickers } from "../../types";
import Checker from "./Checkerboard";

interface Props {
	previousColour: ReactPickers.Colour;
	currentColour: ReactPickers.Colour;
}

const Preview: React.FC<Props> = (props: Props) => {

	return (
		<div style={{ position: "relative", width: "100%", height: "100%", marginRight: "5px", zIndex: 1 }}>
			<div style={{ top: 0, left: 0, position: "absolute", width: "inherit", height: "inherit", zIndex: -1, borderRadius: "4px", }}>
				<Checker></Checker>
				<div style={{
					background: `linear-gradient(360deg, ${props.previousColour.string()} 50%, 
											${props.currentColour.string()} 50%)`,
					border: "none",
					borderRadius: "inherit",
					width: "inherit",
					height: "inherit",
					position: "absolute",
				}}></div >
			</div>
		</div>
	)
}

export default Preview;