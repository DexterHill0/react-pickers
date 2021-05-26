import React from "react";

import reactCSSExtra from "reactcss-extra";

import { theme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

const BasePicker = (Picker: React.ComponentType<any>) => {

	return class PickerWrapper extends React.Component<ReactPickers.PickerProps | ReactPickers.GradientPickerProps, {}> {
		self: HTMLDivElement;

		state = {
			isFocused: false,
		}

		constructor(props: ReactPickers.PickerProps) {
			super(props);
		}

		componentDidMount() {
			this.props.onInit && this.props.onInit();
		}


		onFocused = () => {
			document.addEventListener("mousedown", this.onLostFocus);

			this.props.onFocus && this.props.onFocus();
			this.setState({ isFocused: true });
		}
		onLostFocus = (e: any) => {
			//If the element clicked on is anything but the current picker
			if (!this.self.contains(e.target)) {
				document.removeEventListener("mousedown", this.onLostFocus);

				this.props.onBlur && this.props.onBlur();
				this.setState({ isFocused: false });
			}
		}

		styles = reactCSSExtra({
			"default": {
				container: {
					display: "flex",
					width: this.props.width,
					height: this.props.height,
					userSelect: "none",
					font: this.props.style?.font,
					background: this.props.style?.colours?.background || ((this.props.theme || "DARK") === "DARK" ? "#161819" : "#FFFFFF"),
					borderRadius: "4px",
				}
			},
		});

		render() {
			return (
				//Tell the provider the theme given by the user
				<theme.Provider value={this.props.theme || "DARK"}>
					<div
						ref={(self) => { if (self) this.self = self; }}
						style={this.styles.container}

						onMouseDown={this.onFocused}
						onTouchStart={this.onFocused}
					>
						{
							//Focus is passed down as a prop
							this.props.visible === false ? <div></div> : <Picker {...this.props} {...this.state} />
						}
					</div>
				</theme.Provider >
			)
		}
	}
}

export default BasePicker;