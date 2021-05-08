import React from "react";

declare namespace ReactPickers {

	/**
	 * - `swatches`:
	 *     - `showSwatches`: Whether the swatches are visible.
	 *     - `disableSwatchCollapse`: Whether the swatch component can be collapsed to hide the swatches.
	 *     - `maxSwatches`: The maximum number swatches that can be saved.
	 *     - `allowSave`: Wether any new swatches can be saves.
	 *     - `defaultSwatches`: Overrides the built in default swatches. 
	 *         - For `ReactColour` provide an array of CSS rgb[a] strings.
	 *         - For `ReactGradient` provide an array of CSS gradient strings.
	 * - `inputs`:
	 *     - `showAlpha`: Toggles the alpha slider.
	 *     - `allowCopyAndPaste`: Allows copy-pasting of the selected colour.
	 *         - Works across both pickers
	 *     - `showColourInput`: Toggles the colour input box
	 *         - If this is disabled, `allowCopyAndPaste` will also be disabled.
	 *  - `theme`: Dark / Light theme for the pickers.
	 *  - `layout`: The layout of the components in the pickers.
	 *      - `DEFAULT`: Larger picker usually for static use (i.e. does not get shown/hidden by a button)
	 *      - `MINI` is a minified version of default - better for being shown and hidden by buttons. Will fit better on mobile too.
	 *  - `defaultRepresentation`: The representation of the selected colour in the input box.
	 *  - `style`: Extra css styling properties for chaning the look of the pickers. Completely inline CSS.
	 */
	export interface PickerProps {
		swatches?: {
			showSwatches?: boolean;
			disableSwatchCollapse?: boolean;
			maxSwatches?: number;
			allowSave?: boolean;
			defaultSwatches?: string[];
		}

		inputs?: {
			showAlpha?: boolean;
			allowCopyAndPaste?: boolean;

			showColourInput?: boolean;
		}

		theme?: Theme;
		layout?: Layout;

		defaultRepresentation?: ColourMode;

		style?: PickerStyles;
	}

	/**
	 * Extends `PickerProps`
	 */
	export interface GradientPickerProps extends PickerProps {

	}

	/**
	 * Used for styling the pickers to your liking. Uses completely inline CSS so more options may come at a later time.
	 */
	export interface PickerStyles {
		colours?: {
			background?: string;
			fontColour?: string;
		}

		fontSize?: string;
		fontWeight?: string;

		circleSize?: string;

		dropShadow: boolean;
	}

	/**
	 * 
	 */
	export type Events = "";

	/**
	 * The theming of the picker. Can be overridden by changing the colours via the `style` prop.
	 * 
	 * @default DARK
	 */
	export type Theme = "LIGHT" | "DARK";

	/**
	 * The layout that all the components are placed in.
	 * 
	 * - `DEFAULT`: The default layout. Large layout better for desktop use since components are bigger.
	 * - `MINI`: A minified version of the default layout. Better for dynamic use like on buttons. Better for mobile devices due to smaller form.
	 * 
	 * The minified versions are a little bit taller to compensate for the reduced width. They are still smaller than the default layouts, however.
	 *
	 * @default DEFAULT
	 */
	export type Layout = "NORMAL" | "MINI";

	/**
	 * Supported colour types.
	 * 
	 * NOTE: `HEX` doesn't support alpha values.
	 */
	export type ColourMode = "RGBA" | "HEX" | "HSVA" | "HSLA" | "CMYK";

	/**
	 * 
	 */
	export type ThemeContext = {
		main: {

		}
	}

}

/**
 * The colour picker
 */
declare class ReactColour extends React.Component<ReactPickers.PickerProps, {}> {
	constructor(props: ReactPickers.PickerProps);

	render(): JSX.Element;
}

/**
 * The gradient picker
 */
declare class ReactGradient extends React.Component<ReactPickers.PickerProps, {}> {
	constructor(props: ReactPickers.PickerProps);

	render(): JSX.Element;
}

export { ReactColour, ReactGradient, ReactPickers };