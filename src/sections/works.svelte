<script lang="ts">
	import ContentSection from '../components/ui/content-section.svelte';
	import PortfolioList from '../components/works/portfolio-list.svelte';
	import WorkDetail from '../components/works/work-detail.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	let getLang = getLanguageContext();
	let language = $derived(getLang());
</script>

<ContentSection
	sectionId="works"
	header={t(language, 'sections.works.title')}
	summary={t(language, 'sections.works.summary')}
	detailComponent={WorkDetail}
	content={PortfolioList}
	{endTrigger}
/>
