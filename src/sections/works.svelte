<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import PortfolioList from '../components/portfolio-list.svelte';
</script>

<ContentSection
	header="works"
	summary="The thing that drew me towards web development in the first place was the process itself. It is fun despite all the work required to pull something cool off. During my work experiences and studies, both formal and self-conducted, I've built many things I'm proud of. Here are some of them!"
	content={PortfolioList}
	contentProps={{}}
/>
