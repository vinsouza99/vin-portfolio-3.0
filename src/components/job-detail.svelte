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
	subtitle={selectedItem.title}
	startDate={selectedItem.startYear}
	endDate={selectedItem.endYear}
	description={selectedItem.longDescription}
	tags={selectedItem.tags}
	url={selectedItem.url}
/>
