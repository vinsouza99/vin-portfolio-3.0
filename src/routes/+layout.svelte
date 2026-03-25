<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import './layout.css';
	import Logo from '$lib/assets/logo.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '../components/footer.svelte';
	import { resolve } from '$app/paths';
	import { isSmallScreen } from '$lib/hooks/is-small-screen';
	import { setLanguageContext, t, type Locale } from '$lib/i18n';

	let { children, data } = $props<{ children: import('svelte').Snippet; data: { locale: Locale } }>();
	const language = setLanguageContext('en');
	const currentLocale = $derived(data.locale);
	const navkeys = ['skills', 'works', 'career', 'education', 'contact'] as const;

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Closes the menu when a link is clicked (crucial for anchor/hash links in a SPA)
	function closeMenu() {
		isMenuOpen = false;
	}

	const navlinks = $derived(
		navkeys.map((key) => ({
			key,
			label: t($language, `nav.${key}`)
		}))
	);

	$effect(() => {
		language.set(currentLocale);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<svg style="position: absolute; width: 0; height: 0">
	<filter
		id="glass"
		x="-50%"
		y="-50%"
		width="200%"
		height="200%"
		primitiveUnits="objectBoundingBox"
	>
		<feImage x="-50%" y="-50%" width="200%" height="200%" result="map" />
		<feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
		<feDisplacementMap
			id="disp"
			in="blur"
			in2="map"
			scale="0.8"
			xChannelSelector="R"
			yChannelSelector="G"
		></feDisplacementMap>
	</filter>
</svg>
<nav class="nav-mask pointer-events-none fixed top-0 left-0 z-50 mx-0 h-45 w-full px-2 md:px-0">
	<div
		class=" content-width mx-auto flex flex-wrap items-start justify-between gap-3 p-5 transition-all ease-in-out md:justify-start md:px-15"
	>
		<a
			href={resolve('/')}
			class="pointer-events-auto relative z-50 flex items-center"
			onclick={closeMenu}
		>
			<div class="me-3 flex h-6 w-11 shrink-0 items-center sm:h-9 sm:w-16">
				<Logo
					glow={isMenuOpen}
					fill={isMenuOpen && $isSmallScreen ? '#0074bd' : '#6afff5'}
				/>
			</div>
			<span class="sr-only">Vin Souza</span>
		</a>

		<div
			class="pointer-events-auto relative z-50 flex items-start space-x-3 md:order-2 md:space-x-4"
		>
			<button
				class={`glass-button hover:bg-glow-sm cursor-pointer rounded-md border bg-transparent px-4 py-1 text-xl font-thin! text-primary-900 hover:border-primary-700/50 hover:bg-primary-800 hover:text-white ${isMenuOpen ? 'border-secondary-500 text-secondary-500' : 'border-primary-500/10'}`}
			>
				{t($language, 'nav.resume')}
			</button>

			<button
				type="button"
				class="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100 focus:ring-2 focus:ring-secondary-500 focus:outline-none md:hidden"
				aria-controls="navbar-menu"
				aria-expanded={isMenuOpen}
				onclick={toggleMenu}
			>
				<span class="sr-only">Open main menu</span>
				{#if isMenuOpen}
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="fill-secondary-300"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>

		<div
			id="navbar-menu"
			class="{isMenuOpen
				? 'fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm dark:bg-gray-900/95'
				: 'hidden'} pointer-events-auto w-full md:static md:order-1 md:flex md:w-auto md:bg-transparent md:dark:bg-transparent"
		>
			<ul class="flex flex-col items-start gap-8 p-4 md:mt-0 md:flex-row md:gap-4 md:p-0">
				{#each navlinks as link (link.key)}
					<li>
						<a
							href={`/#${link.key}`}
							onclick={closeMenu}
							class="block px-1 py-1 text-xl font-thin! text-primary-900 transition text-shadow-lg/60 hover:text-primary-500 hover:text-shadow-primary-800/60 active:text-primary-500 md:text-xl"
							>{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
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
