<script lang="ts">
	import ContentSection from '../components/ui/content-section.svelte';
	import CareerTimeline from '../components/career/career-timeline.svelte';
	import JobDetail from '../components/career/job-detail.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	let getLang = getLanguageContext();
	let language = $derived(getLang());
</script>

<ContentSection
	sectionId="career"
	header={t(language, 'sections.career.title')}
	summary={t(language, 'sections.career.summary')}
	detailComponent={JobDetail}
	content={CareerTimeline}
	{endTrigger}
/>
