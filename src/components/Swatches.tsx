import React, { useEffect, useState } from "react";

import reactCSSExtra from "reactcss-extra";
import tc2 from "tinycolor2";

import Button from "./Button";
import Checker from "./Checkerboard";

import Gradient from "../helpers/Gradient";
import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";
import Draggable from "./Draggable";
import { splitEvent } from "../helpers/Utils";

type S = string[];

interface ContainerProps extends ReactPickers.PickerThemeProps {
	showSwatches?: boolean;

	disableSwatchCollapse?: boolean;
	allowSave?: boolean;
	maxSwatches?: number;
	defaultSwatches?: S;

	currentColour: ReactPickers.Colour;

	onSwatchAdded?: (swatch: ReactPickers.Swatch) => void;
	onSwatchRemoved?: (index: number) => void;
	onSwatchSelected?: (swatch: ReactPickers.Swatch) => void;
}

//Custom hook to allow for adding and removing swatches easily
const useSwatches = (defaultSwatches: S, max: number) => {
	const [swatches, setSwatches] = useState<string[]>([]);

	useEffect(() => {
		//Validate the default swatches
		setSwatches(defaultSwatches.filter((s) => {
			if (tc2(s).isValid() || Gradient.isValid(s)) return s;
			return "";
		}));
	}, []);

	const addSwatch = (swatch: string) => {
		if (swatches.length + 1 < max) setSwatches([...swatches, swatch]);
	}
	const removeSwatch = (index: number) => {
		if (swatches.length - 1 >= 0) {
			setSwatches([...swatches.slice(0, index), ...swatches.slice(index + 1)]);
		}
	}

	return { swatches, addSwatch, removeSwatch };
}

interface SwatchProps {
	col: string;
	index: number;
	onRemove: (index: number) => void;
	onSelected: (col: string) => void;
}

const Swatch: React.FC<SwatchProps> = (props: SwatchProps) => {
	let startY: number = 0;

	const handleMove = (e: any) => {
		const { y } = splitEvent(e);
		if (startY === 0) {
			//Store the starting touch so I can calculate the change in distance
			startY = y;
		}

		const hidden = Math.abs(startY - y);

		//Drag threshold for removing
		if (hidden >= 38 && hidden <= 40) {
			props.onRemove(props.index);
		}
	}

	return (
		<Draggable onDragged={handleMove}>
			<div onClick={() => props.onSelected(props.col)}>
				<div style={{
					borderRadius: "4px",
					background: props.col,
					width: "1.7rem",
					height: "1.7rem",
				}}></div>
				<Checker></Checker>
			</div>
		</Draggable>
	);
}


const SwatchContainer: React.FC<ContainerProps> = (props: ContainerProps) => {

	const [isShown, setIsShown] = useState(true);

	const { swatches, addSwatch, removeSwatch } = useSwatches(props.defaultSwatches || [], props.maxSwatches || 15);

	const styles = reactCSSExtra({
		"default": {
			container: {
				display: "flex",
				alignItems: "flex-start",
				color: props.$theme.colours.text,
				overflow: "hidden",
			},
			swatchContainer: {
				position: "relative",
				transition: "opacity 0.3s, transform 0.6s",
				transform: `translateY(${isShown ? "0" : "-100%"})`,
				opacity: `${isShown ? "1" : "0"}`,
			},
		}
	});

	const remove = (index: number) => {
		props.onSwatchRemoved && props.onSwatchRemoved(index);

		removeSwatch(index);
	}

	return (
		<div style={styles.container}>
			{
				(props.showSwatches || true) ?
					<div>
						<div onClick={() => setIsShown(!isShown)}>
							<div>{isShown ? "V" : ">"}</div>

							<div>Swatches</div>
						</div>
						{
							(props.allowSave || true) ? <Button text="Save" onClick={() => {
								addSwatch(props.currentColour.toHslString());

								//Emit the event if a new swatch needs to be added
								props.onSwatchAdded && props.onSwatchAdded(props.currentColour);
							}}></Button> : <div></div>
						}
						<div style={styles.swatchContainer}>
							{
								swatches.map((s, i) => <Swatch
									key={i}
									col={s}
									onRemove={remove}
									onSelected={(col) => props.onSwatchSelected && props.onSwatchSelected(tc2(col))}
									index={i}>
								</Swatch>)
							}
						</div>

					</div> : <div></div>
			}
		</div>
	)
}

export default withTheme(SwatchContainer);
