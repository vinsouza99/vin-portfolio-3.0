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
			longDescription: `This two-year post-degree diploma program focuses on web and mobile app design and development, from concept to deployment. <br/><br/>The tech stack ranges from design software to modern web frameworks such as React, CMS tools like WordPress, and server management with Apache and AWS. However, the most valuable skills I gained aside from the technical ones were project management related. <br/><br/>I had the opportunity to serve as the development lead for both BodyBuddy and DriveBuddy and these experiences had an unvaluable impact on my personal and professional development.`
		},
		{
			id: 3,
			title: "Harvard's CS50 Web Programming Professional Certificate",
			location: 'Online',
			institution: 'Harvard University',
			tags: ['Python', 'Django', 'JavaScript', 'HTML', 'SQL', 'CSS'],
			startYear: 2020,
			endYear: 2021,
			type: 'certificate',
			shortDescription: `My entry point to the career path of web development`,
			longDescription: `This course on the edX platform was my entry point to the career path of web development.  <br/><br/>Offered by Harvard's CS50 program, it was not only an excellent introduction to the topic, but it also helped me discover my passion for app development. This course dives deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. <br/><br/>As part of my final project, I did a very simple but special website called JSnake, that is detailed in my portfolio. At the end of that very intense program, I earned my first professional Certificate, that you can find here`,
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
			longDescription: `An industry-recognized Docker Foundations Professional Certificate.<br/><br/>I learned how to use Docker to deploy and manage applications as images that run on containers. This knowledge proved to be very helpful in real projects like Current AI.`,
			url: 'https://www.linkedin.com/learning/certificates/6be982f69980db3cf9ce50a0290018a8facb234b808e58670bbd6447e12ba570',
			urlLabel: 'Verified Certificate'
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
