<script lang="ts">
	import type { Edu } from '$lib/models/edu';
	import Detail from '../ui/detail.svelte';
	import { getLanguageContext } from '$lib/i18n';

	let getLang = getLanguageContext();
	let language = $derived(getLang());

	interface Props {
		selectedItem: Edu;
	}

	const { selectedItem }: Props = $props();
</script>

<Detail
	title={language === 'en' ? selectedItem.title.en : selectedItem.title.pt}
	subtitleParts={[
		selectedItem.institution,
		selectedItem.location,
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear}` : ''}`
	]}
	description={language === 'en'
		? selectedItem.longDescription?.en
		: selectedItem.longDescription?.pt}
	tags={selectedItem.tags}
	url={selectedItem.url}
	urlLabel={selectedItem.urlLabel}
/>
