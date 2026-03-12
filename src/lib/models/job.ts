import type { Milestone } from './milestone';

export interface Job extends Milestone {
	company: string; // Optional company name for work experience
	shortDescription: string;
	longDescription?: string;
	tags?: string[]; // Optional tags for categorization
}
