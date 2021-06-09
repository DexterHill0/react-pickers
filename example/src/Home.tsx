import React, { useState } from "react";

//import { ReactColour } from "react-pickers";

import Highlight from "react-highlight";

import { Animate } from "react-move";
import { easeSinOut } from "d3-ease";

//Colours to pick randomly from
const cols = [
	"#7A918D",
	"#93B1A7",
	"#FFCAD4",
	"#99C2A2",
	"#C5EDAC",
	"#C5EDAC",
	"#9D8189",
	"#9D8189",
	"#8789C0",
	"#111D4A",
	"#EFB0A1",
	"#797D81",
	"#3590F3",
	"#86CD82",
	"#72A276",
];

const grads = [
	"linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
	"linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)",
	"linear-gradient(to right, #360033, #0b8793)",
	"linear-gradient(to right, #73c8a9, #373b44)",
	"linear-gradient(to right, #fdfc47, #24fe41)",
	"linear-gradient(to right, #83a4d4, #b6fbff)",
	"linear-gradient(to right, #70e1f5, #ffd194)",
	"linear-gradient(to right, #556270, #ff6b6b)",
	"linear-gradient(to right, #b3ffab, #12fff7)",
	"linear-gradient(to right, #fbd3e9, #bb377d)"
]

const Home: React.FC = () => {
	//const [bg, setBg] = useState<any>();

	return (
		<div className="demo-page">

			<div className="demo-content">
				<div className="demo-title">
					<div>
						<img src="logo.png" width="110" height="110" alt="npm badge"></img>
					</div>

					<div>
						<div className="demo-title-heading">react-pickers</div>
						<div className="demo-title-subtitle">Feature rich colour and gradient pickers.</div>
					</div>
				</div>

				<div className="demo-colour-picker">
					<div className="demo-colour-picker-container">
						<Animate
							start={{
								opacity: 0,
							}}
							enter={{
								opacity: [1],
								timing: { duration: 700 },
								background: cols[Math.floor(Math.random() * cols.length)]
							}}
						>
							{({ opacity, background }) =>
								<div className="demo-colour-picker-background" style={{ opacity, background }}></div>
							}
						</Animate>


						<div className="demo-colour-picker-name">R e a c t C o l o u r</div>
					</div>

					<Animate
						start={{
							opacity: 0,
							bottom: 0,
						}}
						enter={{
							opacity: [1],
							bottom: [60],
							timing: { duration: 1000, delay: 100, ease: easeSinOut },
						}}
					>
						{({ opacity, bottom }) =>
							<div
								className="demo-colour-picker-code-container"
								style={{
									opacity,
									bottom: bottom + "px",
								}}
							>
								<Highlight className="typescript demo-colour-picker-code">
									{`
import { ReactColour } from "react-pickers";

const ColourPicker = () => {
    return (
        <ReactColour
            ...
        ></ReactColour>
    )
}
// Click the arrow to see all the props :)
											`}
								</Highlight>
							</div>
						}
					</Animate>
				</div>

				<div className="demo-gradient-picker">
					<div className="demo-gradient-picker-container">
						<Animate
							start={{
								opacity: 0,
							}}
							enter={{
								opacity: [1],
								timing: { duration: 700, delay: 200 },
								background: grads[Math.floor(Math.random() * grads.length)]
							}}
						>
							{({ opacity, background }) => {
								return (
									<div className="demo-gradient-picker-background" style={{ opacity, background }}></div>
								);
							}}
						</Animate>

						<div className="demo-gradient-picker-name">R e a c t G r a d i e n t</div>
					</div>
				</div>
			</div>

			<div className="demo-header">
				<div className="demo-header-github-stars">
					<iframe title="stars" src="https://ghbtns.com/github-btn.html?user=dexterhill0&repo=react-pickers&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0"></iframe>
				</div>

				<a href="https://www.npmjs.com/package/@dexterhill0/react-pickers" target="_blank" rel="noopener noreferrer">
					<img src="https://img.shields.io/npm/v/@dexterhill0/react-pickers.svg" alt="npm badge"></img>
				</a>
			</div>

			<div className="demo-footer">
				⌄
			</div>
			{/* 
			<div style={{ paddingTop: "120%" }}></div> */}

		</div >
	);
}

export default Home;