<script lang="ts">
	import type { Edu } from '$lib/models/edu';

	interface Props {
		selectedItem: Edu;
	}

	let { selectedItem }: Props = $props();
</script>

<h2
	class="block font-mono text-6xl font-semibold text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60"
>
	{selectedItem.title}
</h2>
<p class="block text-xl font-thin text-text">
	{selectedItem.longDescription ?? selectedItem.shortDescription}
</p>
