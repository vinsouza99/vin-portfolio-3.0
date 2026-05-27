<script lang="ts">
	import { getLanguageContext, t } from '$lib/i18n';

	const language = getLanguageContext();
</script>

<div
	class="flex h-screen flex-col content-center justify-center gap-5 text-left font-mono text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60 md:sticky md:top-80 md:gap-8"
>
	<p class="text-medium block md:text-xl">{t($language, 'landing.hello')}</p>
	<h2 class="block text-5xl font-semibold md:text-6xl">
		{t($language, 'landing.intro')}
		<span class="text-[#dbefec] text-shadow-lg/60 text-shadow-[#dbefec]/60">Vin</span>
	</h2>
	<p class="text-medium block md:text-xl">{t($language, 'landing.role')}</p>
</div>
