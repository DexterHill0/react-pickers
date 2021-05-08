import React from "react";

import Input from "../components/Input";

import { ReactPickers } from "../../types";

class ReactColour extends React.Component<ReactPickers.PickerProps, {}>{

	state = {
		prevCol: {
			r: 0,
			g: 0,
			b: 0,
			a: 1,
		},
		selectedCol: {
			r: 255,
			g: 0,
			b: 0,
			a: 1,
		}
	}

	constructor(props: ReactPickers.PickerProps) {
		super(props);

	}

	render() {
		// 				linear-gradient(360deg, rgba(${this.state.prevCol.r}, ${this.state.prevCol.g}, ${this.state.prevCol.b}, ${this.state.prevCol.a}) 50%, 
		// 										rgba(0,0,0) 50%, 
		// 										rgba(${this.state.selectedCol.r}, ${this.state.selectedCol.g}, ${this.state.selectedCol.b}, ${this.state.selectedCol.a}) 50%)

		//                 linear-gradient(to top, rgb(0, 0, 0), transparent), 
		// 										rgba(0, 0, 0, 0) 
		// 										linear-gradient(to left, rgba(${this.state.selectedCol.r}, ${this.state.selectedCol.g}, ${this.state.selectedCol.b}, ${this.state.selectedCol.a}), 
		// 																 rgb(255, 255, 255))


		return (
			<Input></Input>
		)
	}
}

export default ReactColour;