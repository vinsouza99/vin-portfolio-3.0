import { browser } from '$app/environment';
import { readable, type Readable } from 'svelte/store';

// Tailwind default `md` breakpoint is 768px.
const MD_BREAKPOINT_PX = 768;

function computeIsSmallScreen() {
	if (!browser) return false;
	return window.innerWidth < MD_BREAKPOINT_PX;
}

/**
 * Reactive store that is `true` when viewport width is < Tailwind `md` (768px).
 * Subscribe with `$isSmallScreen` in components.
 */
export const isSmallScreen: Readable<boolean> = readable(computeIsSmallScreen(), (set) => {
	if (!browser) return () => {};

	const update = () => set(computeIsSmallScreen());

	// Set initial value on the client.
	update();

	window.addEventListener('resize', update, { passive: true });
	return () => window.removeEventListener('resize', update);
});

