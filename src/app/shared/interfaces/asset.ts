// Enums
export enum FarmAssetAvailabilityStatus {
	Available = "available",
	Sold = "sold",
	Reserved = "reserved",
	Archived = "archived",
	Unlisted = "unlisted",
}

export enum FarmAssetPricingStructure {
	Fixed = "fixed",
	Negotiable = "negotiable",
	Auction = "auction",
}

// Interfaces for Views
export interface VFarmAssetAvailabilityStatus {
	option: FarmAssetAvailabilityStatus;
}

export interface VFarmAssetPricingStructure {
	option: FarmAssetPricingStructure;
}

// Interfaces for Tables
export interface FarmAssetType {
	id: number; // Auto-generated, might not be needed on creation
	name: string;
	description?: string; // Optional because of TEXT
	tags?: string[]; // Optional because of TEXT[]
	labels?: any; // JSONB, replace `any` with a more specific type if desired
	created_at?: Date; // Auto-generated, might not be needed on creation
	updated_at?: Date; // Auto-generated, might not be needed on creation
}

export interface FarmAsset {
	id?: number; // Auto-generated, might not be needed on creation
	type_id: number; // References FarmAssetType.id
	name: string;
	description?: string; // Optional because of TEXT
	tags?: string[]; // Optional because of TEXT[]
	labels?: any; // JSONB, replace `any` with a more specific type if desired
	photo?: string; // Optional
	banner?: string; // Optional
	quantity?: number; // Default is 1
	date_acquired?: Date; // Optional
	date_sold?: Date; // Optional
	tx_currency?: string; // Default is 'BDT'
	acquisition_cost?: number; // Optional
	current_price?: number; // Optional
	sold_price?: number; // Optional
	availability_dtatus?: FarmAssetAvailabilityStatus; // Default is 'available'
	pricing_structure?: FarmAssetPricingStructure; // Default is 'fixed'
	additional_info?: object;
	created_by: string; // References auth.user_entity.id
	farm_uuid: string; // References organizations.uuid
	created_at?: Date;
	updated_at?: Date;
}
