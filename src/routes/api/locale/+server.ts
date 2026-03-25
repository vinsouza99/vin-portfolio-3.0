import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { normalizeLocale } from '$lib/i18n';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = (await request.json().catch(() => null)) as { locale?: string } | null;
	const locale = normalizeLocale(body?.locale);

	cookies.set('user-locale', locale, {
		path: '/',
		httpOnly: false,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 365
	});

	return json({ locale });
};
