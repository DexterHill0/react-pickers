import React from "react";

const Checker: React.FC = () => {

	return (
		<div style={{
			userSelect: "none",
			position: "absolute",
			width: "inherit",
			height: "inherit",
			background: `repeating-conic-gradient(rgba(128, 128, 128, 1) 0% 25%, transparent 0% 50%) 50% / 10px 10px,
							 repeating-conic-gradient(rgba(255, 255, 255, 1) 0% 25%, transparent 0% 25%) 25% / 10px 10px`,
			borderRadius: "4px",
			opacity: 0.7,
			zIndex: -1,
		}}></div>
	);
}

export default Checker;