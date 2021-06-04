import React, { useEffect } from "react";

import reactCSSExtra from "reactcss-extra";
import Color from "color";

import Checker from "./Checkerboard";

import { toValue } from "../helpers/Colour";

import { ReactPickers } from "../../types";

interface Props extends ReactPickers.PickerThemeProps {
	currentColour: ReactPickers.Colour;

	defaultGradient: ReactPickers.Gradient;

	width?: string;
	height?: string;
}

const GradientStops: React.FC<Props> = (props: Props) => {

	const styles = reactCSSExtra({
		"default": {
			container: {
				borderRadius: "4px",
				width: props.width,
				height: props.height,
				position: "relative",
				zIndex: 1,
			},
			content: {
				top: 0,
				left: 0,
				position: "absolute",
				width: "inherit",
				height: "inherit",
				zIndex: -1,
			},
			gradient: {
				borderRadius: "4px",
				background: props.defaultGradient.toString(),
				width: "inherit",
				height: "inherit",
			},
			stops: {

			}
		},
	});

	useEffect(() => {
		console.log(props.defaultGradient.colourStops)
	}, []);

	return (
		<div style={styles.container}>
			<div style={styles.stops}>
				{
					props.defaultGradient.colourStops.map(s => {
						const col = toValue(s.value, s.type.toUpperCase() as ReactPickers.ColourMode) || Color();

						return (
							<div style={{ width: "1rem", height: "1rem", background: col.string(), border: "2px solid #fff", borderRadius: "50%" }}></div>
						)
					})
				}
			</div>

			<div style={styles.content}>
				<Checker></Checker>
				<div style={styles.gradient}></div>
			</div>
		</div>
	)
}

export default GradientStops;