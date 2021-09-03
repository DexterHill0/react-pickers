//Unfortunately, I have to do it like this since it breaks if you try and pass text as a prop, that includes an arrow function, in the markdown.
//i.e `<Highlight text="const a = () => {}"></Highlight>` <--- arrow function breaks it so it has to be its own component
const Example1 = `import React from "react";

import { ReactColour, ReactGradient } from "@dexterhill0/react-pickers";

const ColourPicker: React.FC = () => {
    return (
    	<ReactColour></ReactColour>
    )
}

export default ColourPicker;
`


const Sections = {
	"01": {
		title: "Getting Started",
		link: "#gettingstarted",
		subs: [
			{ title: "Installation", link: "#installation", subs: [] },
			{ title: "Basic Usage", link: "#basicusage", subs: [] }
		]
	},
	"02": {
		title: "Component API",
		link: "#componentapi",
		subs: [
			{
				title: "Props",
				link: "#props",
				subs: [
					{ title: "Inputs", link: "#inputs" },
					{ title: "Style", link: "#style" },
					{ title: "Swatches", link: "#swatches" }
				]
			},
			{
				title: "Events",
				link: "#events",
				subs: [
					{ title: "Swatch Events", link: "#swatchevents" },
					{ title: "Stop Events", link: "#stopevents" }
				]
			}
		],
	},
}


