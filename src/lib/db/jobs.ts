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
			en: 'Developed a remote controller app for AI-powered EO/IR camera systems used in the maritime industry worldwide and collaborated with the ROS software running on the cameras.',
			pt: 'Como parte da divisão de IA, desenvolvi a interface do usuário para um controlador remoto de iPad de sistemas de câmeras EO/IR com tecnologia de IA usados na indústria marítima em todo o mundo. Colaborei com o software ROS que roda nas câmeras.'
		},

		url: 'https://current-ai.com',
		startYear: 2025,
		endYear: Infinity,
		longDescription: {
			en: `As part of the AI division, I developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems with React Native and TypeScript. The project intends to turn the cameras sold by Current Scientific into automated lookouts that understands it surroundings, classify and track vessels, and alert for dangers. Initially hired as a frontend developer for the camera controller, I gradually started to collaborate with the ROS software running on the cameras. Now, I am responsible for a couple of complicated core features, such as a custom autofocus algorithm for the thermal camera and the algorithm for having the camera lock on a target of interest and follow it. It's by far the hardest project I have worked on as it involves advanced distributed system design, mathematics, and physics.`,
			pt: 'Como parte da divisão de IA, desenvolvi a interface de usuário para um controle remoto via iPad de sistemas de câmeras EO/IR (eletro-ópticas/infravermelhas) com tecnologia de IA, utilizando React Native e TypeScript. O projeto visa transformar as câmeras comercializadas pela Current Scientific em sistemas de vigilância automatizados capazes de compreender o ambiente, classificar e rastrear embarcações e emitir alertas de perigo. Inicialmente contratado como desenvolvedor frontend para o controle da câmera, passei a colaborar gradualmente com o software ROS que opera nos equipamentos. Atualmente, sou responsável por funcionalidades centrais complexas, como um algoritmo de foco automático personalizado para a câmera térmica e o algoritmo que permite à câmera travar em um alvo de interesse e acompanhá-lo. Este é, de longe, o projeto mais desafiador em que já trabalhei, pois envolve conceitos avançados de design de sistemas distribuídos, matemática e física.'
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
			en: 'Maintained a headless CMS built with Next.js, WordPress, and GraphQL/Apollo that serves as a platform for graduates of the Fine Arts program to publish their work.',
			pt: 'Mantive um CMS headless construído com Next.js, WordPress, e GraphQL/Apollo que serve como uma plataforma para graduados do programa de Artes Visuais publicarem seu trabalho.'
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
			en: 'Worked on web-based control systems for the  Transit Department built with ASP.NET. User base  include used both internally by the department officers and by the general public for booking services, registering and controlling vehicles, and generating reports',
			pt: 'Trabalhei em sistemas de controle baseados na web para o Departamento de Trânsito construídos com ASP.NET. A base de usuários inclui tanto os funcionários do departamento quanto o público em geral para agendar serviços, registrar e controlar veículos, e gerar relatórios'
		},
		startYear: 2023,
		longDescription: {
			en: 'I worked with a team of developers and designers on web apps for the Transit Department of my homestate in Brazil, which were to be used by millions of drivers and officers. The app I was responsible for most of the time was a vehicle control system that allowed services scheduling, vehicle registration and updating, and reports generation. Other responsabilities involved code versioning with Tortoise SVN and project planning with Agile (SCRUM).',
			pt: 'Trabalhei com uma equipe de desenvolvedores e designers em aplicações web para o Departamento de Trânsito do meu estado natal no Brasil, que deveriam ser usadas por milhões de motoristas e agentes. O app pelo qual fui responsável na maior parte do tempo era um sistema de controle de veículos que permitia agendamento de serviços, registro e atualização de veículos, e geração de relatórios. Outras responsabilidades envolviam versionamento de código com Tortoise SVN e planejamento de projetos com Agile (SCRUM).'
		},
		tags: ['C#', 'MySQL', '.NET', 'TortoiseSVN', 'SCRUM']
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
