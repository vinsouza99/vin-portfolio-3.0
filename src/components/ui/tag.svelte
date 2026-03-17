<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<span
	class="inline-block rounded-lg bg-secondary-500/20 px-2 py-1 text-xs font-thin text-secondary-300/80"
>
	{text}
</span>
