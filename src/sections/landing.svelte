<script lang="ts">
	import { getLanguageContext, t } from '$lib/i18n';

	const language = getLanguageContext();
</script>

<section
	class="content-section mx-auto content-width grid h-full min-h-screen grid-cols-1 p-5 md:p-10 sm:gap-2 md:grid-cols-2 md:gap-5 lg:gap-10"
>
	<div class="section-summary relative h-full w-full flex items-center">
		<div
			class="flex flex-col content-center justify-center gap-5 text-left font-mono text-primary-500 text-shadow-lg/60 text-shadow-primary-800/60 md:sticky md:top-80 md:gap-8"
		>
			<p class="block text-medium md:text-xl">{t($language, 'landing.hello')}</p>
			<h2 class="block text-5xl md:text-6xl font-semibold">
				{t($language, 'landing.intro')}
				<span class="text-[#dbefec] text-shadow-lg/60 text-shadow-[#dbefec]/60">Vin</span>
			</h2>
			<p class="block text-medium md:text-xl">{t($language, 'landing.role')}</p>
			<p></p>
		</div>
	</div>
	<div
		class="section-content hidden h-full w-full md:flex-col items-center justify-center gap-5 text-left text-white"
	></div>
</section>
