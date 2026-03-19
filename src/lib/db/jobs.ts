import type { Job } from '$lib/models/job';

export const jobs: Job[] = [
	{
		id: 1,
		title: 'Full-Stack Web & Mobile Developer',
		company: 'Current Scientific Corporation',
		location: 'Port Coquitlam, Canada',
		shortDescription:
			'As part of the AI division, developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide. Collaborated with the ROS software running on the cameras.',
		url: 'https://current-ai.com',
		startYear: 2025,
		endYear: Infinity,
		longDescription:
			'As part of the AI division, developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide. Collaborated with the ROS software running on the cameras.',

		tags: [
			'TypeScript',
			'React',
			'React Native',
			'Python',
			'Azure',
			'ROS',
			'Git',
			'Agile',
			'System Design',
			'Svelte',
			'GSAP'
		]
	},
	{
		id: 2,
		title: 'Full-Stack Web Developer',
		company: 'Langara College',
		location: 'Vancouver, Canada',
		shortDescription:
			'Maintained a headless CMS built with Next.js, WordPress, and GraphQL/Apollo that serves as a platform for graduates of the Fine Arts program to publish their work.',
		url: 'https://current-ai.com',
		startYear: 2025,
		longDescription:
			'During my last term in Langara College, I got the part-time position of full-stack developer at the Fine Arts department. The system I was responsible for is a website that serves as a platform for graduates of the Fine Arts program to publish their work. More technically, the system is a headless CMS built with Next.js and WordPress, served by an Apache web server hosted in a AWS EC2 instance. My tasks involve working closely with the clients to modify the existing system for this year’s edition, as the frontend changes every year. The site is live here',

		tags: [
			'TypeScript',
			'React',
			'React Native',
			'Python',
			'Azure',
			'ROS',
			'Git',
			'Agile',
			'System Design',
			'Svelte',
			'GSAP'
		]
	},
	{
		id: 3,
		title: 'Full-Stack Web Developer',
		company: 'Wipro Technologies',
		location: 'Recife, Brazil',
		shortDescription:
			'Worked on web-based control systems for the  Transit Department built with ASP.NET. User base  include used both internally by the department officers and by the general public for booking services, registering and controlling vehicles, and generating reports',
		url: 'https://current-ai.com',
		startYear: 2023,
		longDescription:
			'As a full-stack .NET developer, I would work on web apps for the Transit Department of my homestate in Brazil, which were to be used by millions of drivers and officers. More specifically, the app I was responsible for most of the time was a vehicle control system that allowed services scheduling, vehicle registration and updating, and reports generation. I would work together with a team of developers on new features and improvements for this system. Moreover, this position required strong Software Engineering skills for code optimization. Other responsabilities involved code versioning with Tortoise SVN and project planning with Agile (SCRUM).',

		tags: ['C#', 'MySQL', '.NET', 'TortoiseSVN', 'SCRUM']
	},
	{
		id: 4,
		title: 'Full-Stack Development Intern',
		company: 'Millennium IE',
		location: 'Campina Grande, Brazil',
		shortDescription:
			'Worked on different web-based control systems, being responsible for the entire process of software development, from design to coding, testing, and deployment',
		startYear: 2022,
		endYear: 2023,
		longDescription: `Millennium IE is a local print shop based in the same city where I went to university. The apps I worked on were different web-based control systems for both the company's employees and clients, and they required caution from me, as the information I was dealing with was sensitive. As the only developer at that small company, I was responsible for the entire process of software development, from design to coding, testing, and deployment. Additionally, I had to learn by myself most of the technologies used in the project, since that was my very first professional experience with web development. It was a tremendously valuable experience, and I left that job confident that I could learn easily any technology necessary for a project. Aside from a complete redesign of their system towards a more modern and pleasant UI, my biggest legacy there was a program written in Java that automated the very tiring and time-consuming task of gathering data from an API and storing in the database at regular intervals.`,

		tags: ['HTML', 'CSS', 'Java', 'JSP', 'Oracle SQL', 'Primefaces', 'SQL', 'Cybersecurity']
	}
];
