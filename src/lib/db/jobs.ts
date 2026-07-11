import type { Job } from '$lib/models/job';

export const jobs: Job[] = [
	{
		id: 1,
		title: {
			en: 'Full-Stack Web & Mobile Developer',
			pt: 'Desenvolvedor Full-Stack Web e Mobile'
		},
		company: 'Current Scientific Corporation',
		location: 'Port Coquitlam, Canada',
		shortDescription: {
			en: 'Developed a controller interface for AI-powered EO/IR camera systems for the maritime industry.',
			pt: 'Desenvolvi a interface do usuário para um controlador remoto de iPad de sistemas de câmeras EO/IR com tecnologia de IA usados na indústria marítima.'
		},

		url: 'https://current-ai.com',
		startYear: 2025,
		endYear: Infinity,
		longDescription: {
			en: `As part of the AI division, I develop and maintain a distributed system that empowers EO/IR cameras with computer vision and object detection. Initially brought on as a frontend developer for our camera controller interface, I progressively took on more complex architecture challenges, eventually collaborating directly with the ROS software running on the hardware. On the frontend, I build with TypeScript and modern frameworks like React, React Native, and Svelte. On the backend, I develop with Python and design and maintain PostgreSQL databases, while managing our DevOps lifecycle via GitHub CI/CD pipelines and Docker images in Azure. I thrive in our Agile environment, actively participating in daily stand-ups and sprint retrospectives to ensure continuous delivery.`,
			pt: 'Como parte da divisão de IA, desenvolvo e mantenho um sistema distribuído que dota câmeras EO/IR de recursos de visão computacional e detecção de objetos. Inicialmente contratado como desenvolvedor frontend para a interface de controle das câmeras, assumi progressivamente desafios de arquitetura mais complexos, passando a colaborar diretamente com o software ROS em execução no hardware. No frontend, trabalho com TypeScript e frameworks modernos como React, React Native e Svelte. No backend, desenvolvo com Python e projeto e mantenho bancos de dados PostgreSQL, ao mesmo tempo em que gerencio nosso ciclo de vida DevOps por meio de pipelines de CI/CD no GitHub e imagens Docker no Azure. Atuo com sucesso em nosso ambiente ágil, participando ativamente de reuniões diárias e retrospectivas de sprint para garantir a entrega contínua.'
		},
		tags: [
			'TypeScript',
			'React',
			'React Native',
			'Python',
			'Azure',
			'Git',
			'Agile',
			'System Design',
			'Svelte',
			'Docker'
		]
	},
	{
		id: 2,
		title: {
			en: 'Full-Stack Web Developer',
			pt: 'Desenvolvedor Full-Stack'
		},
		company: 'Langara College',
		location: 'Vancouver, Canada',
		shortDescription: {
			en: 'Maintained a headless CMS built that serves as a platform for graduates of the Fine Arts program to publish their work.',
			pt: 'Mantive um CMS headless que serve como uma plataforma para graduados do programa de Artes Visuais publicarem seu trabalho.'
		},
		url: 'https://langara.ca/',
		startYear: 2025,
		longDescription: {
			en: 'During my last term in Langara College, I got the part-time position of full-stack developer at the Fine Arts department. The system I was responsible for is a website that serves as a platform for graduates of the Fine Arts program to publish their work. More technically, the system is a headless CMS built with Next.js and WordPress, served by an Apache web server hosted in a AWS EC2 instance. My tasks involve working closely with the clients to modify the existing system for this year’s edition, as the frontend changes every year. The site is live <a href="https://past.langarafinagradshow.com/2024" class="external_link" target="_blank" rel="noopener noreferrer">here</a>',
			pt: 'Durante meu último termo em Langara College, obtive o cargo de desenvolvedor full-stack em tempo parcial no departamento de Artes Visuais. O sistema pelo qual fui responsável é um website que serve como uma plataforma para graduados do programa de Artes Visuais publicarem seu trabalho. Mais tecnicamente, o sistema é um CMS sem cabeça construído com Next.js e WordPress, servido por um servidor web Apache hospedado em uma instância AWS EC2. Minhas tarefas envolviam trabalhar em conjunto com os clientes para modificar o sistema existente para a edição deste ano, já que o frontend muda todo ano. O site está disponível <a href="https://past.langarafinagradshow.com/2024" class="external_link" target="_blank" rel="noopener noreferrer">aqui</a>'
		},

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
		title: {
			en: 'Full-Stack Web Developer',
			pt: 'Desenvolvedor Web Full-Stack'
		},
		company: 'Wipro Technologies',
		location: 'Recife, Brazil',
		url: 'https://www.wipro.com/en-BR/',
		shortDescription: {
			en: 'Worked on web-based control systems for the  Transit Department built with ASP.NET.',
			pt: 'Trabalhei em sistemas de controle baseados na web para o DETRAN de Pernambuco com ASP.NET.'
		},
		startYear: 2023,
		longDescription: {
			en: 'I worked with a team of developers and designers on web apps for the Transit Department of my homestate in Brazil, which were to be used by millions of drivers and officers. The app I was responsible for most of the time was a vehicle control system that allowed services scheduling, vehicle registration and updating, and reports generation. Other responsabilities involved code versioning with Tortoise SVN and project planning with Agile (SCRUM).',
			pt: 'Trabalhei com uma equipe de desenvolvedores e designers em aplicações web para o Departamento de Trânsito do meu estado natal no Brasil, que deveriam ser usadas por milhões de motoristas e agentes. O app pelo qual fui responsável na maior parte do tempo era um sistema de controle de veículos que permitia agendamento de serviços, registro e atualização de veículos, e geração de relatórios. Outras responsabilidades envolviam versionamento de código com Tortoise SVN e planejamento de projetos com Agile (SCRUM).'
		},
		tags: ['C#', 'MySQL', '.NET', 'TortoiseSVN', 'Agile']
	},
	{
		id: 4,
		title: {
			en: 'Full-Stack Development Intern',
			pt: 'Estagiário de Desenvolvimento Full-Stack'
		},
		company: 'Millennium IE',
		location: 'Campina Grande, Brazil',
		shortDescription: {
			en: 'Worked on different web-based control systems, being responsible for the entire process of software development, from design to coding, testing, and deployment',
			pt: 'Trabalhei em diferentes sistemas de controle baseados na web, sendo responsável pelo processo completo do desenvolvimento de software, desde o design até a codificação, testes e implantação'
		},
		startYear: 2022,
		endYear: 2023,
		url: 'http://mie.com.br/',
		longDescription: {
			en: "I maintained different web-based control systems for both the company's employees and clients. As the only developer at that small company, I was responsible for the entire process of software development, from design to coding, testing, and deployment. I even did some pentesting on the side. Aside from a complete redesign of their system towards a more modern and pleasant UI, my biggest legacy there was a program written in Java that automated the very tiring and time-consuming task of gathering data from an API and storing in the database at regular intervals.",
			pt: 'Eu mantive diferentes sistemas de controle baseados na web para tanto os funcionários quanto os clientes da empresa. Como o único desenvolvedor naquela pequena empresa, fui responsável pelo processo completo do desenvolvimento de software, desde o design até a codificação, testes e implantação. Eu até fiz alguns testes de penetção nos meus tempos livres. Além de um redesign completo do sistema em direção a uma UI mais moderna e agradável, meu maior legado lá foi um programa escrito em Java que automatizou a tarefa muito cansativa e demorada de coletar dados de uma API e armazenar no banco de dados em intervalos regulares.'
		},
		tags: ['HTML', 'CSS', 'Java', 'JSP', 'Oracle SQL', 'Primefaces', 'SQL', 'Cybersecurity']
	}
];
