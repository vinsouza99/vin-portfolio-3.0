import { json } from '@sveltejs/kit';
import { EMAILJS_API_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '$env/static/private';
import emailjs from '@emailjs/browser';

// Initialize Resend with the secret key from your .env file

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

// The POST function handles all incoming POST requests to /api/send-message
export const POST = async ({ request }) => {
	// Parse the incoming JSON payload from your frontend client
	const { email, subject, message } = await request.json();

	// Basic validation
	if (!subject || !email || !message) {
		return json({ success: false, error: 'All fields are required.' }, { status: 400 });
	}
	emailjs
		.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
			email: email,
			subject: subject ? subject : `New message from  ${email}`,
			message: message
		})
		.then(
			(response) => {
				console.log('Email sent successfully:', response.status, response.text);
				// Return a successful JSON response
				return json({ success: true, message: 'Email sent successfully!' }, { status: 200 });
			},
			(error) => {
				console.error('Email sending failed:', error);
				// Return an error JSON response
				return json({ success: false, error: 'Failed to send email.' }, { status: 500 });
			}
		);
};
