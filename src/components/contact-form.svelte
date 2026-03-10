<script lang="ts">
	import { Label, Input, Textarea, Button, Alert } from 'flowbite-svelte';
	import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-svelte';

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
</script>

<form on:submit={submitForm} class="glass-container mx-auto max-w-xl space-y-6 rounded-lg p-10!">
	{#if formStatus === 'success'}
		<Alert color="green" class="mb-4">
			<CheckCircle slot="icon" class="h-5 w-5" />
			Your message has been sent successfully! I will get back to you soon.
		</Alert>
	{/if}

	{#if formStatus === 'error'}
		<Alert color="red" class="mb-4">
			<AlertCircle slot="icon" class="h-5 w-5" />
			{errorMessage}
		</Alert>
	{/if}

	<div class="flex w-100 gap-5 font-thin">
		<Label for="email" class="mb-2">from *</Label>
		<Input
			id="email"
			type="email"
			placeholder="your email"
			bind:value={email}
			required
			class="border-b border-amber-50 bg-transparent placeholder:text-text"
		></Input>
	</div>
	<div class="flex w-100 gap-5 font-thin">
		<Label for="email" class="mb-2">to</Label>
		<Input id="email" type="email" placeholder="your email" disabled>vinsouza1039@gmail</Input>
	</div>

	<div class="flex w-100 gap-1">
		<Label for="subject" class="mb-2">subject</Label>
		<Input id="subject" type="text" placeholder="what's up?" bind:value={subject}></Input>
	</div>

	<div class="flex gap-1">
		<Textarea
			id="message"
			placeholder="Write your message here..."
			rows={6}
			bind:value={message}
			required
			class="w-full resize-none"
		/>
	</div>

	<Button type="submit" disabled={isSubmitting} class="w-full" color="primary">
		{#if isSubmitting}
			Sending...
		{:else}
			Send Message
			<Send class="ml-2 h-4 w-4" />
		{/if}
	</Button>
</form>
