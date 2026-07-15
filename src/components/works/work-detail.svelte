<script lang="ts">
	import { getLanguageContext } from '$lib/i18n';
	import type { Work } from '$lib/models/work';
	import Detail from '../ui/detail.svelte';

	interface Props {
		selectedItem: Work;
	}

	let { selectedItem }: Props = $props();
	let getLang = getLanguageContext();
	let language = $derived(getLang());

	let title = $derived('');
	let period = $derived(
		`${selectedItem.startYear}${selectedItem.endYear ? `-${selectedItem.endYear}` : ''}`
	);
	let description = $derived('');

	$effect(() => {
		if (language == 'en') {
			title = selectedItem.title.en;
			description = selectedItem.longDescription.en;
		} else {
			title = selectedItem.title.pt;
			description = selectedItem.longDescription.pt;
		}
	});
</script>

<Detail
	{title}
	subtitleParts={[period]}
	{description}
	tags={selectedItem.tags}
	url={selectedItem.url}
/>
