<script lang="ts">
	import PortfolioItem from './portfolio-item.svelte';
	import type { Work } from '$lib/models/work';

	interface Props {
		selectedItem?: Work | null;
		onSelect?: (work: Work) => void;
		onDeselect?: () => void;
	}

	let { selectedItem = null, onSelect, onDeselect }: Props = $props();

	const handleClick = (work: Work) => {
		if (selectedItem?.id === work.id) {
			onDeselect?.();
		} else {
			onSelect?.(work);
		}
	};
	let works: Work[] = [
		{
			id: 1,
			title: 'CURRENT AI',
			url: 'https://current-ai.com/',
			coverPath: '/images/cai.png',
			tags: [
				'React',
				'Python',
				'ROS',
				'Tailwind',
				'TypeScript',
				'React Native',
				'System Design',
				'Docker'
			],
			startYear: 2025,
			endYear: 2026,
			shortDescription:
				'I developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide and collaborated with the ROS software running on the cameras.',
			longDescription: `As part of the AI division, developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide. Collaborated with the ROS software running on the cameras.`
		},
		{
			id: 2,
			title: 'BodyBuddy',
			url: 'https://bodybuddy.vercel.app/',
			coverPath: '/images/bodybuddy.png',
			tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'System Design'],
			startYear: 2024,
			endYear: 2024,
			shortDescription:
				'An AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout',
			longDescription: `BodyBuddy is an AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout. It also helps you create personalized workout plans based on your fitness level and goals using OpenAI API. This project is part of Langara's program curriculum. Working in a cross-functional team of UI/UX designers and developers as the development lead, I was responsible for leading 3 other devs throughout the development process of 12 weeks, as well as making crucial decisions regarding the technical stack. Besides project management, my role was mainly backend development with Node and Express and database management with PostgreSQL. It was my first time leading a Software development project and it was as rewarding as it was challenging. I'm very proud of what we accomplished.`
		},
		{
			id: 3,
			title: 'DriveBuddy',
			url: 'https://wmdd.drivebuddy.ca/',
			coverPath: '/images/drivebuddy.png',
			tags: ['React Native', 'Node.js', 'Express', 'AWS', 'System Design'],
			startYear: 2025,
			endYear: 2025,
			shortDescription: `An AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera to track sleepiness signs and issues instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks.`,
			longDescription: `DriveBuddy is an AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera and a machine learning model to track signs like frequent blinking or closed eyes. When drowsiness is detected, instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks. The Administrator Dashboard (a web platform) provides real-time insights into driver safety, alerting companies to potential risks before they become incidents. I had the honour to serve as the development lead once again for this project, which was our capstone project for Langara's Post-Degree diploma. Featuring among 5 others impressive projects, DriveBuddy won 2 awards: Best In Show and Best in Development`
		},
		{
			id: 4,
			title: "Seb's Portfolio",
			coverPath: '/images/seb-richardson.png',
			url: 'https://sebrichardson.ca/',
			tags: ['Svelte', 'Tailwind CSS', 'GSAP', 'JavaScript'],
			startYear: 2025,
			endYear: 2025,
			shortDescription: `A freelance project for a talented UI/UX designer.`,
			longDescription: `DriveBuddy is an AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera and a machine learning model to track signs like frequent blinking or closed eyes. When drowsiness is detected, instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks. The Administrator Dashboard (a web platform) provides real-time insights into driver safety, alerting companies to potential risks before they become incidents. I had the honour to serve as the development lead once again for this project, which was our capstone project for Langara's Post-Degree diploma. Featuring among 5 others impressive projects, DriveBuddy won 2 awards: Best In Show and Best in Development`
		}
	];
</script>

<div class="flex">
	<!--Filter by tags -->
	<ul
		class=" m-0 flex w-full list-none flex-row flex-nowrap items-end gap-5 overflow-scroll p-5 md:flex-col md:p-0"
	>
		{#each works as work (work.id)}
			<li
				class="m-1 w-full min-w-[70%] flex-1 justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] md:hover:translate-x-[-1%] {selectedItem?.id ===
					work.id && 'translate-x-[-1%]'}"
			>
				<PortfolioItem
					{work}
					isSelected={selectedItem != null && selectedItem.id === work.id}
					onClick={() => handleClick(work)}
				/>
			</li>
		{/each}
	</ul>
</div>
