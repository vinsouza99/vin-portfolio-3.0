<script lang="ts">
	import Landing from '../sections/landing.svelte';
	import Works from '../sections/works.svelte';
	import Career from '../sections/career.svelte';
	import Education from '../sections/education.svelte';
	import Skills from '../sections/skills.svelte';
	import Contact from '../sections/contact.svelte';
</script>
<Landing />
<Skills endTrigger="#works" />
<Works endTrigger="#career" />
<Career endTrigger="#education" />
<Education endTrigger="#contact" />
<Contact />