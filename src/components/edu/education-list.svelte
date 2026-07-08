<script lang="ts">
	import EduItem from './edu-item.svelte';
	import { education } from '$lib/db/edu';
	import type { Edu } from '$lib/models/edu';

	interface Props {
		selectedItem?: Edu | null;
		onSelect?: (edu: Edu) => void;
		onDeselect?: () => void;
	}

	let { selectedItem = null, onSelect, onDeselect }: Props = $props();

	const handleClick = (edu: Edu) => {
		if (selectedItem?.id === edu.id) {
			onDeselect?.();
		} else {
			onSelect?.(edu);
		}
	};
</script>

<div class="flex">
	<ul
		class=" m-0 flex w-full list-none flex-col flex-nowrap items-end gap-1 overflow-auto p-0 pt-2"
	>
		{#each education as edu (edu.id)}
			<li
				class=" w-full justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] md:min-w-[70%] md:hover:translate-x-[-1%] {selectedItem?.id ===
					edu.id && 'md:translate-x-[-1%]'}"
			>
				<EduItem
					{edu}
					isSelected={selectedItem != null && selectedItem.id === edu.id}
					onClick={() => handleClick(edu)}
				/>
			</li>
		{/each}
	</ul>
</div>
