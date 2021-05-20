import React, { createContext } from "react";

import reactCSSExtra from "reactcss-extra";

const withTheme = (Component: React.ComponentType<{ props?: any, $theme?: any }>) => {

	return class ThemeWrapper extends React.Component<any, {}> {

		theme = createContext(reactCSSExtra({
			"default": {
				colours: {
					background: this.props.style?.colours?.background || "#161819",

					text: this.props.style?.colours?.fontColour || "#FFFFFF",

					border: "#545B5E",

					buttonEnabled: "#0943A2",
					warningButtonEnabled: "#191B1C",
					buttonDisabled: "#181A1B",
					input: "#181A1B",
				},
				extra: {
					color: "red"
				}
			},
			"light": {
				colours: {
					background: this.props.style?.colours?.background || "#FFFFFF",

					text: this.props.style?.colours?.fontColour || "#000000",

					border: "#545B5E0",

					warningButtonEnabled: "#F9FBFD",
					buttonEnabled: "#3D7BE2",
					buttonDisabled: "#F1F3F4",
					input: "#F1F3F4",
				}
			},
		}, {
			"light": this.props.theme === "LIGHT",
		}));


		constructor(props: any) {
			super(props);
		}

		render() {
			return (
				<this.theme.Consumer>
					{(themeData) => {
						return <Component {...this.props} $theme={themeData} />;
					}}
				</this.theme.Consumer>
			)
		}
	}
}

export default withTheme;