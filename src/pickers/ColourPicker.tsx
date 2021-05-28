import React, { useEffect, useState } from "react";

import Color from "color";

// import Palette from "../components/Palette";
// import Preview from "../components/Preview";
// import Inputs from "../components/Inputs";
import SwatchContainer from "../components/Swatches";
// import Slider from "../components/Slider";
// import Button from "../components/Button";

import { Col, Grid, Row } from "../components/flex/Flex";

// import { copyToClipboard, readFromClipboard } from "../helpers/Utils";

//import { QUERIES } from "../helpers/MediaQueries";
import BasePicker from "../helpers/PickerWrapper";
import { equals, isValidColour } from "../helpers/Colour";

import { ReactPickers } from "../../types";



type Props = ReactPickers.PickerProps & { isFocused: boolean };

const ReactColour: React.FC<Props> = (props: Props) => {

	const getColour = () => {
		if (!isValidColour(props.defaultColour)) {
			console.warn("Invalid default colour provided!");

			return Color([0, 0, 0, 1]);
		}
		else return Color(props.defaultColour).hsv();
	}

	const [state, setState] = useState({
		prevCol: Color([0, 0, 0, 1]),

		currCol: getColour(),
	});

	useEffect(() => {
		//If the focus was lost, update the colour
		if (!props.isFocused) {
			setState({ ...state, prevCol: state.currCol });
		}
	}, [props.isFocused]);

	useEffect(() => {
		//Once the state has changed, emit the colour changed event
		props.onColourChanged && props.onColourChanged(state.currCol);
	}, [state.currCol]);

	const swatchSelected = (col: ReactPickers.Colour) => {
		if (!equals(state.currCol, col.hsv())) {
			setState({ ...state, prevCol: state.currCol, currCol: col.hsv() });
		}

		props.onSwatchSelected && props.onSwatchSelected(col);
	}

	// const setUserColour = (col: string) => {
	// 	props.onInput && props.onInput(col);

	// 	if (isValid(col)) {
	// 		setState({ ...state, currCol: Color(col).hsv() });
	// 	}
	// }

	return (
		<div>
			<Grid>
				<Row>
					<Col grow={1}>
						<SwatchContainer
							{...props.swatches}

							currentColour={state.currCol}

							onSwatchAdded={props.onSwatchAdded}
							onSwatchRemoved={props.onSwatchRemoved}
							onSwatchSelected={swatchSelected}
						></SwatchContainer>

					</Col>
				</Row>

			</Grid>
		</div>
	)
}

export default BasePicker(ReactColour);



{/* <Preview
				width="5rem"
				height="5rem"
				previousColour={state.prevCol}
				currentColour={state.currCol}
			></Preview>

			<Palette
				width="10rem"
				height="10rem"
				currentColour={state.currCol} //Only provides the current colour's hue value
				pointerSize={props.style?.circleSize || "16px"}
				onChanged={(s, v) => {
					setState({
						...state,
						currCol: state.currCol.saturationv(s).value(v),
					});
				}}
			></Palette >

			<Slider
				width="15rem"
				height="0.7rem"
				defaultValue={state.currCol.hue()}
				pointerSize={props.style?.circleSize || "1rem"}
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
			width="15rem"
			height="0.7rem"
			type="ALPHA"
			defaultValue={state.currCol.alpha()}
			pointerSize={props.style?.circleSize || "1rem"}
			onChanged={(a: number) => {
				setState({
					...state,
					currCol: state.currCol.alpha(a),
				});
			}}
		>
		</Slider>
}

{
	props.inputs?.allowCopyAndPaste === false ? <div></div> :
		<div>
			<Button text="Copy" width="5rem" height="5rem" onClick={() => copyToClipboard(state.currCol.string(0))}></Button>
			<Button text="Paste" width="5rem" height="5rem" onClick={async () => setUserColour(await readFromClipboard())}></Button>
		</div>
}

{
	props.inputs?.showColourInput === false ? <div></div> :
		<Inputs
			currentColour={state.currCol}
			colourMode={props.inputs?.defaultRepresentation || "HEX"}
			onValueChanged={setUserColour}
		></Inputs>
}

 */}