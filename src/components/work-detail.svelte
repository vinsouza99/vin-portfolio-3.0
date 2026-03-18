<script lang="ts">
	import type { Work } from '$lib/models/work';
	import Detail from './ui/detail.svelte';

	interface Props {
		selectedItem: Work;
	}

	let { selectedItem }: Props = $props();
</script>

<Detail
	title={selectedItem.title}
	subtitleParts={[
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear}` : ''}`
	]}
	description={selectedItem.longDescription}
	tags={selectedItem.tags}
	url={selectedItem.url}
/>
