export interface Entity {
	name?: string;
	subtitle?: string;
	logo?: string;
	icon?: string;
	banner?: string;
	description?: string;
	category?: string;
	tags?: string[];
	features?: { name: string; desc?: string }[];
	url?: string;
	exturl?: string;
}
