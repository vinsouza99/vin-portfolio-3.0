<script lang="ts">
	import ContentSection from '../components/content-section.svelte';
	import CareerTimeline from '../components/career-timeline.svelte';
	import JobDetail from '../components/job-detail.svelte';
</script>

<ContentSection
	header="career"
	summary="Although my history with web development and programming has been short and driven mostly by self-learning and lone projects, there are some milestones that provided me with significant personal and professional growth experiences during this journey"
	detailComponent={JobDetail}
	content={CareerTimeline}
/>
