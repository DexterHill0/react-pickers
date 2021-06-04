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
		if (swatches.length - 1 >= defaultSwatches.length) {
			setSwatches(swatches.filter((_, i) => i !== index));
		}
	}

	return { swatches, addSwatch, removeSwatch };
}

type ContainerProps = ReactPickers.SwatchProps & ReactPickers.PickerThemeProps & ReactPickers.State;

const SwatchContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
	let startY: number = 0;
	let clIndex: number = -1;

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

	const handleMove = (e: any) => {
		const { y } = splitEvent(e);
		if (startY === 0 && clIndex === -1) {
			//Store the starting touch so I can calculate the change in distance
			startY = y;
			//Get the key of the swatch
			clIndex = parseInt(e.target.dataset.key);
		}

		const hidden = Math.abs(startY - y);

		//Drag threshold for removing
		if (hidden >= 28 && hidden <= 30 && clIndex >= 0) {
			removeSwatch(clIndex);
			props.onSwatchRemoved && props.onSwatchRemoved(clIndex);

			clIndex = -1;
		}
	}

	return (
		<div style={styles.container}>
			{
				(props.showSwatches || true) ?
					<Grid direction="column">

						<Row display="flex">
							<Col grow={1} maxWidth="7.5rem">
								<div onClick={() => setIsShown(!isShown)}>
									<div>{isShown ? "▼" : "▶"}&nbsp;&nbsp;&nbsp;Swatches</div>
								</div>
							</Col>
							<Col>
								{
									(props.allowSave || true) ? <Button width="3rem" height="1.5rem" text="Save" onClick={() => {
										addSwatch(props.currCol.string());
										//Show the swatches if a new one is added
										setIsShown(true);
										//Emit the event if a new swatch needs to be added
										props.onSwatchAdded && props.onSwatchAdded(props.currCol);
									}}></Button> : <div></div>
								}
							</Col>
						</Row>

						<Col grow={1}>
							<Draggable onDragged={handleMove} style={styles.swatchContainer}>
								{
									swatches.map((s, i) => (
										<div
											key={i}
											style={{ width: "1.9rem", height: "1.9rem", position: "relative", zIndex: 1 }}
											onClick={() => { props.$update && props.$update(s); props.onSwatchSelected && props.onSwatchSelected(Color(s)) }}
										>
											<div style={{
												top: 0,
												left: 0,
												position: "absolute",
												width: "inherit",
												height: "inherit",
												zIndex: -1,
											}}>
												<Checker></Checker>
												<div data-key={i} style={{
													borderRadius: "4px",
													background: s,
													width: "inherit",
													height: "inherit",
												}}></div>
											</div>
										</div>
									))
								}
							</Draggable>
						</Col>
					</Grid>
					: <div></div>
			}
		</div>
	)
}

export default withTheme(SwatchContainer);