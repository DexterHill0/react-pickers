import React from "react";

import reactCSSExtra, { styleMerge } from "reactcss-extra";

import { calculateSaturation } from "../helpers/Colour";
import { splitEvent } from "../helpers/Utils";

import { ReactPickers } from "../../types";

interface Props {
	currentColour: ReactPickers.Colour;

	pointerSize: string;

	width?: string;
	height?: string;

	onChanged?: (saturation: number, luminance: number) => void;
}

class Palette extends React.Component<Props, {}> {
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
		const { s, v } = calculateSaturation(e, this.container, this.pointer);

		//I dont like that this code is basically identical to whats in "calculateSaturation" however, to get the pointer
		//to stop where I want it to I have to calculate the values slightly differently.
		const { width: cWidth, height: cHeight, left, top } = this.container.getBoundingClientRect();
		const { width: pWidth, height: pHeight } = this.pointer.getBoundingClientRect();

		let { x, y } = splitEvent(e);

		x = Math.max(0, Math.min(x - (pWidth / 2) - left + window.pageXOffset, cWidth - pWidth / 2));
		y = Math.max(0, Math.min(y - (pHeight / 2) - top + window.pageYOffset, cHeight - pHeight / 2));

		this.pointer.style.top = `${y}px`;
		this.pointer.style.left = `${x}px`;

		this.props.onChanged && this.props.onChanged(s, v);
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	styles = reactCSSExtra({
		"default": {
			container: {
				border: "none",
				borderRadius: "4px",
				width: this.props.width,
				height: this.props.height,
				position: "absolute",
			},
			pointer: {
				cursor: "pointer",
				background: "rgba(0,0,0,0)",
				border: "3px solid",
				borderColor: "#FFFFFF",
				opacity: "0.7",
				mixBlendMode: "difference",
				borderRadius: "50%",
				width: this.props.pointerSize,
				height: this.props.pointerSize,
				position: "absolute",
			},
		},
	});

	render() {
		const colour = reactCSSExtra({
			"default": {
				container: {
					background: `linear-gradient(to top, #000000, transparent), 
										rgba(0, 0, 0, 0) 
										linear-gradient(to left, ${this.props.currentColour.toHexString()}, 
														#ffffff)`,
				}
			}
		});

		return (
			<div
				style={styleMerge(false, colour, this.styles).container}
				ref={container => { if (container) this.container = container; }}

				onMouseDown={this.handleMouseDown}
				onTouchMove={this.handleMove}
				onTouchStart={this.handleMove}
			>
				<div style={this.styles.pointer}
					ref={pointer => { if (pointer) this.pointer = pointer; }}
				></div>
			</div >
		);
	}
}

export default Palette;