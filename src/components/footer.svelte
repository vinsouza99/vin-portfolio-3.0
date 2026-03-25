<script lang="ts">
	import { Footer, FooterCopyright, FooterIcon, ButtonGroup, Button } from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
	import { getLanguageContext, type Locale } from '$lib/i18n';

	const currentYear = new Date().getFullYear();
	const language = getLanguageContext();

	const setLocale = async (locale: Locale) => {
		language.set(locale);
		await fetch('/api/locale', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ locale })
		});
	};
</script>

<Footer
	class="footer-mask align-center z-20 flex w-full content-center items-center gap-5 p-4 text-text shadow-sm md:fixed md:bottom-0 md:left-5 md:max-w-[50vw] md:justify-start md:p-6"
>
	<ButtonGroup
		class="bg-transparent text-primary-800 *:ring-primary-700! hover:text-primary-500 active:text-primary-500"
	>
		<Button
			outline
			title="English"
			class={`cursor-pointer border-0 px-1 font-thin hover:text-primary-500 active:text-primary-500 ${$language === 'en' ? 'text-primary-500' : 'text-primary-800'}`}
			onclick={() => void setLocale('en')}
			><span aria-hidden="true" class="not-sr-only">EN</span><span class="sr-only">English</span
			></Button
		>
		<Button
			outline
			title="Português (BR)"
			class={`cursor-pointer border-0 px-1 font-thin hover:text-primary-500 active:text-primary-500 ${$language === 'pt-BR' ? 'text-primary-500' : 'text-primary-800'}`}
			onclick={() => void setLocale('pt-BR')}
			><span aria-hidden="true" class="not-sr-only">PT</span><span class="sr-only">Português</span
			></Button
		>
	</ButtonGroup>
	<div class="flex items-center space-x-3 sm:mt-0 sm:justify-center rtl:space-x-reverse">
		<FooterIcon href="https://github.com/vinsouza99" target="_blank" rel="noopener noreferrer">
			<GithubSolid class="aspect-square h-5 w-5 text-primary-800 hover:text-primary-500" />
		</FooterIcon>
		<FooterIcon
			href="https://www.linkedin.com/in/vinicius-abner"
			target="_blank"
			rel="noopener noreferrer"
		>
			<LinkedinSolid class="aspect-square h-6 w-6 text-primary-800 hover:text-primary-500" />
		</FooterIcon>
		<div class="flex w-full justify-center">
			<FooterCopyright
				href="/"
				by="vin souza"
				year={currentYear}
				// class="relative -left-[10%] font-thin text-primary-800"
				class="font-thin text-primary-800/60"
			/>
		</div>
	</div>
</Footer>
