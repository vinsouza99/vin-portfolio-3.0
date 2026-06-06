<script lang="ts">
	import { Label, Input, Button, Alert, Toast, ToastContainer } from 'flowbite-svelte';
	import { Copy } from 'lucide-svelte';
	import { getLanguageContext, t } from '$lib/i18n';
	import { fly } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';

	const language = getLanguageContext();

	type ToastType = 'success' | 'error';
	const ToastColor = {
		success: 'green',
		error: 'red'
	};

	interface ToastItem {
		id: number;
		message: string;
		color: 'green' | 'red';
		timeoutId?: ReturnType<typeof setTimeout>;
		visible: boolean;
	}

	let toasts = $state<ToastItem[]>([]);
	let nextId = $state(1);

	function addToast(type: ToastType, message: string) {
		const newToast: ToastItem = {
			id: nextId,
			message: message,
			color: ToastColor[type],
			visible: true
		};

		// Auto-dismiss after 5 seconds
		const timeoutId = setTimeout(() => {
			dismissToast(newToast.id);
		}, 5000);
		newToast.timeoutId = timeoutId;

		toasts = [...toasts, newToast];
		nextId++;
	}

	function dismissToast(id: number) {
		// Clear timeout if it exists
		const toast = toasts.find((t) => t.id === id);
		if (toast?.timeoutId) {
			clearTimeout(toast.timeoutId);
		}

		// Set visible to false to trigger outro transition
		toasts = toasts.map((t) => (t.id === id ? { ...t, visible: false } : t));

		setTimeout(() => {
			toasts = toasts.filter((t) => t.id !== id);
		}, 300); // Slightly longer than transition duration
	}

	function handleClose(id: number) {
		return () => {
			dismissToast(id);
		};
	}

	onDestroy(() => {
		// Clear all pending timeouts on unmount
		toasts.forEach((toast) => {
			if (toast.timeoutId) {
				clearTimeout(toast.timeoutId);
			}
		});
	});

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
			addToast('success', t($language, 'sections.contact.form.success'));
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

<ToastContainer position="top-right">
	{#each toasts as toast (toast.id)}
		<Toast
			color={toast.color}
			dismissable={false}
			transition={fly}
			params={{ x: 200, duration: 800 }}
			class="glass-container w-64 border-0 bg-secondary-800/10 text-text backdrop-blur-sm"
			onclose={handleClose(toast.id)}
			bind:toastStatus={toast.visible}
		>
			{#snippet icon()}
				<CheckCircleSolid class="h-5 w-5" />
				<span class="sr-only">Check icon</span>
			{/snippet}
			{toast.message}
		</Toast>
	{/each}
</ToastContainer>
<form
	on:submit={submitForm}
	class="glass-container w-full max-w-xl flex-col space-y-1 divide-y divide-secondary-200/10 rounded-2xl p-5"
>
	{#if formStatus === 'success'}
		<Toast>
			{t($language, 'sections.contact.form.success')}
		</Toast>
		<!-- <Alert color="green" class="mb-4" border={false}>
			{t($language, 'sections.contact.form.success')}
		</Alert> -->
	{/if}

	{#if formStatus === 'error'}
		<Alert color="red" class="mb-4">
			{errorMessage}
		</Alert>
	{/if}
	<div class="flex w-full flex-col items-baseline font-thin md:flex-row">
		<Label for="email" class="text-md w-15 font-thin text-secondary-500 md:mb-2"
			>{t($language, 'sections.contact.form.from')} *</Label
		>
		<Input
			id="email"
			type="email"
			placeholder={t($language, 'sections.contact.form.email-placeholder')}
			bind:value={email}
			required
			class="w-full border-0! bg-transparent px-0 text-text! outline-0! placeholder:text-text/50 md:ml-1 md:px-2.5 "
		></Input>
	</div>
	<div class="flex w-full flex-col items-baseline font-thin md:flex-row">
		<label for="my-email" class="text-md w-15 font-thin text-secondary-500 md:mb-2"
			>{t($language, 'sections.contact.form.to')}</label
		>
		<button
			id="my-email"
			type="button"
			on:click={copyEmail}
			class="group my-1 flex w-fit cursor-pointer rounded-sm border-0! bg-transparent py-1 text-sm font-thin! tracking-wide text-text outline-0! transition-colors duration-75 ease-in-out hover:bg-secondary-100/10 md:px-2"
		>
			<span>vinsouza1039@gmail.com</span>
			<Copy class="hover:group:text-text h-5 w-5 border-0 bg-transparent p-1! text-text/50" />
		</button>
	</div>
	<div class="flex w-full flex-col items-baseline font-thin md:flex-row">
		<Label for="subject" class="text-md w-15 font-thin text-secondary-500 md:mb-2"
			>{t($language, 'sections.contact.form.subject')}</Label
		>
		<Input
			id="subject"
			type="text"
			class="border-0! bg-transparent px-0 text-text outline-0! placeholder:text-text/50 md:ml-1 md:px-2.5"
			placeholder={t($language, 'sections.contact.form.subject-placeholder')}
			bind:value={subject}
		></Input>
	</div>

	<div class="text-md flex w-full items-baseline font-thin">
		<textarea
			id="message"
			placeholder={t($language, 'sections.contact.form.message-placeholder')}
			rows={6}
			bind:value={message}
			required
			class="h-50 w-full grow resize-none rounded-lg border-0! bg-secondary-800/10 text-text outline-0! placeholder:text-sm placeholder:font-thin placeholder:text-text/50"
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
				{t($language, 'sections.contact.form.submitting')}
			{:else}
				<!-- <Send class="h-6 w-6" /> -->
				{t($language, 'sections.contact.form.submit-button')}
			{/if}
		</Button>
	</div>
</form>

<style>
	:global(input:-webkit-autofill),
	:global(textarea:-webkit-autofill),
	:global(select:-webkit-autofill) {
		-webkit-text-fill-color: var(--text-text) !important;
		box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.05) !important;
		background-color: transparent !important;
	}
</style>
