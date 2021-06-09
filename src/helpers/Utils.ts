let text: string | null = "";

//Listen out for the storage changing
window.addEventListener("storage", () => {
	text = localStorage.getItem("colour-copy");
});

export const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export const splitEvent = (e: any) => {
	const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
	const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;

	return { x, y };
}

export const copyToClipboard = (text: string) => {
	//Work-around for FireFox - set colour in local storage 
	localStorage.setItem("colour-copy", text);
	//Emit an event to let any other tabs know (as long as they are the same origin) that the value has changed
	window.dispatchEvent(new Event("storage"));

	if (!navigator.clipboard.writeText) {
		console.error("This browser does not support writing to the clipboard, using localStorage!");
		return;
	}
	navigator.clipboard.writeText(text).catch(() => {
		console.error("Unable to copy to clipboard");
	});
}

export const readFromClipboard = async () => {
	if (navigator.clipboard.readText) {
		return await navigator.clipboard.readText();
	}

	console.error("This browser does not support reading from the clipboard, using localStorage!");

	//If the colour has been copied on the same page this will have a value
	const t = localStorage.getItem("colour-copy");

	//If it doesn't try and get the value that was copied from another tab
	if (!t) return text;
	else return t;
}
