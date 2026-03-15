<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { type Job } from '$lib/models/job';
	import JobItem from './job-item.svelte';

	gsap.registerPlugin(ScrollTrigger);

	export let items: Job[] = [
		{
			id: 1,
			title: 'Full-Stack Web & Mobile Developer',
			company: 'Current Scientific Corporation',
			location: 'Port Coquitlam, Canada',
			shortDescription:
				'As part of the AI division, developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide. Collaborated with the ROS software running on the cameras.',
			url: 'https://current-ai.com',
			startYear: 2025,
			endYear: 2026,
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
			endYear: 2025,
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

	const PRIMARY_500 = '#6afff5';
	const SECONDARY_900 = '#003052';

	let containerEl: HTMLDivElement;
	let lineSkeletonEl: HTMLDivElement;
	let lineProgressEl: HTMLDivElement;
	let yearsEls: HTMLSpanElement[] = [];
	let stopEls: HTMLDivElement[] = [];
	let itemEls: HTMLDivElement[] = [];

	let maxProgress = 0;

	onMount(() => {
		if (!containerEl || !lineProgressEl || !lineSkeletonEl) return;

		// Progress line: fill height = how far the viewport center has moved through the timeline.
		// So when a dot's top reaches center, the progress line exactly meets that dot.
		const progressTween = gsap.fromTo(
			lineProgressEl,
			{ scaleY: 0 },
			{
				scaleY: 1,
				ease: 'none',
				duration: 1,
				paused: true
			}
		);

		ScrollTrigger.create({
			trigger: containerEl,
			start: 'top bottom',
			end: 'bottom bottom',
			onUpdate: () => {
				const rect = containerEl.getBoundingClientRect();
				const viewportCenter = window.innerHeight / 2;
				const timelineHeight = rect.height;
				// Progress 0 when center is at timeline top, 1 when center is at timeline bottom
				let progress =
					timelineHeight > 0 ? ((viewportCenter - rect.top) / timelineHeight) * 1.5 : 0;
				progress = Math.max(0, Math.min(1, progress));
				maxProgress = Math.max(maxProgress, progress);
				progressTween.progress(maxProgress);
			}
		});

		// Desktop (md+): trigger when element's top hits viewport center. Mobile: trigger earlier.
		const mm = gsap.matchMedia();
		mm.add(
			'(min-width: 768px)',
			() => {
				// Stops (dots): trigger at viewport center on desktop
				stopEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						borderColor: SECONDARY_900,
						backgroundColor: '#001221',
						scale: 1
					});
					gsap.fromTo(
						el,
						{},
						{
							borderColor: PRIMARY_500,
							backgroundColor: '#001221',
							scale: 1,
							opacity: 1,
							duration: 0.5,
							ease: 'back.out(1.2)',
							scrollTrigger: {
								trigger: el,
								start: 'top center',
								toggleActions: 'play none none none'
							}
						}
					);
				});

				// Timeline items: trigger at viewport center on desktop
				itemEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						opacity: 0,
						rotateX: -22,
						transformOrigin: 'left center'
					});
					gsap.to(el, {
						opacity: 1,
						rotateX: 0,
						duration: 0.6,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top center',
							toggleActions: 'play none none none'
						}
					});
				});

				// Year text: SECONDARY_900 / 100 by default → PRIMARY_500 / 300 when top hits center
				yearsEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, { color: SECONDARY_900, fontWeight: 100 });
					gsap.to(el, {
						color: PRIMARY_500,
						fontWeight: 300,
						duration: 0.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top center',
							toggleActions: 'play none none none'
						}
					});
				});
			},
			containerEl
		);
		mm.add(
			'(max-width: 767px)',
			() => {
				stopEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						borderColor: SECONDARY_900,
						backgroundColor: '#001221',
						scale: 1
					});
					gsap.fromTo(
						el,
						{},
						{
							borderColor: PRIMARY_500,
							backgroundColor: '#001221',
							scale: 1,
							opacity: 1,
							duration: 0.5,
							ease: 'back.out(1.2)',
							scrollTrigger: {
								trigger: el,
								start: 'top 85%',
								toggleActions: 'play none none none'
							}
						}
					);
				});
				itemEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, {
						opacity: 0.5,
						rotateX: -22,
						transformOrigin: 'left center'
					});
					gsap.to(el, {
						opacity: 1,
						rotateX: 0,
						duration: 0.6,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 88%',
							toggleActions: 'play none none none'
						}
					});
				});
				// Year text: SECONDARY_900 / 100 by default → PRIMARY_500 / 300 when top hits 85%
				yearsEls.forEach((el) => {
					if (!el) return;
					gsap.set(el, { color: SECONDARY_900, fontWeight: 100 });
					gsap.to(el, {
						color: PRIMARY_500,
						fontWeight: 300,
						duration: 0.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 85%',
							toggleActions: 'play none none none'
						}
					});
				});
			},
			containerEl
		);

		return () => {
			mm.revert();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<div class="h-full md:py-20">
	<div
		class="career-timeline block-content min-h-screen py-8 md:min-h-[120vh] md:py-16"
		bind:this={containerEl}
		style="--row-count: {items.length}"
	>
		<div
			class="career-timeline__grid mx-auto grid max-w-full grid-cols-[auto_1fr] grid-rows-[repeat(var(--row-count),auto)] gap-x-4 gap-y-10 px-0 md:max-w-4xl md:gap-x-6 md:gap-y-20 md:px-8"
		>
			<!-- Full-height skeleton line (column 1, all rows) -->
			<div
				class="career-timeline__line-skeleton col-start-1 w-2 justify-self-center rounded-full md:mb-10 md:justify-self-center"
				style="background-color: {SECONDARY_900}; grid-row: 1 / -2;"
				bind:this={lineSkeletonEl}
				aria-hidden="true"
			></div>
			<!-- Full-height progress line (same span, scales on scroll) -->
			<div
				class="career-timeline__line-progress col-start-1 mt-1 h-full w-2.5 origin-top justify-self-center rounded-full md:mb-10 md:justify-self-center"
				style="background-color: {PRIMARY_500}; grid-row: 1 / -2;"
				bind:this={lineProgressEl}
				aria-hidden="true"
			></div>
			{#each items as item, i (i)}
				<!-- Stop dot (left column, same row as item) -->
				<div
					class="career-timeline__stop z-10 col-start-1 size-8 justify-self-center rounded-full border-8 border-solid bg-bg md:justify-self-end"
					style="grid-row: {i + 1};"
					bind:this={stopEls[i]}
					aria-hidden="true"
				></div>
				<!-- Item content (right column) -->
				<div
					class="col-start-2 flex flex-col items-start gap-1 md:gap-3"
					style="grid-row: {i + 1};"
				>
					<span class="career-timeline__years font-mono text-3xl" bind:this={yearsEls[i]}
						>{item.startYear}{item.endYear ? ` - ${item.endYear}` : ''}</span
					>
					<div class="career-timeline__item-content" bind:this={itemEls[i]}>
						<JobItem job={item} />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.career-timeline__grid {
		--row-count: 4;
	}
	/* Line elements sit behind stops; align in center of first column */
	.career-timeline__line-skeleton,
	.career-timeline__line-progress {
		align-self: stretch;
	}
	/* Perspective for flip animation */
	.career-timeline__item-content {
		perspective: 60rem;
	}
	.career-timeline__line-skeleton {
		height: calc(100% + 4rem + var(--spacing) * 10);
	}
	.career-timeline__line-progress {
		/* max-height: calc(100% + 4rem + var(--spacing) * 10); */
		max-height: calc(100%);
	}
	/* Year text default state (GSAP animates to primary when at center) */
	.career-timeline__years {
		color: var(--color-secondary-900);
		font-weight: 100;
	}
</style>
