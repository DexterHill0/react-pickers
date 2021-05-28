import React from "react";

import { ReactColour } from "react-pickers";

const App = () => {
	return (
		<div>
			<ReactColour defaultColour={"rgba(161, 114, 111)"} inputs={{ defaultRepresentation: "HSL", showAlpha: true }} />
		</div>
	);
}

export default App;
