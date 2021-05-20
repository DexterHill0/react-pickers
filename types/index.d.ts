import React from "react";

import tinycolor2 from "tinycolor2";

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
	 *  - `width` + `height`: Changes the size of the pickers.
	 *  - `theme`: Dark / Light theme for the pickers.
	 *  - `visible`: Whether the picker is displayed. -- Defaults to `true`.
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

		width?: string;
		height?: string;

		theme?: Theme;

		visible?: boolean;

		defaultRepresentation?: ColourMode;

		style?: PickerStyles;

		onInit?: () => void;
		onFocus?: () => void;
		onBlur?: () => void;

		onInput?: (text: string) => void;
		onCopy?: () => void;
		onPaste?: () => void;
		onClear?: () => void

		onColourChanged?: (colour: tinycolor2.Instance) => void;

		onSwatchAdded?: (swatch: Swatch) => void;
		onSwatchRemoved?: (swatch: Swatch) => void;
		onSwatchSelected?: (swatch: Swatch) => void;

		onStopAdded?: (stop: Stop) => void;
		onStopRemoved?: (stop: Stop) => void;
		onStopDragged?: (stop: Stop) => void;
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
		};

		fontSize?: string;
		fontWeight?: string;

		circleSize?: string;

		dropShadow?: boolean;
	}

	export interface PickerThemeProps {
		$theme: any;
	}

	/**
	 * The theming of the picker. Can be overridden by changing the colours via the `style` prop.
	 * 
	 * @default DARK
	 */
	export type Theme = "LIGHT" | "DARK";

	/**
	 * Supported colour types.
	 * 
	 * NOTE: `HEX` doesn't support alpha values.
	 */
	export type ColourMode = "HEX" | "RGBA" | "HSVA" | "HSLA";

	/**
	 * Colour type - tinycolor2 instance
	 */
	export type Colour = tinycolor2.Instance;

	/**
	 * Gradient stop.
	 */
	export type Stop = {
		loc: number;
		colour: Colour;
	}

	/**
	 * Saved swatch.
	 * The `object` version is for a gradient based swatch.
	 */
	export type Swatch = {
		colour: object | Colour;
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