const Documentation = `
<AHeader header="Getting Started" hType="h2"></AHeader>

<AHeader header="Installation" hType="h3"></AHeader>

You can install \`react-pickers\` using npm:

<Highlight className="bash" text={npm i --save @dexterhill0/react-pickers}></Highlight>

<AHeader header="Basic Usage" hType="h3"></AHeader>

There are two exported components: \`ReactColour\` and \`ReactGradient\`.

An example of using the basic \`ReactColour\` is show below (you can substitue \`ReactColour\` for \`ReactGradient\`):

<HighlightExample1 className="typescript"></HighlightExample1>

<AHeader header="Component API" hType="h2"></AHeader>

<AHeader header="Props" hType="h3"></AHeader>

All the valid props for the pickers are listed below in a table - they are all optional:

<table className="docs-props-table">
<thead>
  <tr>
    <td className="docs-props-table-props-header"><b>Prop</b></td>
    <td className="docs-props-table-default-header"><b>Default</b></td>
    <td className="docs-props-table-comment-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>visible: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Whether the picker is visible.</td>
  </tr>
  <tr>
    <td>layout: <code>HORIZ | VERT</code></td>
    <td><code>HORIZ</code></td>
    <td>Changes the layout of the components from going horizontally to stacking vertically. The swatches are always at the bottom.</td>
  </tr>
  <tr>
    <td>theme: <code>DARK | LIGHT</code></td>
    <td><code>DARK</code></td>
    <td>Changes the colour scheme of the picker. Overriden using <code>styles</code>.</td>
  </tr>
  <tr>
    <td>width & height: <code>string</code></td>
    <td><code>min-content</code></td>
    <td>Adjusts the width/height of the picker. Uses CSS values.</td>
  </tr>
  <tr>
    <td>defaultColour: <code>string</code></td>
    <td><code>black</code></td>
    <td>Sets the default colour of the picker. Value should be in the form of a CSS string.</td>
  </tr>
 <tr>
    <td>defaultGradient: <code>string</code></td>
    <td><code>black</code></td>
    <td>Sets the default gradient of the picker. Value should be in the form of a CSS gradient.</td>
  </tr>
   <tr>
    <td>inputs: <code><a style="color: rgba(232, 230, 227, 0.77);" href="#inputs">(object) Inputs</a></code></td>
    <td><code>none</code></td>
    <td>Options for the inputs to the picker.</td>
  </tr>
  <tr>
    <td>style: <code><a style="color: rgba(232, 230, 227, 0.77);" href="#style">(object) Style</a></code></td>
    <td><code>none</code></td>
    <td>Allows for changes to the style of the picker (colours, font size, etc).</td>
  </tr>
  <tr>
    <td>swatches: <code><a style="color: rgba(232, 230, 227, 0.77);" href="#swatches">(object) Swatches</a></code></td>
    <td><code>none</code></td>
    <td>Options for the saved swatches.</td>
  </tr>
  </tbody>
</table>

<br>
<em>Using the Gradient picker allows for a few extra props:</em>
<br><br>

<table className="docs-props-table">
<thead>
  <tr>
    <td className="docs-props-table-props-header"><b>Prop</b></td>
    <td className="docs-props-table-default-header"><b>Default</b></td>
    <td className="docs-props-table-comment-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>defaultGradientType: <code>linear-gradient | radial-gradient | conic-gradient</code></td>
    <td><code>linear-gradient</code></td>
    <td>The shape of the gradient.</td>
  </tr>
  <tr>
    <td>defaultGradientAngle: <code>number</code></td>
    <td><code>0deg</code></td>
    <td>The angle of the linear gradient.</td>
  </tr>
  </tbody>
</table>

<AHeader header="Inputs" hType="h4"></AHeader>

<table className="docs-props-table">
<thead>
  <tr>
    <td className="docs-props-table-props-header"><b>Prop</b></td>
    <td className="docs-props-table-default-header"><b>Default</b></td>
    <td className="docs-props-table-comment-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>showAlpha: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Enables/Disables the alpha slider.</td>
  </tr>
  <tr>
    <td>allowCopyAndPaste: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Allows the copy and pasting of colours between pickers.</td>
  </tr>
  <tr>
    <td>showColourInput: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Enables/Disables the input box where the user can type in a colour.</td>
  </tr>
  <tr>
    <td>defaultRepresentation: <code>HEX | HEX8 | RGB | HSL | HSV</code></td>
    <td><code>true</code></td>
    <td>The mode that the colour will be displayed in the input box. Also the mode that the user can enter their colour in.</td>
  </tr>
  </tbody>
</table>

<br>
<em>If you are using the Gradient picker, you can also set the value of this prop:</em>
<br><br>

<table className="docs-props-table">
<thead>
  <tr>
    <td className="docs-props-table-props-header"><b>Prop</b></td>
    <td className="docs-props-table-default-header"><b>Default</b></td>
    <td className="docs-props-table-comment-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>showGradientType: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Enables/Disables the option for the user to change the type of the gradient.</td>
  </tr>
  </tbody>
</table>

<AHeader header="Style" hType="h4"></AHeader>

Below are the valid values for the \`style\` object:

<table className="docs-props-table">
<thead>
  <tr>
    <td className="docs-props-table-props-header"><b>Prop</b></td>
    <td className="docs-props-table-default-header"><b>Default</b></td>
    <td className="docs-props-table-comment-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>fontSize: <code>string</code></td>
    <td><code>unset</code></td>
    <td>The size of the font in the picker as a CSS string.</td>
  </tr>
   <tr>
    <td>fontWeight: <code>bold | normal | bolder | lighter</code></td>
    <td><code>normal</code></td>
    <td>The weight of the font in the picker.</td>
  </tr>
   <tr>
    <td>font: <code>string</code></td>
    <td><code>unset</code></td>
    <td>The font used in the picker.</td>
  </tr>
  <tr>
    <td>circleSize: <code>string</code></td>
    <td>Varied between components</td>
    <td>The size of the draggable "pointers" as a CSS string.</td>
  </tr>
  <tr>
    <td>dropShadow: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Enables/Disables the drop shadow on the picker.</td>
  </tr>
  <tr>
    <td>colours: <code>{ background?: string; fontColour?: string; buttons?: string; input?: string; }</code></td>
    <td>Colours depend on selected theme</td>
    <td>Changes the colours of the components. Uses CSS colour strings.</td>
  </tr>
  </tbody>
</table>

<AHeader header="Swatches" hType="h4"></AHeader>

Below are the valid values for the \`swatch\` object:

<table className="docs-props-table">
<thead>
  <tr>
    <td className="docs-props-table-props-header"><b>Prop</b></td>
    <td className="docs-props-table-default-header"><b>Default</b></td>
    <td className="docs-props-table-comment-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>showSwatches: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Enables/Disables the entire swatch component.</td>
  </tr>
   <tr>
    <td>disableSwatchCollapse: <code>boolean</code></td>
    <td><code>false</code></td>
    <td>Disables the ability to hide (collapse) the save swatches.</td>
  </tr>
  <tr>
    <td>allowSave: <code>boolean</code></td>
    <td><code>true</code></td>
    <td>Whether to allow the user to save new swatches.</td>
  </tr>
  <tr>
    <td>defaultSwatches: <code>string[]</code></td>
    <td>None</td>
    <td>The default saved swatches. They should either be a CSS string or gradient.</td>
  </tr>
  </tbody>
</table>

<AHeader header="Events" hType="h3"></AHeader>

<table className="docs-props-table">
<thead>
  <tr>
  	<td className="docs-props-table-default-header"><b>Event</b></td>
    <td className="docs-props-table-props-header"><b>Comment</b></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>onInit: () => void</code></td>
    <td>Event is called when the picker mounts.</td>
  </tr>
  <tr>
    <td><code>onFocus: () => void</code></td>
    <td>Event is called when the picker gets focussed.</td>
  </tr>
  <tr>
    <td><code>onBlur: () => void</code></td>
    <td>Event is called when the picker loses focus.</td>
  </tr>
  <tr>
    <td><code>onInput: (text: string) => void</code></td>
    <td>Event is called when the user enters text into the input.</td>
  </tr>
  <tr>
    <td><code>onCopy: () => void</code></td>
    <td>Event is called when the user copies the colour (using the <code>copy</code> button).</td>
  </tr>
  <tr>
    <td><code>onPaste: () => void</code></td>
    <td>Event is called when the user pastes the colour (using the <code>paste</code> button)</td>
  </tr>
  <tr>
    <td><code>onColourChanged: (colour: Colour) => void</code></td>
    <td>Event is called every time the colour changes (also called if the gradient is changed).</td>
  </tr>
  </tbody>
</table>

<AHeader header="Swatch Events" hType="h4"></AHeader>

<AHeader header="Stop Events" hType="h4"></AHeader>
`



export { Documentation, Sections, Example1 };