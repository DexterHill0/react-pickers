import React, { useState } from "react";

import reactCSSExtra from "reactcss-extra";

import { withTheme } from "../providers/ThemeProvider";

import { ReactPickers } from "../../types";

const MODES = {
	"linear-gradient": 0,
	"radial-gradient": 1,
	"conic-gradient": 2,
}

interface Props extends ReactPickers.PickerThemeProps {
	defaultType: ReactPickers.GradientMode;

	onChanged?: (mode: ReactPickers.GradientMode) => void;
}

const GradientMode: React.FC<Props> = (props: Props) => {

	const [type, setType] = useState(props.defaultType || "linear-gradient");

	const getNext = (): ReactPickers.GradientMode => {
		const current = MODES[type];
		const next = (current + 1) > 2 ? 0 : current + 1;

		return Object.keys(MODES)[next] as ReactPickers.GradientMode;
	}

	const styles = reactCSSExtra({
		"default": {
			container: {
				opacity: 0.8,
			},
			box: {
				display: "flex",
				width: "1.5rem",
				height: "1.5rem",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "4px",
				border: "2px solid",
				borderColor: props.$theme.colours.text,
			},
			//Default is linear gradient
			boxContent: {
				width: "80%",
				height: "2px",
				background: props.$theme.colours.text,
			},
		},
		"radial": {
			boxContent: {
				width: "0.6rem",
				height: "0.6rem",
				border: "2px solid",
				borderColor: props.$theme.colours.text,
				borderRadius: "50%",
				background: "transparent",
			}
		},
		"conic": {
			boxContent: {
				width: "unset",
				height: "unset",
				background: "unset",
				borderStyle: "solid",
				borderWidth: "0 7.5px 15px 7.5px",
				borderColor: `transparent transparent ${props.$theme.colours.text} transparent`,
			}
		},
	}, {
		"radial": type === "radial-gradient",
		"conic": type === "conic-gradient",
	});

	return (
		<div onClick={() => { setType(getNext()); props.onChanged && props.onChanged(getNext()); }}>
			<div style={styles.container}>
				<div style={styles.box}>
					<div style={styles.boxContent}></div>
				</div>
			</div>
		</div>
	)
}

export default withTheme(GradientMode);