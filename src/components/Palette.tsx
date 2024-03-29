import React, { useEffect } from "react";

import reactCSSExtra from "reactcss-extra";

import { calculateSaturation } from "../helpers/Colour";

import { ReactPickers } from "../../types";
import Draggable from "./Draggable";


interface Props {
	currentColour: ReactPickers.Colour;

	pointerSize: string;

	onChanged: (s: number, value: number) => void;
}

const Palette: React.FC<Props> = (props: Props) => {
	let container: HTMLDivElement;
	let pointer: HTMLDivElement;

	useEffect(() => {
		//Set the default position on load and when the colour changes (ie. via a swatch)
		setValues(props.currentColour.saturationv(), props.currentColour.value());
	}, [props.currentColour]);

	const handleMove = (e: any) => {
		const { s, v } = calculateSaturation(e, container);

		setValues(s, v);

		props.onChanged(s, v);
	}

	const setValues = (saturation: number, value: number) => {
		pointer.style.left = `${saturation}%`;
		pointer.style.top = `${-value + 100}%`;
	}

	const styles = reactCSSExtra({
		"default": {
			draggable: {
				position: "relative",
				width: "inherit",
				height: "inherit",
				marginBottom: "5px",
				flex: 1,
			},
			mainContainer: {
				width: "100%",
				height: "100%",
				borderRadius: "4px",
				position: "relative",
				background: `linear-gradient(to top, #000, transparent),
									rgba(0, 0, 0, 0)
									linear-gradient(to left, hsl(${props.currentColour.hue()}, 100%, 50%),
													#fff)`,
				overflow: "hidden",
			},
			/**
			 * I'm using another div to act like a shifted bounding box, allowing the pointer to move one radius of itself
			 * off each side of the main container.
			 */
			pointerContainer: {
				transform: `translate(calc(${props.pointerSize} / -2), calc(${props.pointerSize} / -2))`,
				width: "inherit",
				height: "inherit",
			},
			pointer: {
				cursor: "pointer",
				background: "rgba(0,0,0,0)",
				boxShadow: "0px 0px 0px 2px #fff",
				borderRadius: "50%",
				width: props.pointerSize,
				height: props.pointerSize,
				position: "relative",
			},
		},
	});

	return (
		<Draggable onDragged={handleMove} style={styles.draggable}>
			<div
				style={styles.mainContainer}
				ref={r => { if (r) container = r; }}
			>
				<div style={styles.pointerContainer}>
					<div style={styles.pointer}
						ref={r => { if (r) pointer = r; }}
					></div>
				</div>
			</div >
		</Draggable>
	);

}

export default Palette;