import type { Edu } from '$lib/models/edu';
export const education: Edu[] = [
	{
		id: 1,
		title: {
			en: 'Bachelor of Computer Science',
			pt: 'Bacharel em Ciência da Computação'
		},
		location: 'Campina Grande, Brazil',
		institution: 'UFCG',
		tags: ['8.5/10 GPA'],
		startYear: 2018,
		type: 'degree',
		endYear: 2023,
		shortDescription: {
			en: 'Graduation in a little bit of everything about computers',
			pt: 'Formação em um pouco de tudo sobre computadores'
		},
		longDescription: {
			en: `The UFCG Computer Science course is one of the oldest and most celebrated in the IT field throughout Brazil. The four-year program taught me a little bit of everything about computers. I gained a strong understanding of Object-Oriented Programming (OOP), as well as Java, Python, unit testing, machine learning, software engineering and architecture, project management, among other skills.`,
			pt: `O curso de Ciência da Computação da UFCG é um dos mais antigos e respeitados no campo de TI em todo o Brasil. O programa de quatro anos me ensinou um pouco de tudo sobre computadores. Adquiri um forte entendimento de Programação Orientada a Objetos (POO), além do Java, Python, testes unitários, aprendizado de máquina, engenharia de software e arquitetura, gestão de projetos, entre outras habilidades.`
		}
	},
	{
		id: 2,
		title: {
			en: 'Post-Degree in Web & Mobile Development',
			pt: 'Pós-Graduação em Desenvolvimento Web e Mobile'
		},
		location: 'Vancouver, Canada',
		institution: 'Langara College',
		tags: ['4.03 CGPA', "4x Dean's Honour Roll"],
		startYear: 2024,
		endYear: 2025,
		type: 'degree',
		shortDescription: {
			en: 'Specialization in the entire process of building web and mobile apps, from concept to deployment',
			pt: 'Especialização no processo completo de construção de aplicativos web e móveis, do conceito à implantação'
		},
		longDescription: {
			en: `This two-year post-degree diploma program focuses on web and mobile app design and development, from concept to deployment. <br/><br/>The tech stack ranges from design software to modern web frameworks such as React, CMS tools like WordPress, and server management with Apache and AWS. However, the most valuable skills I gained aside from the technical ones were project management related. <br/><br/>I had the opportunity to serve as the development lead for both BodyBuddy and DriveBuddy and these experiences had an unvaluable impact on my personal and professional development.`,
			pt: `Este programa de diploma pós-graduado de dois anos se concentra no design e desenvolvimento de aplicativos web e móveis, do conceito à implantação. <br/><br/>A pilha tecnológica abrange softwares de design até frameworks web modernos como React, ferramentas CMS como WordPress e gestão de servidores com Apache e AWS. No entanto, as habilidades mais valiosas que adquiri além das técnicas foram as relacionadas à gestão de projetos. <br/><br/>Tive a oportunidade de atuar como líder de desenvolvimento para o BodyBuddy e o DriveBuddy e essas experiências tiveram um impacto inestimável no meu desenvolvimento pessoal e profissional.`
		}
	},
	{
		id: 3,
		title: {
			en: "Harvard's CS50 Web Programming Professional Certificate",
			pt: "Certificado Profissional de Programação Web do Harvard's CS50"
		},
		location: 'Online',
		institution: 'Harvard University',
		tags: ['Python', 'Django', 'JavaScript', 'HTML', 'SQL', 'CSS'],
		startYear: 2020,
		endYear: 2021,
		type: 'certificate',
		shortDescription: {
			en: 'My entry point to the career path of web development',
			pt: 'Meu ponto de entrada no caminho profissional de desenvolvimento web'
		},
		longDescription: {
			en: `This course on the edX platform was my entry point to the career path of web development.  <br/><br/>Offered by Harvard's CS50 program, it was not only an excellent introduction to the topic, but it also helped me discover my passion for app development. This course dives deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. <br/><br/>As part of my final project, I did a very simple but special website called JSnake, that is detailed in my portfolio. At the end of that very intense program, I earned my first professional Certificate, that you can find here`,
			pt: `Este curso na plataforma edX foi meu ponto de entrada no caminho profissional de desenvolvimento web.  <br/><br/>Oferecido pelo programa CS50 da Harvard, não foi apenas uma excelente introdução ao tópico, mas também me ajudou a descobrir minha paixão por desenvolvimento de aplicativos. Este curso aprofunda-se profundamente no design e implementação de aplicativos web com Python, JavaScript e SQL usando frameworks como Django, React e Bootstrap. <br/><br/>Como parte do meu projeto final, desenvolvi um website muito simples mas especial chamado JSnake, que está detalhado em minha portfolio. No final desse programa muito intenso, conquistei meu primeiro certificado profissional, que você pode encontrar aqui`
		},
		url: 'https://courses.edx.org/certificates/bc857b54e42d436981747ef17f061d81',

		urlLabel: 'Verified Certificate'
	},
	{
		id: 4,
		title: {
			en: 'Docker Foundations Professional Certificate',
			pt: 'Certificado Profissional de Fundamentos do Docker'
		},
		location: 'Online',
		institution: 'Linkedin Learning',
		type: 'certificate',
		tags: ['Docker', 'YML', 'Containers', 'Microservices'],
		startYear: 2025,
		shortDescription: {
			en: 'Granted me a working knowledge of one of the most used CI/CD tools in the market',
			pt: 'Me deu um conhecimento prático de uma das ferramentas de CI/CD mais usadas no mercado'
		},
		longDescription: {
			en: 'An industry-recognized Docker Foundations Professional Certificate.<br/><br/>I learned how to use Docker to deploy and manage applications as images that run on containers. This knowledge proved to be very helpful in real projects like Current AI.',
			pt: 'Um certificado profissional reconhecido pela indústria.<br/><br/>Aprendi como usar o Docker para implantar e gerenciar aplicativos como imagens que rodam em contêineres. Este conhecimento provou ser muito útil em projetos reais como o Current AI.'
		},
		url: 'https://www.linkedin.com/learning/certificates/6be982f69980db3cf9ce50a0290018a8facb234b808e58670bbd6447e12ba570',
		urlLabel: 'Verified Certificate'
	}
];
