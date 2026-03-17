<script lang="ts">
	import type { Edu } from '$lib/models/edu';
	import Detail from './ui/detail.svelte';

	interface Props {
		selectedItem: Edu;
	}

	let { selectedItem }: Props = $props();
</script>

<Detail
	title={selectedItem.title}
	subtitle=""
	description={selectedItem.longDescription}
	tags={selectedItem.tags}
/>
