export interface Milestone {
	id: number;
	title: string;
	startYear: number;
	endYear?: number; // Optional end year for ongoing work
}
