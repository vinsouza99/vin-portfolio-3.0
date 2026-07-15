<script lang="ts">
	import { getLanguageContext } from '$lib/i18n';
	import type { Work } from '$lib/models/work';
	import Tag from '../ui/tag.svelte';

	interface Props {
		work: Work;
		isSelected?: boolean;
		onClick?: () => void;
	}

	let { work, isSelected = false, onClick }: Props = $props();

	let getLang = getLanguageContext();
	let language = $derived(getLang());
</script>

<div class="@container h-full w-full min-w-75! overflow-visible">
	<button
		title={language === 'en' ? work.title.en : work.title.pt}
		onclick={onClick}
		class="glass-container flex h-fit min-h-50 w-full max-w-[75vw] flex-col gap-0 overflow-visible rounded-2xl! bg-bg/0 p-0 transition-colors duration-300 ease-in-out hover:cursor-pointer! hover:bg-bg/50! focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-700/50 focus:outline-none sm:max-w-[55vw]
        @lg:max-w-screen @lg:flex-row @lg:gap-1
        {isSelected
			? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
			: 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
	>
		<div
			class="pointer-events-none relative flex h-55 items-center justify-center overflow-hidden rounded-md bg-bg @md:m-3 @md:h-55 @md:flex-1 @md:rounded-md"
		>
			{#if work.coverPath}
				<img
					src={work.coverPath}
					alt={language === 'en' ? work.title.en : work.title.pt}
					aria-hidden="true"
					class="absolute inset-0 h-full w-full object-contain object-center blur-2xl"
				/>

				<img
					src={work.coverPath}
					alt={language === 'en' ? work.title.en : work.title.pt}
					class="relative z-1 w-full object-contain object-center"
				/>
			{/if}
		</div>

		<div
			class="pointer-events-none flex flex-1 grow-2 flex-col justify-between gap-5 px-3 py-3 @md:gap-1 @md:px-2 @md:py-5"
		>
			<div class="flex justify-between">
				<h3 class="flex text-left font-mono text-lg text-primary-600">
					{language === 'en' ? work.title.en : work.title.pt}
				</h3>
				<span class="text-sm font-thin text-text/50! italic">{work.platforms?.join(', ')}</span>
			</div>
			<p
				class="truncate-text flex h-full max-h-20 grow overflow-hidden text-left text-sm font-thin text-secondary-300/80"
			>
				{language === 'en' ? work.shortDescription?.en : work.shortDescription?.pt}
			</p>
			<div class="flex flex-wrap gap-2 text-left @md:mt-2">
				{#each work.tags as tag (tag)}
					<Tag text={tag} />
				{/each}
			</div>
		</div>
	</button>
</div>

<style>
	.truncate-text {
		display: -webkit-box;
		-webkit-line-clamp: 4; /* Number of lines to show */
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
