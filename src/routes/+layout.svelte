<script lang="ts">
	import './layout.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '../components/footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar class="nav-mask fixed top-0 right-0 left-0 z-10 mx-0 w-full gap-0!">
	<NavBrand href="/">
		<img src="/images/vin-logo-light.svg" class="me-3 h-6 sm:h-9" alt="Vin Logo" />
		<span class="sr-only">Vin Souza</span>
	</NavBrand>
	<div class="flex md:order-2">
		<Button size="sm" class="cursor-pointer rounded-sm text-xl font-thin!" outline>resume</Button>
		<NavHamburger color="primary" />
	</div>
	<NavUl class="order-1">
		<NavLi href="/#skills" class="text-xl font-thin text-primary-900 active:text-primary-500"
			>skills</NavLi
		>
		<NavLi href="/#works" class="text-xl font-thin text-primary-900 active:text-primary-500"
			>works</NavLi
		>
		<NavLi href="/#career" class="text-xl font-thin text-primary-900 active:text-primary-500"
			>career</NavLi
		>
		<NavLi href="/#education" class="text-xl font-thin text-primary-900 active:text-primary-500"
			>education</NavLi
		>
		<NavLi href="/#contact" class="text-xl font-thin text-primary-900 active:text-primary-500"
			>contact</NavLi
		>
	</NavUl>
</Navbar>
{@render children()}
<Footer />

<style>
	:global(nav > div > div) {
		gap: 0.5rem;
		margin-right: 1rem;
		margin-left: 1rem;
		@media screen and (min-width: 768px) {
			justify-content: flex-start !important;
		}
	}
</style>
