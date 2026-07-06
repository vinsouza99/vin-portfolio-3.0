<script
	lang="ts"
	generics="P extends Record<string, unknown>, DP extends Record<string, unknown>, T = unknown"
>
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import type { ContentSectionSelectionContext } from '$lib/models/content-section-context';
	import type { Component } from 'svelte';
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	interface Props<P, DP> {
		/** Section id is derived from header (lowercase, spaces to hyphens) */
		header: string;
		/** Optional explicit id for anchor navigation. */
		sectionId?: string;
		/** Default left column: plain text description. Ignored if summaryComponent is provided. */
		summary?: string;
		/** Optional: custom component for default left column (replaces header+summary when provided) */
		summaryComponent?: Component<Record<string, unknown>>;
		summaryProps?: Record<string, unknown>;
		/** Optional: when provided, right content gets selection props and left shows this when an item is selected */
		detailComponent?: Component<DP & { selectedItem: T; onDeselect?: () => void }>;
		detailProps?: DP;
		/** Right column: main content. Receives contentProps and, when detailComponent is set, selection context. */
		content: Component<P & Partial<ContentSectionSelectionContext<T>>>;
		contentProps?: Omit<P, keyof ContentSectionSelectionContext<T>>;
		/**
		 * Optional GSAP ScrollTrigger `endTrigger`.
		 * Pass another `content-section`'s section id (e.g. `#works`) so adjacent
		 * sections can coordinate their sticky-summary fade-out.
		 */
		endTrigger?: HTMLElement | string | null;
	}

	let {
		header,
		sectionId,
		summary = '',
		summaryComponent: SummaryComponent,
		summaryProps = {},
		detailComponent: DetailComponent,
		detailProps = {} as DP,
		content: ContentComponent,
		contentProps = {} as Omit<P, keyof ContentSectionSelectionContext<T>>,
		endTrigger = null
	}: Props<P, DP> = $props(); // Use the interface directly here

	let selectedItem = $state<T | unknown | null>(null);
	const onSelect = (item: unknown) => {
		selectedItem = item;
	};
	const onDeselect = () => {
		selectedItem = null;
	};

	const resolvedSectionId = $derived(sectionId ?? header.toLowerCase().replace(/\s+/g, '-'));
	const isInteractive = $derived(!!DetailComponent);

	const leftContentProps = $derived(
		isInteractive && selectedItem !== null ? { ...detailProps, selectedItem, onDeselect } : null
	);

	type LeftKind = 'detail' | 'summaryComponent' | 'default';
	type LeftTarget =
		| { kind: 'detail'; props: DP & { selectedItem: T; onDeselect?: () => void } }
		| { kind: 'summaryComponent'; props: Record<string, unknown> }
		| { kind: 'default' };

	const targetLeft = $derived<LeftTarget>(
		leftContentProps && DetailComponent
			? {
					kind: 'detail',
					props: leftContentProps as DP & { selectedItem: T; onDeselect?: () => void }
				}
			: SummaryComponent
				? { kind: 'summaryComponent', props: summaryProps }
				: { kind: 'default' }
	);

	let sectionEl: HTMLElement | null = null;
	let leftWrapperEl: HTMLDivElement | null = null; // sticky wrapper (md+)
	let leftSwapEl: HTMLDivElement | null = null; // fades on content replacement
	let headingEl = $state<HTMLHeadingElement | null>(null);
	let summaryEl = $state<HTMLParagraphElement | null>(null);
	let isFixedReady = $state(false);

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

	// Ensure only one fixed summary wrapper can receive pointer events at a time
	const enforceSingleActive = (active: HTMLElement | null) => {
		try {
			const all = document.querySelectorAll('div.section-summary.md\\:fixed');
			all.forEach((el) => {
				if (el === active) {
					(el as HTMLElement).style.pointerEvents = 'auto';
					(el as HTMLElement).style.zIndex = '1';
				} else {
					(el as HTMLElement).style.pointerEvents = 'none';
					(el as HTMLElement).style.zIndex = '-1';
				}
			});
		} catch (e) {
			// ignore in non-browser environments
			console.warn('enforceSingleActive failed', e);
		}
	};

	let isMdUp = $state(false);
	let renderedLeftKind = $state<LeftKind>('default');
	let renderedLeftProps = $state<Record<string, unknown>>({});

	let replaceTl: gsap.core.Timeline | null = null;
	let scrollTrigger: ScrollTrigger | null = null;

	const setRenderedLeft = (next: LeftTarget) => {
		renderedLeftKind = next.kind;
		renderedLeftProps =
			next.kind === 'detail' || next.kind === 'summaryComponent' ? (next.props as any) : {};
	};

	const replaceLeftWithFade = async (next: LeftTarget) => {
		if (!leftSwapEl || !isMdUp) {
			setRenderedLeft(next);
			return;
		}

		replaceTl?.kill();
		replaceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

		await new Promise<void>((resolve) => {
			replaceTl!.to(leftSwapEl, { opacity: 0, duration: 0.18, onComplete: resolve });
		});

		setRenderedLeft(next);
		await tick();

		gsap.set(leftSwapEl, { opacity: 0 });
		replaceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
		replaceTl.to(leftSwapEl, { opacity: 1, duration: 0.18 });
	};

	onMount(() => {
		setRenderedLeft(targetLeft);
		gsap.registerPlugin(ScrollTrigger);

		const mq = window.matchMedia('(min-width: 768px)');
		const updateMq = () => {
			isMdUp = mq.matches;
		};
		updateMq();
		if (!isMdUp) gsap.set(leftWrapperEl, { clearProps: 'all' });
		mq.addEventListener('change', updateMq);

		const setupScroll = () => {
			scrollTrigger?.kill();
			scrollTrigger = null;

			if (!sectionEl || !leftWrapperEl) return;
			if (!isMdUp) {
				isFixedReady = false;
				gsap.set(leftWrapperEl, { clearProps: 'all', autoAlpha: 1, pointerEvents: 'auto' });
				return;
			}

			isFixedReady = true;
			gsap.set(leftWrapperEl, {
				autoAlpha: 0,
				zIndex: -1,
				pointerEvents: 'none'
			});
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
					enforceSingleActive(leftWrapperEl);
					gsap.to(leftWrapperEl, {
						autoAlpha: 1,
						zIndex: 1,
						pointerEvents: 'auto',
						duration: 0.75,
						ease: 'power2.out'
					});
					if (renderedLeftKind === 'default') {
						gsap.killTweensOf([headingEl, summaryEl]);
						scrambleIn(headingEl, header, 0.6);
						if (summary) {
							scrambleIn(summaryEl, summary, 0.6);
						}
					}
				},
				onEnterBack: () => {
					enforceSingleActive(leftWrapperEl);
					gsap.to(leftWrapperEl, {
						autoAlpha: 1,
						zIndex: 1,
						pointerEvents: 'auto',
						duration: 0.75,
						ease: 'power2.out'
					});
					if (renderedLeftKind === 'default') {
						gsap.killTweensOf([headingEl, summaryEl]);
						scrambleIn(headingEl, header, 0.6);
						if (summary) {
							scrambleIn(summaryEl, summary, 0.6);
						}
					}
				},
				// If we're past the section enough that the sticky would have to move, fade out immediately.
				onLeave: () => {
					// hide this wrapper and ensure others are disabled as well
					enforceSingleActive(null);
					gsap.killTweensOf([headingEl, summaryEl]);
					if (renderedLeftKind === 'default') {
						scrambleOut(headingEl, 0.4);
						if (summary) {
							scrambleOut(summaryEl, 0.5);
						}
					}
					gsap.to(leftWrapperEl, {
						autoAlpha: 0,
						zIndex: -1,
						pointerEvents: 'none',
						duration: 0.75,
						ease: 'power2.out'
					});
					setTimeout(() => {
						renderedLeftKind = 'default';
					}, 750);
				},
				onLeaveBack: () => {
					// hide this wrapper and ensure others are disabled as well
					enforceSingleActive(null);
					gsap.killTweensOf([headingEl, summaryEl]);
					if (renderedLeftKind === 'default') {
						scrambleOut(headingEl, 0.4);
						if (summary) {
							scrambleOut(summaryEl, 0.5);
						}
					}
					gsap.to(leftWrapperEl, {
						autoAlpha: 0,
						zIndex: -1,
						pointerEvents: 'none',
						duration: 0.75,
						ease: 'power2.out'
					});
					setTimeout(() => {
						renderedLeftKind = 'default';
					}, 750);
				}
			});

			// Refresh ScrollTrigger to ensure trigger positions are accurate
			ScrollTrigger.refresh();
		};

		setupScroll();

		if (isMdUp) {
			gsap.to(leftWrapperEl, {
				autoAlpha: 0,
				zIndex: -1,
				pointerEvents: 'none'
			});
		}

		// Keep ScrollTrigger state consistent if viewport crosses md breakpoint
		mq.addEventListener('change', setupScroll);

		return () => {
			mq.removeEventListener('change', updateMq);
			mq.removeEventListener('change', setupScroll);
			scrollTrigger?.kill();
			scrollTrigger = null;
			replaceTl?.kill();
			replaceTl = null;
		};
	});

	// fixed wrapper visibility/z-index is handled in ScrollTrigger callbacks

	$effect(() => {
		// Run the "replace" animation when summary/detail content changes (md+ only)
		void replaceLeftWithFade(targetLeft);
	});
