<script lang="ts">
	import { getLanguageContext } from '$lib/i18n';
	import type { Work } from '$lib/models/work';
	import Detail from '../ui/detail.svelte';

	interface Props {
		selectedItem: Work;
	}

	let { selectedItem }: Props = $props();
	let language = getLanguageContext();
</script>

<Detail
	title={$language === 'en' ? selectedItem.title.en : selectedItem.title.pt}
	subtitleParts={[
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear}` : ''}`
	]}
	description={$language === 'en'
		? selectedItem.longDescription.en
		: selectedItem.longDescription.pt}
	tags={selectedItem.tags}
	url={selectedItem.url}
/>
