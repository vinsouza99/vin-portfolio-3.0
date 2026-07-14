import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export const supportedLocales = ['en', 'pt-br'] as const;
export type Locale = supportedLocales[number];

const languageContextKey = Symbol('language');

export const normalizeLocale = (value: string | null | undefined): Locale => {
	return value === 'pt-br' ? 'pt-br' : 'en';
};

export const messages = {
	en: {
		landing: `I bring more than 5 years of experience building thoughtful web and mobile experiences
				using modern languages, frameworks, and cloud tooling.`,
		'nav.skills': 'skills',
		'nav.works': 'works',
		'nav.career': 'career',
		'nav.education': 'education',
		'nav.contact': 'contact',
		'nav.resume': 'resume',
		'nav.resume.link': '/vin-souza-resume.pdf',
		'nav.hamburgerLabel': 'Toggle navigation menu',
		'landing.hello': 'Hello, world!',
		'landing.intro': "I'm",
		'landing.role': "and I'm a full-stack developer :)",
		'sections.skills.title': 'skills',
		'sections.skills.summary':
			"I've studied and worked with some of the most popular languages, frameworks, tools and libraries on the market.",
		'sections.works.title': 'works',
		'sections.works.summary':
			"The thing that drew me towards web development in the first place was the process itself. It is fun despite all the work required to pull something cool off. During my work experiences and studies, both formal and self-conducted, I've built many things I'm proud of. Here are some of them!",
		'sections.career.title': 'career',
		'sections.career.summary':
			'Although my history with web development and programming has been short and driven mostly by self-learning and solo projects, there are some milestones that provided me with significant personal and professional growth experiences during this journey.',
		'sections.education.title': 'education',
		'sections.education.summary':
			'"An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge." - Proverbs 18:15',
		'sections.contact.title': 'contact',
		'sections.contact.summary': 'Get in touch whenever you feel like building something awesome.',
		'sections.contact.form.from': 'from',
		'sections.contact.form.to': 'to',
		'sections.contact.form.email-placeholder': 'your email',
		'sections.contact.form.message-placeholder': 'your message',
		'sections.contact.form.subject': `subject`,
		'sections.contact.form.subject-placeholder': `what's up?`,
		'sections.contact.form.submit-button': 'send',
		'sections.contact.form.submitting': 'Sending...',
		'sections.contact.form.success': 'Message sent successfully!',
		'sections.contact.form.error':
			'An error occurred while sending the message. Please try again later.',
		'skills.notFound': "I haven't learned that yet!",
		'skills.tag.all': 'all',
		'skills.tag.frontend': 'frontend',
		'skills.tag.backend': 'backend',
		'skills.tag.languages': 'languages',
		present: 'present'
	},
	'pt-br': {
		landing: `Tenho mais de 5 anos de experiência construindo experiências web e móveis bem pensadas usando linguagens, frameworks e ferramentas modernas.`,
		'nav.skills': 'habilidades',
		'nav.works': 'projetos',
		'nav.career': 'carreira',
		'nav.education': 'educação',
		'nav.contact': 'contato',
		'nav.resume': 'currículo',
		'nav.resume.link': '/vin-souza-curriculo.pdf',
		'nav.hamburgerLabel': 'Abrir ou fechar menu de navegação',
		'landing.hello': 'Hello world!',
		'landing.intro': 'Meu nome é',
		'landing.role': 'e sou um desenvolvedor full-stack :)',
		'sections.skills.title': 'habilidades',
		'sections.skills.summary':
			'Estudei e trabalhei com algumas das linguagens, frameworks, ferramentas e bibliotecas mais populares do mercado.',
		'sections.works.title': 'projetos',
		'sections.works.summary':
			'O que me atraiu para o desenvolvimento web, em primeiro lugar, foi o próprio processo. E divertido apesar de todo o trabalho necessário para construir algo legal. Durante minhas experiências de trabalho e estudos, formais e autodidatas, criei várias coisas das quais me orgulho. Aqui estão algumas delas!',
		'sections.career.title': 'carreira',
		'sections.career.summary':
			'Embora minha história com desenvolvimento web e programação seja curta e movida principalmente por autoaprendizado e projetos solo, existem marcos que me trouxeram expêriencias significativas de crescimento pessoal e profissional nessa jornada.',
		'sections.education.title': 'educação',
		'sections.education.summary':
			'"O coração inteligente adquire conhecimento, e o ouvido dos sábios procura o saber." - Provérbios 18:15',
		'sections.contact.title': 'contato',
		'sections.contact.summary': 'Entre em contato sempre que quiser construir algo incrível',
		'sections.contact.form.from': 'de',
		'sections.contact.form.to': 'para',
		'sections.contact.form.email-placeholder': 'seu email',
		'sections.contact.form.message-placeholder': 'sua mensagem',
		'sections.contact.form.subject': `assunto`,
		'sections.contact.form.subject-placeholder': `o que há de novo?`,
		'sections.contact.form.submit-button': 'enviar',
		'sections.contact.form.submitting': 'Enviando...',
		'sections.contact.form.success': 'Mensagem enviada com sucesso!',
		'sections.contact.form.error':
			'Um erro ocorreu ao enviar a mensagem. Por favor, tente novamente mais tarde.',
		'skills.notFound': 'Ainda não aprendi isso!',
		'skills.tag.all': 'todas',
		'skills.tag.frontend': 'frontend',
		'skills.tag.backend': 'backend',
		'skills.tag.languages': 'linguagens',
		present: 'presente'
	}
} as const;

export type MessageKey = keyof (typeof messages)['en'];

export const t = (locale: Locale, key: MessageKey) => messages[locale][key];

export const setLanguageContext = (initialLocale: string | null | undefined) => {
	const language = writable<Locale>(normalizeLocale(initialLocale));
	setContext(languageContextKey, language);
	return language;
};

// export const getLanguageContext = (): Writable<Locale> => {
// 	const context = getContext<Writable<Locale> | undefined>(languageContextKey);
// 	if (!context) {
// 		throw new Error(
// 			'Language context was not initialized. Call setLanguageContext in +layout.svelte.'
// 		);
// 	}
// 	return context;
// };

export function getLanguageContext(): () => Locale {
	return getContext('lang');
}
