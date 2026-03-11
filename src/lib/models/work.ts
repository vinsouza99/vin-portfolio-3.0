export interface Work {
	id: number;
	title: string;
	coverPath: string;
	year: number;
	shortDescription: string;
	longDescription?: string;
	tags?: string[]; // Optional tags for categorization
}
