import React, { createContext } from "react";

import reactCSSExtra from "reactcss-extra";

const theme = createContext("DARK");

const withTheme = (Component: React.ComponentType<{ props?: any, $theme?: any }>) => {

	return class ThemeWrapper extends React.Component<any, {}> {

		constructor(props: any) {
			super(props);
		}

		render() {
			return (
				//Get the theme provided in "PickerWrapper"
				<theme.Consumer>
					{(theme) => {
						//Generate the theme data depending on the given theme
						const themeData = reactCSSExtra({
							"default": {
								colours: {
									background: this.props.style?.colours?.background || "#161819",

									text: this.props.style?.colours?.fontColour || "#FFF",

									border: "#FFF",

									buttonEnabled: "#74B3CE",
									warningButtonEnabled: "#191B1C",
									input: "#2A2A2A",
								},
								extra: {
									color: "red"
								}
							},
							"light": {
								colours: {
									background: this.props.style?.colours?.background || "#FFF",

									text: this.props.style?.colours?.fontColour || "#000",

									border: "#000",

									warningButtonEnabled: "#F9FBFD",
									buttonEnabled: "#3D7BE2",
									buttonDisabled: "#F1F3F4",
									input: "#F1F3F4",
								}
							},
						}, {
							"light": theme === "LIGHT",
						});

						//Return the component with the theme data object passed as a prop
						return (
							<Component {...this.props} $theme={themeData} />
						);
					}}
				</theme.Consumer>
			)
		}
	}
}

export { theme, withTheme };