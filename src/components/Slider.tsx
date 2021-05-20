import React from "react";

import reactCSSExtra from "reactcss-extra";

import { calculateHueAlpha } from "../helpers/Colour";
import withTheme from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

interface Props extends ReactPickers.PickerThemeProps {
	pointerSize: string;

	width?: string;
	height?: string;

	type?: "HUE" | "ALPHA",

	onChanged?: (value: number) => void;
}

class Slider extends React.Component<Props, {}> {
	container: HTMLDivElement;
	pointer: HTMLDivElement;


	/**
	 * Allows for the "pointer" to continue to move even if your mouse has left the
	 * container"s bounding box.
	 */
	handleMouseDown = (e: any) => {
		this.handleMove(e);

		window.addEventListener("mousemove", this.handleMove);
		window.addEventListener("mouseup", this.handleMouseUp);
	}

	handleMouseUp = () => {
		this.removeListeners();
	}

	removeListeners() {
		window.removeEventListener("mousemove", this.handleMove);
		window.removeEventListener("mouseup", this.handleMouseUp);
	}

	handleMove = (e: any) => {
		const h = calculateHueAlpha(e, this.container, this.pointer, this.props.type || "HUE");

		this.pointer.style.left = `${((h * 100) / 360)}%`;

		this.props.onChanged && this.props.onChanged(h);
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	styles = reactCSSExtra({
		"default": {
			container: {
				width: "15rem",
				height: "0.7rem",
				background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0, 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
				borderRadius: "4px",
				position: "relative",

			},
			pointer: {
				width: this.props.pointerSize,
				height: this.props.pointerSize,
				borderRadius: "50%",
				background: "rgba(0,0,0,0)",
				border: "3px solid",
				borderColor: this.props.$theme.colours.border,
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)"
			},
		},
	});

	render() {
		return (
			<div
				style={this.styles.container}
				ref={container => { if (container) this.container = container; }}

				onMouseDown={this.handleMouseDown}
				onTouchMove={this.handleMove}
				onTouchStart={this.handleMove}
			>
				<div
					style={this.styles.pointer}
					ref={pointer => { if (pointer) this.pointer = pointer; }}
				/>
			</div>
		);
	}
}

export default withTheme(Slider);