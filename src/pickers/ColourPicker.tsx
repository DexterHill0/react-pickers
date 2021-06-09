import React from "react";

import Color from "color";

import SwatchContainer from "../components/Swatches";

import BasePicker from "../helpers/PickerWrapper";

import { ReactPickers } from "../../types";

const ReactColour: React.FC<ReactPickers.PickerProps & ReactPickers.State> = (props) => {

	const swatchSelected = (col: string) => {
		props.swatches?.onSwatchSelected && props.swatches?.onSwatchSelected(Color(col));
		props.$update && props.$update(col);
	}

	return (
		//Order of 2 puts it below the picker
		<div style={{ order: 2 }}>
			<SwatchContainer
				{...props.swatches}
				onSelected={swatchSelected}
				currCol={props.currCol}
			></SwatchContainer>
		</div>
	)
}

export default BasePicker(ReactColour);