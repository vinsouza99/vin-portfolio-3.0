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

<div class="w-full @container"> 
    <button
        title={work.title}
        onclick={onClick}
        class="glass-container flex h-fit min-h-50 w-full max-w-[65vw] flex-col gap-0 overflow-hidden rounded-2xl! bg-bg/0 p-0 transition-colors duration-300 ease-in-out hover:cursor-pointer! hover:bg-bg/50! focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-700/50 focus:outline-none 
        @lg:flex-row @lg:max-w-screen @lg:gap-1
        {isSelected
            ? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
            : 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
    >
        <div
        class="relative flex h-50! items-center justify-center overflow-hidden rounded-0 bg-bg @md:m-3 @md:h-auto @md:flex-1 @md:rounded-md pointer-events-none"
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

        <div class="pointer-events-none flex flex-1 grow-2 flex-col  justify-start gap-1 px-2 py-5">
            <h3 class="text-left font-mono text-lg text-primary-600 flex">{work.title}</h3>
            <p class="text-left text-sm font-thin text-secondary-300/80 flex h-full max-h-10 grow overflow-hidden text-ellipsis">{work.shortDescription}</p>
            <div class="@md:mt-2 flex flex-wrap gap-2 text-left">
                {#each work.tags as tag (tag)}
                    <span class="inline-block rounded-full bg-secondary-500/20 px-2 py-1 text-xs font-thin text-secondary-300/80">
                        {tag}
                    </span>
                {/each}
            </div>
        </div>
    </button>
</div>
