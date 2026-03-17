<script
	lang="ts"
	generics="P extends Record<string, unknown>, DP extends Record<string, unknown>, T = unknown"
>
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import type { ContentSectionSelectionContext } from '$lib/models/content-section-context';
	import type { Component } from 'svelte';

	interface Props<P, DP> {
		/** Section id is derived from header (lowercase, spaces to hyphens) */
		header: string;
		/** Default left column: plain text description. Ignored if summaryComponent is provided. */
		summary?: string;
		/** Optional: custom component for default left column (replaces header+summary when provided) */
		summaryComponent?: Component<Record<string, unknown>>;
		summaryProps?: Record<string, unknown>;
		/** Optional: when provided, right content gets selection props and left shows this when an item is selected */
		detailComponent?: Component<DP & { selectedItem: T; onDeselect?: () => void }>;
		detailProps?: DP;
		/** Right column: main content. Receives contentProps and, when detailComponent is set, selection context. */
		content: Component<P & Partial<ContentSectionSelectionContext<T>>>;
		contentProps?: Omit<P, keyof ContentSectionSelectionContext<T>>;
	}

	let {
		header,
		summary = '',
		summaryComponent: SummaryComponent,
		summaryProps = {},
		detailComponent: DetailComponent,
		detailProps = {} as DP,
		content: ContentComponent,
		contentProps = {} as Omit<P, keyof ContentSectionSelectionContext<T>>
	}: Props<P, DP> = $props(); // Use the interface directly here

	let selectedItem = $state<T | unknown | null>(null);
	const onSelect = (item: unknown) => {
		selectedItem = item;
	};
	const onDeselect = () => {
		selectedItem = null;
	};

	const sectionId = $derived(header.toLowerCase().replace(/\s+/g, '-'));
	const isInteractive = $derived(!!DetailComponent);

	const leftContentProps = $derived(
		isInteractive && selectedItem !== null ? { ...detailProps, selectedItem, onDeselect } : null
	);
</script>

<section
	id={sectionId}
	class="content-width content-section mx-auto grid h-full grid-cols-1 overflow-visible p-5 sm:gap-2 md:min-h-screen md:grid-cols-2 md:gap-5 md:p-10 lg:gap-10"
>
	<!-- Left column: summary (default) or detail (when item selected) -->
	<div class="section-summary relative h-fit w-full md:h-full">
		<div class="flex flex-col gap-5 text-left md:sticky md:top-70 md:gap-8">
			{#if leftContentProps && DetailComponent}
				<DetailComponent {...leftContentProps as any} />
			{:else if SummaryComponent}
				<SummaryComponent {...summaryProps} />
			{:else}
				<h2
					class="block font-mono text-6xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
				>
					{header}
				</h2>
				{#if summary}
					<p class="block text-xl font-thin text-text">
						{summary}
					</p>
				{/if}
			{/if}
		</div>
	</div>

	<!-- Right column: content (optionally with selection context) -->
	<div
		class="section-content flex h-full min-h-0 w-full flex-col items-center justify-center gap-5 overflow-visible text-left text-white md:w-full"
	>
		{#if ContentComponent}
			<div class="m-0 flex min-h-0 w-full flex-1 flex-col justify-center overflow-auto p-0">
				{#if isInteractive}
					<ContentComponent
						{...{
							...contentProps,
							selectedItem,
							onSelect,
							onDeselect
						} as P & Partial<ContentSectionSelectionContext<T>>}
					/>
				{:else}
					<ContentComponent {...contentProps as P} />
				{/if}
			</div>
		{:else}
			<div class="glass-container m-0 flex h-full w-full flex-col justify-center p-0">
				Placeholder
			</div>
		{/if}
	</div>
</section>
