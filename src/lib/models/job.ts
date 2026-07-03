import type { Milestone } from './milestone';

export interface Job extends Milestone {
	company: string; // Optional company name for work experience
	url?: string;
	location: string;
	shortDescription: { pt: string; en: string };
	longDescription?: { pt: string; en: string };
	tags?: string[]; // Optional tags for categorization
}
