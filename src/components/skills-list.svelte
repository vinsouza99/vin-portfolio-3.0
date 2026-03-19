<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { skills } from '$lib/db/skills';

	// Props for the skills list
	const tags = ['all', 'frontend', 'backend', 'devops', 'languages'];
	let selectedTag = $state('all');

	let filteredSkills = $state(skills); // This will hold the filtered list of skills based on search input
	const filterSkills = (query: string) => {
		const lowerQuery = query.toLowerCase();
		return skills.filter(
			(skill) =>
				skill.name.toLowerCase().includes(lowerQuery) ||
				skill.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
		);
	};
	const filterByTag = (tag: string) => {
		if (tag === 'all') {
			filteredSkills = skills;
		} else {
			filteredSkills = skills.filter((skill) => skill.tags?.includes(tag));
		}
		selectedTag = tag;
	};
</script>

<div class="flex flex-col gap-5 overflow-visible">
	<!--Filter by tags -->
	<div class="flex flex-wrap gap-3 overflow-visible">
		{#each tags as tag (tag)}
			<button
				class="cursor-pointer rounded-xl border px-5 py-2 text-sm font-thin tracking-widest transition-colors duration-200 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:outline-none
        {selectedTag === tag
					? 'bg-glow-sm border-primary-700/50 bg-primary-800 text-white'
					: 'border-secondary-300/10 bg-transparent text-secondary-300/50 hover:bg-secondary-500/10 hover:text-secondary-100'}"
				onclick={() => filterByTag(tag)}
			>
				<span class="select-none">{tag}</span>
			</button>
		{/each}
	</div>
	<div class="flex flex-col">
		<Label for="search" class="sr-only mb-2 block">Search</Label>
		<Input
			id="search"
			type="text"
			placeholder="filter"
			class="m-0! ml-2 rounded-2xl border border-secondary-300/10 bg-secondary-700/10 px-10 py-3 text-sm text-text placeholder:font-thin placeholder:text-secondary-200/50 focus:border-secondary-500 focus:outline-none"
			oninput={(e) => {
				if (e && e.target instanceof HTMLInputElement) {
					const query = e.target.value;
					filteredSkills = filterSkills(query);
				}
			}}
		>
			{#snippet left()}
				<SearchOutline class="h-5 w-5 text-secondary-300/50" />
			{/snippet}
		</Input>
	</div>

	<div class="glass-container glowing-shadow min-h-[55vh] rounded-2xl p-10">
		{#if filteredSkills.length === 0}
			<p
				class="block h-full w-full content-center self-center text-center text-lg font-thin text-text/50"
			>
				I haven't learned that yet!
			</p>
		{:else}
			<ul
				class="grid-rows-auto m-0 grid list-none grid-cols-4 items-start justify-start gap-5 lg:grid-cols-6"
			>
				{#each filteredSkills as skill (skill.name)}
					<li
						class="flex aspect-square! grow flex-col items-center justify-center gap-1 transition-all ease-in-out md:max-w-20"
						title={skill.name}
					>
						<div
							class="aspect-square! w-full max-w-15 object-contain transition-all ease-in-out md:max-w-15"
						>
							<img
								src={skill.iconPath}
								alt={skill.name}
								class="aspect-square! w-full max-w-15 object-contain md:max-w-15"
							/>
						</div>
						<span class="text-sm font-thin text-secondary-300/50">{skill.name}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
