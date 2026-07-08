<script lang="ts">
	import type { Job } from '$lib/models/job';
	import Tag from '../ui/tag.svelte';
	import { getLanguageContext } from '$lib/i18n';

	let language = getLanguageContext();

	interface Props {
		job: Job;
		isSelected?: boolean;
		onClick?: () => void;
	}

	let { job, isSelected = false, onClick = () => {} }: Props = $props();
</script>

<button
	title={$language === 'en' ? job.title.en : job.title.pt}
	onclick={onClick}
	class="glass-container flex h-fit min-h-50 w-full max-w-[75vw] flex-col gap-0 overflow-visible rounded-2xl! bg-bg/0 p-5 transition-colors duration-300 ease-in-out hover:cursor-pointer! hover:bg-bg/50! focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-700/50 focus:outline-none sm:max-w-[55vw]
        @lg:max-w-screen @lg:flex-row @lg:gap-1
        {isSelected
		? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
		: 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
>
	<h3 class="text-medium text-left font-mono text-primary-600 md:text-lg">
		{job.company}
	</h3>
	<div
		class="flex flex-wrap items-center gap-1 tracking-wide text-secondary-400 uppercase md:divide-x md:divide-secondary-700/50"
	>
		<span class="pr-3 text-left text-xs font-thin md:text-xs">
			{$language === 'en' ? job.title.en : job.title.pt}
		</span>
		<span class="text-left text-xs font-thin md:pl-3 md:text-xs">
			{job.location}
		</span>
	</div>
	<p class="text-left text-xs font-thin text-secondary-300/80 md:text-sm">
		{$language === 'en' ? job.shortDescription?.en : job.shortDescription?.pt}
	</p>

	<div class="mt-2 flex flex-wrap gap-2 text-left">
		{#each job.tags as tag (tag)}
			<Tag text={tag} />
		{/each}
	</div>
</button>
