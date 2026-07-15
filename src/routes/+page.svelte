<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	goto(resolve('/en'));
	goto(resolve('/pt-br'));

	onMount(() => {
		const guess = navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
		goto(resolve(`/${guess}`), { replaceState: true });
	});
</script>

<!-- Real fallback content, in case JS is disabled or a crawler stops here -->
<p>
	<a href={resolve('/en')}>Continue in English</a> ·
	<a href={resolve('/pt-br')}>Continuar em Português</a>
</p>
