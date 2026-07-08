<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import './layout.css';
	import Logo from '$lib/assets/logo.svelte';
	import favicon from '$lib/assets/favicon.png';
	import Footer from '../components/footer.svelte';
	import { resolve } from '$app/paths';
	import { isSmallScreen } from '$lib/hooks/is-small-screen';
	import { setLanguageContext, t, type Locale } from '$lib/i18n';
	import { getScrollContext, setScrollContext } from '$lib/contexts/scroll-context';
	import { onMount } from 'svelte';
	import { Footer as FbFooter, FooterIcon } from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';

	let { children, data } = $props<{
		children: import('svelte').Snippet;
		data: { locale: Locale };
	}>();
	const language = setLanguageContext('en');
	setScrollContext('landing');
	const currentSection = getScrollContext();
	const currentLocale = $derived(data.locale);
	const navkeys = ['skills', 'works', 'career', 'education', 'contact'] as const;
	let isMdDown = $state(false);

	let isMenuOpen = $state(false);
	const section = getScrollContext();

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

	onMount(() => {
		const mq = window.matchMedia('(max-width: 767px)');
		const updateMq = () => {
			isMdDown = mq.matches;
		};
		updateMq();
		mq.addEventListener('change', updateMq);

		return () => {
			mq.removeEventListener('change', updateMq);
		};
	});
</script>

<svelte:head><link rel="icon" href={favicon} /><title>Vin Souza</title></svelte:head>
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
		class=" content-width mx-auto flex flex-wrap items-start justify-between gap-3 p-5 transition-all ease-in-out md:justify-start md:px-10 lg:px-15"
	>
		<a
			href={resolve('/')}
			class="pointer-events-auto relative z-50 flex items-center"
			onclick={() => {
				closeMenu();
				section.set('landing');
			}}
		>
			<div class="me-3 flex h-9 w-16 shrink-0 items-center">
				<Logo
					glow={$currentSection === 'landing' && (!isMenuOpen || !$isSmallScreen)}
					fill={isMenuOpen && $isSmallScreen
						? '#0074bd'
						: $currentSection === 'landing'
							? '#6afff5'
							: '#008c82'}
				/>
			</div>
			<span class="sr-only">Vin Souza</span>
		</a>

		<div
			class="pointer-events-auto relative z-50 flex items-start space-x-3 md:order-2 md:space-x-4"
		>
			<a
				href={t($language, 'nav.resume.link')}
				target="_blank"
				rel="noopener noreferrer"
				title={$language === 'en' ? 'Open my resume' : 'Meu currículo'}
				class={`glass-button hover-bg-glow cursor-pointer rounded-lg border-2 bg-transparent px-4 py-1 text-lg font-thin! text-primary-800 ease-in-out  hover:border-primary-700 hover:bg-primary-700/40  hover:text-primary-600 ${isMenuOpen && isMdDown ? 'border-secondary-500 text-secondary-500 hover:border-secondary-700 hover:bg-secondary-700/40 hover:text-secondary-700' : 'border-primary-500/50'}`}
			>
				{t($language, 'nav.resume')}
			</a>

			<button
				type="button"
				class={`glass-button hover-bg-glow ${isMenuOpen ? 'border-secondary-500 text-secondary-500 hover:border-secondary-700 hover:bg-secondary-700/40 hover:text-secondary-700' : 'border-primary-500/50'} inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md  border-2 bg-transparent p-2 text-primary-800 hover:border-primary-700 hover:bg-primary-700/40 hover:text-primary-600 focus:ring-2 focus:ring-secondary-500 focus:outline-none md:hidden`}
				aria-controls="navbar-menu"
				aria-expanded={isMenuOpen}
				onclick={toggleMenu}
				title={t($language, 'nav.hamburgerLabel')}
			>
				<span class="sr-only">{t($language, 'nav.hamburgerLabel')}</span>
				{#if isMenuOpen}
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="red"
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
				: 'hidden'} pointer-events-auto w-full md:static md:order-1 md:my-auto md:flex md:w-auto md:bg-transparent md:dark:bg-transparent"
		>
			<ul
				class="flex w-full flex-col items-start divide-y divide-secondary-700/20 p-0 md:mt-0 md:w-fit md:flex-row md:gap-4 md:divide-y-0"
			>
				{#each navlinks as link (link.key)}
					<li class="h-25 w-full align-middle md:h-fit">
						<a
							href={`/#${link.key}`}
							onclick={closeMenu}
							title={link.label}
							class={`letter-spacing block content-center font-thin transition-colors duration-200 ease-in-out text-shadow-md text-shadow-secondary-800/0 hover:text-primary-500  active:text-primary-500 ${isMdDown ? 'h-full w-full p-5 text-2xl hover:bg-secondary-500/10' : 'px-1 text-lg md:text-xl'} ${
								isMenuOpen && isMdDown
									? 'text-secondary-500 hover:text-secondary-500 hover:text-shadow-primary-800/0 active:text-secondary-500'
									: $currentSection === link.key
										? ' text-primary-500 text-shadow-secondary-800/50' /* ACTIVE STATE HIGHLIGHT */
										: 'text-primary-800 text-shadow-secondary-800/0' /* DEFAULT STATE */
							}`}>{link.label}</a
						>
					</li>
				{/each}
			</ul>
			<FbFooter
				class="align-center z-20 flex w-full content-center items-center gap-5 bg-transparent p-4 text-text shadow-none md:hidden"
			>
				<div class="flex items-center space-x-3 sm:mt-0 sm:justify-center rtl:space-x-reverse">
					<FooterIcon
						href="https://github.com/vinsouza99"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GithubSolid
							class="aspect-square h-10 w-10 text-secondary-500 hover:text-secondary-300"
						/>
					</FooterIcon>
					<FooterIcon
						href="https://www.linkedin.com/in/vinicius-abner"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkedinSolid
							class="aspect-square h-11 w-11 text-secondary-500 hover:text-secondary-300"
						/>
					</FooterIcon>
				</div>
			</FbFooter>
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
