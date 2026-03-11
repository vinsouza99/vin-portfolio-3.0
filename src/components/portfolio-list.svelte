<script lang="ts">
	import PortfolioItem from './portfolio-item.svelte';
	import type { Work } from '$lib/models/work';

	interface Props {
		onSelectCallback: (work: Work) => void;
	}

	// Destructure props using the $props rune
	let { onSelectCallback }: Props = $props();

	let selectedWork: Work | null = $state(null); // This will hold the currently selected work for detailed view
	const selectWork = (work: Work) => {
		selectedWork = work;
		onSelectCallback(work);
	};
</script>

<div class="flex">
	<!--Filter by tags -->
	<ul
		class="m-0 flex w-full list-none flex-row flex-nowrap gap-5 overflow-scroll p-5 md:flex-col md:p-0"
	>
		{#each works as work (work.id)}
			<li class="m-0 w-full min-w-[75%] flex-1 p-0 md:w-auto">
				<PortfolioItem
					{work}
					isSelected={selectedWork ? selectedWork.id === work.id : false}
					onClick={() => selectWork(work)}
				/>
			</li>
		{/each}
	</ul>
</div>
