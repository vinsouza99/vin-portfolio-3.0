<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import PortfolioList from '../components/portfolio-list.svelte';
	import WorkDetail from '../components/work-detail.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	const language = getLanguageContext();
</script>

<ContentSection
	sectionId="works"
	header={t($language, 'sections.works.title')}
	summary={t($language, 'sections.works.summary')}
	detailComponent={WorkDetail}
	content={PortfolioList}
	endTrigger={endTrigger}
/>
