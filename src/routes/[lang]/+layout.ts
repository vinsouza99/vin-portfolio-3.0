import { error } from '@sveltejs/kit';

const SUPPORTED = ['en', 'pt-br'];

export const prerender = true;

export function load({ params }) {
	if (!SUPPORTED.includes(params.lang)) {
		throw error(404, 'Not found');
	}
	return { lang: params.lang };
}
