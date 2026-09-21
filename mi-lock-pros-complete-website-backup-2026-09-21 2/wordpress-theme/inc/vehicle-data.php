<?php
/** Vehicle key coverage supplied by MI Lock Pros. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function mlp_vehicle_make( $name, $slug, $logo, $models ) {
	return array(
		'name' => $name, 'slug' => $slug,
		'logo' => 'https://cdn.jsdelivr.net/npm/car-brand-logos@1.0.0/' . $logo,
		'summary' => sprintf( 'Replacement keys, spare keys, transponder programming, key fob programming, and smart-key service for supported %s vehicles.', $name ),
		'models' => $models,
	);
}

function mlp_vehicle_makes() {
	return array(
		mlp_vehicle_make( 'Acura', 'acura', 'acura-logo.svg', array( 'CL', 'CSX', 'EL', 'ILX', 'Legend', 'MDX', 'NSX', 'RDX', 'RL', 'RLX', 'RSX', 'TL', 'TLX', 'TSX', 'ZDX' ) ),
		mlp_vehicle_make( 'Alfa Romeo', 'alfa-romeo', 'alfa-romeo-logo.svg', array( 'Giulia', 'Stelvio' ) ),
		mlp_vehicle_make( 'BMW', 'bmw', 'bmw-logo.svg', array( '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', 'F Series', 'M3', 'X1', 'X3', 'X4', 'X5', 'X6' ) ),
		mlp_vehicle_make( 'Buick', 'buick', 'buick-logo.png', array( 'Allure', 'Cascada', 'Enclave', 'Encore', 'Envision', 'Envista', 'LaCrosse', 'Lucerne', 'Rendezvous', 'Park Avenue', 'Regal', 'LeSabre', 'Verano' ) ),
		mlp_vehicle_make( 'Cadillac', 'cadillac', 'cadillac-logo.png', array( 'ATS', 'CT4', 'CT5', 'CT6', 'CTS', 'DeVille', 'DTS', 'Escalade', 'Seville', 'SRX', 'STS', 'XTS', 'XT4', 'XT5', 'XT6' ) ),
		mlp_vehicle_make( 'Chevrolet', 'chevrolet', 'chevrolet-logo.png', array( 'Astro / Astro Van', 'Avalanche', 'Blazer', 'Bolt', 'Camaro', 'Caprice', 'Captiva', 'City Express', 'Cobalt', 'Colorado', 'Corvette', 'Cruze', 'Equinox', 'Express', 'Impala', 'HHR', 'Malibu', 'Silverado', 'Sonic', 'Spark', 'Suburban', 'Tahoe', 'Trailblazer', 'Traverse', 'Trax', 'Uplander', 'Volt' ) ),
		mlp_vehicle_make( 'Chrysler', 'chrysler', 'chrysler-logo.svg', array( '200', '300', '300M', 'Aspen', 'Concorde', 'Pacifica', 'PT Cruiser', 'Sebring', 'Town & Country', 'Voyager' ) ),
		mlp_vehicle_make( 'Dodge', 'dodge', 'dodge-logo.png', array( 'Avenger', 'Caliber', 'Caravan', 'Challenger', 'Charger', 'Dakota', 'Dart', 'Daytona', 'Durango', 'Grand Caravan', 'Journey', 'Magnum', 'Neon', 'Ram', 'Ram 2500', 'Ram 4500', 'Ram 5500' ) ),
		mlp_vehicle_make( 'Ford', 'ford', 'ford-logo.png', array( 'Bronco', 'C-Max', 'Crown Victoria', 'E-150', 'E-250', 'E-350', 'EcoSport', 'Econoline', 'Edge', 'Escape', 'Excursion', 'Expedition', 'Explorer', 'F-150', 'F-150 Raptor', 'F-250', 'F-350', 'F-450', 'F-550', 'F-650', 'Fiesta', 'Flex', 'Focus', 'Freestar', 'Fusion', 'Maverick', 'Mustang', 'Mustang Cobra', 'Ranger', 'S-Max', 'Taurus', 'Thunderbird', 'Transit', 'Transit Connect', 'Windstar' ) ),
		mlp_vehicle_make( 'GMC', 'gmc', 'gmc-logo.png', array( 'Acadia', 'Canyon', 'Envoy', 'Hummer', 'Savanna', 'Sierra', 'Terrain', 'Yukon' ) ),
		mlp_vehicle_make( 'Honda', 'honda', 'honda-logo.png', array( 'Accord', 'Civic', 'Crosstour', 'CR-V', 'CR-Z', 'Element', 'Fit', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Prelude', 'Prologue', 'Ridgeline', 'S2000' ) ),
		mlp_vehicle_make( 'Hyundai', 'hyundai', 'hyundai-logo.svg', array( 'Accent', 'Avante', 'Azera', 'Elantra', 'Genesis', 'Kona', 'Santa Fe', 'Sonata', 'Tiburon', 'Tucson', 'Veloster', 'Venue' ) ),
		mlp_vehicle_make( 'Infiniti', 'infiniti', 'infiniti-logo.svg', array( 'EX35', 'EX37', 'FX35', 'FX37', 'FX45', 'FX50', 'G20', 'G25', 'G35', 'G37', 'I30', 'I35', 'J30', 'JX35', 'M30', 'M35', 'M37', 'M45', 'M56', 'Q30', 'Q40', 'Q45', 'Q50', 'Q60', 'Q70', 'QX4', 'QX30', 'QX50', 'QX55', 'QX56', 'QX60', 'QX70', 'QX80' ) ),
		mlp_vehicle_make( 'Jaguar', 'jaguar', 'jaguar-logo.svg', array( 'F-PACE', 'F-TYPE', 'XE', 'XF', 'XJ' ) ),
		mlp_vehicle_make( 'Jeep', 'jeep', 'jeep-logo.svg', array( 'Cherokee', 'Commander', 'Compass', 'Gladiator', 'Grand Cherokee', 'Laredo', 'Liberty', 'Patriot', 'Renegade', 'Rubicon', 'Trailhawk', 'Wrangler' ) ),
		mlp_vehicle_make( 'Kia', 'kia', 'kia-logo.svg', array( 'Borrego', 'Cadenza', 'Carnival', 'Cerato', 'Forte', 'Niro', 'Optima', 'Rio', 'Sedona', 'Seltos', 'Sorento', 'Soul', 'Spectra', 'Sportage', 'Telluride' ) ),
		mlp_vehicle_make( 'Land Rover', 'land-rover', 'land-rover-logo.svg', array( 'Discovery', 'Discovery Sport', 'LR2', 'LR4', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar' ) ),
		mlp_vehicle_make( 'Lexus', 'lexus', 'lexus-logo.png', array( 'ES 250', 'ES 300h', 'ES 350', 'GS 300', 'GS 350', 'GS 450', 'IS 200', 'IS 300', 'IS 350', 'LS 500 / 500h', 'LX 570', 'NX 200', 'NX 300', 'RX 350', 'RX 450' ) ),
		mlp_vehicle_make( 'Lincoln', 'lincoln', 'lincoln-logo.svg', array( 'Aviator', 'Continental', 'LS', 'MKC', 'MKT', 'MKX', 'MKZ', 'Nautilus', 'Navigator', 'Town Car' ) ),
		mlp_vehicle_make( 'Maserati', 'maserati', 'maserati-logo.png', array( 'Ghibli', 'Levante', 'Quattroporte' ) ),
		mlp_vehicle_make( 'Mazda', 'mazda', 'mazda-logo.svg', array( 'Mazda2', 'Mazda3', 'Mazda5', 'Mazda6', 'CX-5', 'CX-7', 'CX-9', 'Tribute' ) ),
		mlp_vehicle_make( 'Mercedes-Benz', 'mercedes-benz', 'mercedes-benz-logo.svg', array( 'A-Class', 'B-Class', 'C-Class', 'CLK-Class', 'CLS-Class', 'E-Class', 'G-Class', 'M-Class', 'ML-Class', 'S-Class', 'Sprinter' ) ),
		mlp_vehicle_make( 'Mercury', 'mercury', 'mercury-logo.png', array( 'Grand Marquis', 'Mariner', 'Milan', 'Montego', 'Monterey', 'Mountaineer', 'Sable' ) ),
		mlp_vehicle_make( 'MINI', 'mini', 'mini-logo.svg', array( 'Cooper', 'Countryman', 'Paceman' ) ),
		mlp_vehicle_make( 'Mitsubishi', 'mitsubishi', 'mitsubishi-logo.svg', array( 'Eclipse', 'Endeavor', 'Galant', 'Lancer', 'Lancer Evolution', 'Mirage', 'Montero', 'Outlander' ) ),
		mlp_vehicle_make( 'Nissan', 'nissan', 'nissan-logo.svg', array( '350Z', '370Z', 'Altima', 'Cube', 'Frontier', 'Juke', 'Kicks', 'Leaf', 'Maxima', 'Murano', 'Note', 'NV', 'NV200', 'NV1500', 'NV2500', 'NV3500', 'Pathfinder', 'Quest', 'Rogue', 'Sentra', 'Titan', 'Versa Note', 'X-Trail', 'Xterra' ) ),
		mlp_vehicle_make( 'Scion', 'scion', 'scion-logo.png', array( 'tC', 'xD' ) ),
		mlp_vehicle_make( 'Toyota', 'toyota', 'toyota-logo.svg', array( '4Runner', 'Avalon', 'Camry', 'Corolla', 'FJ Cruiser', 'Highlander', 'Land Cruiser', 'Matrix', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Supra', 'Tacoma', 'Tundra', 'Venza', 'Yaris' ) ),
	);
}

function mlp_get_vehicle_make( $slug ) {
	foreach ( mlp_vehicle_makes() as $make ) { if ( $make['slug'] === $slug ) { return $make; } }
	return null;
}

function mlp_vehicle_key_services() {
	return array(
		array( 'name' => 'Car key replacement', 'slug' => 'car-key-replacement', 'description' => 'Replacement keys for supported all-keys-lost, damaged-key, and spare-key situations.' ),
		array( 'name' => 'Key duplication', 'slug' => 'key-duplication', 'description' => 'A compatible spare cut and programmed while a working key is available.' ),
		array( 'name' => 'Transponder key programming', 'slug' => 'transponder-key-programming', 'description' => 'Compatible chip keys programmed to supported vehicle immobilizer systems.' ),
		array( 'name' => 'Key fob programming', 'slug' => 'key-fob-programming', 'description' => 'Compatible replacement remotes and key fobs paired and tested.' ),
		array( 'name' => 'Push-to-start smart keys', 'slug' => 'push-to-start-smart-keys', 'description' => 'Compatible proximity and push-button-start keys programmed for supported vehicles.' ),
	);
}
