import React, { useEffect } from "react";

import reactCSSExtra from "reactcss-extra";

import Draggable from "./Draggable";
import Checker from "./Checkerboard";

import { calculateHueAlpha } from "../helpers/Colour";
import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

interface Props extends ReactPickers.PickerThemeProps {
	pointerSize: string;

	type?: "HUE" | "ALPHA",

	defaultValue: number;

	onChanged: (n: number) => void;
}

const Slider: React.FC<Props> = (props: Props) => {
	let container: HTMLDivElement;
	let pointer: HTMLDivElement;

	const type = props.type || "HUE";

	useEffect(() => {
		//Set the default position on load and anytime the colour changes
		setValues(props.defaultValue, type);
	}, [props.defaultValue]);

	const handleMove = (e: any) => {
		const h = calculateHueAlpha(e, container, type);

		//I don't need to set the values here because that happens in the useEffect, however with the color library,
		//once the hue is 360, it wraps around to 0 which would cause the pointer to jump to the beginning of the
		//slider, so this is the workaround
		type === "HUE" ? setValues(h, type) : undefined;

		props.onChanged(h);
	}

	const setValues = (value: number, type: "HUE" | "ALPHA") => {
		pointer.style.background = `hsla(${value}, 100%, ${type === "HUE" ? "50%, 1" : `0%, ${value}`})`;
		pointer.style.left = `${type === "HUE" ? (value / 360) * 100 : ((value / -1) * 100) + 100}%`;
	}

	const styles = reactCSSExtra({
		"default": {
			draggableContainer: {
				width: `calc(100% - (${props.pointerSize} / 2))`,
				height: "0.6rem",
				marginBottom: `calc(${props.pointerSize} - 0.3rem + 5px)`,
			},
			sliderContainer: {
				position: "relative",
				left: "50%",
				transform: "translateX(-50%)",
				width: "inherit",
				height: "inherit",
				zIndex: 1,
			},
			pointerContainer: {
				position: "relative",
				transform: `translateX(calc(${props.pointerSize} / -2))`,
				width: "100%",
				height: "inherit",
			},
			pointer: {
				width: props.pointerSize,
				height: props.pointerSize,
				background: type === "ALPHA" ? "#000000" : `hsla(${props.defaultValue}, 100%, 50%, 1)`,
				boxShadow: "0px 0px 0px 2px #fff",
				borderRadius: "50%",
				position: "relative",
				top: "50%",
				transform: "translateY(-50%)",
			},
			banner: {
				borderRadius: "4px",
				top: 0,
				left: 0,
				position: "absolute",
				width: "100%",
				height: "inherit",
				zIndex: -1,
			},
			gradient: {
				borderRadius: "inherit",
				background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0, 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
				width: "inherit",
				height: "inherit",
			}
		},
		"alpha": {
			gradient: {
				background: "linear-gradient(270deg, rgba(0,0,0,0) 0%, #000000 100%)",
			}
		}
	}, {
		"alpha": type === "ALPHA",
	});

	return (
		<Draggable onDragged={handleMove} style={styles.draggableContainer}>
			<div
				style={styles.sliderContainer}
				ref={r => { if (r) container = r; }}
			>

				<div style={styles.pointerContainer}>
					<div
						style={styles.pointer}
						ref={r => { if (r) pointer = r; }}
					/>
				</div>

				<div style={styles.banner}>
					{
						props.type === "ALPHA" ? <Checker></Checker> : <div></div>
					}
					<div style={styles.gradient}></div>
				</div>

			</div>
		</Draggable>
	);
}

export default withTheme(Slider);

