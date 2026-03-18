<script lang="ts">
	import { ExternalLink, Link } from 'lucide-svelte';
	/* eslint-disable svelte/no-navigation-without-resolve */
	import Tag from './tag.svelte';

	interface Props {
		title: string;
		subtitleParts: string[];
		description?: string;
		tags?: string[];
		url?: string;
		urlLabel?: string;
	}

	const { title, subtitleParts, description, tags, url, urlLabel }: Props = $props();
</script>

<div class="flex flex-col gap-1 md:gap-5">
	<h2
		class="block font-mono text-4xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
	>
		{title}
	</h2>
	{#if subtitleParts}
		<div
			class="flex flex-wrap justify-start gap-3 divide-x divide-secondary-700/50 tracking-widest uppercase"
		>
			{#each subtitleParts as part, i (i)}
				<span class="pr-3 text-sm font-thin text-secondary-400">
					{part}
				</span>
			{/each}
		</div>
	{/if}
	{#if url}
		<div
			class="flex cursor-pointer items-center gap-3 text-left text-sm font-thin tracking-widest text-secondary-300 hover:text-primary-500 hover:text-shadow-sm/60 hover:text-shadow-primary-800/60 md:text-sm"
		>
			<Link size={18} />
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-1 text-left text-sm font-thin md:text-lg"
				>{urlLabel ?? url}
				<ExternalLink
					class="opacity-0 transition-opacity ease-in-out group-hover:opacity-1"
					size={15}
				/></a
			>
		</div>
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
