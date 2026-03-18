<script lang="ts">
	import EduItem from './edu-item.svelte';
	import type { Edu } from '$lib/models/edu';

	interface Props {
		selectedItem?: Edu | null;
		onSelect?: (edu: Edu) => void;
		onDeselect?: () => void;
	}

	let { selectedItem = null, onSelect, onDeselect }: Props = $props();

	const handleClick = (edu: Edu) => {
		if (selectedItem?.id === edu.id) {
			onDeselect?.();
		} else {
			onSelect?.(edu);
		}
	};

	let education: Edu[] = [
		{
			id: 1,
			title: 'Bachelor of Computer Science',
			location: 'Campina Grande, Brazil',
			institution: 'UFCG',
			tags: ['8.5/10 GPA'],
			startYear: 2018,
			type: 'degree',
			endYear: 2023,
			shortDescription: 'Graduation in a little bit of everything about computers',
			longDescription: `The UFCG Computer Science course is one of the oldest and most celebrated in the IT field throughout Brazil. The four-year program taught me a little bit of everything about computers. I gained a strong understanding of Object-Oriented Programming (OOP), as well as Java, Python, unit testing, machine learning, software engineering and architecture, project management, among other skills.`
		},
		{
			id: 2,
			title: 'Post-Degree in Web & Mobile Development',
			location: 'Vancouver, Canada',
			institution: 'Langara College',
			tags: ['4.03 CGPA', "4x Dean's Honour Roll"],
			startYear: 2024,
			endYear: 2025,
			type: 'degree',
			shortDescription: `Specialization in the entire process of building web and mobile apps, from concept to deployment`,
			longDescription: `This two-year post-degree diploma program focuses on web and mobile app design and development, from concept to deployment. The tech stack ranges from design software (Figma, Photoshop) to modern web frameworks such as React, CMS tools like WordPress, and server management with Apache and AWS. However, the most valuable skills I gained aside from the technical ones were project management related. I had the opportunity to serve as the development lead for both BodyBuddy and DriveBuddy and these experiences had an unvaluable impact on my personal and professional development.`
		},
		{
			id: 3,
			title: "Harvard's CS50 Web Programming Professional Certificate",
			location: 'Online',
			institution: 'Harvard University',
			tags: ['Python', 'Django', 'JavaScript', 'HTML', 'SQL', 'HTML', 'CSS'],
			startYear: 2020,
			endYear: 2021,
			type: 'certificate',
			shortDescription: `My entry point to the career path of web development`,
			longDescription: `This course on the edX platform was my entry point to the career path of web development. Offered by Harvard's CS50 program, this course was not only an excellent introduction to the topic, but it also helped me discover my passion for app development. This course dives deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. As part of my final project, I did a very simple but special website called JSnake, that is detailed in my portfolio. At the end of that very intense program, I earned my first professional Certificate, that you can find here`,
			url: 'https://courses.edx.org/certificates/bc857b54e42d436981747ef17f061d81',

			urlLabel: 'Verified Certificate'
		},
		{
			id: 4,
			title: 'Docker Foundations Professional Certificate',
			location: 'Online',
			institution: 'Linkedin Learning',
			type: 'certificate',
			tags: ['Docker', 'YML', 'Containers', 'Microservices'],
			startYear: 2025,
			shortDescription: `Granted me a working knowledge of one of the most used CI/CD tools in the market`,
			longDescription: `DriveBuddy is an AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera and a machine learning model to track signs like frequent blinking or closed eyes. When drowsiness is detected, instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks. The Administrator Dashboard (a web platform) provides real-time insights into driver safety, alerting companies to potential risks before they become incidents. I had the honour to serve as the development lead once again for this project, which was our capstone project for Langara's Post-Degree diploma. Featuring among 5 others impressive projects, DriveBuddy won 2 awards: Best In Show and Best in Development`
		}
	];
</script>

<div class="flex">
	<!--Filter by tags -->
	<ul
		class=" m-0 flex w-full list-none flex-col flex-nowrap items-end gap-5 overflow-scroll p-5 md:p-0"
	>
		{#each education as edu (edu.id)}
			<li
				class="m-1 w-full flex-1 justify-self-end overflow-visible p-0 transition-all ease-in-out md:max-w-[95%] md:min-w-[70%] md:hover:translate-x-[-1%] {selectedItem?.id ===
					edu.id && 'md:translate-x-[-1%]'}"
			>
				<EduItem
					{edu}
					isSelected={selectedItem != null && selectedItem.id === edu.id}
					onClick={() => handleClick(edu)}
				/>
			</li>
		{/each}
	</ul>
</div>
