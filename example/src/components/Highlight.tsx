import React from "react";

import Highlight from "react-highlight";

interface Props {
	text: string;
}

const HighlightCopy: React.FC<Props> = (props: Props) => {

	const copy = (e: any, text: string) => {
		navigator.clipboard.writeText(text);

		e.target.className = "gg-check";

		const x = setTimeout((t) => {
			t.className = "gg-clipboard";

			clearTimeout(x);
		}, 2000, e.target);
	}

	return (
		<div className="docs-example-code-container">
			<div className="docs-example-code">
				<div className="docs-example-code-copy" onClick={(e) => copy(e, props.text)}>
					<div className="gg-clipboard"></div>
				</div>

				<Highlight className="typescript docs-example-code-highlight">
					{props.text}
				</Highlight>
			</div>
		</div>
	)
}

export default HighlightCopy;