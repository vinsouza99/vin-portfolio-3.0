<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import EducationList from '../components/education-list.svelte';
	import EduDetail from '../components/edu-detail.svelte';

	let { endTrigger }: { endTrigger?: string | null } = $props();
</script>

<ContentSection
	header="education"
	summary="”An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge.” - Proverbs 18:15"
	detailComponent={EduDetail}
	content={EducationList}
	endTrigger={endTrigger}
/>
