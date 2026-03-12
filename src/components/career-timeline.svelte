<script lang="ts">
	interface TimelineItem {
		title: string;
		description: string;
	}

	export let title: string = 'Timeline';
	export let subtitle: string = 'What is this?';
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

<!-- <style>
  @reference "../routes/+layout.css";
    /* The Vertical Line */
    .timeline-list::before {
      content: "";
      @apply absolute left-[-0.25em] top-0 bottom-0 border-l-[5px] border-[#CCC] origin-top;
      animation: scaleVertical 3s 1s ease both;
    }
  
    /* The Bottom Cap Dot */
    .timeline-list::after {
      content: "";
      @apply absolute bottom-0 left-[-1em] w-5 h-5 rounded-full bg-[#DDD] border-[5px] border-[#DDD] shadow-sm;
      animation: revealScaleUp 0.75s 2.82s ease both;
    }
  
    /* The Node Dots */
    li::before {
      content: "";
      @apply absolute top-0 left-[-1.45em] w-[30px] h-[30px] rounded-full bg-[#02aa9d] border-[5px] border-white z-10;
      animation: revealScaleUp 0.75s calc(0.8s + (var(--index) * 0.3s)) ease both;
    }
  
    .content {
      animation: revealFromLeft 0.5s calc(1s + (var(--index) * 0.3s)) ease both;
    }
  
    @keyframes revealFromLeft {
      0% { transform: translateX(-1em); opacity: 0; }
      100% { opacity: 1; transform: translateX(0); }
    }
  
    @keyframes scaleVertical {
      0% { transform: scaleY(0); }
      100% { transform: scaleY(1); }
    }
  
    @keyframes revealScaleUp {
      0% { opacity: 0; transform: scale(0.5); }
      50% { opacity: 1; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
  </style> -->
