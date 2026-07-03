<script lang="ts">
	import type { Job } from '$lib/models/job';
	import Detail from '../ui/detail.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	interface Props {
		selectedItem: Job;
	}
	let language = getLanguageContext();

	let { selectedItem }: Props = $props();
</script>

<Detail
	title={selectedItem.company}
	subtitleParts={[
		$language === 'en' ? selectedItem.title.en : selectedItem.title.pt,
		selectedItem.location,
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear == Infinity ? t($language, 'present') : selectedItem.endYear}` : ''}`
	]}
	description={$language === 'en'
		? selectedItem.longDescription?.en
		: selectedItem.longDescription?.pt}
	tags={selectedItem.tags}
	url={selectedItem.url}
/>
