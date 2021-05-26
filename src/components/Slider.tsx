import React, { useEffect } from "react";

import reactCSSExtra from "reactcss-extra";

import Checker from "./Checkerboard";

import { calculateHueAlpha } from "../helpers/Colour";
import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";
import Draggable from "./Draggable";

interface Props extends ReactPickers.PickerThemeProps {
	pointerSize: string;

	width?: string;
	height?: string;

	type?: "HUE" | "ALPHA",

	defaultValue?: number;

	onChanged?: (value: number) => void;
}

const Slider: React.FC<Props> = (props: Props) => {
	let container: HTMLDivElement;
	let pointer: HTMLDivElement;


	useEffect(() => {
		//Set the default position on load and anytime the colour changes
		setValues(props.defaultValue, props.type || "HUE");
	}, [props.defaultValue]);

	const handleMove = (e: any) => {
		const h = calculateHueAlpha(e, container, pointer, props.type || "HUE");

		setValues(h, props.type || "HUE");

		props.onChanged && props.onChanged(h);
	}

	const setValues = (value: number | undefined, type: "HUE" | "ALPHA") => {
		pointer.style.background = `hsla(${value}, 100%, ${type === "HUE" ? "50%, 1" : `0%, ${value}`})`;
		pointer.style.left = `${type === "HUE" ? ((value || 0) / 360) * 100 : ((value || 1) / -1) * 100 + 100}%`;
	}

	const styles = reactCSSExtra({
		"default": {
			sliderContainer: {
				width: "15rem",
				height: "0.6rem",
				background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0, 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
				borderRadius: "4px",
			},
			pointerContainer: {
				position: "absolute",
				transform: `translateX(calc(${props.pointerSize} / -2))`,
				width: "15rem",
				height: "0.6rem",
			},
			pointer: {
				width: props.pointerSize,
				height: props.pointerSize,
				background: (props.type || "HUE") === "ALPHA" ? "#000000" : `hsla(${props.defaultValue}, 100%, 50%, 1)`,
				boxShadow: "0px 0px 0px 3px #fff",
				borderRadius: "50%",
				position: "relative",
				top: "50%",
				transform: `translateY(-50%)`
			},
		},
		"alpha": {
			sliderContainer: {
				zIndex: 3,
				background: "linear-gradient(270deg, rgba(0,0,0,0) 0%, #000000 100%)",
			}
		}
	}, {
		"alpha": props.type === "ALPHA",
	});

	return (
		<Draggable onDragged={handleMove}>
			<div
				style={styles.sliderContainer}
				ref={r => { if (r) container = r; }}
			>
				{
					props.type === "ALPHA" ? <Checker></Checker> : <div></div>
				}
				<div style={styles.pointerContainer}>
					<div
						style={styles.pointer}
						ref={r => { if (r) pointer = r; }}
					/>
				</div>
			</div>
		</Draggable>
	);
}

export default withTheme(Slider);

