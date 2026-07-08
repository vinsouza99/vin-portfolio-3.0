<script lang="ts">
	import { Label, Input, Button, Alert, Toast, ToastContainer } from 'flowbite-svelte';
	import { Copy } from 'lucide-svelte';
	import { getLanguageContext, t } from '$lib/i18n';
	import { fly } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
	import { json } from '@sveltejs/kit';
	import {
		PUBLIC_EMAILJS_API_KEY as EMAILJS_API_KEY,
		PUBLIC_EMAILJS_SERVICE_ID as EMAILJS_SERVICE_ID,
		PUBLIC_EMAILJS_TEMPLATE_ID as EMAILJS_TEMPLATE_ID
	} from '$env/static/public';
	import emailjs from '@emailjs/browser';

	// Initialize Resend with the secret key from your .env file
	onMount(() => {
		emailjs.init({
			publicKey: EMAILJS_API_KEY,
			// Do not allow headless browsers
			blockHeadless: true,
			blockList: {
				// Block the suspended emails
				list: ['foo@emailjs.com', 'bar@emailjs.com'],
				// The variable contains the email address
				watchVariable: 'userEmail'
			},
			limitRate: {
				// Set the limit rate for the application
				id: 'vinsouza-portfolio',
				// Allow 1 request per 10s
				throttle: 10000
			}
		});
	});

	const sendEmail = async (email: string, subject: string, message: string) => {
		try {
			// Parse the incoming JSON payload from your frontend client
			//const { email, subject, message } = await request.json();

			// Basic validation
			if (!subject || !email || !message) {
				return json({ success: false, error: 'All fields are required.' }, { status: 400 });
			} // Use the official EmailJS REST API endpoint for server-side environments

			const emailjsResponse = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
				email: email,

				subject: subject ? subject : `New message from ${email}`,

				message: message
			});

			console.log(emailjsResponse);

			if (emailjsResponse.status) {
				const text = emailjsResponse.text;
				console.log('Email sent successfully:', text);
				// CRITICAL: Explicitly returning the SvelteKit response at the root of the function
				return json({ success: true, message: 'Email sent successfully!' }, { status: 200 });
			} else {
				const errorText = emailjsResponse.text;
				console.error('EmailJS REST API failed:', errorText);
				return json(
					{ success: false, error: 'Failed to send email via EmailJS.' },
					{ status: 500 }
				);
			}
		} catch (error) {
			console.error('Email sending route crashed:', error);
			return json({ success: false, error: 'Internal server error.' }, { status: 500 });
		}
	};

	const language = getLanguageContext();

	type ToastType = 'success' | 'error';
	const ToastColor = {
		success: 'green',
		error: 'red'
	};

	interface ToastItem {
		id: number;
		message: string;
		color: string;
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
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	// Submission State
	let isSubmitting = $state(false);
	let formStatus: 'idle' | 'success' | 'error' = $state('idle');
	let errorMessage = $state('');

	const submitForm = async (event: Event) => {
		// Prevent the default HTML form submission behavior
		event.preventDefault();

		isSubmitting = true;
		formStatus = 'idle';

		try {
			const response = await sendEmail(email, subject, message);
			console.log('Response:', response);

			const result = await response.json();

			if (result.ok) {
				formStatus = 'success';
				// Clear the form fields upon success
				email = '';
				subject = '';
				message = '';
				addToast('success', t($language, 'sections.contact.form.success'));
			} else {
				formStatus = 'error';
				errorMessage = result.error || 'Failed to send the message.';
				addToast('error', t($language, 'sections.contact.form.error'));
			}
		} catch (error) {
			console.error(error);
			formStatus = 'error';
			errorMessage = 'A network error occurred. Please try again later.';
			addToast('error', t($language, 'sections.contact.form.error'));
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
	onsubmit={submitForm}
	class="glass-container h-fit w-full max-w-xl flex-col space-y-1 divide-y divide-secondary-200/10 rounded-2xl p-5"
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
			onclick={copyEmail}
			class="group my-1 flex w-fit cursor-pointer rounded-sm border-0! bg-transparent py-1 text-sm font-thin! tracking-wide text-text outline-0! transition-colors duration-75 ease-in-out hover:bg-secondary-100/10 md:px-2"
		>
			<span>contact@vinsouza.com</span>
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
			class="justify-self-start-safe hover:border-px w-fit cursor-pointer text-center text-text"
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
