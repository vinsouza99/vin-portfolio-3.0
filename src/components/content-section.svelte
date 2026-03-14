<script lang="ts" generics="P extends Record<string, unknown>">
	import type { Component } from 'svelte';

	interface Props {
		header: string;
		summary: string;
		content?: Component<P>;
		contentProps?: P;
	}

	// Destructure props using the $props rune
	let { header, summary, content: ContentComponent, contentProps }: Props = $props();
</script>

<section
	id={header.toLowerCase().replace(/\s+/g, '-')}
	class="content-width content-section mx-auto grid h-full grid-cols-1 overflow-visible p-5 sm:gap-2 md:min-h-screen md:grid-cols-2 md:gap-5 md:p-10 lg:gap-10"
>
	<div class="section-summary relative h-fit w-full md:h-full">
		<div class="flex flex-col gap-5 text-left md:sticky md:top-70 md:gap-8">
			<h2
				class="block font-mono text-6xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
			>
				{header}
			</h2>
			<p class=" block text-xl font-thin text-text">
				{summary}
			</p>
		</div>
	</div>
	<div
		class="section-content h-full w-full flex-col items-center justify-center gap-5 text-left text-white"
	>
		{#if ContentComponent && ContentComponent !== null && ContentComponent !== undefined && contentProps !== null && contentProps !== undefined}
			<div class="m-0 flex h-full w-full flex-col justify-center p-0">
				<ContentComponent {...contentProps} />
			</div>
		{:else}
			<!-- Optionally render a placeholder or nothing if content is not provided -->
			<div class="glass-container m-0 flex h-full w-full flex-col justify-center p-0">
				Placeholder
			</div>
		{/if}
	</div>
</section>
