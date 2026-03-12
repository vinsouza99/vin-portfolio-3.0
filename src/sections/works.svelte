<script lang="ts">
	import PortfolioList from '../components/portfolio-list.svelte';
	import { type Work } from '../lib/models/work';
	let selectedWork: Work | null = $state(null);
	const selectWork = (work: Work) => {
		if (selectedWork && selectedWork.id == work.id) {
			selectedWork = null;
		} else {
			selectedWork = work;
		}
	};
</script>

<section
	id="works"
	class="content-section grid h-full min-h-screen grid-cols-1 sm:gap-2 md:grid-cols-2 md:gap-5 lg:gap-10"
>
	<div class="section-summary relative h-full w-full">
		<div
			class="flex flex-col content-center justify-center gap-5 text-left md:sticky md:top-80 md:gap-8"
		>
			<h2
				class="block font-mono text-6xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
			>
				{#if selectedWork}
					selectedWork.title
				{:else}
					works
				{/if}
			</h2>
			<p class=" block text-xl font-thin text-text">
				{#if selectedWork}
					selectedWork.longDescription
				{:else}
					The thing that drew me towards web development in the first place was the process itself.
					It is fun despite all the work required to pull something cool off. During my work
					experiences and studies, both formal and self-conducted, I've built many things I'm proud
					of. Here are some of them!
				{/if}
			</p>
		</div>
	</div>
	<div
		class="section-content h-full w-full flex-col items-center justify-center gap-5 text-left text-white"
	>
		<PortfolioList onSelectCallback={selectWork} />
	</div>
</section>