</script>

<section
	id={resolvedSectionId}
	bind:this={sectionEl}
	class="content-width section-content mx-auto grid grid-cols-1 overflow-visible p-5 sm:gap-2 md:mt-0 md:grid-cols-2 md:gap-5 md:p-10 lg:gap-10"
>
	<!-- Left column: summary (default) or detail (when item selected) -->
	<!-- <div
		aria-hidden="true"
		class="section-summary grid-row relative hidden h-fit w-full text-bg opacity-0 md:block md:h-full"
	>
		.
	</div> -->
	<div
		bind:this={leftWrapperEl}
		class={isFixedReady
			? 'section-summary relative h-fit w-full self-center overflow-hidden md:fixed md:top-0 md:bottom-0 md:left-0 md:ml-[5%] md:h-full md:max-w-[45vw] lg:ml-8'
			: 'section-summary relative h-fit w-full self-center overflow-hidden md:sticky md:top-0 md:ml-[5%] md:h-full md:max-w-[45vw] lg:ml-8'}
	>
		<div
			class="my-auto flex min-h-0 flex-col content-center items-center justify-center gap-5 self-center text-left md:relative md:h-screen md:items-start md:gap-8"
		>
			<div bind:this={leftSwapEl} class="">
				{#if renderedLeftKind === 'detail' && DetailComponent}
					<DetailComponent {...renderedLeftProps as any} />
				{:else if renderedLeftKind === 'summaryComponent' && SummaryComponent}
					<SummaryComponent {...renderedLeftProps as any} />
				{:else}
					<h2
						bind:this={headingEl}
						class="mb-5 block text-center font-mono text-4xl font-semibold text-wrap wrap-break-word text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60 md:text-left md:text-6xl"
					>
						{header}
					</h2>
					{#if summary}
						<p
							bind:this={summaryEl}
							class="mx-auto block max-w-[75%] px-1 text-center text-lg font-thin text-text md:mx-0 md:px-0 md:text-left md:text-xl lg:max-w-full"
						>
							{summary}
						</p>
					{/if}
				{/if}
			</div>
		</div>
	</div>

	<!-- Right column: content (optionally with selection context) -->
	<div
		class="section-content col-span-1 col-start-1 flex h-full min-h-0 w-full flex-col items-center justify-center gap-5 overflow-visible text-left text-white md:col-span-1 md:col-start-2 md:w-full md:gap-8"
	>
		{#if ContentComponent}
			<div
				class="content-component-wrapper m-0 flex h-full min-h-120 w-full flex-1 justify-center overflow-clip overflow-y-hidden p-0 md:min-h-0"
			>
				{#if isInteractive}
					<ContentComponent
						{...{
							...contentProps,
							selectedItem,
							onSelect,
							onDeselect
						} as P & Partial<ContentSectionSelectionContext<T>>}
					/>
				{:else}
					<ContentComponent {...contentProps as P} />
				{/if}
			</div>
		{:else}
			<div class="m-0 flex h-full w-full flex-col justify-center p-0"></div>
		{/if}
	</div>
</section>

<style>
	@media screen and (min-width: 768px) {
		.section-content {
			margin-bottom: 80px;
		}
	}
</style>
