<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import EducationList from '../components/education-list.svelte';
	import EduDetail from '../components/edu-detail.svelte';
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
	endTrigger={endTrigger}
/>
