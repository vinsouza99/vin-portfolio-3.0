<script lang="ts">
	import type { Job } from '$lib/models/job';
	import Tag from './ui/tag.svelte';

	interface Props {
		job: Job;
		isSelected?: boolean;
		onClick?: () => void;
	}

	let { job, isSelected = false, onClick = () => {} }: Props = $props();
</script>

<button
	title={job.title}
	onclick={onClick}
	class="glass-container flex flex-1 grow-2 flex-col justify-start gap-1 rounded-2xl p-5 {isSelected
		? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
		: 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
>
	<h3 class="text-medium text-left font-mono text-primary-600 md:text-lg">
		{job.company}
	</h3>
	<div class="flex items-center gap-1 text-secondary-400">
		<span class="text-left text-xs font-thin md:text-sm">
			{job.title}
		</span>
		<span>-</span>
		<span class="text-left text-xs font-thin md:text-sm">
			{job.location}
		</span>
	</div>
	<p class="text-left text-xs font-thin text-secondary-300/80 md:text-sm">
		{job.shortDescription}
	</p>

	<div class="mt-2 flex flex-wrap gap-2 text-left">
		{#each job.tags as tag (tag)}
			<Tag text={tag} />
		{/each}
	</div>
</button>
