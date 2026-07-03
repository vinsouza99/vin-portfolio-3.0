import type { Milestone } from './milestone';

export interface Edu extends Milestone {
	institution: string; // Optional company name for work experience
	location: string;
	shortDescription: { pt: string; en: string };
	longDescription?: { pt: string; en: string };
	tags?: string[]; // Optional tags for categorization
	type?: string; // Optional type for categorization (e.g., "degree", "certificate")
	url?: string;
	urlLabel?: string;
}
