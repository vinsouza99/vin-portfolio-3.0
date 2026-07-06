<script lang="ts">
	import { onMount } from 'svelte';
	import { getLanguageContext, t, type Locale } from '$lib/i18n';
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
	let isFixedReady = $state(false);
	let sectionEl: HTMLElement | null = null;
	let leftWrapperEl: HTMLElement | null = null;
	let helloEl: HTMLParagraphElement | null = null;
	let introEl: HTMLSpanElement | null = null;
	let nameEl: HTMLSpanElement | null = null;
	let roleEl: HTMLParagraphElement | null = null;
	let scrollTrigger: ScrollTrigger | null = null;

	const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const randomScrambleChar = () =>
		SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

	const scrambleIn = (element: HTMLElement | null, targetText: string, duration = 0.75) => {
		if (!element) return null;
		const length = targetText.length;
		const state = { progress: 0 };
		return gsap.to(state, {
			progress: 1,
			duration,
			ease: 'none',
			onUpdate: () => {
				const progress = state.progress;
				const revealCount = Math.floor(progress * length);
				let output = '';
				for (let i = 0; i < length; i += 1) {
					if (i < revealCount) {
						output += targetText[i];
					} else {
						output += targetText[i] === ' ' ? ' ' : randomScrambleChar();
					}
				}
				element.textContent = output;
			},
			onComplete: () => {
				element.textContent = targetText;
			}
		});
	};

	const scrambleOut = (element: HTMLElement | null, duration = 0.5) => {
		if (!element) return null;
		const length = (element.textContent ?? '').length;
		const state = { progress: 0 };
		return gsap.to(state, {
			progress: 1,
			duration,
			ease: 'none',
			onUpdate: () => {
				let output = '';
				for (let i = 0; i < length; i += 1) {
					output += Math.random() < state.progress ? ' ' : randomScrambleChar();
				}
				element.textContent = output;
			},
			onComplete: () => {
				element.textContent = '';
			}
		});
	};

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
				isFixedReady = false;
				gsap.set(leftWrapperEl, { clearProps: 'all' });
				return;
			}

			isFixedReady = true;
			// Keep the summary visually hidden by default (autoAlpha: 0).
			// It will be shown (autoAlpha: 1) when the section becomes active.
			gsap.set(leftWrapperEl, { autoAlpha: 0, zIndex: -1, pointerEvents: 'none' });
			scrollTrigger = ScrollTrigger.create({
				trigger: sectionEl,
				// Only show this section's summary while the viewport center is within range.
				// This prevents two adjacent sections from both showing their sticky summary at once.
				start: 'top center-=5%',
				endTrigger: endTrigger || undefined,
				// When `endTrigger` is another section, fade out when that other section's
				// top crosses 10px above the viewport bottom.
				end: endTrigger ? 'top bottom-=40%' : 'bottom center-=10%',
				onEnter: () => {
					// Make visible when entering
					gsap.set(leftWrapperEl, { autoAlpha: 1, zIndex: 1000, pointerEvents: 'auto' });
					gsap.killTweensOf([helloEl, introEl, nameEl, roleEl]);
					const enterTl = gsap.timeline();
					const helloTween = scrambleIn(helloEl, t($language, 'landing.hello'), 0.5);
					const introTween = scrambleIn(introEl, t($language, 'landing.intro'), 0.75);
					const nameTween = scrambleIn(nameEl, 'Vin', 0.75);
					const roleTween = scrambleIn(roleEl, t($language, 'landing.role'), 0.5);
					if (helloTween) enterTl.add(helloTween, 0);
					if (introTween) enterTl.add(introTween, 0);
					if (nameTween) enterTl.add(nameTween, 0.2);
					if (roleTween) enterTl.add(roleTween, 0.1);
				},
				onEnterBack: () => {
					// Make visible when entering back
					gsap.set(leftWrapperEl, { autoAlpha: 1, zIndex: 1000, pointerEvents: 'auto' });
					gsap.killTweensOf([helloEl, introEl, nameEl, roleEl]);
					const enterBackTl = gsap.timeline();
					const helloBackTween = scrambleIn(helloEl, t($language, 'landing.hello'), 0.5);
					const introBackTween = scrambleIn(introEl, t($language, 'landing.intro'), 0.75);
					const nameBackTween = scrambleIn(nameEl, 'Vin', 0.75);
					const roleBackTween = scrambleIn(roleEl, t($language, 'landing.role'), 0.5);
					if (helloBackTween) enterBackTl.add(helloBackTween, 0);
					if (introBackTween) enterBackTl.add(introBackTween, 0);
					if (nameBackTween) enterBackTl.add(nameBackTween, 0.2);
					if (roleBackTween) enterBackTl.add(roleBackTween, 0.1);
				},
				onLeave: () => {
					const leaveTl = gsap.timeline({
						onComplete: () => {
							if (leftWrapperEl) {
								// Hide the summary when leaving
								gsap.set(leftWrapperEl, { autoAlpha: 0, zIndex: -1, pointerEvents: 'none' });
							}
						}
					});
					const helloOutTween = scrambleOut(helloEl, 0.4);
					const introOutTween = scrambleOut(introEl, 0.5);
					const nameOutTween = scrambleOut(nameEl, 0.4);
					const roleOutTween = scrambleOut(roleEl, 0.4);
					if (helloOutTween) leaveTl.add(helloOutTween, 0);
					if (introOutTween) leaveTl.add(introOutTween, 0);
					if (nameOutTween) leaveTl.add(nameOutTween, 0);
					if (roleOutTween) leaveTl.add(roleOutTween, 0);
				},
				onLeaveBack: () => {
					const leaveBackTl = gsap.timeline({
						onComplete: () => {
							if (leftWrapperEl) {
								// Hide the summary when leaving back
								gsap.set(leftWrapperEl, { autoAlpha: 0, zIndex: -1, pointerEvents: 'none' });
							}
						}
					});
					const helloBackOutTween = scrambleOut(helloEl, 0.4);
					const introBackOutTween = scrambleOut(introEl, 0.5);
					const nameBackOutTween = scrambleOut(nameEl, 0.4);
					const roleBackOutTween = scrambleOut(roleEl, 0.4);
					if (helloBackOutTween) leaveBackTl.add(helloBackOutTween, 0);
					if (introBackOutTween) leaveBackTl.add(introBackOutTween, 0);
					if (nameBackOutTween) leaveBackTl.add(nameBackOutTween, 0);
					if (roleBackOutTween) leaveBackTl.add(roleBackOutTween, 0);
				}
			});

			// Refresh ScrollTrigger to ensure trigger positions are accurate
			ScrollTrigger.refresh();

			// Set initial state: landing is already visible on page load, so show it immediately
			if (scrollTrigger?.isActive) {
				gsap.set(leftWrapperEl, { zIndex: 1000, pointerEvents: 'auto' });
				const initialTl = gsap.timeline();
				const helloInitTween = scrambleIn(helloEl, t($language, 'landing.hello'), 0.5);
				const introInitTween = scrambleIn(introEl, t($language, 'landing.intro'), 0.75);
				const nameInitTween = scrambleIn(nameEl, 'Vin', 0.75);
				const roleInitTween = scrambleIn(roleEl, t($language, 'landing.role'), 0.5);
				if (helloInitTween) initialTl.add(helloInitTween, 0);
				if (introInitTween) initialTl.add(introInitTween, 0);
				if (nameInitTween) initialTl.add(nameInitTween, 0.2);
				if (roleInitTween) initialTl.add(roleInitTween, 0.1);
			}
		};

		setupScroll();

		// Keep ScrollTrigger state consistent if viewport crosses md breakpoint
		mq.addEventListener('change', setupScroll);

		// Subscribe to language changes and animate or update immediately.
		let localeInitialized = false;
		let prevLocale: Locale | null = null;
		const handleLocaleChange = (locale: Locale) => {
			if (!helloEl || !introEl || !nameEl || !roleEl) return;
			if (!localeInitialized) {
				localeInitialized = true;
				prevLocale = locale;
				return;
			}
			if (locale === prevLocale) return;
			prevLocale = locale;

			// If landing summary is currently active, play scramble out -> in.
			if (scrollTrigger?.isActive) {
				gsap.killTweensOf([helloEl, introEl, nameEl, roleEl]);
				const tl = gsap.timeline();
				const helloOut = scrambleOut(helloEl, 0.4);
				const introOut = scrambleOut(introEl, 0.5);
				const nameOut = scrambleOut(nameEl, 0.4);
				const roleOut = scrambleOut(roleEl, 0.4);
				if (helloOut) tl.add(helloOut, 0);
				if (introOut) tl.add(introOut, 0);
				if (nameOut) tl.add(nameOut, 0);
				if (roleOut) tl.add(roleOut, 0);

				const helloIn = scrambleIn(helloEl, t(locale, 'landing.hello'), 0.5);
				const introIn = scrambleIn(introEl, t(locale, 'landing.intro'), 0.75);
				const nameIn = scrambleIn(nameEl, 'Vin', 0.75);
				const roleIn = scrambleIn(roleEl, t(locale, 'landing.role'), 0.5);
				if (helloIn) tl.add(helloIn, 0.1);
				if (introIn) tl.add(introIn, 0.1);
				if (nameIn) tl.add(nameIn, 0.3);
				if (roleIn) tl.add(roleIn, 0.2);
			} else {
				// Not visible — update immediately without animation.
				gsap.killTweensOf([helloEl, introEl, nameEl, roleEl]);
				helloEl.textContent = t(locale, 'landing.hello');
				introEl.textContent = t(locale, 'landing.intro');
				nameEl.textContent = 'Vin';
				roleEl.textContent = t(locale, 'landing.role');
			}
		};

		const unsubscribeLang = language.subscribe(handleLocaleChange);

		return () => {
			mq.removeEventListener('change', updateMq);
			mq.removeEventListener('change', setupScroll);
			unsubscribeLang();
			scrollTrigger?.kill();
			scrollTrigger = null;
		};
	});
