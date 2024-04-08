export interface Organization {
	id?: number;
	name: string; // Default: 'Default Org'
	tagline?: string;
	description?: string;
	type?:
		| "farm"
		| "startup"
		| "nonprofit"
		| "government"
		| "education"
		| "other"; // Default: 'farm'
	tags?: string[]; // Default: []
	website?: string;
	phone?: string;
	emails?: string[]; // Custom type or string assuming email validation elsewhere
	email_primary?: string; // Must be one of `emails`
	country?: string; // Default: 'BD', length should be 2 characters
	city?: string;
	timezone?: string; // Default: 'Asia/Dhaka'
	language?: string; // Default: 'en', length should be 2 characters
	location?: object; // JSONB, assuming any type, should match GeoJSON structure
	urls?: [{ name: string; url: string }]; // JSONB, assuming any type, format: [{name: url}]
	logo?: string; // Assuming UUID is a string
	banner?: string; // Assuming UUID is a string
	creator_id?: string; // Assuming UUID is a string, references auth.user_entity(id)
	slug?: string; // Generated and stored, based on name
	created_at?: Date; // Default: NOW()
	updated_at?: Date; // Default: NOW()
}
