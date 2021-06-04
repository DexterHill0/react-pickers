import React, { useState } from "react";

import { Row } from "../components/flex/Flex";
// import GradientMode from "../components/GradientModes";
import GradientStops from "../components/GradientStops";
import SwatchContainer from "../components/Swatches";

import Gradient from "../helpers/Gradient";
import BasePicker from "../helpers/PickerWrapper";

import { ReactPickers } from "../../types";

const ReactGradient: React.FC<ReactPickers.GradientPickerProps & ReactPickers.State> = (props) => {

	const getGradient = () => {
		if (props.defaultGradient && Gradient.isValid(props.defaultGradient)) {
			return new Gradient(props.defaultGradient);
		}
		else return new Gradient("linear-gradient(90deg, rgb(10, 32, 123) 0%, #000 100%)");
	}

	const [grad] = useState(getGradient());

	return (
		<React.Fragment>

			<Row order={0}>
				{/* <GradientMode defaultType={props.defaultGradientType || "linear-gradient"}></GradientMode> */}
				<GradientStops currentColour={props.currCol} defaultGradient={grad} width="100%" height="4rem"></GradientStops>
			</Row>

			<Row order={2}>
				<SwatchContainer
					{...props.swatches}
					$update={props.$update}
					currCol={props.currCol}
				></SwatchContainer>
			</Row>
		</React.Fragment>



		/* <SwatchContainer
			{...props.swatches}
			$update={props.$update}
			currCol={props.currCol}
		></SwatchContainer> */
	)
}

export default BasePicker(ReactGradient);