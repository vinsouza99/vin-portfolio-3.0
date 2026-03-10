<script lang="ts">
	import { Footer, FooterCopyright, FooterIcon, ButtonGroup, Button } from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
</script>

<Footer
	class="footer-mask fixed bottom-0 left-0 z-20 w-full gap-5 p-4 text-text shadow-sm md:flex md:items-center md:justify-start md:p-6"
>
	<ButtonGroup
		class="bg-transparent text-primary-800 *:ring-primary-700! hover:text-primary-500 active:text-primary-500"
	>
		<Button
			outline
			class="cursor-pointer border-0 px-1 font-thin text-primary-500 hover:text-primary-500 active:text-primary-500"
			><span aria-hidden="true" class="not-sr-only">EN</span><span class="sr-only">English</span
			></Button
		>
		<Button
			outline
			class="cursor-pointer border-0 px-1 font-thin text-primary-800 hover:text-primary-500 active:text-primary-500"
			><span aria-hidden="true" class="not-sr-only">PT</span><span class="sr-only">Português</span
			></Button
		>
	</ButtonGroup>
	<div class="mt-4 flex items-center space-x-3 sm:mt-0 sm:justify-center rtl:space-x-reverse">
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
	</div>
	<div class="flex w-full justify-center">
		<FooterCopyright
			href="/"
			by="vin souza"
			year={2026}
			class="relative -left-[10%] font-thin text-primary-800"
		/>
	</div>
</Footer>
