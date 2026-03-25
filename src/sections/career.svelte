<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import CareerTimeline from '../components/career-timeline.svelte';
	import JobDetail from '../components/job-detail.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	const language = getLanguageContext();
</script>

<ContentSection
	sectionId="career"
	header={t($language, 'sections.career.title')}
	summary={t($language, 'sections.career.summary')}
	detailComponent={JobDetail}
	content={CareerTimeline}
	endTrigger={endTrigger}
/>
