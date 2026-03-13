<script lang="ts">
	interface TimelineItem {
		title: string;
		description: string;
	}

	export let items: TimelineItem[] = [
		{
			title: 'A timeline?',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quam felis, rutrum nec enim non, sodales facilisis purus.'
		},
		{
			title: 'A railway map?',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quam felis, rutrum nec enim non, sodales facilisis purus.'
		},
		{
			title: 'Random dots?',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quam felis, rutrum nec enim non, sodales facilisis purus.'
		},
		{
			title: 'Absolutely nothing.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quam felis, rutrum nec enim non, sodales facilisis purus.'
		}
	];
</script>

<div class="block-content min-h-screen py-8 md:h-[120vh] md:py-16">
	<div
		class="relative mx-auto flex h-full max-w-full flex-col items-center gap-5 px-4 md:justify-center md:px-8"
	>
		<ul class="timeline-list relative mx-auto flex max-w-175 list-none flex-col gap-10 p-0">
			{#each items as item, i (i)}
				<li style="--index: {i}" class="timeline-item relative pl-10 md:pl-12">
					<div class="glass-container timeline-item-content animate-revealFromLeft">
						<h3 class="mb-2 text-xl leading-tight font-black text-primary-500 md:text-4xl">
							{item.title}
						</h3>
						<p class="text-lg leading-relaxed text-primary-800 antialiased">
							{item.description}
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>