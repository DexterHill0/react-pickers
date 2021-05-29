import React from "react";

import { ReactColour } from "react-pickers";

const App = () => {
	return (
		<div style={{ resize: "both", border: "2px solid red", overflow: "hidden" }}>
			<ReactColour width="inherit" height="inherit" />
		</div>
	);
}

export default App;
