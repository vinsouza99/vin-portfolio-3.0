import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

// Initialize Resend with the secret key from your .env file
const resend = new Resend(env.RESEND_API_KEY);

// The POST function handles all incoming POST requests to /api/send-message
export const POST = async ({ request }) => {
	try {
		// Parse the incoming JSON payload from your frontend client
		const { name, email, subject, message } = await request.json();

		// Basic validation
		if (!name || !email || !message) {
			return json({ success: false, error: 'All fields are required.' }, { status: 400 });
		}

		// Dispatch the email via Resend
		const response = await resend.emails.send({
			from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain in production
			to: 'your.personal.email@example.com', // Where you want to receive the messages
			subject: subject ? subject : `New message from ${name} (${email})`,
			text: message
		});

		// Return a successful JSON response
		return json({ success: true, id: response.data?.id });
	} catch (error) {
		console.error('Email sending failed:', error);
		return json({ success: false, error: 'Internal server error.' }, { status: 500 });
	}
};
