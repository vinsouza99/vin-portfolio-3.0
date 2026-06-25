<script lang="ts">
	import Landing from '../sections/landing.svelte';
	import Works from '../sections/works.svelte';
	import Career from '../sections/career.svelte';
	import Education from '../sections/education.svelte';
	import Skills from '../sections/skills.svelte';
	import Contact from '../sections/contact.svelte';
</script>

<div id="smooth-wrapper" class="m-0 p-0">
	<div id="smooth-content" class="m-0 p-0">
		<Landing endTrigger="#skills" />
		<Skills endTrigger="#works" />
		<Works endTrigger="#career" />
		<Career endTrigger="#education" />
		<Education endTrigger="#contact" />
		<Contact />
	</div>
</div>
