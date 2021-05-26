import React from "react";


interface Props {
	style?: any;

	onDragged: (e: any) => void;

	children?: React.ReactNode;
}

const Draggable: React.FC<Props> = (props: Props) => {
	const handleMouseDown = (e: any) => {
		handleMove(e);

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseup", handleMouseUp);
	}

	const handleMouseUp = () => {
		removeListeners();
	}

	const removeListeners = () => {
		window.removeEventListener("mousemove", handleMove);
		window.removeEventListener("mouseup", handleMouseUp);
	}

	const handleMove = (e: any) => {
		props.onDragged(e);
	}


	return (
		<div
			style={props.style}
			onMouseDown={handleMouseDown}
			onTouchMove={handleMove}
			onTouchStart={handleMove}
		>
			{
				props.children
			}
		</div>
	)
}

export default Draggable;