import { useEffect, useState } from "react";


export const QUERIES = {
	xs: "(min-width: 600px)",
	xl: "(min-width: 300px)",
}


export const useMediaQuery = (query: keyof typeof QUERIES): boolean => {

	const mediaMatch = window.matchMedia(query);
	const [matches, setMatches] = useState(mediaMatch.matches);

	useEffect(() => {
		const handler = (e: any) => setMatches(e.matches);

		mediaMatch.addEventListener("change", handler);
		return () => mediaMatch.removeEventListener("change", handler);
	});

	return matches;
};