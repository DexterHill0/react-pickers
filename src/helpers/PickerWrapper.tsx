import React, { useEffect, useState } from "react";

import reactCSSExtra from "reactcss-extra";

import Color from "color";

import Palette from "../components/Palette";
import Preview from "../components/Preview";
import Inputs from "../components/Inputs";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { Col, Grid, Row } from "../components/flex/Flex";

import { copyToClipboard, readFromClipboard } from "./Utils";
import { isValidColour } from "./Colour";

import { theme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

const BasePicker = (Picker: React.ComponentType<any>) => {

	return (props: ReactPickers.PickerProps | ReactPickers.GradientPickerProps) => {
		let self: HTMLDivElement;

		const getColour = () => {
			if (!isValidColour(props.defaultColour)) {
				console.warn("Invalid default colour provided!");

				return Color([0, 0, 0, 1]);
			}
			else return Color(props.defaultColour).hsv();
		}

		const [state, setState] = useState({
			isFocused: false,

			prevCol: Color([0, 0, 0, 1]),

			currCol: getColour(),
		});

		useEffect(() => {
			props.onInit && props.onInit();
		}, []);

		useEffect(() => {
			//Once the state has changed, emit the colour changed event
			props.onColourChanged && props.onColourChanged(state.currCol);
		}, [state.currCol]);


		const onFocused = () => {
			document.addEventListener("mousedown", onLostFocus);

			props.onFocus && props.onFocus();
			setState({ ...state, isFocused: true });
		}
		const onLostFocus = (e: any) => {
			//If the element clicked on is anything but the current picker
			if (!self.contains(e.target)) {
				document.removeEventListener("mousedown", onLostFocus);

				props.onBlur && props.onBlur();
				//Update the focus and change the previous colour to the current colour
				setState({ ...state, isFocused: false, prevCol: state.currCol });
			}
		}

		const setUserColour = (col: string) => {
			props.onInput && props.onInput(col);

			if (isValidColour(col)) {
				setState({ ...state, currCol: Color(col).hsv() });
			}
		}

		const styles = reactCSSExtra({
			"default": {
				container: {
					padding: "5px 5px 5px 5px",
					width: props.width,
					height: props.height,
					userSelect: "none",
					font: props.style?.font,
					background: props.style?.colours?.background || ((props.theme || "DARK") === "DARK" ? "#161819" : "#FFFFFF"),
					borderRadius: "4px",
					position: "relative",
				}
			},
		});

		const updatePrevCol = () => {
			setState({ ...state, prevCol: state.currCol });
		}

		return (
				//Tell the provider the theme given by the user
			<theme.Provider value={props.theme || "DARK"}>
				{
					//Focus is passed down as a prop
					props.visible === false ? <div></div> :
						<div
							ref={(r) => { if (r) self = r; }}
							style={styles.container}

							onMouseDown={onFocused}
							onTouchStart={onFocused}
						>
							<Grid>
								<Picker {...state} {...props} update={updatePrevCol}></Picker>

								<Row columnGap="10px">
									<Col grow={0} shrink={1} width="2.5rem" minWidth="1rem">
										<Preview
											previousColour={state.prevCol}
											currentColour={state.currCol}
										></Preview>
									</Col>

									<Col grow={1} minWidth="6rem">
										<Palette
											currentColour={state.currCol}
											pointerSize={props.style?.circleSize || "16px"}
											onChanged={(s, v) => {
												setState({
													...state,
													currCol: state.currCol.saturationv(s).value(v),
												});
											}}
										></Palette >
									</Col>

									<Col grow={1} minWidth="3.5rem">

										<Slider
											defaultValue={state.currCol.hue()}
											pointerSize={props.style?.circleSize || "0.9rem"}
											onChanged={(h: number) => {
												setState({
													...state,
													currCol: state.currCol.hue(h),
												});
											}}
										>
										</Slider>
										{
											props.inputs?.showAlpha === false ?
												<div></div> :
												<Slider
													type="ALPHA"
													defaultValue={state.currCol.alpha()}
													pointerSize={props.style?.circleSize || "0.9rem"}
													onChanged={(a: number) => {
														setState({
															...state,
															currCol: state.currCol.alpha(a),
														});
													}}
												>
												</Slider>
										}
										<Row columnGap="10px" align="flex-end">
											<Col>
												{
													props.inputs?.showColourInput === false ? <div></div> :
														<Inputs
															currentColour={state.currCol}
															colourMode={props.inputs?.defaultRepresentation || "HEX"}
															onValueChanged={setUserColour}
														></Inputs>

												}
												{
													props.inputs?.allowCopyAndPaste === false ? <div></div> :
														<Row columnGap="10px">
															<Col>
																<Button text="Copy" width="3rem" height="1.5rem" onClick={() => {
																	props.onCopy && props.onCopy();

																	copyToClipboard(state.currCol.string(0));
																}}></Button>
															</Col>
															<Col>
																<Button text="Paste" width="3rem" height="1.5rem" onClick={async () => {
																	props.onPaste && props.onPaste();

																	setUserColour(await readFromClipboard());
																}}></Button>
															</Col>
														</Row>
												}
											</Col>
										</Row>
									</Col>
								</Row>
							</Grid>
						</div>
				}
			</theme.Provider >
		)
	}
}

export default BasePicker;