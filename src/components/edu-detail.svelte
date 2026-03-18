<script lang="ts">
	import type { Edu } from '$lib/models/edu';
	import Detail from './ui/detail.svelte';

	interface Props {
		selectedItem: Edu;
	}

	const { selectedItem }: Props = $props();
</script>

<Detail
	title={selectedItem.title}
	subtitleParts={[
		selectedItem.institution,
		selectedItem.location,
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear}` : ''}`
	]}
	description={selectedItem.longDescription}
	tags={selectedItem.tags}
	url={selectedItem.url}
	urlLabel={selectedItem.urlLabel}
/>
