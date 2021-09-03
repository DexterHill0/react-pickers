import React, { useEffect } from "react";

import Markdown from "markdown-to-jsx";

import SectionList from "./components/SectionList";
import HighlightCopy from "./components/Highlight";
import AnchoredHeader from "./components/AnchoredHeader";
import { Documentation, Example1, Sections } from "./Docs";


const HomeDocs: React.FC = () => {

	useEffect(() => {
		document.onscroll = onScroll;
	}, []);

	const onScroll = () => {
		const el = document.querySelector(".docs-page-sections") as HTMLDivElement;
		const height = document.querySelector(".demo-page")?.clientHeight || 0;

		if (window.pageYOffset >= height) {
			el.style.position = "fixed";
		}
		else if (window.pageYOffset < height) {
			el.style.position = "relative";
		}
	}

	return (
		<div className="docs-page">
			<div className="docs-page-sections-container">
				<SectionList list={Sections}></SectionList>
			</div>
			<div className="docs-page-content">
				<Markdown
					options={{
						overrides: {
							AHeader: {
								component: AnchoredHeader,
							},
							Highlight: {
								component: HighlightCopy,
							},
							HighlightExample1: {
								component: HighlightCopy,
								props: {
									text: Example1,
								}
							},
						},
					}}
				>{Documentation}</Markdown>
			</div>
		</div>
	)

}

export default HomeDocs;