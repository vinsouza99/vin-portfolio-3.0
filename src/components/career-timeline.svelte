<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { type Job } from '$lib/models/job';
	import JobItem from './job-item.svelte';
	import type { ContentProps } from '$lib/models/content-section-content-props';
	import { jobs } from '$lib/db/jobs';
	import { isSmallScreen } from '$lib/hooks/is-small-screen';

	gsap.registerPlugin(ScrollTrigger);

	let { selectedItem = null, onSelect, onDeselect }: ContentProps<Job> = $props();

	const PRIMARY_500 = '#6afff5';
	const SECONDARY_900 = '#003052';

	let containerEl: HTMLDivElement;
	let lineSkeletonEl: HTMLDivElement;
	let lineProgressEl: HTMLDivElement;
	let yearsEls: HTMLSpanElement[] = [];
	let stopEls: HTMLDivElement[] = [];
	let itemEls: HTMLDivElement[] = [];

	let maxProgress = 0;

	onMount(() => {
		if (!containerEl || !lineProgressEl || !lineSkeletonEl) return;

		// Progress line: fill height = how far the viewport center has moved through the timeline.
		// So when a dot's top reaches center, the progress line exactly meets that dot.
		const progressTween = gsap.fromTo(
			lineProgressEl,
			{ scaleY: 0 },
			{
				scaleY: 1.195,
				ease: 'none',
				duration: 2,
				paused: true
			}
		);

		ScrollTrigger.create({
			trigger: containerEl,
			start: 'top bottom',
			end: 'bottom center-=50%',
			onUpdate: () => {
				const rect = containerEl.getBoundingClientRect();
				const viewportCenter = window.innerHeight / 2;
				const timelineHeight = rect.height;
				// Progress 0 when center is at timeline top, 1 when center is at timeline bottom
				let progress = timelineHeight > 0 ? (viewportCenter - rect.top) / timelineHeight : 0;
				progress = Math.max(0, Math.min(1, progress));
				maxProgress = Math.max(maxProgress, progress);
				progressTween.progress(maxProgress);
			}
		});

		// Desktop (md+): trigger when element's top hits viewport center. Mobile: trigger earlier.
		const mm = gsap.matchMedia();
		mm.add(
			'(min-width: 768px)',
			() => {
				// Stops (dots): trigger at viewport center on desktop
				stopEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						borderColor: SECONDARY_900,
						backgroundColor: '#001221',
						scale: 1
					});
					gsap.fromTo(
						el,
						{},
						{
							borderColor: PRIMARY_500,
							backgroundColor: '#001221',
							scale: 1,
							opacity: 1,
							duration: 0.5,
							ease: 'back.out(1.2)',
							scrollTrigger: {
								trigger: el,
								start: 'top center',
								toggleActions: 'play none none none'
							}
						}
					);
				});

				// Timeline items: trigger at viewport center on desktop
				itemEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						opacity: 0,
						rotateX: -22,
						transformOrigin: 'left center'
					});
					gsap.to(el, {
						opacity: 1,
						rotateX: 0,
						duration: 0.6,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top center',
							toggleActions: 'play none none none'
						}
					});
				});

				// Year text: SECONDARY_900 / 100 by default → PRIMARY_500 / 300 when top hits center
				yearsEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, { color: SECONDARY_900, fontWeight: 100 });
					gsap.to(el, {
						color: PRIMARY_500,
						fontWeight: 300,
						duration: 0.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top center',
							toggleActions: 'play none none none'
						}
					});
				});
			},
			containerEl
		);
		mm.add(
			'(max-width: 767px)',
			() => {
				stopEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						borderColor: SECONDARY_900,
						backgroundColor: '#001221',
						scale: 1
					});
					gsap.fromTo(
						el,
						{},
						{
							borderColor: PRIMARY_500,
							backgroundColor: '#001221',
							scale: 1,
							opacity: 1,
							duration: 0.5,
							ease: 'back.out(1.2)',
							scrollTrigger: {
								trigger: el,
								start: 'top 85%',
								toggleActions: 'play none none none'
							}
						}
					);
				});
				itemEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						opacity: 0.5,
						rotateX: -22,
						transformOrigin: 'left center'
					});
					gsap.to(el, {
						opacity: 1,
						rotateX: 0,
						duration: 0.6,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top center',
							toggleActions: 'play none none none'
						}
					});
				});
				// Year text: SECONDARY_900 / 100 by default → PRIMARY_500 / 300 when top hits 85%
				yearsEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, { color: SECONDARY_900, fontWeight: 100 });
					gsap.to(el, {
						color: PRIMARY_500,
						fontWeight: 300,
						duration: 0.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 85%',
							toggleActions: 'play none none none'
						}
					});
				});
			},
			containerEl
		);

		return () => {
			mm.revert();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
	const handleClick = (job: Job) => {
		if (selectedItem?.id === job.id) {
			onDeselect?.();
		} else {
			onSelect?.(job);
		}
	};
</script>

<div class="md:min-h-[120vh] md:py-20">
	<div
		class="career-timeline block-content min-h-screen py-8 md:py-16"
		bind:this={containerEl}
		style="--row-count: {$isSmallScreen ? jobs.length : jobs.length + 2}"
	>
		<div
			class="career-timeline__grid mx-auto grid max-w-full grid-cols-[auto_1fr] grid-rows-[repeat(var(--row-count),1fr)] gap-x-4 gap-y-10 px-0 md:max-w-4xl md:gap-x-6 md:gap-y-20 md:px-8"
		>
			<!-- Full-height skeleton line (column 1, all rows) -->
			<div
				class="career-timeline__line-skeleton col-start-1 w-2 justify-self-center rounded-full md:mb-10 md:justify-self-center"
				style="background-color: {SECONDARY_900}; grid-row: 1 / -2;"
				bind:this={lineSkeletonEl}
				aria-hidden="true"
			></div>
			<!-- Full-height progress line (same span, scales on scroll) -->
			<div
				class="career-timeline__line-progress col-start-1 mt-1 h-full w-2.5 origin-top justify-self-center rounded-full md:mb-10 md:justify-self-center"
				style="background-color: {PRIMARY_500}; grid-row: 1 / -2;"
				bind:this={lineProgressEl}
				aria-hidden="true"
			></div>
			{#each jobs as item, i (i)}
				<!-- Stop dot (left column, same row as item) -->
				<div
					class="career-timeline__stop z-10 col-start-1 size-8 justify-self-center rounded-full border-8 border-solid bg-bg md:justify-self-end"
					style="grid-row: {i + 1};"
					bind:this={stopEls[i]}
					aria-hidden="true"
				></div>
				<!-- Item content (right column) -->
				<div
					class="col-start-2 flex flex-col items-start gap-1 md:gap-3"
					style="grid-row: {i + 1};"
				>
					<span class="career-timeline__years font-mono text-3xl" bind:this={yearsEls[i]}
						>{item.startYear}{item.endYear
							? ` - ${item.endYear == Infinity ? 'present' : item.endYear}`
							: ''}</span
					>
					<div class="career-timeline__item-content" bind:this={itemEls[i]}>
						<JobItem
							job={item}
							isSelected={selectedItem != null && selectedItem.id === item.id}
							onClick={() => handleClick(item)}
						/>
					</div>
				</div>
			{/each}
			{#if !$isSmallScreen}
				<div class="flex w-full bg-bg text-bg select-none">.</div>
				<div class="flex w-full bg-bg text-bg select-none">.</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.career-timeline__grid {
		--row-count: 4;
	}
	/* Line elements sit behind stops; align in center of first column */
	.career-timeline__line-skeleton,
	.career-timeline__line-progress {
		align-self: stretch;
	}
	/* Perspective for flip animation */
	.career-timeline__item-content {
		perspective: 60rem;
	}
	.career-timeline__line-skeleton,
	.career-timeline__line-progress {
		height: calc(100% + 4rem + var(--spacing) * 10);
	}
	/* Year text default state (GSAP animates to primary when at center) */
	.career-timeline__years {
		color: var(--color-secondary-900);
		font-weight: 100;
	}
</style>
