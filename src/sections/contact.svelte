<script lang="ts">
	import ContentSection from '../components/ui/content-section.svelte';
	import ContactForm from '../components/contact-form.svelte';
	import { getLanguageContext, t } from '$lib/i18n';

	let { endTrigger }: { endTrigger?: string | null } = $props();
	let getLang = getLanguageContext();
	let language = $derived(getLang());
</script>

<ContentSection
	sectionId="contact"
	header={t(language, 'sections.contact.title')}
	summary={t(language, 'sections.contact.summary')}
	content={ContactForm}
	contentProps={{}}
	{endTrigger}
/>
