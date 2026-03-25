import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const supportedLocales = ['en', 'pt-BR'] as const;
export type Locale = (typeof supportedLocales)[number];

const languageContextKey = Symbol('language');

export const normalizeLocale = (value: string | null | undefined): Locale => {
	return value === 'pt-BR' ? 'pt-BR' : 'en';
};

export const messages = {
	en: {
		'nav.skills': 'skills',
		'nav.works': 'works',
		'nav.career': 'career',
		'nav.education': 'education',
		'nav.contact': 'contact',
		'nav.resume': 'resume',
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
		'sections.contact.summary': 'Get in touch whenever you feel like building something awesome.'
	},
	'pt-BR': {
		'nav.skills': 'habilidades',
		'nav.works': 'projetos',
		'nav.career': 'carreira',
		'nav.education': 'educação',
		'nav.contact': 'contato',
		'nav.resume': 'currículo',
		'landing.hello': 'Hello world!',
		'landing.intro': 'Meu nome é',
		'landing.role': 'e sou um desenvolvedor full-stack :)',
		'sections.skills.title': 'habilidades',
		'sections.skills.summary':
			'Estudei e trabalhei com algumas das linguagens, frameworks, ferramentas e bibliotecas mais populares do mercado.',
		'sections.works.title': 'projetos',
		'sections.works.summary':
			'O que me atraiu para o desenvolvimento web, em primeiro lugar, foi o próprio processo. E divertido apesar de todo o trabalho necessaário para construir algo legal. Durante minhas experiências de trabalho e estudos, formais e autodidatas, criei várias coisas das quais me orgulho. Aqui estão algumas delas!',
		'sections.career.title': 'carreira',
		'sections.career.summary':
			'Embora minha história com desenvolvimento web e programação seja curta e movida principalmente por autoaprendizado e projetos solo, existem marcos que me trouxeram expêriencias significativas de crescimento pessoal e profissional nessa jornada.',
		'sections.education.title': 'educação',
		'sections.education.summary':
			'"O coração inteligente adquire conhecimento, e o ouvido dos sábios procura o saber." - Provérbios 18:15',
		'sections.contact.title': 'contato',
		'sections.contact.summary': 'Entre em contato sempre que quiser construir algo incrível'
	}
} as const;

export type MessageKey = keyof (typeof messages)['en'];

export const t = (locale: Locale, key: MessageKey) => messages[locale][key];

export const setLanguageContext = (initialLocale: string | null | undefined) => {
	const language = writable<Locale>(normalizeLocale(initialLocale));
	setContext(languageContextKey, language);
	return language;
};

export const getLanguageContext = (): Writable<Locale> => {
	const context = getContext<Writable<Locale> | undefined>(languageContextKey);
	if (!context) {
		throw new Error(
			'Language context was not initialized. Call setLanguageContext in +layout.svelte.'
		);
	}
	return context;
};
