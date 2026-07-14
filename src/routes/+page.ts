import { redirect } from '@sveltejs/kit';

export function load({ request }) {
	// simple default; see note below about geo
	const acceptLang = request.headers.get('accept-language') || '';
	const guess = acceptLang.toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
	throw redirect(307, `/${guess}`);
}
