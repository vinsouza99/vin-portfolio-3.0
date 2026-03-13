<script lang="ts">
	import PortfolioItem from './portfolio-item.svelte';
	import type { Work } from '$lib/models/work';

	interface Props {
		onSelectCallback: (work: Work) => void;
	}

	// Destructure props using the $props rune
	let { onSelectCallback }: Props = $props();

	let selectedWork: Work | null = $state(null); // This will hold the currently selected work for detailed view
	const selectWork = (work: Work) => {
		selectedWork = work;
		onSelectCallback(work);
	};
	let works: Work[] = [
		{
			id: 1,
			title: 'BodyBuddy',
			url: 'https://bodybuddy.vercel.app/',
			coverPath: '/images/bodybuddy.png',
			tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'System Design', 'JWT'],
			startYear: 2024,
			endYear: 2024,
			shortDescription:
				'An AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout',
			longDescription: `BodyBuddy is an AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout. It also helps you create personalized workout plans based on your fitness level and goals using OpenAI API. This project is part of Langara's program curriculum. Working in a cross-functional team of UI/UX designers and developers as the development lead, I was responsible for leading 3 other devs throughout the development process of 12 weeks, as well as making crucial decisions regarding the technical stack. Besides project management, my role was mainly backend development with Node and Express and database management with PostgreSQL. It was my first time leading a Software development project and it was as rewarding as it was challenging. I'm very proud of what we accomplished.`
		},
		{
			id: 2,
			title: 'DriveBuddy',
			url: 'https://wmdd.drivebuddy.ca/',
			coverPath: '/images/drivebuddy.png',
			tags: ['React Native', 'Node.js', 'Express', 'AWS', 'System Design', 'JWT'],
			startYear: 2025,
			endYear: 2025,
			shortDescription: `An AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera to track sleepiness signs and issues instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks.`,
			longDescription: `DriveBuddy is an AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera and a machine learning model to track signs like frequent blinking or closed eyes. When drowsiness is detected, instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks. The Administrator Dashboard (a web platform) provides real-time insights into driver safety, alerting companies to potential risks before they become incidents. I had the honour to serve as the development lead once again for this project, which was our capstone project for Langara's Post-Degree diploma. Featuring among 5 others impressive projects, DriveBuddy won 2 awards: Best In Show and Best in Development`
		},
		{
			id: 3,
			title: 'Sebastian Richardson Portfolio',
			coverPath: '/images/seb-richardson.png',
			url: 'https://sebrichardson.ca/',
			tags: ['Svelte', 'Tailwind CSS', 'GSAP', 'JavaScript'],
			startYear: 2025,
			endYear: 2025,
			shortDescription: `An AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera to track sleepiness signs and issues instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks.`,
			longDescription: `DriveBuddy is an AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera and a machine learning model to track signs like frequent blinking or closed eyes. When drowsiness is detected, instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks. The Administrator Dashboard (a web platform) provides real-time insights into driver safety, alerting companies to potential risks before they become incidents. I had the honour to serve as the development lead once again for this project, which was our capstone project for Langara's Post-Degree diploma. Featuring among 5 others impressive projects, DriveBuddy won 2 awards: Best In Show and Best in Development`
		}
	];
</script>

<div class="flex">
	<!--Filter by tags -->
	<ul
		class="m-0 flex w-full list-none flex-row flex-nowrap gap-5 overflow-scroll p-5 md:flex-col md:p-0"
	>
		{#each works as work (work.id)}
			<li class="m-0 w-full min-w-[75%] flex-1 p-0">
				<PortfolioItem
					{work}
					isSelected={selectedWork ? selectedWork.id === work.id : false}
					onClick={() => selectWork(work)}
				/>
			</li>
		{/each}
	</ul>
</div>
