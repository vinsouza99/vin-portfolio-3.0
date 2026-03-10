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
		{ name: 'HTML', iconPath: '/images/html.svg', tags: ['frontend'] },
		{ name: 'CSS', iconPath: '/images/css.svg', tags: ['frontend'] },
		{ name: 'JavaScript', iconPath: '/images/js.svg', tags: ['frontend', 'backend'] },
		{ name: 'TypeScript', iconPath: '/images/typescript.svg', tags: ['frontend', 'backend'] },
		{ name: 'Node.js', iconPath: '/images/node.svg', tags: ['backend'] },
		{ name: 'Express', iconPath: '/images/express.svg', tags: ['backend'] },
		{ name: 'Python', iconPath: '/images/python.svg', tags: ['backend'] },
		{ name: 'Docker', iconPath: '/images/docker.svg', tags: ['devops'] },
		{ name: 'React', iconPath: '/images/react.svg', tags: ['frontend'] }
	];

	const tags = ['all', 'frontend', 'backend', 'devops'];

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
	};
</script>

<div class="flex flex-col gap-3">
	<!--Filter by tags -->
	<div class="flex flex-wrap gap-3">
		{#each tags as tag (tag)}
			<button
				class="focus:outline.none rounded-full border border-secondary-300/10 bg-transparent px-5 py-2 text-sm font-thin text-text transition-colors duration-200 hover:cursor-pointer hover:bg-secondary-500/10 hover:text-text/70 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
				onclick={() => filterByTag(tag)}
			>
				<span class="select-none">{tag}</span>
			</button>
		{/each}
	</div>
	<div class="flex flex-col">
		<Label for="search" class="sr-only mb-2 block">Your Email</Label>
		<Input
			id="search"
			type="text"
			placeholder="filter"
			class="m-0! ml-2 rounded-full border border-secondary-300/10 bg-transparent px-10 py-3 text-sm text-text placeholder:font-thin placeholder:text-text/50 focus:border-secondary-500 focus:outline-none"
			oninput={(e) => {
				if (e && e.target instanceof HTMLInputElement) {
					const query = e.target.value;
					filteredSkills = filterSkills(query);
				}
			}}
		>
			{#snippet left()}
				<SearchOutline class="h-5 w-5 text-gray-500 dark:text-gray-400" />
			{/snippet}
		</Input>
	</div>

	<div class="glass-container flex min-h-[65vh] flex-wrap items-start justify-start gap-5 p-10">
		{#each filteredSkills as skill (skill.name)}
			<div
				class=" flex aspect-square max-w-15 grow flex-col items-center justify-center gap-1 mix-blend-color-burn"
				title={skill.name}
			>
				<img
					src={skill.iconPath}
					alt={skill.name}
					class="mix-blend-burn h-full w-full object-contain transition-all ease-in-out hover:mix-blend-normal"
				/>
				<span class="text-sm font-thin text-text">{skill.name}</span>
			</div>
		{/each}
	</div>
</div>
