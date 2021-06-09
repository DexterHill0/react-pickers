import React, { useEffect, useState } from "react";

import reactCSSExtra from "reactcss-extra";
import Color from "color";

import Palette from "../components/Palette";
import Preview from "../components/Preview";
import Inputs from "../components/Inputs";
import Slider from "../components/Slider";
import Button from "../components/Button";

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

		const setUserColour = (col: string | undefined | null) => {
			if (!col) return;

			props.onInput && props.onInput(col);

			const v = toValue(col, props.inputs?.defaultRepresentation || "HEX");
			if (v) setState(state => ({ ...state, currCol: v }));
		}

		const onPaste = (col: string | undefined | null) => {
			const v = toValue(col);

			if (v) setState(state => ({ ...state, currCol: v }));
		}

		const update = (col: string) => {
			setState(state => ({ ...state, currCol: Color(col) }));
		}

		const styles = reactCSSExtra({
			"default": {
				container: {
					//The inline-table allows min-height to be the height of the content
					display: "inline-table",
					width: props.width || "auto",
					height: props.height || "auto",
					font: props.style?.font,
					fontSize: props.style?.fontSize,
					fontWeight: props.style?.fontWeight,
					background: props.style?.colours?.background || (props.theme === "LIGHT" ? "#FFFFFF" : "#161819"),
					boxShadow: props.style?.dropShadow === false ? "" : "0px 0px 20px 2px rgba(0, 0, 0, 0.7)",
					userSelect: "none",
					borderRadius: "4px",
					padding: "5px 5px 5px 5px",
					minWidth: "min-content",
					minHeight: "min-content",
				},
				pickerContainer: {
					display: "flex",
					flexDirection: "column",
					gap: "5px",
				},
				compContainer: {
					display: "flex",
					flexDirection: "row",
					gap: "5px",
				},
				previewContainer: {
					flexGrow: 0,
					flexShrink: 1,
					width: "1.5rem",
					minWidth: "1rem",
				},
				paletteContainer: {
					flexGrow: 1,
					minWidth: "6rem",
					display: "flex",
				},
				sliderContainer: {
					flexGrow: 1,
					minWidth: "3.5rem",
				},
				inputsContainer: {
					alignItems: "flex-end",
				},
				buttonsContainer: {
					display: "flex",
					columnGap: "5px",
				},
			},
			"vert": {
				pickerContainer: {
					flexDirection: "column",
				},
				compContainer: {
					flexDirection: "column",
				},
				previewContainer: {
					flexGrow: 0,
					flexShrink: 0,
					height: "2rem",
					minHeight: "2rem",
					width: "2rem",
					minWidth: "2rem",
					alignItems: "flex-start"
				},
				paletteContainer: {
					flexGrow: 1,
					width: "100%",
					minHeight: "4.5rem",
				},
				sliderContainer: {

				},
				inputsContainer: {

				},
				buttonsContainer: {

				},
			}
		}, {
			"vert": props.layout === "VERT",
		});

		return (
			//Tell the provider the theme given by the user
			<theme.Provider value={props.theme || "DARK"}>
				<div style={{ position: "relative" }}>
					{
						//Focus is passed down as a prop
						props.visible === false ? <div></div> :
							<div
								ref={(r) => { if (r) self = r; }}

								style={styles.container}

								onMouseDown={onFocused}
								onTouchStart={onFocused}
							>
								<div style={styles.pickerContainer}>
									{/* I honestly tried so much to stop prop drilling all the way to the swatch container with things like the context API, 
								event emitters, etc, most didn't work and what did had other issues, so I'd like to know if theres a better way to do this */}
									<Picker {...state} {...props} $update={update}></Picker>

									{/* Order set to 2 to allow components to go above and below this row */}
									<div style={styles.compContainer}>

										{/* I kinda suck at flexbox so this is probably possible with flexbox but basically I need to move the
										preview to between the sliders when the layout is different */}
										{
											props.layout !== "VERT" ?
												<div style={styles.previewContainer}>
													<Preview
														previousColour={state.prevCol}
														currentColour={state.currCol}
													></Preview>
												</div>
												: <div></div>
										}

										<div style={styles.paletteContainer}>
											<Palette
												currentColour={state.currCol}
												pointerSize={props.style?.circleSize || "1rem"}

												onChanged={(s, v) => setState({ ...state, currCol: state.currCol.saturationv(s).value(v) })}
											></Palette >
										</div>

										<div style={styles.sliderContainer}>

											<div style={{ paddingLeft: "5px" }}>
												<Slider
													defaultValue={state.currCol.hue()}
													pointerSize={props.style?.circleSize || "0.9rem"}

													onChanged={(h: number) => setState({ ...state, currCol: state.currCol.hue(h) })}
												></Slider>
												{
													props.layout === "VERT" ?
														<div style={styles.previewContainer}>
															<Preview
																previousColour={state.prevCol}
																currentColour={state.currCol}
															></Preview>
														</div>
														: <div></div>
												}
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
											<div style={styles.inputsContainer}>
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
														<div style={styles.buttonsContainer}>
															<div>
																<div style={{ paddingTop: "5px" }}>
																	<Button text="Copy" width="3rem" height="1.5rem" onClick={() => {
																		props.onCopy && props.onCopy();
																		copyToClipboard(state.currCol.string(1));
																	}}></Button>
																</div>
															</div>
															<div>
																<div style={{ paddingTop: "5px" }}>
																	<Button text="Paste" width="3rem" height="1.5rem" onClick={async () => {
																		props.onPaste && props.onPaste();
																		onPaste(await readFromClipboard());
																	}}></Button>
																</div>
															</div>
														</div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
					}
				</div>
			</theme.Provider >
		)
	}
}

export default BasePicker;