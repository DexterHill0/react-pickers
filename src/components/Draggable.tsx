import React, { useEffect } from "react";

const isTouch = window.matchMedia("(pointer: coarse)").matches;

interface Props {
	style?: any;

	onDragged: (e: any) => void;
	onMouseUp?: (e: any) => void;

	children?: React.ReactNode;
}

const Draggable: React.FC<Props> = (props: Props) => {
	const handleMouseDown = (e: any) => {
		handleMove(e);

		window.addEventListener(!isTouch ? "mousemove" : "touchmove", handleMove);
		window.addEventListener(!isTouch ? "mouseup" : "touchend", handleMouseUp);
	}

	const handleMouseUp = (e: any) => {
		props.onMouseUp && props.onMouseUp(e);

		removeListeners();
	}

	const removeListeners = () => {
		window.removeEventListener(!isTouch ? "mousemove" : "touchmove", handleMove);
		window.removeEventListener(!isTouch ? "mouseup" : "touchend", handleMouseUp);
	}

	const handleMove = (e: any) => {
		props.onDragged(e);
	}

	useEffect(() => {
		return removeListeners;
	}, []);

	return (
		<div
			style={props.style}

			onMouseDown={handleMouseDown}
			//Originally I had onTouchMove here but it wasn't working with deleting the swatches so I
			//changed it to use touch event listeners if the device supports touch
			onTouchStart={handleMouseDown}
		>
			{
				props.children
			}
		</div>
	)
}

export default Draggable;