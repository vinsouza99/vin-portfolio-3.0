<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';

	interface Skill {
		name: string;
		iconPath: string;
		tags?: string[]; // Optional tags for categorization
	}

	// Props for the skills list
	let skills: Skill[] = [
		{ name: 'HTML', iconPath: '/images/html.svg', tags: ['frontend', 'languages'] },
		{ name: 'CSS', iconPath: '/images/css.svg', tags: ['frontend', 'languages'] },
		{ name: 'JavaScript', iconPath: '/images/js.svg', tags: ['frontend', 'backend', 'languages'] },
		{
			name: 'TypeScript',
			iconPath: '/images/typescript.svg',
			tags: ['frontend', 'backend', 'languages']
		},
		{ name: 'React', iconPath: '/images/react.svg', tags: ['frontend'] },
		{ name: 'Node.js', iconPath: '/images/node.svg', tags: ['backend'] },
		{ name: 'Express', iconPath: '/images/express.svg', tags: ['backend'] },
		{ name: 'Python', iconPath: '/images/python.svg', tags: ['backend', 'languages'] },
		{ name: 'Docker', iconPath: '/images/docker.svg', tags: ['devops'] },
		{ name: 'Git', iconPath: '/images/git.svg', tags: ['devops'] }
	];

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

<div class="flex flex-col gap-5">
	<!--Filter by tags -->
	<div class="flex flex-wrap gap-3">
		{#each tags as tag (tag)}
			<button
				class="rounded-full border px-5 py-2 text-sm font-thin tracking-widest transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:outline-none
        {selectedTag === tag
					? 'border-secondary-700/50 bg-secondary-500/20 text-secondary-100'
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
			class="m-0! ml-2 rounded-full border border-secondary-300/10 bg-secondary-700/10 px-10 py-3 text-sm text-text placeholder:font-thin placeholder:text-secondary-200/50 focus:border-secondary-500 focus:outline-none"
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

	<div class="glass-container min-h-[55vh] rounded-2xl p-10">
		{#if filteredSkills.length === 0}
			<p
				class="block h-full w-full content-center self-center text-center text-lg font-thin text-text/50"
			>
				I haven't learned that yet!
			</p>
		{:else}
			<ul class="m-0 flex list-none flex-wrap items-start justify-start gap-5">
				{#each filteredSkills as skill (skill.name)}
					<li
						class="flex aspect-square! flex-col items-center justify-center gap-1 transition-all ease-in-out md:max-w-20"
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
