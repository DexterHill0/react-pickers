import React, { useEffect, useState } from "react";

import reactCSSExtra from "reactcss-extra";
// import { transform } from "css-calc-transform";

import Checker from "./Checkerboard";
import Draggable from "./Draggable";

import { splitEvent } from "../helpers/Utils";

import { ReactPickers } from "../../types";


const useStops = (defaultStops: ReactPickers.Stop[]) => {
	const [stops, setStops] = useState<ReactPickers.Stop[]>([]);

	useEffect(() => {
		setStops(defaultStops.map(s => ({
			type: s.type,
			loc: s.loc,
			col: s.col,
		})));
	}, []);

	//Have to pass the parent size because often gradients are x% to y%
	const setStopData = (index: number, colour?: ReactPickers.Colour, location?: string) => {
		if (location) {
			setStops(stops => [{
				...stops[index],
				loc: location,
			}]);
		}
		else if (colour) {
			setStops(stops => [...stops, {
				...stops[index],
				col: colour,
			}]);
		}
	}

	const addStop = (stop: ReactPickers.Stop) => {
		setStops([...stops, stop]);
	}
	const removeStop = (index: number) => {
		setStops(stops.filter((_, i) => i !== index));
	}

	return { stops, addStop, removeStop, setStopData };
}


interface P extends ReactPickers.PickerThemeProps {
	currentColour: ReactPickers.Colour;

	stops: ReactPickers.Stop[];

	pointerSize?: string,
}
type Props = P & ReactPickers.StopProps;

const GradientStops: React.FC<Props> = (props: Props) => {
	let container: HTMLDivElement;

	let sIndex: number = -1;
	let startY: number = 0;

	const { stops, addStop, removeStop } = useStops(props.stops);

	const styles = reactCSSExtra({
		"default": {
			container: {
				borderRadius: "4px",
				width: "100%",
				height: "4.5rem",
				marginBottom: `calc(${props.pointerSize} + 2px)`,
				position: "relative",
				zIndex: 1,
				background: "green"
			},
			draggableContainer: {
				position: "relative",
				transform: `translateX(calc(${props.pointerSize} / -2))`,
				width: "inherit",
				height: `calc(100% + ${props.pointerSize})`,
			},
			stopContainer: {
				width: props.pointerSize,
				height: props.pointerSize,
				position: "absolute",
				zIndex: 1,
				bottom: 0,
			},
			banner: {
				position: "absolute",
				width: "100%",
				height: "100%",
				zIndex: -1,
				borderRadius: "50%",
				boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.4)",
			},
			content: {
				border: "2px solid #fff",
				borderRadius: "inherit",
				width: "inherit",
				height: "inherit",
			}
		},
	});

	const getStop = (index: number) => {
		return container.children[0].children[index] as HTMLDivElement;
	}

	const stopDragged = (e: any) => {
		const { width, left } = container.getBoundingClientRect();
		let { x, y } = splitEvent(e);

		if (startY === 0 && sIndex === -1) {
			//Store the starting touch so I can calculate the change in distance
			startY = y;
			//Get the key of the stop
			sIndex = parseInt(e.target.dataset.key);
		}

		x = Math.max(0, Math.min(x - left - window.pageXOffset, width));

		const stop = getStop(sIndex);
		if (!stop) return;

		props.onStopDragged && props.onStopDragged(stops[sIndex]);
		stop.style.left = `${x}px`;

		const hidden = Math.abs(startY - y);
		if (hidden >= 38 && hidden <= 40 && sIndex >= 0 && stops.length > 2) {
			removeStop(sIndex);
			props.onStopRemoved && props.onStopRemoved();

			sIndex = -1;
		}
	}

	const newStop = (e: any) => {
		const { width, left } = container.getBoundingClientRect();
		let { x } = splitEvent(e);

		x = Math.max(0, Math.min(x - left - window.pageXOffset, width));

		//"e.target" is always 1 child down from the element that has the actual event handler I think
		//anway this just checks the user clicked on the container not a stop
		if (!(container.children[0] === e.target)) return;

		const stop = {
			loc: x,
			col: props.currentColour,
			type: "px"
		}

		addStop(stop);

		props.onStopAdded && props.onStopAdded(stop)
	}

	const reset = () => {
		sIndex = -1;
		startY = 0;
	}

	return (
		<div style={styles.container} ref={(r) => { if (r) container = r; }} onMouseDown={newStop} onTouchStart={newStop}>
			<Draggable onDragged={stopDragged} onMouseUp={reset} style={styles.draggableContainer}>
				{
					stops.map((s, i) => {
						return (

							<div key={i} style={{ ...styles.stopContainer, left: `${s.loc}${s.type}` }}>
								<div style={styles.banner}>
									<Checker></Checker>
									<div data-key={i} style={{ ...styles.content, background: s.col.string() }}></div>
								</div>
							</div>
						);
					})
				}
			</Draggable>
		</div>
	)
}

export default GradientStops;