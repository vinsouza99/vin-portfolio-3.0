<script lang="ts">
	import { getLanguageContext, t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	const language = getLanguageContext();
	interface Props {
		/**
		 * Optional GSAP ScrollTrigger `endTrigger`.
		 * Pass another `content-section`'s section id (e.g. `#works`) so adjacent
		 * sections can coordinate their sticky-summary fade-out.
		 */
		endTrigger?: HTMLElement | string | null;
	}

	let { endTrigger = null }: Props = $props(); // Use the interface directly here
	let isMdUp = $state(false);
	let sectionEl: HTMLElement | null = null;
	let leftWrapperEl: HTMLElement | null = null;
	let scrollTrigger: ScrollTrigger | null = null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const mq = window.matchMedia('(min-width: 768px)');
		const updateMq = () => {
			isMdUp = mq.matches;
		};
		updateMq();
		mq.addEventListener('change', updateMq);

		const setupScroll = () => {
			scrollTrigger?.kill();
			scrollTrigger = null;

			if (!sectionEl || !leftWrapperEl) return;
			if (!isMdUp) {
				gsap.set(leftWrapperEl, { clearProps: 'opacity,zIndex,position' });
				return;
			}

			gsap.set(leftWrapperEl, { autoAlpha: 0, zIndex: 1000 });
			scrollTrigger = ScrollTrigger.create({
				trigger: sectionEl,
				// Only show this section's summary while the viewport center is within range.
				// This prevents two adjacent sections from both showing their sticky summary at once.
				start: 'top top',
				endTrigger: endTrigger || undefined,
				// When `endTrigger` is another section, fade out when that other section's
				// top crosses 10px above the viewport bottom.
				end: endTrigger ? 'top bottom-=50%' : 'bottom center-=10%',
				onEnter: () => {
					gsap.to(leftWrapperEl, { autoAlpha: 1, zIndex: 1000, duration: 0.5, ease: 'power2.out' });
				},
				onEnterBack: () => {
					gsap.to(leftWrapperEl, { autoAlpha: 1, zIndex: 1000, duration: 0.5, ease: 'power2.out' });
				},
				// If we're past the section enough that the sticky would have to move, fade out immediately.
				onLeave: () => {
					gsap.to(leftWrapperEl, { autoAlpha: 0, zIndex: 1000, duration: 0.5, ease: 'power2.out' });
				}
			});

			// Refresh ScrollTrigger to ensure trigger positions are accurate
			ScrollTrigger.refresh();

			// Manually trigger fade-in on initial load since the landing section is already in view
			gsap.to(leftWrapperEl, { autoAlpha: 1, zIndex: 1000, duration: 0.5, ease: 'power2.out' });
		};

		setupScroll();

		// Keep ScrollTrigger state consistent if viewport crosses md breakpoint
		mq.addEventListener('change', setupScroll);

		return () => {
			mq.removeEventListener('change', updateMq);
			mq.removeEventListener('change', setupScroll);
			scrollTrigger?.kill();
			scrollTrigger = null;
		};
	});
</script>

<section
	id="landing"
	bind:this={sectionEl}
	class="content-section content-width z-1000 mx-auto grid h-full min-h-screen grid-cols-1 bg-bg p-5 sm:gap-2 md:grid-cols-2 md:gap-5 md:p-10 lg:gap-10"
>
	<div
		class="section-summary relative h-fit w-full self-center md:fixed md:top-80 md:bottom-0 md:left-0 md:ml-8 md:h-full md:max-w-[48vw]"
	>
		<div
			bind:this={leftWrapperEl}
			class="flex flex-col content-center justify-center gap-5 text-left font-mono text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60 md:sticky md:top-80 md:gap-8"
		>
			<p class="text-medium block md:text-xl">{t($language, 'landing.hello')}</p>
			<h2 class="block text-5xl font-semibold md:text-6xl">
				{t($language, 'landing.intro')}
				<span class="text-[#dbefec] text-shadow-lg/60 text-shadow-[#dbefec]/60">Vin</span>
			</h2>
			<p class="text-medium block md:text-xl">{t($language, 'landing.role')}</p>
			<p></p>
		</div>
	</div>
	{#if !isMdUp}
		<div
			class="section-content hidden h-full w-full items-center justify-center gap-5 text-left text-white md:flex-col"
		></div>
	{/if}
</section>
