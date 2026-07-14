<script lang="ts">
	import Landing from '../../sections/landing.svelte';
	import Works from '../../sections/works.svelte';
	import Career from '../../sections/career.svelte';
	import Education from '../../sections/education.svelte';
	import Skills from '../../sections/skills.svelte';
	import Contact from '../../sections/contact.svelte';
	import MouseFollower from '../../components/ui/mouse-follower.svelte';

	let { data } = $props<{
		data: { lang: string };
	}>();
</script>

<svelte:head>
	<link rel="alternate" hreflang="en" href="https://vinsouza.com/en" />
	<link rel="alternate" hreflang="pt-BR" href="https://vinsouza.com/pt-br" />
	<link rel="alternate" hreflang="x-default" href="https://vinsouza.com/en" />
	<title>{data.lang === 'en' ? 'Vin Souza — Portfolio' : 'Vin Souza — Portfólio'}</title>
	<meta
		name="description"
		content={data.lang === 'en' ? 'Full-Stack Developer' : 'Desenvolvedor Full-Stack'}
	/>
</svelte:head>

<MouseFollower />
<Landing endTrigger="#skills" />
<Skills endTrigger="#works" />
<Works endTrigger="#career" />
<Career endTrigger="#education" />
<Education endTrigger="#contact" />
<Contact />
