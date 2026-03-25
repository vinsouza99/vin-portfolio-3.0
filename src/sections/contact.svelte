<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import ContactForm from '../components/contact-form.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	const language = getLanguageContext();
</script>

<ContentSection
	sectionId="contact"
	header={t($language, 'sections.contact.title')}
	summary={t($language, 'sections.contact.summary')}
	content={ContactForm}
	contentProps={{}}
	endTrigger={endTrigger}
/>
