import React from "react";

import { useMediaQuery } from "../../helpers/MediaQueries";

const Grid: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<div>
			{ children}
		</div>
	)
}

const Row: React.FC<{ children?: React.ReactNode, gap?: string }> = ({ children, gap }) => {
	return (
		<div style={{ display: "flex", gap: gap }}>
			{ children}
		</div>
	)
}

interface ColumnProps {
	grow?: number;
	shrink?: number;

	width?: string;
	maxWidth?: string;
	minWidth?: string;

	collapse?: any;
	children?: React.ReactNode
}

const Col: React.FC<ColumnProps> = (props: ColumnProps) => {

	const q = props.collapse && useMediaQuery(props.collapse);

	return (
		<div style={{
			flexGrow: props.grow,
			flexShrink: props.shrink,
			width: props.width,
			maxWidth: props.maxWidth,
			minWidth: props.minWidth,
			display: q ? "none" : "",
		}}
		>
			{props.children}
		</div>
	)
}

export { Grid, Row, Col };