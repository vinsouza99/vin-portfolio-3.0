import type { Milestone } from './milestone';

export interface Work extends Milestone {
	coverPath: string;
	url: string;
	shortDescription: string;
	longDescription?: string;
	endYear?: number;
	tags?: string[]; // Optional tags for categorization
	category?: string; // Optional category for filtering
}
