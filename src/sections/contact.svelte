<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import ContactForm from '../components/contact-form.svelte';

	let { endTrigger }: { endTrigger?: string | null } = $props();
</script>

<ContentSection
	header="contact"
	summary="Get in touch whenever you feel like building something awesome"
	content={ContactForm}
	contentProps={{}}
	endTrigger={endTrigger}
/>
