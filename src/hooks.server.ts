import type { Handle } from '@sveltejs/kit';
import { normalizeLocale, type Locale } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	// Cloudflare uses 'cf-ipcountry', Vercel uses 'x-vercel-ip-country'
	const country = event.request.headers.get('x-vercel-ip-country') || 'US';
	let locale: Locale = 'en';

	if (country === 'BR') {
		locale = 'pt-BR';
	}

	// Allow manual override if the user toggled the language via your UI
	const manualLocale = event.cookies.get('user-locale');
	if (manualLocale) {
		locale = normalizeLocale(manualLocale);
	}

	// Pass the locale downstream to your components
	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
