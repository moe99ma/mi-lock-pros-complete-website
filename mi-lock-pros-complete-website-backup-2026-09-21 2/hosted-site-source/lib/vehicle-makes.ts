export type VehicleMake = {
  name: string;
  slug: string;
  logoUrl: string;
  logoAlt: string;
  summary: string;
  models: string[];
};

const brandLogoCdn = 'https://cdn.jsdelivr.net/npm/car-brand-logos@1.0.0';

function vehicleMake(name: string, slug: string, logoFile: string, models: string[]): VehicleMake {
  return {
    name,
    slug,
    logoUrl: `${brandLogoCdn}/${logoFile}`,
    logoAlt: `${name} logo`,
    summary: `Replacement keys, spare keys, transponder programming, key fob programming, and smart-key service for supported ${name} vehicles.`,
    models,
  };
}

export const vehicleMakes: VehicleMake[] = [
  vehicleMake('Acura', 'acura', 'acura-logo.svg', ['CL', 'CSX', 'EL', 'ILX', 'Legend', 'MDX', 'NSX', 'RDX', 'RL', 'RLX', 'RSX', 'TL', 'TLX', 'TSX', 'ZDX']),
  vehicleMake('Alfa Romeo', 'alfa-romeo', 'alfa-romeo-logo.svg', ['Giulia', 'Stelvio']),
  vehicleMake('BMW', 'bmw', 'bmw-logo.svg', ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', 'F Series', 'M3', 'X1', 'X3', 'X4', 'X5', 'X6']),
  vehicleMake('Buick', 'buick', 'buick-logo.png', ['Allure', 'Cascada', 'Enclave', 'Encore', 'Envision', 'Envista', 'LaCrosse', 'Lucerne', 'Rendezvous', 'Park Avenue', 'Regal', 'LeSabre', 'Verano']),
  vehicleMake('Cadillac', 'cadillac', 'cadillac-logo.png', ['ATS', 'CT4', 'CT5', 'CT6', 'CTS', 'DeVille', 'DTS', 'Escalade', 'Seville', 'SRX', 'STS', 'XTS', 'XT4', 'XT5', 'XT6']),
  vehicleMake('Chevrolet', 'chevrolet', 'chevrolet-logo.png', ['Astro / Astro Van', 'Avalanche', 'Blazer', 'Bolt', 'Camaro', 'Caprice', 'Captiva', 'City Express', 'Cobalt', 'Colorado', 'Corvette', 'Cruze', 'Equinox', 'Express', 'Impala', 'HHR', 'Malibu', 'Silverado', 'Sonic', 'Spark', 'Suburban', 'Tahoe', 'Trailblazer', 'Traverse', 'Trax', 'Uplander', 'Volt']),
  vehicleMake('Chrysler', 'chrysler', 'chrysler-logo.svg', ['200', '300', '300M', 'Aspen', 'Concorde', 'Pacifica', 'PT Cruiser', 'Sebring', 'Town & Country', 'Voyager']),
  vehicleMake('Dodge', 'dodge', 'dodge-logo.png', ['Avenger', 'Caliber', 'Caravan', 'Challenger', 'Charger', 'Dakota', 'Dart', 'Daytona', 'Durango', 'Grand Caravan', 'Journey', 'Magnum', 'Neon', 'Ram', 'Ram 2500', 'Ram 4500', 'Ram 5500']),
  vehicleMake('Ford', 'ford', 'ford-logo.png', ['Bronco', 'C-Max', 'Crown Victoria', 'E-150', 'E-250', 'E-350', 'EcoSport', 'Econoline', 'Edge', 'Escape', 'Excursion', 'Expedition', 'Explorer', 'F-150', 'F-150 Raptor', 'F-250', 'F-350', 'F-450', 'F-550', 'F-650', 'Fiesta', 'Flex', 'Focus', 'Freestar', 'Fusion', 'Maverick', 'Mustang', 'Mustang Cobra', 'Ranger', 'S-Max', 'Taurus', 'Thunderbird', 'Transit', 'Transit Connect', 'Windstar']),
  vehicleMake('GMC', 'gmc', 'gmc-logo.png', ['Acadia', 'Canyon', 'Envoy', 'Hummer', 'Savanna', 'Sierra', 'Terrain', 'Yukon']),
  vehicleMake('Honda', 'honda', 'honda-logo.png', ['Accord', 'Civic', 'Crosstour', 'CR-V', 'CR-Z', 'Element', 'Fit', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Prelude', 'Prologue', 'Ridgeline', 'S2000']),
  vehicleMake('Hyundai', 'hyundai', 'hyundai-logo.svg', ['Accent', 'Avante', 'Azera', 'Elantra', 'Genesis', 'Kona', 'Santa Fe', 'Sonata', 'Tiburon', 'Tucson', 'Veloster', 'Venue']),
  vehicleMake('Infiniti', 'infiniti', 'infiniti-logo.svg', ['EX35', 'EX37', 'FX35', 'FX37', 'FX45', 'FX50', 'G20', 'G25', 'G35', 'G37', 'I30', 'I35', 'J30', 'JX35', 'M30', 'M35', 'M37', 'M45', 'M56', 'Q30', 'Q40', 'Q45', 'Q50', 'Q60', 'Q70', 'QX4', 'QX30', 'QX50', 'QX55', 'QX56', 'QX60', 'QX70', 'QX80']),
  vehicleMake('Jaguar', 'jaguar', 'jaguar-logo.svg', ['F-PACE', 'F-TYPE', 'XE', 'XF', 'XJ']),
  vehicleMake('Jeep', 'jeep', 'jeep-logo.svg', ['Cherokee', 'Commander', 'Compass', 'Gladiator', 'Grand Cherokee', 'Laredo', 'Liberty', 'Patriot', 'Renegade', 'Rubicon', 'Trailhawk', 'Wrangler']),
  vehicleMake('Kia', 'kia', 'kia-logo.svg', ['Borrego', 'Cadenza', 'Carnival', 'Cerato', 'Forte', 'Niro', 'Optima', 'Rio', 'Sedona', 'Seltos', 'Sorento', 'Soul', 'Spectra', 'Sportage', 'Telluride']),
  vehicleMake('Land Rover', 'land-rover', 'land-rover-logo.svg', ['Discovery', 'Discovery Sport', 'LR2', 'LR4', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar']),
  vehicleMake('Lexus', 'lexus', 'lexus-logo.png', ['ES 250', 'ES 300h', 'ES 350', 'GS 300', 'GS 350', 'GS 450', 'IS 200', 'IS 300', 'IS 350', 'LS 500 / 500h', 'LX 570', 'NX 200', 'NX 300', 'RX 350', 'RX 450']),
  vehicleMake('Lincoln', 'lincoln', 'lincoln-logo.svg', ['Aviator', 'Continental', 'LS', 'MKC', 'MKT', 'MKX', 'MKZ', 'Nautilus', 'Navigator', 'Town Car']),
  vehicleMake('Maserati', 'maserati', 'maserati-logo.png', ['Ghibli', 'Levante', 'Quattroporte']),
  vehicleMake('Mazda', 'mazda', 'mazda-logo.svg', ['Mazda2', 'Mazda3', 'Mazda5', 'Mazda6', 'CX-5', 'CX-7', 'CX-9', 'Tribute']),
  vehicleMake('Mercedes-Benz', 'mercedes-benz', 'mercedes-benz-logo.svg', ['A-Class', 'B-Class', 'C-Class', 'CLK-Class', 'CLS-Class', 'E-Class', 'G-Class', 'M-Class', 'ML-Class', 'S-Class', 'Sprinter']),
  vehicleMake('Mercury', 'mercury', 'mercury-logo.png', ['Grand Marquis', 'Mariner', 'Milan', 'Montego', 'Monterey', 'Mountaineer', 'Sable']),
  vehicleMake('MINI', 'mini', 'mini-logo.svg', ['Cooper', 'Countryman', 'Paceman']),
  vehicleMake('Mitsubishi', 'mitsubishi', 'mitsubishi-logo.svg', ['Eclipse', 'Endeavor', 'Galant', 'Lancer', 'Lancer Evolution', 'Mirage', 'Montero', 'Outlander']),
  vehicleMake('Nissan', 'nissan', 'nissan-logo.svg', ['350Z', '370Z', 'Altima', 'Cube', 'Frontier', 'Juke', 'Kicks', 'Leaf', 'Maxima', 'Murano', 'Note', 'NV', 'NV200', 'NV1500', 'NV2500', 'NV3500', 'Pathfinder', 'Quest', 'Rogue', 'Sentra', 'Titan', 'Versa Note', 'X-Trail', 'Xterra']),
  vehicleMake('Scion', 'scion', 'scion-logo.png', ['tC', 'xD']),
  vehicleMake('Toyota', 'toyota', 'toyota-logo.svg', ['4Runner', 'Avalon', 'Camry', 'Corolla', 'FJ Cruiser', 'Highlander', 'Land Cruiser', 'Matrix', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Supra', 'Tacoma', 'Tundra', 'Venza', 'Yaris']),
];

export const vehicleKeyServices = [
  { name: 'Car key replacement', slug: 'car-key-replacement', description: 'Replacement keys for supported all-keys-lost, damaged-key, and spare-key situations.' },
  { name: 'Key duplication', slug: 'key-duplication', description: 'A compatible spare cut and programmed while a working key is available.' },
  { name: 'Transponder key programming', slug: 'transponder-key-programming', description: 'Compatible chip keys programmed to supported vehicle immobilizer systems.' },
  { name: 'Key fob programming', slug: 'key-fob-programming', description: 'Compatible replacement remotes and key fobs paired and tested.' },
  { name: 'Push-to-start smart keys', slug: 'push-to-start-smart-keys', description: 'Compatible proximity and push-button-start keys programmed for supported vehicles.' },
] as const;

export function getVehicleMake(slug: string) {
  return vehicleMakes.find((make) => make.slug === slug);
}
