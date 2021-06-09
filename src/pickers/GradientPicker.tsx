import React, { useState } from "react";

import Color from "color";

import GradientMode from "../components/GradientModes";
import GradientStops from "../components/GradientStops";
import SwatchContainer from "../components/Swatches";

import { toValue } from "../helpers/Colour";
import Gradient from "../helpers/Gradient";
import BasePicker from "../helpers/PickerWrapper";

import { ReactPickers } from "../../types";

const ReactGradient: React.FC<ReactPickers.GradientPickerProps & ReactPickers.State> = (props) => {

	const getGradient = () => {
		if (props.defaultGradient && Gradient.isValid(props.defaultGradient)) {
			return new Gradient(props.defaultGradient);
		}
		else return new Gradient("linear-gradient(90deg, #f00 50%, #000 100%)");
	}

	const [grad] = useState(getGradient());

	const getStops = () => {

		try {
			const stops = grad.colourStops.map(s => ({
				type: s.length.type,
				loc: s.length.value,
				col: toValue(s.value, s.type.toUpperCase() as ReactPickers.ColourMode) || Color(),
			}));

			return stops;
		} catch (e) {
			console.error("Unable to parse (default) gradient!\nPlease check that the gradient only uses HEX / RGB[A] colours (gradient-parser does not support other colour spaces)");

			return [];

		}
	}

	return (
		<React.Fragment>

			<div style={{ order: 0 }}>
				<div style={{ flexGrow: 1 }}>
					<GradientStops {...props.stops} currentColour={props.currCol} stops={getStops()} pointerSize={props.style?.circleSize || "1rem"}></GradientStops>
				</div>
				{
					props.inputs?.showGradientType === false ? <div></div> :
						<div style={{ minWidth: "1rem" }}>
							<GradientMode defaultType={props.defaultGradientType || "linear-gradient"}></GradientMode>
						</div>
				}
			</div>

			<div style={{ order: 2 }}>
				<SwatchContainer
					{...props.swatches}
					$update={props.$update}
					currCol={props.currCol}
				></SwatchContainer>
			</div>
		</React.Fragment>



		/* <SwatchContainer
			{...props.swatches}
			$update={props.$update}
			currCol={props.currCol}
		></SwatchContainer> */
	)
}

export default BasePicker(ReactGradient);