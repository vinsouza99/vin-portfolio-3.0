export interface Milestone {
	id: number;
	title: { en: string; pt: string };
	startYear: number;
	endYear?: number; // Optional end year for ongoing work
}
