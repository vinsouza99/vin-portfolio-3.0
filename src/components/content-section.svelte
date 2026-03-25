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

	const sectionId = $derived(header.toLowerCase().replace(/\s+/g, '-'));
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
		mq.addEventListener('change', updateMq);

		const setupScroll = () => {
			scrollTrigger?.kill();
			scrollTrigger = null;

			if (!sectionEl || !leftWrapperEl) return;
			if (!isMdUp) {
				gsap.set(leftWrapperEl, { clearProps: 'opacity' });
				return;
			}

			gsap.set(leftWrapperEl, { autoAlpha: 0 });
			scrollTrigger = ScrollTrigger.create({
				trigger: sectionEl,
				// Only show this section's summary while the viewport center is within range.
				// This prevents two adjacent sections from both showing their sticky summary at once.
				start: 'top center-=5%',
				endTrigger: endTrigger || undefined,
				// When `endTrigger` is another section, fade out when that other section's
				// top crosses the viewport center (instead of this section's bottom).
				end: endTrigger ? 'top bottom+=10px' : 'bottom center-=10%',
				onEnter: () => gsap.to(leftWrapperEl, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }),
				onEnterBack: () =>
					gsap.to(leftWrapperEl, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }),
				// If we're past the section enough that the sticky would have to move, fade out immediately.
				onLeave: () => gsap.to(leftWrapperEl, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }),
				onLeaveBack: () =>
					gsap.to(leftWrapperEl, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
			});
		};

		setupScroll();

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

	$effect(() => {
		// Run the "replace" animation when summary/detail content changes (md+ only)
		void replaceLeftWithFade(targetLeft);
	});
</script>

<section
	id={sectionId}
	bind:this={sectionEl}
	class="content-width content-section mx-auto grid grid-cols-1 overflow-visible p-5 sm:gap-2 md:grid-cols-2 md:gap-5 md:p-10 lg:gap-10"
>
	<!-- Left column: summary (default) or detail (when item selected) -->
	<div class="section-summary relative h-fit w-full md:h-full">
		<div
			bind:this={leftWrapperEl}
			class="flex flex-col gap-5 text-left md:sticky md:top-1/2 md:-translate-y-1/2 md:gap-8"
		>
			<div bind:this={leftSwapEl}>
				{#if renderedLeftKind === 'detail' && DetailComponent}
					<DetailComponent {...renderedLeftProps as any} />
				{:else if renderedLeftKind === 'summaryComponent' && SummaryComponent}
					<SummaryComponent {...renderedLeftProps as any} />
				{:else}
					<h2
						class="block font-mono text-6xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
					>
						{header}
					</h2>
					{#if summary}
						<p class="block text-xl font-thin text-text">
							{summary}
						</p>
					{/if}
				{/if}
			</div>
		</div>
	</div>

	<!-- Right column: content (optionally with selection context) -->
	<div
		class="section-content flex h-full min-h-0 w-full flex-col items-center justify-center gap-5 overflow-visible text-left text-white md:w-full"
	>
		{#if ContentComponent}
			<div class="m-0 flex min-h-0 w-full flex-1 flex-col justify-center overflow-visible p-0">
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
			<div class="glass-container m-0 flex h-full w-full flex-col justify-center p-0">
				Placeholder
			</div>
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
