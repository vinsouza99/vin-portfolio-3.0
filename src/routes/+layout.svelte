<script module>
	export const prerender = true;
</script>

<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Footer from '../components/footer.svelte';

	import { setScrollContext } from '$lib/contexts/scroll-context';
	import Navbar from '../components/navbar.svelte';
	//import { setLanguageContext } from '$lib/i18n';
	import { page } from '$app/state';
	import { setContext } from 'svelte';

	let { children } = $props<{
		children: import('svelte').Snippet;
	}>();
	let lang = $derived(page.params.lang);
	//setLanguageContext('en');
	setScrollContext('landing');
	setContext('lang', () => lang);
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