</script>

<section
	id="landing"
	bind:this={sectionEl}
	class="content-section content-width mx-auto grid h-full min-h-screen grid-cols-1 p-5 sm:gap-2 md:grid-cols-2 md:gap-5 md:p-10 md:pl-0 lg:gap-10"
>
	<div
		class={`section-summary relative flex h-full min-h-[50vh] w-full justify-center self-center ${
			isFixedReady
				? ' md:fixed md:top-0 md:bottom-0 md:left-0 md:ml-8 md:h-full md:max-w-[48vw] md:justify-start'
				: 'md:ml-8 md:h-full md:max-w-[48vw] md:justify-start'
		}`}
	>
		<div
			bind:this={leftWrapperEl}
			class="flex flex-col content-center justify-center gap-5 text-left font-mono text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60 md:sticky md:top-80 md:justify-center md:gap-8"
		>
			<p bind:this={helloEl} class="block text-center text-xl md:text-left">
				{t($language, 'landing.hello')}
			</p>
			<h2 class="block text-center text-6xl font-semibold md:text-left md:text-6xl">
				<span bind:this={introEl}>{t($language, 'landing.intro')}</span>
				<span bind:this={nameEl} class="text-[#dbefec] text-shadow-lg/60 text-shadow-[#dbefec]/60"
					>Vin</span
				>
			</h2>
			<p bind:this={roleEl} class="block text-center text-xl md:text-left">
				{t($language, 'landing.role')}
			</p>
		</div>
	</div>

	<!-- <div
		class="section-content col-start-1 flex h-full flex-1 content-center gap-5 overflow-hidden text-left align-middle md:col-start-2 md:flex-col md:items-end md:justify-center"
	>
		<p
			class="block w-full max-w-full text-center text-lg font-thin text-text/90 md:max-w-110 md:text-2xl md:leading-loose"
		>
			{t($language, 'landing')}
		</p>
	</div> -->
</section>
