export const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export const splitEvent = (e: any) => {
	const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
	const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;

	return { x, y };
}