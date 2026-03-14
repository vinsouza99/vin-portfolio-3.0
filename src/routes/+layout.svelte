<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '../components/footer.svelte';

	let { children } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Closes the menu when a link is clicked (crucial for anchor/hash links in a SPA)
	function closeMenu() {
		isMenuOpen = false;
	}

	const navlinks = ['skills', 'works', 'career', 'education', 'contact'];
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
		class="content-width mx-auto flex flex-wrap items-start justify-between gap-3 p-5 transition-all ease-in-out md:justify-start md:px-15"
	>
		<a href="/" class="pointer-events-auto relative z-50 flex items-center" onclick={closeMenu}>
			<img
				src={isMenuOpen ? '/images/vin-logo-dark.svg' : '/images/vin-logo-light.svg'}
				class="me-3 h-6 sm:h-9"
				alt="Vin Logo"
			/>
			<span class="sr-only">Vin Souza</span>
		</a>

		<div
			class="pointer-events-auto relative z-50 flex items-start space-x-3 md:order-2 md:space-x-4"
		>
			<button
				class={`cursor-pointer rounded-xl border  bg-transparent px-4 py-1 text-xl font-thin! ${isMenuOpen ? 'border-secondary-500 text-secondary-500' : 'border-secondary-300/10 text-secondary-300/50'} hover:bg-secondary-500/10 hover:text-secondary-100`}
			>
				resume
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
						stroke="color-secondary-300"
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
				{#each navlinks as link (link)}
					<li>
						<a
							href={`/#${link}`}
							onclick={closeMenu}
							class="block px-1 py-1 text-xl font-thin! text-primary-900 hover:text-primary-500 active:text-primary-500 md:text-xl"
							>{link}</a
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
