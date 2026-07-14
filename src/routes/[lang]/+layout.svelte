<script module>
	export const prerender = true;
</script>

<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Footer from '../../components/footer.svelte';

	import { setScrollContext } from '$lib/contexts/scroll-context';
	import Navbar from '../../components/navbar.svelte';
	import { setLanguageContext } from '$lib/i18n';
	import { setContext } from 'svelte';
	import { page } from '$app/state';

	let { children, data } = $props<{
		children: import('svelte').Snippet;
		data: { lang: string };
	}>();
	setScrollContext('landing');
	//setContext('lang', data.lang);
	setLanguageContext('language', data.lang);
	let lang = $derived(page.params.lang as Locale);

	setContext('lang', () => lang); // pass a getter, not the raw value
</script>

<svelte:head><link rel="icon" href={favicon} /><title>Vin Souza</title></svelte:head>

<Navbar />
{@render children()}
<Footer />

<style>
	:global(#navbar > div) {
		gap: 0.5rem;
		margin: 0;
		/* margin-right: 1rem;
		margin-left: 1rem; */
		@media screen and (min-width: 768px) {
			justify-content: flex-start !important;
		}
	}
</style>
