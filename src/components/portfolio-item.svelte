<script lang="ts">
	import type { Work } from '$lib/models/work';

	interface Props {
		work: Work;
		isSelected?: boolean;
		onClick?: () => void;
	}

	// Destructure props using the $props rune
	let { work, isSelected = false, onClick }: Props = $props();
</script>

<div class="@container w-full">
	<button
		title={work.title}
		onclick={onClick}
		class="glass-container flex h-fit min-h-50 w-full max-w-[65vw] flex-col gap-0 overflow-hidden rounded-2xl! bg-bg/0 p-0 transition-colors duration-300 ease-in-out hover:cursor-pointer! hover:bg-bg/50! focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-700/50 focus:outline-none
        @lg:max-w-screen @lg:flex-row @lg:gap-1
        {isSelected
			? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
			: 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
	>
		<div
			class="rounded-0 pointer-events-none relative flex h-50! items-center justify-center overflow-hidden bg-bg @md:m-3 @md:h-auto @md:flex-1 @md:rounded-md"
		>
			{#if work.coverPath}
				<img
					src={work.coverPath}
					alt=""
					aria-hidden="true"
					class="absolute inset-0 h-full w-full object-cover blur-2xl"
				/>

				<img
					src={work.coverPath}
					alt={work.title}
					class="relative z-1 w-full object-contain object-center"
				/>
			{/if}
		</div>

		<div
			class="pointer-events-none flex flex-1 grow-2 flex-col justify-start gap-5 px-3 py-3 @md:gap-1 @md:px-2 @md:py-5"
		>
			<h3 class="flex text-left font-mono text-lg text-primary-600">{work.title}</h3>
			<p
				class="flex h-full max-h-20 grow overflow-hidden text-left text-sm font-thin text-ellipsis text-secondary-300/80 @md:max-h-full"
			>
				{work.shortDescription}
			</p>
			<div class="flex flex-wrap gap-2 text-left @md:mt-2">
				{#each work.tags as tag (tag)}
					<span
						class="inline-block rounded-full bg-secondary-500/20 px-2 py-1 text-xs font-thin text-secondary-300/80"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</button>
</div>
