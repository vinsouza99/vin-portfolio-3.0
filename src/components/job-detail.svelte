<script lang="ts">
	import type { Job } from '$lib/models/job';
	import Detail from './ui/detail.svelte';

	interface Props {
		selectedItem: Job;
	}

	let { selectedItem }: Props = $props();
</script>

<Detail
	title={selectedItem.company}
	subtitleParts={[
		selectedItem.title,
		selectedItem.location,
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear == Infinity ? 'present' : selectedItem.endYear}` : ''}`
	]}
	description={selectedItem.longDescription}
	tags={selectedItem.tags}
	url={selectedItem.url}
/>
