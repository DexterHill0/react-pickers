export const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export const splitEvent = (e: any) => {
	const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
	const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;

	return { x, y };
}

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text).catch(() => {
		console.error("Unable to copy to clipboard");
	});
}

export const readFromClipboard = async () => {
	return await navigator.clipboard.readText();
}