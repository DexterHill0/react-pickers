import React from "react";

import tc2 from "tinycolor2";

import Palette from "../components/Palette";
import Preview from "../components/Preview";
//import Input from "../components/Input";

import Slider from "../components/Slider";

import BasePicker from "../helpers/PickerWrapper";

import { ReactPickers } from "../../types";


class ReactColour extends React.Component<ReactPickers.PickerProps & { isFocused: boolean }, {}> {

	state = {
		prevCol: tc2({ h: 0, s: 0, v: 0, a: 1 }),

		//Current colour is stored as individual values so they can be manipulated individually
		currCol: {
			h: 360, s: 100, v: 50, a: 1
		},
	}


	componentDidUpdate(prevProps: any) {
		if (prevProps.isFocused !== this.props.isFocused) {
			// If the focus was lost, update the previous colour
			if (!this.props.isFocused) this.setState({ prevCol: tc2(this.state.currCol) });
		}
	}

	colourChanged() {
		this.props.onColourChanged && this.props.onColourChanged(tc2(this.state.currCol));
	}

	func() {

	}

	render() {
		return (
			<div>
				<Preview
					width="5rem"
					height="5rem"
					previousColour={this.state.prevCol}
					currentColour={tc2(this.state.currCol)}
				></Preview>


				<Palette
					width="10rem"
					height="10rem"
					currentColour={tc2({ ...this.state.currCol, s: 100, v: 100, a: 1 })}
					pointerSize={this.props.style?.circleSize || "0.7rem"}
					onChanged={(s, v) => {
						this.setState({
							currCol: {
								...this.state.currCol,
								s,
								v,
							}
						}, this.colourChanged); //Once the state has changed, emit the colour changed event
					}}
				></Palette >

				<Slider
					width="15rem"
					height="0.7rem"
					pointerSize={this.props.style?.circleSize || "0.7rem"}
					onChanged={(h: number) => {
						this.setState({
							currCol: {
								...this.state.currCol,
								h: h,
							}
						}, this.colourChanged)
					}}
				>
				</Slider>
			</div>
		)
	}
}

export default BasePicker(ReactColour);