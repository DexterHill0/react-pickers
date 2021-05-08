import React from "react";

// import reactCSSExtra from "reactcss-extra";

interface Props {
	text?: string;
}

const Input: React.FC<Props> = (props) => {
	// const style = reactCSSExtra({

	// });

	return (
		<input type="text" value={props.text}></input>
	)
}

export default Input;