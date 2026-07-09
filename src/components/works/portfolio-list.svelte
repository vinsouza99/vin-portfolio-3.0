<script lang="ts">
	import PortfolioItem from './portfolio-item.svelte';
	import type { Work } from '$lib/models/work';
	import { works } from '$lib/db/works';
	import type { ContentProps } from '$lib/models/content-section-content-props';
	import { onMount, tick } from 'svelte';
	import { isSmallScreen } from '$lib/hooks/is-small-screen';

	let { selectedItem = null, onSelect, onDeselect }: ContentProps<Work> = $props();

	const INITIAL_VISIBLE_COUNT = 10;
	const visibleWorks = $derived(works.slice(0, INITIAL_VISIBLE_COUNT));
	const remainingWorks = $derived(works.slice(INITIAL_VISIBLE_COUNT));

	let isMdUp = $state(false);
	let isExpanded = $state(true);
	let remainingContainer = $state<HTMLDivElement | null>(null);
	let remainingHeight = $state('0px');
	let section = $state<HTMLElement | null>(null);

	const handleClick = (work: Work) => {
		if (selectedItem?.id === work.id) {
			onDeselect?.();
		} else {
			onSelect?.(work);
		}
		if (section && $isSmallScreen) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const toggleExpanded = async () => {
		if (!remainingContainer || remainingWorks.length === 0) return;

		if (isExpanded) {
			// If we're currently at "auto", lock to px first so we can animate to 0.
			remainingHeight = `${remainingContainer.scrollHeight}px`;
			await tick();
			remainingHeight = '0px';
			isExpanded = false;
			return;
		}

		isExpanded = true;
		await tick();
		remainingHeight = `${remainingContainer.scrollHeight}px`;
	};

	const handleRemainingTransitionEnd = () => {
		if (!remainingContainer) return;
		if (isExpanded) remainingHeight = 'auto';
	};

	onMount(() => {
		section = document.getElementById('works');
		const mq = window.matchMedia('(min-width: 768px)');
		const updateMq = () => {
			isMdUp = mq.matches;

			if (isMdUp) {
				isExpanded = false;
				remainingHeight = '0px';
			} else {
				isExpanded = true;
				remainingHeight = 'auto';
			}
		};
		updateMq();
		mq.addEventListener('change', updateMq);
		return () => {
			mq.removeEventListener('change', updateMq);
		};
	});
</script>

<div class="relative flex w-full overflow-auto">
	<div class=" custom-scrollbar h-full w-full overflow-x-auto">
		<ul
			class="m-0 flex h-full w-full list-none flex-row flex-nowrap items-end justify-start gap-1 overflow-visible p-5 md:flex-col md:gap-5 md:p-2 xl:gap-0"
		>
			{#if !isMdUp}
				<li
					class="h-full! w-[25vw] flex-1 self-stretch justify-self-end overflow-visible p-0 md:m-2"
				></li>
			{/if}
			{#each visibleWorks as work (work.id)}
				<li
					class="ml-2 h-full! w-full flex-1 self-stretch justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] lg:hover:translate-x-[-1%] {selectedItem?.id ===
						work.id && 'lg:translate-x-[-1%]'}"
				>
					<PortfolioItem
						{work}
						isSelected={selectedItem != null && selectedItem.id === work.id}
						onClick={() => handleClick(work)}
					/>
				</li>
			{/each}

			{#if remainingWorks.length > 0}
				<li class="w-full flex-1 overflow-visible p-0">
					<div
						bind:this={remainingContainer}
						class={`${isExpanded ? 'overflow-hidden' : 'overflow-hidden'} transition-[height] duration-500 ease-in-out motion-reduce:transition-none`}
						style="height: {isExpanded ? remainingHeight : '0px'};"
						ontransitionend={handleRemainingTransitionEnd}
						aria-hidden={!isExpanded}
					>
						<ul
							class="m-0 flex w-full list-none flex-row flex-nowrap items-end gap-1 overflow-visible md:flex-col"
						>
							{#each remainingWorks as work (work.id)}
								<li
									class="ml-2 h-full! w-full flex-1 self-stretch justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] lg:hover:translate-x-[-1%] {selectedItem?.id ===
										work.id && 'lg:translate-x-[-1%]'}"
								>
									<PortfolioItem
										{work}
										isSelected={selectedItem != null && selectedItem.id === work.id}
										onClick={() => handleClick(work)}
									/>
								</li>
							{/each}
							{#if !isMdUp}
								<li
									class="ml-2 h-full! w-[25vw] flex-1 self-stretch justify-self-end overflow-visible p-0"
								></li>
							{/if}
						</ul>
					</div>
					{#if !isExpanded}
						<div class="mt-4 flex w-full justify-center md:justify-start">
							<button
								type="button"
								class="w-full cursor-pointer rounded-md px-4 py-2 font-mono text-sm tracking-wider text-secondary-400/50 uppercase transition hover:text-primary-500 focus:ring-2 focus:ring-secondary-400/50 focus:outline-none"
								aria-expanded={isExpanded}
								onclick={toggleExpanded}
							>
								show more
							</button>
						</div>
					{/if}
				</li>
			{/if}
		</ul>
	</div>
	<!-- <div
		class="pointer-events-none absolute top-0 right-0 bottom-0 w-50 bg-linear-to-r from-transparent to-bg md:hidden"
	></div> -->
</div>
