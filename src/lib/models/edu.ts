import type { Milestone } from './milestone';

export interface Edu extends Milestone {
	institution: string; // Optional company name for work experience
	shortDescription: string;
	longDescription?: string;
	tags?: string[]; // Optional tags for categorization
}
