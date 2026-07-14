<script lang="ts">
	import ContentSection from '../components/ui/content-section.svelte';
	import SkillsList from '../components/skills/skills-list.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	let getLang = getLanguageContext();
	let language = $derived(getLang());
</script>

<ContentSection
	sectionId="skills"
	header={t(language, 'sections.skills.title')}
	summary={t(language, 'sections.skills.summary')}
	content={SkillsList}
	{endTrigger}
/>
