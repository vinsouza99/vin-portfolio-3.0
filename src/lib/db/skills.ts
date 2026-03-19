import type { Skill } from '$lib/models/skill';

export const skills: Skill[] = [
	{ name: 'HTML', iconPath: '/images/html.svg', tags: ['frontend', 'languages'] },
	{ name: 'CSS', iconPath: '/images/css.svg', tags: ['frontend', 'languages'] },
	{ name: 'JavaScript', iconPath: '/images/js.svg', tags: ['frontend', 'backend', 'languages'] },
	{
		name: 'TypeScript',
		iconPath: '/images/typescript.svg',
		tags: ['frontend', 'backend', 'languages']
	},
	{ name: 'C#', iconPath: '/images/csharp.svg', tags: ['languages'] },
	{ name: 'Python', iconPath: '/images/python.svg', tags: ['backend', 'languages'] },
	{
		name: 'Tailwind',
		iconPath: '/images/tailwind.svg',
		tags: ['frontend']
	},
	{ name: 'React', iconPath: '/images/react.svg', tags: ['frontend'] },
	{ name: 'Svelte', iconPath: '/images/svelte.svg', tags: ['frontend'] },
	{ name: 'WordPress', iconPath: '/images/wordpress.svg', tags: ['frontend', 'backend'] },
	{ name: 'Next.js', iconPath: '/images/nextjs.svg', tags: ['frontend'] },
	{ name: 'Node.js', iconPath: '/images/node.svg', tags: ['backend'] },
	{ name: 'Express', iconPath: '/images/express.svg', tags: ['backend'] },
	{ name: '.NET', iconPath: '/images/dotnet.svg', tags: ['frontend', 'backend'] },
	{ name: 'SQL', iconPath: '/images/sql.svg', tags: ['backend', 'languages'] },
	{ name: 'NoSQL', iconPath: '/images/nosql.svg', tags: ['backend'] },
	{ name: 'Docker', iconPath: '/images/docker.svg', tags: ['devops'] },
	{ name: 'Git', iconPath: '/images/git.svg', tags: ['devops'] },
	{ name: 'AWS', iconPath: '/images/aws.svg', tags: ['backend'] },
	{ name: 'Firebase', iconPath: '/images/firebase.svg', tags: ['backend'] }
];
