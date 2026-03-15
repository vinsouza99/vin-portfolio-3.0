<script lang="ts">
	import type { Edu } from '$lib/models/edu';
	import { BookCheck, GraduationCap } from 'lucide-svelte';

	interface Props {
		edu: Edu;
		isSelected?: boolean;
		onClick?: () => void;
	}

	// Destructure props using the $props rune
	let { edu, isSelected = false, onClick }: Props = $props();
</script>

<button
	title={edu.title}
	class="glass-container flex h-fit w-full flex-row gap-0 overflow-hidden rounded-2xl! bg-bg/0 p-0 transition-colors duration-300 ease-in-out hover:cursor-pointer! hover:bg-bg/50! focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-700/50 focus:outline-none data-[selected=true]:border-secondary-700/50 data-[selected=true]:bg-secondary-500/20 data-[selected=true]:text-secondary-100
        {isSelected
		? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
		: 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
	onclick={onClick}
>
	<div
		class="rounded-0 pointer-events-none hidden w-fit content-center overflow-hidden p-1 md:m-3 md:mr-0 md:block md:h-auto md:rounded-md"
	>
		<div class="flex content-center items-center rounded-full border-5 border-primary-500 p-4">
			{#if edu.type === 'degree'}
				<GraduationCap class="size-12 text-primary-500" />
			{:else}
				<BookCheck class="size-12 text-primary-500" />
			{/if}
		</div>
		<!-- <img
			src="/images/type-education.svg"
			alt={edu.title}
			class="size-20 object-cover object-center mix-blend-screen"
		/> -->
	</div>
	<div class="pointer-events-none flex flex-1 grow-2 flex-col justify-start gap-1 p-5">
		<h3 class="text-medium text-left font-mono text-primary-600 md:text-lg">{edu.title}</h3>
		<div class="justify-left flex flex-nowrap items-center gap-2 text-secondary-400/80">
			<span class="flex text-left text-xs font-thin md:text-sm">{edu.institution}</span>
			<span>-</span>
			<span class="flex text-left text-xs font-thin md:text-sm">{edu.location}</span>
		</div>
		<p class="text-left text-xs font-thin text-secondary-300 md:text-sm">{edu.shortDescription}</p>
		<div class="mt-2 flex flex-wrap gap-2 text-left">
			{#each edu.tags as tag, i (i)}
				<span
					class="inline-block rounded-full bg-secondary-500/20 px-2 py-1 text-xs font-thin text-secondary-300/80"
					>{tag}</span
				>
			{/each}
		</div>
	</div>
</button>
