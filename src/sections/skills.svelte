<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import SkillsList from '../components/skills-list.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	const language = getLanguageContext();
</script>

<ContentSection
	sectionId="skills"
	header={t($language, 'sections.skills.title')}
	summary={t($language, 'sections.skills.summary')}
	content={SkillsList}
	endTrigger={endTrigger}
/>
