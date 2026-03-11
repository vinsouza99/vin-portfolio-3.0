<script lang="ts">
	import { Label, Input, Button, Alert } from 'flowbite-svelte';
	import { Copy } from 'lucide-svelte';

	// Form State
	let name = '';
	let email = '';
	let subject = '';
	let message = '';

	// Submission State
	let isSubmitting = false;
	let formStatus: 'idle' | 'success' | 'error' = 'idle';
	let errorMessage = '';

	const submitForm = async (event: Event) => {
		// Prevent the default HTML form submission behavior
		event.preventDefault();

		isSubmitting = true;
		formStatus = 'idle';

		try {
			const response = await fetch('/api/send-message', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, subject, message })
			});

			const result = await response.json();

			if (result.success) {
				formStatus = 'success';
				// Clear the form fields upon success
				name = '';
				email = '';
				subject = '';
				message = '';
			} else {
				formStatus = 'error';
				errorMessage = result.error || 'Failed to send the message.';
			}
		} catch (error) {
			console.error(error);
			formStatus = 'error';
			errorMessage = 'A network error occurred. Please try again later.';
		} finally {
			isSubmitting = false;
		}
	};
	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText('vinsouza1039@gmail.com');
		} catch (err) {
			console.error('Failed to copy email: ', err);
		}
	};
</script>

<form
	on:submit={submitForm}
	class="glass-container flex max-w-xl flex-col space-y-1 divide-y divide-secondary-200/10 rounded-2xl p-5"
>
	{#if formStatus === 'success'}
		<Alert color="green" class="mb-4" border={false}>
			Your message has been sent successfully! I will get back to you soon.
		</Alert>
	{/if}

	{#if formStatus === 'error'}
		<Alert color="red" class="mb-4">
			{errorMessage}
		</Alert>
	{/if}
	<div class="flex w-full items-baseline font-thin">
		<Label for="email" class="text-md mb-2 w-15 font-thin text-secondary-700">from *</Label>
		<Input
			id="email"
			type="email"
			placeholder="your email"
			bind:value={email}
			required
			class="w-full border-0! bg-transparent outline-0! placeholder:text-text/50"
		></Input>
	</div>
	<div class="flex w-full items-baseline font-thin">
		<label for="my-email" class="text-md mb-2 w-15 font-thin text-secondary-700">to</label>
		<button
			id="my-email"
			type="button"
			on:click={copyEmail}
			class="group my-1 flex w-fit cursor-pointer rounded-sm border-0! bg-transparent px-2 py-1 text-sm font-thin! tracking-wide text-text outline-0! transition-colors duration-75 ease-in-out hover:bg-secondary-100/10"
		>
			<span>vinsouza1039@gmail.com</span>
			<Copy class="hover:group:text-text h-5 w-5 border-0 bg-transparent p-1! text-text/50" />
		</button>
	</div>
	<div class="flex w-full items-baseline font-thin">
		<Label for="subject" class="text-md mb-2 w-15 font-thin text-secondary-700">subject</Label>
		<Input
			id="subject"
			type="text"
			class="border-0! bg-transparent outline-0! placeholder:text-text/50"
			placeholder="what's up?"
			bind:value={subject}
		></Input>
	</div>

	<div class="text-md flex w-full items-baseline font-thin">
		<textarea
			id="message"
			placeholder="your message"
			rows={6}
			bind:value={message}
			required
			class="h-50 w-full grow resize-none border-0! bg-transparent px-0 outline-0! placeholder:text-sm placeholder:font-thin placeholder:text-text/50"
		></textarea>
	</div>
	<div class="m-0 flex items-center justify-end py-1">
		<Button
			type="submit"
			disabled={isSubmitting}
			class="justify-self-start-safe hover:border-px w-fit cursor-pointer text-center"
			color="secondary"
			outline
		>
			{#if isSubmitting}
				Sending...
			{:else}
				<!-- <Send class="h-6 w-6" /> -->
				send
			{/if}
		</Button>
	</div>
</form>
