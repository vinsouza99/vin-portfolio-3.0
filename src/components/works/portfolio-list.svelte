<script lang="ts">
	import PortfolioItem from './portfolio-item.svelte';
	import type { Work } from '$lib/models/work';
	import { works } from '$lib/db/works';
	import type { ContentProps } from '$lib/models/content-section-content-props';
	import { tick } from 'svelte';

	let { selectedItem = null, onSelect, onDeselect }: ContentProps<Work> = $props();

	const INITIAL_VISIBLE_COUNT = 3;
	const visibleWorks = $derived(works.slice(0, INITIAL_VISIBLE_COUNT));
	const remainingWorks = $derived(works.slice(INITIAL_VISIBLE_COUNT));

	let isExpanded = $state(false);
	let remainingContainer = $state<HTMLDivElement | null>(null);
	let remainingHeight = $state('0px');

	const handleClick = (work: Work) => {
		if (selectedItem?.id === work.id) {
			onDeselect?.();
		} else {
			onSelect?.(work);
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
</script>

<div class="flex">
	<!--Filter by tags -->
	<div class="w-full">
		<ul
			class="m-0 flex w-full list-none flex-row flex-nowrap items-end gap-5 overflow-visible p-5 md:flex-col md:p-0"
		>
			{#each visibleWorks as work (work.id)}
				<li
					class="m-1 w-full min-w-[70%] flex-1 justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] md:hover:translate-x-[-1%] {selectedItem?.id ===
						work.id && 'translate-x-[-1%]'}"
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
							class="m-0 flex w-full list-none flex-row flex-nowrap items-end gap-5 overflow-visible md:flex-col"
						>
							{#each remainingWorks as work (work.id)}
								<li
									class="w-full min-w-[70%] flex-1 justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] md:hover:translate-x-[-1%] {selectedItem?.id ===
										work.id && 'translate-x-[-1%]'}"
								>
									<PortfolioItem
										{work}
										isSelected={selectedItem != null && selectedItem.id === work.id}
										onClick={() => handleClick(work)}
									/>
								</li>
							{/each}
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
</div>
