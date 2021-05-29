import React from "react";

import { DirectionalNode, AngularNode } from "gradient-parser";
import Color from "color";

declare namespace ReactPickers {
	/**
	 * - **`swatches`**:
	 *     - `showSwatches`: Whether the swatches are visible.
	 *     - `disableSwatchCollapse`: Whether the swatch component can be collapsed to hide the swatches.
	 *     - `maxSwatches`: The maximum number swatches that can be saved. Defaults to **15**
	 *     - `allowSave`: Wether any new swatches can be saves.
	 *     - `defaultSwatches`: Overrides the built in default swatches. 
	 * - **`inputs`**:
	 *     - `showAlpha`: Toggles the alpha slider.
	 *     - `allowCopyAndPaste`: Allows copy-pasting of the selected colour.
	 *         - NOTE: Works across both pickers
	 *     - `showColourInput`: Toggles the colour input box
	 *         - NOTE: If this is disabled, `allowCopyAndPaste` will also be disabled.
	 *     - `defaultRepresentation`: The representation of the selected colour in the input box.
	 *  - `defaultColour`: The default colour to be shown when the colour picker loads.
	 *  - `defaultGradient`: The default gradient to be shown when the gradient picker loads.
	 *  - `width` + `height`: Changes the size of the pickers.
	 *  - `theme`: Dark / Light theme for the pickers.
	 *  - `visible`: Whether the picker is displayed.
	 *  - `style`: Extra css styling properties for chaning the look of the pickers. Completely inline CSS.
	 *
	 * *(Provided only when using gradient picker)*
	 *  - **`inputs`**
	 *     - `showGradientType`: Whether to allow the user to change the type of the gradient.
	 *     - `showGradientAngle`: Whether to allow the user to change the angle of the gradient.
	 *  - `defaultGradientType`: The default type of the gradient.
	 *     - NOTE: Does **not** override the gradient provided in `defaultColour`
	 *  - `defaultGradientAngle`: The default angle for the gradient.
	 *     - NOTE: Does **not** override the gradient provided in `defaultColour`
	 */
	export interface PickerProps {
		swatches?: {
			showSwatches?: boolean;
			disableSwatchCollapse?: boolean;
			allowSave?: boolean;
			maxSwatches?: number;
			defaultSwatches?: string[];
		}

		inputs?: {
			showAlpha?: boolean;
			allowCopyAndPaste?: boolean;
			showColourInput?: boolean;

			defaultRepresentation?: ColourMode;
		}

		size?: Size;

		width?: string;
		height?: string;

		theme?: Theme;
		style?: PickerStyles;
		visible?: boolean;

		defaultColour?: string;
		defaultGradient?: string;

		onInit?: () => void;
		onFocus?: () => void;
		onBlur?: () => void;

		onInput?: (text: string) => void;
		onCopy?: () => void;
		onPaste?: () => void;
		onClear?: () => void;

		onColourChanged?: (colour: Colour) => void;

		onSwatchAdded?: (swatch: Swatch) => void;
		onSwatchRemoved?: (index: number) => void;
		onSwatchSelected?: (swatch: Swatch) => void;

		onStopAdded?: (stop: Stop) => void;
		onStopRemoved?: (stop: Stop) => void;
		onStopDragged?: (stop: Stop) => void;
	}

	/**
	 * Extends `PickerProps`
	 */
	export interface GradientPickerProps extends PickerProps {
		inputs?: {
			showAlpha?: boolean;
			allowCopyAndPaste?: boolean;
			showColourInput?: boolean;

			defaultRepresentation?: ColourMode;

			showGradientType?: GradientMode,
			showGradientAngle?: number,
		}

		defaultGradientType?: GradientMode,
		defaultGradientAngle?: number
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
		font?: string;

		/**
		 * The size of the draggable pointers
		 */
		circleSize?: string;

		dropShadow?: boolean;
	}

	export interface PickerThemeProps {
		$theme?: any;
	}

	/**
	 * Props for the props provider
	 */
	export type PropsProviderProps =
		ReactPickers.PickerProps &
		ReactPickers.GradientPickerProps &
		ReactPickers.PickerThemeProps &
		{ currCol: ReactPickers.Colour, $theme?: any }

	/**
	 * The theming of the picker. Can be overridden by changing the colours via the `style` prop.
	 * 
	 * @default DARK
	 */
	export type Theme = "LIGHT" | "DARK";

	/**
	 * The sizes of the pickers.
	 */
	export type Size = "NORMAL" | "MINI";

	/**
	 * Supported colour types.
	 * 
	 * NOTE: `HEX8` supports alpha, `HEX` does not.
	 */
	export type ColourMode = "HEX" | "HEX8" | "RGB" | "HSL";

	/**
	 * Supported gradient modes
	 */
	export type GradientMode = "linear-gradient" | "radial-gradient" | "conic-gradient";

	/**
	 * Colour type - tinycolor2 instance
	 */
	export type Colour = Color;

	/**
	 * Plain colour object
	 */
	export type ColourObject = { h: number, s: number, v: number, a: number };

	/**
	 * Gradient object that stores values
	 */
	export type GradientObject = {
		type: GradientMode;
		orientation: {
			type: AngularNode | DirectionalNode;
			value: string;
		}
		colourStops: {
			type: "hex" | "rgb" | "rgba",
			value: string,
		}[];
	}

	/**
	 * Gradient class
	 */
	export class Gradient {
		type: GradientMode;
		orientation: {
			type: "angular";
			value: string;
		}
		colourStops: {
			type: "hex" | "rgb" | "rgba",
			value: string,
		}[];

		constructor(gradient: string | GradientObject);

		toString(): string;
	}

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
	export type Swatch = Colour | Gradient;
}

declare class ReactColour extends React.Component<ReactPickers.PickerProps, {}> { }
declare class ReactGradient extends React.Component<ReactPickers.GradientPickerProps, {}> { }

export { ReactColour, ReactGradient, ReactPickers };