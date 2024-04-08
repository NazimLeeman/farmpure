CREATE TYPE farm_asset_availability_status AS ENUM (
  'available',
  'sold',
  'reserved',
  'archived',
  'unlisted'
);
CREATE OR REPLACE VIEW v_farm_asset_availability_status AS
SELECT unnest(enum_range(NULL::farm_asset_availability_status)) AS option;

CREATE TYPE farm_asset_pricing_structure AS ENUM (
  'fixed',
  'negotiable',
  'auction'
);
CREATE OR REPLACE VIEW v_farm_asset_pricing_structure AS
SELECT unnest(enum_range(NULL::farm_asset_pricing_structure)) AS option;

CREATE TABLE IF NOT EXISTS farm_asset_types (
  id INT GENERATED BY DEFAULT AS IDENTITY (START WITH 101) PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT,
  tags TEXT[],
  labels JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

--
CREATE TABLE IF NOT EXISTS farm_assets (
  id INT GENERATED BY DEFAULT AS IDENTITY (START WITH 1001) PRIMARY KEY,
  type_id INT NOT NULL REFERENCES farm_asset_types(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  tags TEXT[],
  labels JSONB,
  photo TEXT,
  banner TEXT,
  quantity INT DEFAULT 1,
  date_acquired DATE,
  date_sold DATE,
  tx_currency VARCHAR(3) DEFAULT 'BDT',
  acquisition_cost DECIMAL,
  current_price DECIMAL,
  sold_price DECIMAL,
  availability_status farm_asset_availability_status DEFAULT 'available',
  pricing_structure farm_asset_pricing_structure DEFAULT 'fixed',
  additional_info JSONB,
  creator_id TEXT REFERENCES public.users(id),
  farm_id INT NOT NULL REFERENCES organizations(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for improved join performance and filtering
CREATE INDEX idx_farm_assets_type_id ON farm_assets(type_id);
CREATE INDEX idx_farm_assets_created_by ON farm_assets(creator_id);

GRANT USAGE ON TYPE farm_asset_availability_status,farm_asset_pricing_structure TO anon;
GRANT SELECT ON v_farm_asset_pricing_structure,v_farm_asset_availability_status TO anon;

GRANT SELECT ON farm_asset_types,farm_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON farm_asset_types,farm_assets TO authn;

-- ================================================ MOCKS ================================================
INSERT INTO farm_asset_types (name, description, tags, labels) VALUES
('Crop', 'Plants cultivated for food, feed, fiber, and fuel.', '{"grain", "vegetable", "fruit"}', '{"seasonality": {"kharif": "monsoon", "rabi": "winter", "zaid": "summer"}}'),
('Land', 'Area used for agricultural purposes.', '{"arable", "pasture", "orchard"}', '{"soilType": ["alluvial", "loamy", "silty"] }'),
('Livestock', 'Domestic animals raised for home use or for profit.', '{"cattle", "goat", "poultry"}', '{"purpose": ["dairy", "meat", "eggs"] }'),
('Fishery', 'Cultivation of fish and other aquatic animals.', '{"freshwater", "brackish", "marine"}', '{"technique": ["pond", "cage", "pen"] }'),
('Machinery', 'Tools and machines for farming operations.', '{"tractor", "plough", "harvester"}', '{"operation": ["sowing", "harvesting", "processing"] }'),
('Equipment', 'Systems and equipment for supplying water to crops.', '{"tube well", "sprinkler", "drip"}', '{"waterSource": ["groundwater", "canal", "rainfed"] }'),
('Fertilizers', 'Organic or inorganic materials added to the soil to supply nutrients.', '{"urea", "compost", "NPK"}', '{"type": ["organic", "inorganic"] }'),
('Pesticides', 'Chemicals or biological agents that kill pests.', '{"insecticide", "herbicide", "fungicide"}', '{"target": ["insects", "weeds", "fungi"] }'),
('Aquaculture', 'Farming of aquatic organisms including fish, crustaceans, mollusks.', '{"fish", "shrimp", "seaweed"}', '{"environment": ["freshwater", "marine"] }'),
('Horticulture', 'The art or practice of garden cultivation and management.', '{"vegetables", "fruits", "flowers"}', '{"type": ["floriculture", "arboriculture", "landscape"] }');

INSERT INTO farm_assets (
    type_id, name, description, tags, labels, photo, banner, quantity,
    date_acquired, date_sold, tx_currency, acquisition_cost, current_price,
    sold_price, availability_status, pricing_structure, additional_info,
    creator_id, farm_id, created_at, updated_at
) VALUES
-- Rice Crop (a staple food in Bangladesh)
(101, 'Aman Rice Crop', 'Aman rice grown during the monsoon season.', '{"rice", "crop"}',
'{"variety": "Aman"}', '451cf712-3cf2-4791-2087-3cce89de9100', '488bbd0c-5c56-4af9-9293-21825c091300', 1,
'2023-06-01', NULL, 'BDT', 5000, 7500, NULL, 'available', 'fixed',
'{"yield": "1500 kg/ha"}', '261868505865912865', '10001', NOW(), NOW()),

-- Dairy Cow (considering individual tracking for larger livestock)
(103, 'Dairy Cow', 'Local breed used for milk production.', '{"livestock", "dairy"}',
'{"breed": "Local", "milk_production": "20 liters/day"}', '7c770d9d-bc33-4ef9-9421-8039530fd000', '982952ef-baac-4398-8bc1-4f8efbc12b00', 1,
'2023-01-15', NULL, 'BDT', 30000, 32000, NULL, 'available', 'negotiable',
'{"vaccination": "up to date"}', '261868505865912865', '10001', NOW(), NOW()),

-- Poultry Chickens (tracking as a batch/group for smaller livestock)
(103, 'Layer Chickens', 'Chickens bred for the purpose of egg laying.', '{"livestock", "poultry"}',
'{"breed": "Rhode Island Red", "purpose": "eggs"}', '4edab655-2ba4-461d-6870-23fc7a956500', '87990a7b-f9f5-471c-ea73-6670ef709300', 1000,
'2023-05-20', NULL, 'BDT', 150000, 180000, NULL, 'available', 'fixed',
'{"average_egg_production": "250 eggs/year per chicken"}', '261868505865912865', '10001', NOW(), NOW()),

-- Tractor (important farming machinery in Bangladesh)
(105, 'Tractor', 'Used for ploughing, tilling, and planting fields.', '{"machinery", "tractor"}',
'{"model": "Mahindra 575", "horsepower": "45 HP"}', '198ddbd8-ac28-4c0e-4bd1-6cbe1594fc00', '64398438-23a2-4d1e-9d5c-9dfc4dd92600', 1,
'2023-02-10', NULL, 'BDT', 750000, 900000, NULL, 'available', 'negotiable',
'{"hours_used": "500"}', '261868505865912865', '10001', NOW(), NOW()),

-- Fish Pond (aquaculture asset for fish farming)
(109, 'Tilapia Fish Pond', 'Pond used for farming Tilapia.', '{"aquaculture", "fish"}',
'{"species": "Tilapia", "capacity": "2000 fish"}', 'fbb8e9ff-5a0d-46db-6dc6-c1948014b000', '4f6ddfae-bac3-427f-87e2-ad72b7199d00', 1,
'2023-03-12', NULL, 'BDT', 20000, 50000, NULL, 'available', 'fixed',
'{"water_source": "natural spring", "size": "0.5 acres"}', '261868505865912865', '10001', NOW(), NOW());

-- ================================================ MOCKS ================================================