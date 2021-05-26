import React, { useEffect, useState } from "react";

import tc2 from "tinycolor2";

import Palette from "../components/Palette";
import Preview from "../components/Preview";
import Input from "../components/Input";
import SwatchContainer from "../components/Swatches";

import Slider from "../components/Slider";

import BasePicker from "../helpers/PickerWrapper";

import { ReactPickers } from "../../types";
import Button from "../components/Button";


type Props = ReactPickers.PickerProps & { isFocused: boolean };


const ReactColour: React.FC<Props> = (props: Props) => {

	const getColour = () => {
		const col = tc2(props.defaultColour);
		if (col.isValid()) {
			return col.toHsv();
		}
		return { h: 0, s: 100, v: 100, a: 1 };
	}

	const [state, setState] = useState({
		prevCol: tc2({ h: 0, s: 0, v: 0, a: 1 }),

		//Current colour is stored as individual values so they can be manipulated individually
		currCol: getColour(),
	});

	useEffect(() => {
		//If the focus was lost, update the colour
		if (!props.isFocused) {
			updatePrevCol();
		}
	}, [props.isFocused]);

	useEffect(() => {
		//Once the state has changed, emit the colour changed event
		props.onColourChanged && props.onColourChanged(tc2(state.currCol));
	}, [state.currCol]);


	const updatePrevCol = () => {
		setState({ ...state, prevCol: tc2(state.currCol) });
	}

	const swatchSelected = (col: ReactPickers.Colour) => {
		if (!tc2.equals(state.currCol, col.toHsv())) {
			setState({ prevCol: tc2(state.currCol), currCol: col.toHsv() });
		}

		props.onSwatchSelected && props.onSwatchSelected(col);
	}

	return (
		<div>
			<Preview
				width="5rem"
				height="5rem"
				previousColour={state.prevCol}
				currentColour={tc2(state.currCol)}
			></Preview>

			<Palette
				width="10rem"
				height="10rem"
				currentColour={tc2({ ...state.currCol, s: 100, v: 100, a: 1 })} //Only provides the current colour's hue value
				pointerSize={props.style?.circleSize || "16px"}
				onChanged={(s, v) => {
					setState({
						...state,
						currCol: {
							...state.currCol,
							s,
							v,
						}
					});
				}}
			></Palette >

			<Slider
				width="15rem"
				height="0.7rem"
				defaultValue={state.currCol.h}
				pointerSize={props.style?.circleSize || "1rem"}
				onChanged={(h: number) => {
					setState({
						...state,
						currCol: {
							...state.currCol,
							h: h,
						}
					});
				}}
			>
			</Slider>

			<Slider
				width="15rem"
				height="0.7rem"
				type="ALPHA"
				defaultValue={state.currCol.a}
				pointerSize={props.style?.circleSize || "1rem"}
				onChanged={(a: number) => {
					setState({
						...state,
						currCol: {
							...state.currCol,
							a: a,
						}
					});
				}}
			>
			</Slider>


			<Input text="Test123"></Input>

			<Button text="I am button" width="5rem" height="5rem"></Button>

			<SwatchContainer
				{...props.swatches}

				currentColour={tc2(state.currCol)}

				onSwatchAdded={props.onSwatchAdded}
				onSwatchRemoved={props.onSwatchRemoved}
				onSwatchSelected={swatchSelected}
			></SwatchContainer>
		</div >
	)
}

export default BasePicker(ReactColour);