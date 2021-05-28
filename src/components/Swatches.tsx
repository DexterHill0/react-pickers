import React, { useEffect, useState } from "react";

import reactCSSExtra from "reactcss-extra";
import Color from "color";

import Button from "./Button";
import Checker from "./Checkerboard";
import Draggable from "./Draggable";
import { Col, Grid, Row } from "./flex/Flex";

import { splitEvent } from "../helpers/Utils";
import Gradient from "../helpers/Gradient";
import { isValidColour } from "../helpers/Colour";
import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";


//Custom hook to allow for adding and removing swatches easily
const useSwatches = (defaultSwatches: string[], max: number) => {
	const [swatches, setSwatches] = useState<string[]>([]);

	useEffect(() => {
		//Validate the default swatches
		setSwatches(defaultSwatches.filter((s) => {

			if (Gradient.isValid(s) || isValidColour(s)) return s
			else console.warn("Invalid swatch provided!");

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
		if (hidden >= 28 && hidden <= 30) {
			props.onRemove(props.index);
		}
	}

	return (
		<Draggable onDragged={handleMove}>
			<div onClick={() => props.onSelected(props.col)}>
				<div style={{
					borderRadius: "4px",
					background: props.col,
					width: "1.9rem",
					height: "1.9rem",
				}}></div>
				<Checker></Checker>
			</div>
		</Draggable>
	);
}

interface ContainerProps extends ReactPickers.PickerThemeProps {
	showSwatches?: boolean;

	disableSwatchCollapse?: boolean;
	allowSave?: boolean;
	maxSwatches?: number;
	defaultSwatches?: string[];

	currentColour: ReactPickers.Colour;

	onSwatchAdded?: (swatch: ReactPickers.Swatch) => void;
	onSwatchRemoved?: (index: number) => void;
	onSwatchSelected?: (swatch: ReactPickers.Swatch) => void;
}

const SwatchContainer: React.FC<ContainerProps> = (props: ContainerProps) => {

	const [isShown, setIsShown] = useState(false);

	const { swatches, addSwatch, removeSwatch } = useSwatches(props.defaultSwatches || [], props.maxSwatches || 15);

	const styles = reactCSSExtra({
		"default": {
			container: {
				color: props.$theme.colours.text,
				overflow: "hidden",
			},
			swatchContainer: {
				//If the swatches aren't shown, just set display to none. If they are shown but there isnt any swatches,
				//don't set the display to inline flex since it makes the swatch container grow even though there isn't any swatches
				display: isShown ? swatches.length > 0 ? "inline-flex" : "" : "none",
				flexWrap: "wrap",
				gap: "5px",
				marginTop: "5px",
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
					<Grid>
						<Row>
							<Col grow={1} maxWidth="9rem">
								<div onClick={() => setIsShown(!isShown)}>
									<div>{isShown ? "▼" : "▶"}&nbsp;&nbsp;&nbsp;Swatches</div>
								</div>
							</Col>
							<Col>
								{
									(props.allowSave || true) ? <Button width="3rem" height="1.5rem" text="Save" onClick={() => {
										addSwatch(props.currentColour.hsl().toString());
										//Show the swatches if a new one is added
										setIsShown(true);
										//Emit the event if a new swatch needs to be added
										props.onSwatchAdded && props.onSwatchAdded(props.currentColour);
									}}></Button> : <div></div>
								}
							</Col>
						</Row>
						<Row>
							<Col grow={1}>
								<div style={styles.swatchContainer}>
									{
										swatches.map((s, i) => <Swatch
											key={i}
											col={s}
											onRemove={remove}
											onSelected={(col) => props.onSwatchSelected && props.onSwatchSelected(Color(col))}
											index={i}>
										</Swatch>)
									}
								</div>
							</Col>
						</Row>
					</Grid>
					: <div></div>
			}
		</div>
	)
}

export default withTheme(SwatchContainer);