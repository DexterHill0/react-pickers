import React from "react";

const Grid: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<div>
			{ children}
		</div>
	)
}

interface RowProps {
	gap?: string;
	rowGap?: string;
	columnGap?: string
	align?: string;

	children?: React.ReactNode;
}

const Row: React.FC<RowProps> = (props: RowProps) => {
	return (
		<div style={{
			display: "flex",
			gap: props.gap,
			rowGap: props.rowGap,
			columnGap: props.columnGap,
			alignItems: props.align
		}}>
			{ props.children}
		</div>
	)
}

interface ColumnProps {
	grow?: number;
	shrink?: number;

	width?: string;
	maxWidth?: string;
	minWidth?: string;

	children?: React.ReactNode
}

const Col: React.FC<ColumnProps> = (props: ColumnProps) => {

	return (
		<div style={{
			flexGrow: props.grow,
			flexShrink: props.shrink,
			width: props.width,
			maxWidth: props.maxWidth,
			minWidth: props.minWidth,
		}}
		>
			{props.children}
		</div>
	)
}

export { Grid, Row, Col };