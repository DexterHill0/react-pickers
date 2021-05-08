import React from "react";

import reactCSSExtra from "reactcss-extra";

import { ReactPickers } from "../../types";


const withThemes = (Picker: React.ComponentType) => {

	return class ThemeWrapper extends React.Component {
		themes: React.Context<ReactPickers.ThemeContext>;
		context: React.ContextType<any>;

		constructor() {
			super({});

			this.themes = React.createContext(reactCSSExtra({
				"default": {
					main: {

					}
				}
			}));
		}

		render() {
			return (
				<this.themes.Consumer>
					{(context) => {
						this.context = context;
						return <Picker {...this.props} {...this.themes} />;
					}}
				</this.themes.Consumer>
			)
		}
	}
}

export default withThemes;