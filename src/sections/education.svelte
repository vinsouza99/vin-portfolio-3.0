<script lang="ts">
	import ContentSection from '../components/ui/content-section.svelte';
	import EducationList from '../components/edu/education-list.svelte';
	import EduDetail from '../components/edu/edu-detail.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	const language = getLanguageContext();
</script>

<ContentSection
	sectionId="education"
	header={t($language, 'sections.education.title')}
	summary={t($language, 'sections.education.summary')}
	detailComponent={EduDetail}
	content={EducationList}
	{endTrigger}
/>
