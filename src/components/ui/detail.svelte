<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import Tag from './tag.svelte';

	interface Props {
		title: string;
		subtitle: string;
		startDate?: number;
		endDate?: number;
		description?: string;
		tags?: string[];
		url?: string;
	}

	const { title, subtitle, startDate, endDate, description, tags, url }: Props = $props();
</script>

<div class="flex flex-col gap-1 md:gap-5">
	<h2
		class="block font-mono text-4xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
	>
		{title}
	</h2>
	{#if subtitle || startDate || endDate}
		<div class="flex justify-between">
			{#if subtitle}
				<p class="flex items-center gap-1 text-secondary-400">
					{subtitle}
				</p>
			{/if}
			<p class="text-left text-xs font-thin text-secondary-300/80 md:text-sm">
				{#if startDate && endDate}
					{startDate} - {endDate}
				{:else if startDate}
					{startDate}
				{/if}
			</p>
		</div>
	{/if}
	{#if url}
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			class="text-left text-sm font-thin text-secondary-300 md:text-lg">{url}</a
		>
	{/if}
	<p class="text-left text-xs font-thin text-text md:text-lg">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html description}
	</p>

	<div class="mt-2 flex flex-wrap gap-2 text-left">
		{#each tags as tag, i (i)}
			<Tag text={tag} />
		{/each}
	</div>
</div>
