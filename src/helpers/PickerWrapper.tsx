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
import { isValidColour, toValue } from "./Colour";

import { theme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

const BasePicker = (Picker: React.ComponentType<any>) => {

	return (props: ReactPickers.PickerProps | ReactPickers.GradientPickerProps) => {
		let self: HTMLDivElement;

		const getColour = () => {
			if (props.defaultColour && isValidColour(props.defaultColour)) {
				return Color(props.defaultColour).hsv();
			}
			else return Color().hsv();
		}

		const [state, setState] = useState<ReactPickers.State>({
			prevCol: Color(),

			currCol: getColour(),
		});

		useEffect(() => {
			props.onInit && props.onInit();

			//setState({...state, currCol: getColour()});
		}, []);

		useEffect(() => {
			//Once the state has changed, emit the colour changed event
			props.onColourChanged && props.onColourChanged(state.currCol);
		}, [state.currCol]);

		const onFocused = () => {
			document.addEventListener("mousedown", onLostFocus);

			props.onFocus && props.onFocus();
		}
		const onLostFocus = (e: any) => {
			//If the element clicked on is anything but the current picker
			if (!self.contains(e.target)) {
				document.removeEventListener("mousedown", onLostFocus);

				props.onBlur && props.onBlur();
				//Update the focus and change the previous colour to the current colour
				setState(state => ({ ...state, prevCol: state.currCol }));
			}
		}

		const setUserColour = (col: string) => {
			props.onInput && props.onInput(col);

			const v = toValue(col, props.inputs?.defaultRepresentation || "HEX");
			if (v) setState(state => ({ ...state, currCol: v }));
		}

		const update = (col: string) => {
			setState(state => ({ ...state, currCol: Color(col) }));
		}

		const styles = reactCSSExtra({
			"default": {
				container: {
					padding: "10px 10px 10px 10px",
					width: props.width,
					height: props.height,
					userSelect: "none",
					font: props.style?.font,
					fontSize: props.style?.fontSize,
					fontWeight: props.style?.fontWeight,
					background: props.style?.colours?.background || props.theme === "LIGHT" ? "#FFFFFF" : "#161819",
					borderRadius: "4px",
					boxShadow: props.style?.dropShadow === false ? "" : "0px 0px 20px 2px #000",
					minWidth: "30rem",
					minHeight: "9rem",
				}
			},
			"small": {
				container: {
					minWidth: "8rem",
					minHeight: "20rem",
					maxWidth: "15rem",
					maxHeight: "30rem",
				}
			}
		}, {
			"small": props.size === "MINI",
		});

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
							<Grid direction="column" gap="10px">
								{/* I honestly tried so much to stop prop drilling all the way to the swatch container with things like the context API, 
								event emitters, etc, most didn't work and what did had other issues, so I'd like to know if theres a better way to do this */}
								<Picker {...state} {...props} $update={update}></Picker>

								{/* Order set to 2 to allow components to go above and below this row */}
								<Row>
									<Grid direction="row" gap="10px">

										<Col grow={0} shrink={1} width="2.5rem" minWidth="1rem">
											<Preview
												previousColour={state.prevCol}
												currentColour={state.currCol}
											></Preview>
										</Col>

										<Col grow={1} minWidth="6rem">
											<Palette
												currentColour={state.currCol}
												pointerSize={props.style?.circleSize || "1rem"}

												onChanged={(s, v) => setState({ ...state, currCol: state.currCol.saturationv(s).value(v) })}
											></Palette >
										</Col>

										<Col grow={1} minWidth="3.5rem">

											<div style={{ paddingLeft: "10px" }}>
												<Slider
													defaultValue={state.currCol.hue()}
													pointerSize={props.style?.circleSize || "0.9rem"}

													onChanged={(h: number) => setState({ ...state, currCol: state.currCol.hue(h) })}
												>
												</Slider>
												{
													props.inputs?.showAlpha === false ?
														<div></div> :
														<Slider
															type="ALPHA"
															defaultValue={state.currCol.alpha()}
															pointerSize={props.style?.circleSize || "0.9rem"}
															onChanged={(a: number) => setState({ ...state, currCol: state.currCol.alpha(a) })}
														>
														</Slider>
												}
											</div>
											<Row align="flex-end">
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
															<Row columnGap="10px" display="flex">
																<Col>
																	<div style={{ paddingTop: "10px" }}>
																		<Button text="Copy" width="3rem" height="1.5rem" onClick={() => {
																			props.onCopy && props.onCopy();
																			copyToClipboard(state.currCol.string(1));
																		}}></Button>
																	</div>
																</Col>
																<Col>
																	<div style={{ paddingTop: "10px" }}>
																		<Button text="Paste" width="3rem" height="1.5rem" onClick={async () => {
																			props.onPaste && props.onPaste();
																			setUserColour(await readFromClipboard());
																		}}></Button>
																	</div>
																</Col>
															</Row>
													}
												</Col>
											</Row>
										</Col>

									</Grid>
								</Row>
							</Grid>
						</div>
				}
			</theme.Provider >
		)
	}
}

export default BasePicker;