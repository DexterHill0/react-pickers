import React from "react";

import { Row } from "../components/flex/Flex";
import SwatchContainer from "../components/Swatches";

import BasePicker from "../helpers/PickerWrapper";

import { ReactPickers } from "../../types";


const ReactColour: React.FC<ReactPickers.PickerProps & ReactPickers.State> = (props) => {

	return (
		//Order of 2 puts it below the picker
		<Row order={2}>
			<SwatchContainer
				{...props.swatches}
				$update={props.$update}
				currCol={props.currCol}
			></SwatchContainer>
		</Row>
	)
}

export default BasePicker(ReactColour);