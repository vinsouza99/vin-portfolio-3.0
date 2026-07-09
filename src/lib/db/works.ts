import type { Work } from '$lib/models/work';

export const works: Work[] = [
	{
		id: 1,
		title: { en: 'CURRENT AI', pt: 'CURRENT AI' },
		url: 'https://current-ai.com/',
		coverPath: '/images/cai.png',
		tags: ['React', 'Python', 'Tailwind', 'TypeScript', 'React Native', 'System Design', 'Docker'],
		startYear: 2025,
		endYear: 2026,
		shortDescription: {
			en: 'I developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide and collaborated with the ROS software running on the cameras.',
			pt: 'Desenvolvi a interface do usuário para um controlador remoto do iPad de sistemas de câmeras EO/IR impulsionados por IA usados na indústria marítima em todo o mundo e colaborei com o software ROS em execução nas câmeras.'
		},
		longDescription: {
			en: `As part of the AI division, developed the user interface for an iPad remote controller of AI-powered EO/IR camera systems used in the maritime industry worldwide. Collaborated with the ROS software running on the cameras.`,
			pt: `Como parte da divisão de IA, desenvolvi a interface do usuário para um controlador remoto do iPad de sistemas de câmeras EO/IR impulsionados por IA usados na indústria marítima em todo o mundo. Colaborei com o software ROS em execução nas câmeras.`
		},
		platforms: ['iOS', 'Web']
	},
	{
		id: 2,
		title: { en: 'BodyBuddy', pt: 'BodyBuddy' },
		url: 'https://bodybuddy.vercel.app/',
		coverPath: '/images/bodybuddy.png',
		tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'System Design'],
		startYear: 2024,
		shortDescription: {
			en: 'An AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout',
			pt: 'Uma plataforma web de fitness impulsionada por IA para pessoas que desejam se exercitar em suas próprias casas ou em movimento, no seu próprio ritmo. A análise de IA verifica sua forma em tempo real, garantindo a postura correta para um treino seguro e eficaz'
		},
		longDescription: {
			en: `BodyBuddy is an AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout. It also helps you create personalized workout plans based on your fitness level and goals using OpenAI API. </br></br> This project is part of Langara's program curriculum. Working in a cross-functional team of UI/UX designers and developers as the development lead, I was responsible for leading 3 other devs throughout the development process of 12 weeks, as well as making crucial decisions regarding the technical stack. </br> Besides project management, my role was mainly backend development with Node and Express and database management with PostgreSQL. It was my first time leading a Software development project and it was as rewarding as it was challenging. I'm very proud of what we accomplished.`,
			pt: `BodyBuddy é uma plataforma web de fitness impulsionada por IA para pessoas que desejam se exercitar em suas próprias casas ou em movimento, no seu próprio ritmo. A análise de IA verifica sua forma em tempo real, garantindo a postura correta para um treino seguro e eficaz. Ele também ajuda você a criar planos de treino personalizados com base no seu nível de condicionamento físico e objetivos usando a API OpenAI. </br></br> Este projeto faz parte do currículo do programa da Langara. Trabalhando em uma equipe multifuncional de designers de UI/UX e desenvolvedores como líder de desenvolvimento, fui responsável por liderar outros 3 desenvolvedores ao longo do processo de desenvolvimento de 12 semanas, bem como tomar decisões cruciais sobre o stack técnico. </br> Além do gerenciamento de projetos, meu papel foi principalmente o desenvolvimento backend com Node e Express e gerenciamento de banco de dados com PostgreSQL. Foi minha primeira vez liderando um projeto de desenvolvimento de software e foi tão gratificante quanto desafiador. Estou muito orgulhoso do que conseguimos realizar.`
		},
		platforms: ['Web']
	},
	{
		id: 3,
		title: { en: 'DriveBuddy', pt: 'DriveBuddy' },
		url: 'https://wmdd.drivebuddy.ca/',
		coverPath: '/images/drivebuddy.png',
		tags: ['React Native', 'Node.js', 'Express', 'AWS', 'System Design'],
		startYear: 2025,
		shortDescription: {
			en: `An AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera to track sleepiness signs and issues instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks.`,
			pt: `Um aplicativo móvel impulsionado por IA projetado para ajudar os motoristas a permanecerem seguros detectando sinais precoces de sonolência. A tecnologia de monitoramento facial e ocular usa a câmera frontal para rastrear sinais de sono e emitir alertas sonoros e de voz que notificam os motoristas e o aplicativo sugere paradas próximas para incentivar pausas oportunas.`
		},
		longDescription: {
			en: `DriveBuddy is an AI-powered mobile app designed to help drivers stay safe by detecting early signs of drowsiness. The face and eye monitoring technology uses the frontal camera and a machine learning model to track signs like frequent blinking or closed eyes. When drowsiness is detected, instant sound and voice alerts notify drivers and the app suggests nearby rest stops to encourage timely breaks. The Administrator Dashboard (a web platform) provides real-time insights into driver safety, alerting companies to potential risks before they become incidents. I had the honour to serve as the development lead once again for this project, which was our capstone project for Langara's Post-Degree diploma. Featuring among 5 others impressive projects, DriveBuddy won 2 awards: Best In Show and Best in Development`,
			pt: `DriveBuddy é um aplicativo móvel impulsionado por IA projetado para ajudar os motoristas a permanecerem seguros detectando sinais precoces de sonolência. A tecnologia de monitoramento facial e ocular usa a câmera frontal e um modelo de aprendizado de máquina para rastrear sinais como piscadas frequentes ou olhos fechados. Quando a sonolência é detectada, alertas instantâneos de som e voz notificam os motoristas e o aplicativo sugere paradas próximas para incentivar pausas oportunas. O Painel do Administrador (uma plataforma web) fornece insights em tempo real sobre a segurança do motorista, alertando as empresas sobre riscos potenciais antes que se tornem incidentes. Tive a honra de servir como líder de desenvolvimento mais uma vez para este projeto, que foi nosso projeto final para o diploma pós-graduação da Langara. Apresentando entre outros 5 projetos impressionantes, DriveBuddy ganhou 2 prêmios: Best In Show e Best in Development`
		},
		platforms: ['Android', 'Web']
	},
	{
		id: 4,
		title: { en: 'Favr', pt: 'Favr' },
		url: 'https://favr.onrender.com/',
		coverPath: '/images/favr.png',
		tags: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'NoSQL'],
		startYear: 2024,
		shortDescription: {
			en: `Favr is a PWA that improves the life quality of senior citizens by connecting them with volunteer students. This project is part of Langara's Post-Degree Diploma in Web and Mobile App Design and Development program and it demanded that our team of 8 people (4 designers and 4 developers) built a MVP of our idea in less than 12 weeks.`,
			pt: `Favr é um PWA que melhora a qualidade de vida dos cidadãos mais velhos conectando-os com estudantes voluntários. Este projeto faz parte do diploma pós-graduação em Design e Desenvolvimento de Aplicativos Web e Móveis da Langara e exigiu que nossa equipe de 8 pessoas (4 designers e 4 desenvolvedores) construísse um MVP da nossa ideia em menos de 12 semanas.`
		},
		longDescription: {
			en: `Favr is a PWA that improves the life quality of senior citizens by connecting them with volunteer students. This project is part of Langara's Post-Degree Diploma in Web and Mobile App Design and Development program and it demanded that our team of 8 people (4 designers and 4 developers) built a MVP of our idea in less than 12 weeks. Even though the tech stack wasn't new to me, the experience of working so closely with designers and having to ship an entire application in roughly 3 months surely was. We weren't allowed to use libraries or frameworks, so proper project planning and organization was crucial for shipping the app in time. My role there was mainly backend development with JavaScript and management with Firebase platform. It was my first experience with a NoSQL database as well. Besides sharpening my technical programming skills, this project taught me a lot about project management, organization, planning, and strengthened my interpersonal skills.`,
			pt: `Favr é um PWA que melhora a qualidade de vida dos cidadãos mais velhos conectando-os com estudantes voluntários. Este projeto faz parte do diploma pós-graduação em Design e Desenvolvimento de Aplicativos Web e Móveis da Langara e exigiu que nossa equipe de 8 pessoas (4 designers e 4 desenvolvedores) construísse um MVP da nossa ideia em menos de 12 semanas. Embora a *stack* tecnológica não fosse novidade para mim, a experiência de trabalhar tão próximo de designers e de ter que entregar uma aplicação completa em cerca de três meses certamente foi. Não podíamos utilizar bibliotecas ou *frameworks*, por isso o planejamento e a organização adequados do projeto foram fundamentais para entregarmos o aplicativo no prazo. Minha atuação concentrou-se principalmente no desenvolvimento *backend* com JavaScript e no gerenciamento utilizando a plataforma Firebase. Foi também minha primeira experiência com um banco de dados NoSQL. Além de aprimorar minhas habilidades técnicas de programação, esse projeto me ensinou muito sobre gestão de projetos, organização e planejamento, e fortaleceu minhas habilidades interpessoais.`
		},
		platforms: ['Web']
	},
	{
		id: 5,
		title: { en: "Seb's Portfolio", pt: 'Portfólio de Seb' },
		coverPath: '/images/seb-richardson.png',
		url: 'https://sebrichardson.ca/',
		tags: ['HTML', 'CSS', 'JavaScript', 'Svelte', 'Tailwind CSS', 'GSAP'],
		startYear: 2025,
		shortDescription: {
			en: `A freelance project for a talented UI/UX designer. Beautifully designed in Figma, I was hired to bring this portfolio to life. I took the opportunity to deepen my knowledge of Svelte, TailwindCSS, and GSAP.`,
			pt: `Um projeto freelancer para um designer UI/UX talentoso. Beautifully designed in Figma, I was hired to bring this portfolio to life. I took the opportunity to deepen my knowledge of Svelte, TailwindCSS, and GSAP.`
		},
		longDescription: {
			en: `I was hired to do one of my favourite things ever: bring a Figma mockup to life. I took the opportunity to deepen my knowledge of <strong>Svelte</strong>, <strong>TailwindCSS</strong>, and <strong>GSAP</strong>. As any developer that has implemented a design of a talented UI/UX designer before might imagine, it was a challenge to make a fully functional yet pixel-perfect version of this portfolio (but that just added to the fun!).`,
			pt: `Fuí contratado para fazer uma das minhas coisas favoritas de todos os tempos: trazer um mockup do Figma para a vida. Aproveitei a oportunidade para aprofundar meu conhecimento de <strong>Svelte</strong>, <strong>TailwindCSS</strong>, e <strong>GSAP</strong>. Como qualquer desenvolvedor que já implementou um design de um designer UI/UX talentoso antes pode imaginar, foi um desafio criar uma versão totalmente funcional mas perfeita em pixels deste portfólio (mas isso apenas adicionou ao divertimento!).`
		},
		platforms: ['Web']
	},
	{
		id: 6,
		title: { en: 'Langara Fine Arts Gradshow', pt: 'Exposição Virtual de Artes Finas' },
		coverPath: '/images/langara-fine-arts-gradshow.png',
		url: 'https://langarafinagradshow.com/',
		tags: ['Next.JS', 'Headless CMS', 'WordPress', 'GraphQL', 'AWS', 'PHP', 'CSS'],
		startYear: 2025,
		shortDescription: {
			en: `A virtual exhibition platform for graduates from Langara College's Fine Arts program to post their portfolios. `,
			pt: `Uma plataforma de exposição virtual para graduados do programa de Artes Finas da Langara College para publicar seus portfólios. `
		},
		longDescription: {
			en: `During my last term at Langara, I was hired by the college to maintain a headless CMS system that is used by graduates of the Fine Arts program to post their work as a virtual exhibition.   The system is a headless CMS built with WordPress and Next.js, with GraphQL as the query language. The backend is an Apache web server hosted in an AWS EC2 instance.`,
			pt: `Durante meu último semestre na Langara, fui contratado pela faculdade para manter um sistema de CMS sem cabeça que é usado pelos graduados do programa de Artes Finas para publicar seu trabalho como uma exposição virtual.   O sistema é um CMS sem cabeça construído com WordPress e Next.js, com GraphQL como linguagem de consulta. O backend é um servidor web Apache hospedado em uma instância AWS EC2.`
		},
		platforms: ['Web']
	}
];
