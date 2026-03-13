import type { Milestone } from './milestone';

export interface Job extends Milestone {
	company: string; // Optional company name for work experience
	location: string;
	shortDescription: string;
	longDescription?: string;
	tags?: string[]; // Optional tags for categorization
}
