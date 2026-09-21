import { serviceCategories, serviceSlug } from '@/lib/site-config';

export type ServiceDetail = {
  categorySlug: string;
  name: string;
  slug: string;
  intro: string;
  whenNeeded: string[];
  included: string[];
  process: Array<{ title: string; description: string }>;
  quoteNote: string;
  faqs: Array<{ question: string; answer: string }>;
  keywords: string[];
};

function service(
  categorySlug: string,
  name: string,
  detail: Omit<ServiceDetail, 'categorySlug' | 'name' | 'slug'>,
): ServiceDetail {
  return { categorySlug, name, slug: serviceSlug(name), ...detail };
}

const automotive = 'automotive-locksmith';
const residential = 'residential-locksmith';
const commercial = 'commercial-locksmith';

export const serviceDetails: ServiceDetail[] = [
  service(automotive, 'Car lockouts', {
    intro: 'Locked your keys in the car or cannot open the vehicle with the key or fob? MI Lock Pros provides mobile car lockout service for supported vehicles across Southeast Michigan.',
    whenNeeded: ['Keys are visible inside a locked vehicle', 'The doors will not unlock with the key or remote', 'A key is locked in the trunk and the vehicle cannot be opened', 'You are authorized to use the vehicle but cannot get inside'],
    included: ['Vehicle and authorization details reviewed before entry work', 'The door, lock, and key situation assessed before an entry method is selected', 'Careful entry using an approach suitable for the supported vehicle', 'Basic lock and door operation checked after the vehicle is opened'],
    process: [
      { title: 'Share the vehicle details', description: 'Provide the year, make, model, location, and where the key is believed to be.' },
      { title: 'Confirm authorization', description: 'Be ready to show identification and reasonable proof that you are authorized to access the vehicle.' },
      { title: 'Assess the lockout', description: 'The technician checks the door, lock type, and vehicle condition before choosing an approach.' },
      { title: 'Open and check', description: 'After entry, the affected door and lock are checked for normal operation.' },
    ],
    quoteNote: 'Car lockout pricing depends on the vehicle, location, lockout situation, and entry method required. The service and price are discussed before work begins.',
    faqs: [
      { question: 'Can you unlock every vehicle?', answer: 'Vehicle construction and security systems vary. Share the year, make, and model so MI Lock Pros can confirm whether the lockout is supported.' },
      { question: 'What do I need to show before the car is opened?', answer: 'Be prepared to provide identification and reasonable proof that you own the vehicle or are authorized to use it.' },
      { question: 'Can you help if the key is locked in the trunk?', answer: 'Often the first step is gaining authorized access to the passenger compartment. Trunk access depends on the vehicle design and lock condition.' },
    ],
    keywords: ['car lockout service', 'locked keys in car', 'mobile automotive locksmith', 'vehicle lockout help'],
  }),
  service(automotive, 'Car key replacement', {
    intro: 'Lost every car key, damaged your only key, or need a dependable replacement? MI Lock Pros can cut and program compatible replacement keys for supported vehicles.',
    whenNeeded: ['Every vehicle key is lost', 'The only key is cracked, worn, or no longer dependable', 'A used vehicle came with only one key', 'You want a spare before the remaining key is lost'],
    included: ['Vehicle year, make, model, VIN, and key system reviewed for compatibility', 'A compatible mechanical, transponder, remote-head, or smart-key option identified', 'Key blade cutting when the selected key requires it', 'Programming and function testing for supported electronic keys'],
    process: [
      { title: 'Identify the vehicle and key', description: 'The year, make, model, VIN, and current key situation help determine the correct replacement.' },
      { title: 'Verify authorization', description: 'Identification and reasonable proof of ownership or authorization are required before key work.' },
      { title: 'Cut and program', description: 'When supported, the blade is cut and the transponder, remote, or smart key is programmed.' },
      { title: 'Test the key', description: 'Starting, locking, unlocking, trunk, and remote functions are tested when those features apply.' },
    ],
    quoteNote: 'The quote depends on the vehicle, key type, parts required, and whether a working key is available. The supported option and price are confirmed before cutting or programming begins.',
    faqs: [
      { question: 'Can you make a car key when every key is lost?', answer: 'All-keys-lost service is available for many supported vehicles. Compatibility depends on the year, make, model, key system, and parts availability.' },
      { question: 'Do I need the original key?', answer: 'Not always. Some supported vehicles allow a replacement to be created without the original, but authorization and vehicle-specific information are required.' },
      { question: 'Will a replacement include remote buttons?', answer: 'That depends on the selected key type and vehicle. MI Lock Pros can explain compatible mechanical, remote-head, fob, or smart-key options.' },
    ],
    keywords: ['car key replacement', 'lost car key replacement', 'all keys lost programming', 'mobile car key service'],
  }),
  service(automotive, 'Key duplication', {
    intro: 'A spare car key can prevent an all-keys-lost situation. MI Lock Pros duplicates compatible automotive keys and tests the copy with the supported vehicle.',
    whenNeeded: ['You have one working key and want a backup', 'A household needs another driver key', 'The current key is showing wear', 'A recently purchased vehicle came with a single key'],
    included: ['Existing key and vehicle system checked for the correct duplicate type', 'Compatible blank, chip, remote-head, fob, or smart-key option reviewed', 'Blade duplication or code cutting when required', 'Programming and operating functions tested when applicable'],
    process: [
      { title: 'Review the working key', description: 'The key style, chip, remote functions, and physical condition are identified.' },
      { title: 'Match a compatible duplicate', description: 'The replacement must match the vehicle year, make, model, frequency, and key system.' },
      { title: 'Cut and program', description: 'The duplicate is cut and electronically paired when those steps are required.' },
      { title: 'Test both keys', description: 'The original and duplicate are checked for applicable door, ignition, remote, and start functions.' },
    ],
    quoteNote: 'Pricing depends on whether the key is mechanical, transponder, remote-head, fob, or proximity based. The option and price are confirmed before work begins.',
    faqs: [
      { question: 'Is a working key required for duplication?', answer: 'A working key often makes duplication simpler, but requirements vary. Share the vehicle details and current key situation to confirm.' },
      { question: 'Can you duplicate a key bought online?', answer: 'Some customer-supplied keys may be compatible, but an incorrect frequency, chip, blade, or electronics can prevent programming.' },
      { question: 'Will the duplicate start the vehicle?', answer: 'If the vehicle uses a transponder or smart-key system, the compatible key must also be programmed. Supported functions are tested after service.' },
    ],
    keywords: ['car key duplication', 'spare car key', 'duplicate transponder key', 'spare key fob'],
  }),
  service(automotive, 'Transponder key programming', {
    intro: 'A correctly cut key may still fail to start a vehicle if its transponder chip is not recognized. MI Lock Pros programs compatible transponder keys for supported vehicles.',
    whenNeeded: ['A newly cut chip key turns but will not start the vehicle', 'A security or immobilizer light appears with the replacement key', 'You need another programmed transponder key', 'A supported replacement key needs pairing after loss or damage'],
    included: ['Vehicle and key compatibility checked before programming', 'Correct transponder type confirmed for the supported vehicle', 'Programming performed using a vehicle-appropriate procedure when available', 'Starting and applicable key functions tested after programming'],
    process: [
      { title: 'Confirm the vehicle system', description: 'The year, make, model, VIN, and key style identify the transponder system.' },
      { title: 'Check the key and chip', description: 'The blade, chip type, and existing keys are reviewed before programming starts.' },
      { title: 'Program the key', description: 'The compatible transponder is registered to the vehicle using a supported process.' },
      { title: 'Verify operation', description: 'The key is tested for recognition and starting, along with other applicable functions.' },
    ],
    quoteNote: 'Programming requirements vary by vehicle and may depend on whether a working key is present. Compatibility, scope, and price are confirmed before programming.',
    faqs: [
      { question: 'What is a transponder key?', answer: 'It contains a chip that communicates with the vehicle immobilizer. The correct mechanical cut alone may not start the vehicle until the chip is programmed.' },
      { question: 'Can every chip key be programmed?', answer: 'No. The chip, blade, electronics, and programming method must match the vehicle.' },
      { question: 'Can every no-start issue be fixed by key programming?', answer: 'No. A no-start can involve the key, immobilizer, ignition, battery, wiring, or another system. Locksmith service does not cover every mechanical or electrical fault.' },
    ],
    keywords: ['transponder key programming', 'chip key programming', 'immobilizer key service', 'car key programmer'],
  }),
  service(automotive, 'Key fob programming', {
    intro: 'Need a replacement key fob paired to your vehicle or a spare remote for another driver? MI Lock Pros programs compatible fobs for supported makes and models.',
    whenNeeded: ['A replacement fob needs to be paired to the vehicle', 'Remote buttons stopped working after a fob replacement', 'You want a second remote for another driver', 'A supported vehicle no longer detects the existing fob'],
    included: ['Vehicle, fob part number, frequency, and key system reviewed for compatibility', 'Battery and basic fob condition checked when appropriate', 'Compatible remote or fob paired using a supported procedure', 'Lock, unlock, trunk, panic, and other applicable functions tested'],
    process: [
      { title: 'Diagnose the fob issue', description: 'The likely cause is checked before a replacement or programming service is recommended.' },
      { title: 'Match the correct fob', description: 'Fobs are vehicle-, frequency-, and system-specific, so the part must be verified.' },
      { title: 'Pair it to the vehicle', description: 'The compatible fob is registered using the supported procedure.' },
      { title: 'Test supported functions', description: 'Remote buttons and proximity or start functions are checked when present.' },
    ],
    quoteNote: 'Pricing depends on the vehicle, fob type, parts, and programming procedure. Customer-supplied fobs must be compatible and are evaluated before work begins.',
    faqs: [
      { question: 'Can you program a fob I bought online?', answer: 'Sometimes, but look-alike fobs can use a different frequency, chip, or part number. An incorrect or defective part may not program.' },
      { question: 'Could the problem only be the battery?', answer: 'Yes. A weak battery can resemble a failed or unprogrammed fob, so a basic check may be appropriate first.' },
      { question: 'Will remote start work after programming?', answer: 'Only if the vehicle and compatible fob are equipped for it and the vehicle system allows it.' },
    ],
    keywords: ['key fob programming', 'car remote programming', 'replacement key fob', 'program car key fob'],
  }),
  service(automotive, 'Push-to-start smart keys', {
    intro: 'If a push-to-start vehicle no longer detects its smart key, or you need a spare proximity key, MI Lock Pros can evaluate compatible replacement and programming options.',
    whenNeeded: ['Every proximity key is lost', 'The vehicle displays a key-not-detected message', 'You want a spare smart key before the only one is lost', 'A compatible replacement proximity key needs programming'],
    included: ['Vehicle system, smart-key part number, and frequency checked for compatibility', 'Existing smart key and battery checked when available', 'Compatible proximity key programmed using a supported procedure', 'Proximity detection, push-button start, and applicable remote functions tested'],
    process: [
      { title: 'Confirm the smart-key system', description: 'Vehicle details, button configuration, and the current key situation identify the required system.' },
      { title: 'Select a compatible key', description: 'Frequency, electronics, emergency blade, and vehicle requirements must match.' },
      { title: 'Program the proximity key', description: 'The smart key is registered using the supported programming process.' },
      { title: 'Verify detection and controls', description: 'Push-button start, proximity entry, remote buttons, and emergency blade are checked when applicable.' },
    ],
    quoteNote: 'Smart-key service varies by vehicle, key condition, and whether every key is lost. The compatible option, availability, and price are confirmed before programming.',
    faqs: [
      { question: 'Is a smart key the same as a regular key fob?', answer: 'A push-to-start smart key usually supports proximity entry and starting, while some fobs operate only remote buttons.' },
      { question: 'Can you program a smart key when all keys are lost?', answer: 'All-keys-lost programming is available for many supported vehicles, depending on the model, system, parts, and required security procedure.' },
      { question: 'What if the vehicle still says key not detected?', answer: 'The cause may be the fob battery, key, vehicle battery, antenna, module, or another electrical issue beyond key programming.' },
    ],
    keywords: ['push start key programming', 'smart key replacement', 'proximity key programming', 'all keys lost smart key'],
  }),
  service(automotive, 'Ignition-related locksmith services', {
    intro: 'If a key will not insert, turn, release, or operate the ignition smoothly, MI Lock Pros can inspect supported key and ignition-lock concerns and explain the available locksmith options.',
    whenNeeded: ['The key is difficult to insert or remove', 'The key turns inconsistently in the ignition lock', 'A worn or damaged key no longer operates smoothly', 'A key broke in the ignition lock and extraction may be possible'],
    included: ['Key condition and ignition-lock symptoms reviewed', 'Supported mechanical key and lock-cylinder concerns inspected', 'Available repair, replacement, extraction, or key options explained', 'Ignition key operation tested after supported locksmith work'],
    process: [
      { title: 'Describe the symptoms', description: 'Share what the key does, when the issue started, and whether a spare behaves differently.' },
      { title: 'Inspect the key and lock', description: 'Visible key wear and supported mechanical ignition-lock conditions are checked.' },
      { title: 'Review the options', description: 'Depending on the findings, options may involve the key, extraction, or compatible lock service.' },
      { title: 'Complete and test', description: 'Approved locksmith work is completed and key or lock operation is checked.' },
    ],
    quoteNote: 'Pricing depends on the diagnosis, vehicle, key type, lock-cylinder condition, and parts required. The supported work and price are discussed first.',
    faqs: [
      { question: 'Do you repair every ignition problem?', answer: 'No. MI Lock Pros handles supported key and mechanical ignition-lock concerns. Electrical switches, steering-column faults, starter problems, and engine issues may require an automotive repair specialist.' },
      { question: 'Could a worn key be causing the problem?', answer: 'Yes. Comparing a spare and inspecting the working surfaces can help identify whether key wear may be contributing.' },
      { question: 'Can a broken key be removed from the ignition?', answer: 'Extraction may be possible depending on the break and lock condition. Avoid pushing or turning the broken piece.' },
    ],
    keywords: ['car ignition locksmith', 'ignition key stuck', 'broken key extraction ignition', 'ignition lock cylinder service'],
  }),

  service(residential, 'Home lockouts', {
    intro: 'Locked out of your home, apartment, or rental property? MI Lock Pros provides mobile residential lockout service after confirming authorization to access the property.',
    whenNeeded: ['The door closed with the key inside', 'A key is lost, broken, or no longer operates the lock', 'An authorized tenant or homeowner cannot enter', 'A lock turns poorly and the door will not open'],
    included: ['Occupancy or authorization reviewed before entry work', 'Door, lock, and hardware condition assessed', 'An entry approach selected for the supported lock and situation', 'Lock operation checked after entry with follow-up options explained'],
    process: [
      { title: 'Share the address and lock details', description: 'Describe the property, door, lock, and what happened before the lockout.' },
      { title: 'Confirm authorization', description: 'Identification and reasonable proof that you are authorized to enter are required.' },
      { title: 'Assess the door and lock', description: 'The lock type and door condition are reviewed before choosing an approach.' },
      { title: 'Restore entry and check the lock', description: 'After entry, the lock is checked and repair, rekey, or replacement options are explained if needed.' },
    ],
    quoteNote: 'Home lockout pricing depends on the lock type, door condition, location, and work required. The service and price are discussed before entry work begins.',
    faqs: [
      { question: 'What proof do I need for a home lockout?', answer: 'Be prepared to provide identification and reasonable proof that you live there or are authorized by the owner or manager.' },
      { question: 'Will the lock need to be replaced?', answer: 'Not always. If hardware is damaged or unreliable, replacement options can be discussed.' },
      { question: 'Can you help with an apartment lockout?', answer: 'Yes, when service is supported and authorization can be confirmed. Building or property-management rules may also apply.' },
    ],
    keywords: ['home lockout service', 'house lockout locksmith', 'apartment lockout help', 'residential locksmith'],
  }),
  service(residential, 'Lock changes and replacement', {
    intro: 'Need to replace a damaged, outdated, or unwanted lock? MI Lock Pros changes compatible residential locks and helps select hardware that fits the door and everyday use.',
    whenNeeded: ['A lock is damaged, loose, or unreliable', 'You moved into a home and want new lock hardware', 'A key or lock is badly worn', 'You want a different lock style or function'],
    included: ['Existing door preparation, backset, thickness, and hardware reviewed', 'Compatible replacement options explained before installation', 'Approved lock hardware removed and replaced', 'Alignment, latch, key, and locking operation tested'],
    process: [
      { title: 'Review the door and current lock', description: 'Door measurements and existing holes determine which replacement hardware will fit.' },
      { title: 'Choose compatible hardware', description: 'Function, finish, keying, and practical use are reviewed before installation.' },
      { title: 'Install and align', description: 'The approved lock is installed and adjusted to work with the door and strike.' },
      { title: 'Test and hand over keys', description: 'Locking, latching, and key operation are checked before completion.' },
    ],
    quoteNote: 'Pricing depends on the number of locks, door preparation, selected hardware, and any repair or alignment required. The scope and price are confirmed first.',
    faqs: [
      { question: 'Should I change or rekey my locks?', answer: 'Rekeying changes which key operates compatible existing hardware. Replacement is often considered when hardware is damaged, worn, incompatible, or a different function is wanted.' },
      { question: 'Can new locks use the same key?', answer: 'Often, compatible locks can be keyed alike. The cylinder type and keyway must be checked.' },
      { question: 'Can I supply my own lock?', answer: 'Customer-supplied hardware may be installed if it is complete and compatible with the door and intended use.' },
    ],
    keywords: ['change home locks', 'door lock replacement', 'residential lock installation', 'replace front door lock'],
  }),
  service(residential, 'Lock rekeying', {
    intro: 'If you want old keys to stop working without replacing compatible hardware, residential rekeying may be the right option. MI Lock Pros rekeys supported cylinders and provides matching keys.',
    whenNeeded: ['You moved into a home and do not know who has old keys', 'A key was lost or not returned', 'You want compatible doors to operate with one key', 'The hardware is in good condition but the keying should change'],
    included: ['Existing cylinders checked for condition and compatibility', 'New keying plan reviewed, including keyed-alike options where supported', 'Compatible cylinders reconfigured to the approved key', 'New keys and each rekeyed lock tested'],
    process: [
      { title: 'Count and identify the locks', description: 'The cylinders, brands, keyways, and desired keying arrangement are reviewed.' },
      { title: 'Confirm compatibility', description: 'Existing hardware is checked for supported rekey and keyed-alike options.' },
      { title: 'Rekey the cylinders', description: 'Supported cylinders are reset to operate with the approved new key.' },
      { title: 'Test every lock', description: 'Each rekeyed lock and provided key is tested.' },
    ],
    quoteNote: 'Rekey pricing depends on the number and type of cylinders, their condition, and the keying plan. The supported scope and price are confirmed first.',
    faqs: [
      { question: 'Does rekeying replace the whole lock?', answer: 'No. It changes the internal keying of a compatible cylinder while the main lock hardware remains in place.' },
      { question: 'Can all my doors use one key?', answer: 'Often, if the locks have compatible keyways and cylinders. Different brands or types may limit the options.' },
      { question: 'Will the old keys stop working?', answer: 'Yes, for the cylinders included in the completed rekey. Any locks not included remain unchanged.' },
    ],
    keywords: ['lock rekeying', 'rekey house locks', 'key locks alike', 'change lock key'],
  }),
  service(residential, 'Key duplication', {
    intro: 'Need an extra house key for a family member or a secure backup? MI Lock Pros duplicates supported residential keys and checks the copy when the lock is available.',
    whenNeeded: ['A family member needs a working house key', 'You want a spare before the only key is lost', 'A frequently used key is becoming worn', 'You need copies after a supported rekey or installation'],
    included: ['Original key and keyway reviewed for supported duplication', 'Appropriate blank selected for the compatible lock', 'Key duplicated using the available profile', 'Duplicate checked for smooth operation when the lock is available'],
    process: [
      { title: 'Inspect the original key', description: 'The key profile and wear help determine whether duplication is supported.' },
      { title: 'Select the blank', description: 'The blank must match the lock keyway and intended function.' },
      { title: 'Cut the copy', description: 'The duplicate is cut and finished for smooth operation.' },
      { title: 'Test the key', description: 'When the lock is available, the copy is checked for insertion, turning, locking, and unlocking.' },
    ],
    quoteNote: 'Pricing depends on the key type, quantity, and whether additional lock or rekey service is requested. Restricted keys may require authorization or another provider.',
    faqs: [
      { question: 'Can every house key be copied?', answer: 'No. Some keyways are restricted, patented, specialty, or require authorization and controlled blanks.' },
      { question: 'Should a badly worn key be duplicated?', answer: 'A worn key can produce an unreliable copy. A different method or rekey may be better.' },
      { question: 'Can you make several locks use the same key?', answer: 'That is a rekeying service and may be possible when the locks and keyways are compatible.' },
    ],
    keywords: ['house key duplication', 'duplicate door key', 'spare house key', 'residential key copy'],
  }),
  service(residential, 'Deadbolt installation', {
    intro: 'MI Lock Pros installs and replaces compatible residential deadbolts, including new door preparation when the door and requested hardware are suitable.',
    whenNeeded: ['An exterior door has no deadbolt', 'The existing deadbolt is loose, damaged, or difficult to operate', 'You want a compatible single-cylinder or keypad deadbolt', 'A new door or hardware update requires deadbolt installation'],
    included: ['Door thickness, material, backset, edge, frame, and existing preparation reviewed', 'Compatible deadbolt and placement options explained', 'Approved hardware installed or existing deadbolt replaced', 'Bolt throw, strike alignment, key, and thumb-turn operation tested'],
    process: [
      { title: 'Inspect the door and frame', description: 'Measurements, material, existing holes, and frame condition are checked.' },
      { title: 'Confirm the deadbolt', description: 'Hardware must match the door preparation, finish, function, and intended use.' },
      { title: 'Prepare and install', description: 'When suitable, the door and frame are prepared and the deadbolt is installed.' },
      { title: 'Test the full throw', description: 'The bolt, strike, key, thumb turn, and door alignment are checked.' },
    ],
    quoteNote: 'Pricing depends on whether the door is already prepared, the door and frame material, selected hardware, and any alignment or repair needed.',
    faqs: [
      { question: 'Can you add a deadbolt where there is no hole?', answer: 'Often, when the door and frame are suitable. Material, measurements, glass placement, edge condition, and hardware must be inspected.' },
      { question: 'Can the deadbolt match my existing key?', answer: 'Possibly, if the cylinder and keyway are compatible.' },
      { question: 'Why does a deadbolt bind when the door is closed?', answer: 'Door or strike alignment can cause binding. Hinges, door fit, bolt position, and frame preparation may need adjustment.' },
    ],
    keywords: ['deadbolt installation', 'install new deadbolt', 'residential deadbolt replacement', 'door lock installation'],
  }),
  service(residential, 'Smart lock installation', {
    intro: 'Upgrade a compatible residential door with a keypad or smart lock. MI Lock Pros installs supported hardware and checks the mechanical fit, lock operation, and basic setup.',
    whenNeeded: ['You want keypad entry for a household or rental', 'An existing deadbolt is being replaced with a compatible smart lock', 'A smart lock was purchased but needs installation', 'The current smart lock is loose, misaligned, or not operating smoothly'],
    included: ['Door, existing preparation, backset, thickness, and product compatibility reviewed', 'Compatible lock installed and mechanically aligned', 'Basic handing, calibration, and keypad or app setup completed when supported', 'Manual key, thumb turn, keypad, and locking functions tested'],
    process: [
      { title: 'Check compatibility', description: 'Door measurements, bolt alignment, product requirements, and included parts are reviewed.' },
      { title: 'Install the lock', description: 'The compatible smart lock is mounted without pinching wires or forcing misaligned parts.' },
      { title: 'Calibrate and set up', description: 'Handing, bolt travel, codes, and basic app connection are completed when supported.' },
      { title: 'Test entry methods', description: 'The key, keypad, app, auto-lock, and thumb turn are checked when included.' },
    ],
    quoteNote: 'Pricing depends on the door preparation, product, alignment, connectivity setup, and whether modifications or replacement parts are needed.',
    faqs: [
      { question: 'Can you install a smart lock I purchased?', answer: 'Yes, when the product is complete and compatible with the door. Share the model and door details first.' },
      { question: 'Do you provide Wi-Fi or home-network support?', answer: 'MI Lock Pros handles supported lock installation and basic setup. Router, account, subscription, or broader network issues may require the manufacturer or an IT provider.' },
      { question: 'Will a physical key still work?', answer: 'Many smart locks include a key override, while some do not. The selected model determines the backup-entry method.' },
    ],
    keywords: ['smart lock installation', 'keypad lock installation', 'electronic deadbolt installation', 'install smart door lock'],
  }),
  service(residential, 'Home security upgrades', {
    intro: 'Concerned about worn locks, weak door hardware, or inconsistent key control? MI Lock Pros can review supported residential locks and recommend practical mechanical upgrades.',
    whenNeeded: ['Exterior locks are old, loose, or inconsistent', 'A move, lost key, or household change creates a key-control concern', 'Doors lack dependable deadbolts or proper strike alignment', 'You want compatible locks keyed alike or updated'],
    included: ['Exterior lock and visible door-hardware condition reviewed', 'Key-control concerns and current lock functions discussed', 'Compatible rekey, replacement, deadbolt, strike, or smart-lock options explained', 'Approved mechanical upgrades installed and tested'],
    process: [
      { title: 'Walk through the priorities', description: 'Discuss the doors, recent concerns, household needs, and how entrances are used.' },
      { title: 'Inspect supported hardware', description: 'Visible lock condition, door fit, strike alignment, and keying are reviewed.' },
      { title: 'Choose practical improvements', description: 'Options are prioritized for compatibility, condition, convenience, and budget.' },
      { title: 'Install and verify', description: 'Approved mechanical work is completed and each updated function is tested.' },
    ],
    quoteNote: 'Pricing varies with the number of doors, hardware condition, selected products, and installation work. Recommendations and pricing are reviewed first.',
    faqs: [
      { question: 'Is this a complete home security inspection?', answer: 'No. This service focuses on supported locks, keys, and related mechanical door hardware—not alarms, cameras, access control, or structural security.' },
      { question: 'Do I need to replace every lock?', answer: 'Not necessarily. Compatible hardware in good condition may be rekeyed or adjusted.' },
      { question: 'Can you recommend smart and mechanical options?', answer: 'Yes. Compatible choices can be explained based on the door, desired entry method, and practical use.' },
    ],
    keywords: ['home lock security upgrades', 'upgrade door locks', 'residential lock assessment', 'home deadbolt upgrade'],
  }),

  service(commercial, 'Business lockouts', {
    intro: 'Locked out of an office, storefront, or commercial space? MI Lock Pros provides mobile business lockout service after confirming authorization for the property.',
    whenNeeded: ['An authorized owner or manager cannot enter the business', 'A commercial key is lost, broken, or not operating the lock', 'An office, suite, or storefront door will not unlock', 'A tenant or property representative needs authorized entry help'],
    included: ['Authorized business contact and property details reviewed', 'Door, lock, and visible hardware condition assessed', 'A supported entry method selected for the lock and situation', 'Lock operation checked after entry and follow-up options explained'],
    process: [
      { title: 'Identify the property and door', description: 'Share the business location, door type, lock, and authorized contact.' },
      { title: 'Confirm authorization', description: 'Reasonable proof of authority to enter or request work is required.' },
      { title: 'Assess and gain entry', description: 'Supported hardware is reviewed and the approved entry work is completed.' },
      { title: 'Check the lock', description: 'The hardware is tested and needed rekey, repair, or replacement is discussed.' },
    ],
    quoteNote: 'Pricing depends on the door, lock, property location, and work required. The service and price are discussed before entry work begins.',
    faqs: [
      { question: 'Who can authorize a business lockout?', answer: 'An owner, manager, tenant representative, property manager, or another person who can reasonably show authority may request service.' },
      { question: 'Can you help with a storefront door?', answer: 'Many storefront and commercial mechanical locks are supported. Share a photo and hardware description when possible.' },
      { question: 'Can the lock be rekeyed after entry?', answer: 'Often, if the cylinder is compatible and in serviceable condition.' },
    ],
    keywords: ['business lockout service', 'commercial lockout locksmith', 'office lockout', 'storefront lockout'],
  }),
  service(commercial, 'Commercial lock changes and installation', {
    intro: 'MI Lock Pros changes and installs compatible mechanical commercial locks for offices, storefronts, managed properties, and other business doors.',
    whenNeeded: ['Commercial lock hardware is damaged, loose, or unreliable', 'A tenant or business change requires new lock hardware', 'A storefront or office door needs a compatible lock replacement', 'You want updated mechanical key and lock hardware'],
    included: ['Door, frame, lock function, dimensions, and existing preparation reviewed', 'Compatible mechanical commercial hardware options explained', 'Approved lock or cylinder installed and aligned', 'Keys, latch, bolt, strike, and door operation tested'],
    process: [
      { title: 'Review the opening', description: 'Door material, frame, lock preparation, function, and hardware are documented.' },
      { title: 'Specify compatible hardware', description: 'The replacement is selected for the door, use, keying, and requested mechanical function.' },
      { title: 'Install and align', description: 'Approved hardware is installed and adjusted to operate with the door and frame.' },
      { title: 'Test and document', description: 'Operation and keys are checked with the authorized contact.' },
    ],
    quoteNote: 'Pricing depends on the opening, hardware, keying, door condition, and work required. The scope and price are confirmed before installation.',
    faqs: [
      { question: 'Do you install electronic access control?', answer: 'No. MI Lock Pros focuses on supported mechanical commercial locks, keys, cylinders, and related door hardware.' },
      { question: 'Can you replace a storefront lock cylinder?', answer: 'Many compatible storefront mechanical cylinders and components can be serviced or replaced after inspection.' },
      { question: 'Can several business doors use one key?', answer: 'A keyed-alike or mechanical master-key plan may be possible when locks and keyways are compatible.' },
    ],
    keywords: ['commercial lock installation', 'business lock change', 'storefront lock replacement', 'office door locks'],
  }),
  service(commercial, 'Rekeying and master key systems', {
    intro: 'Improve business key control without replacing compatible hardware. MI Lock Pros rekeys supported commercial cylinders and creates practical mechanical master-key arrangements.',
    whenNeeded: ['An employee, vendor, or tenant did not return a key', 'A business moved into a new space', 'Managers need broader access while staff keys remain limited', 'Multiple compatible doors need a clearer keying plan'],
    included: ['Door, cylinder, keyway, and access needs reviewed', 'Compatible rekey, keyed-alike, or mechanical master-key plan explained', 'Supported cylinders reconfigured and keys prepared', 'Every affected key and lock tested with the keying arrangement reviewed'],
    process: [
      { title: 'List doors and access needs', description: 'Identify which users should open which doors and who needs broader master access.' },
      { title: 'Check compatibility', description: 'Brands, keyways, cylinder types, condition, and existing keying are reviewed.' },
      { title: 'Approve the plan', description: 'A practical mechanical key hierarchy is confirmed before cylinders are rekeyed.' },
      { title: 'Rekey, test, and hand over', description: 'Locks and keys are tested and the authorized contact receives the agreed key set.' },
    ],
    quoteNote: 'Pricing depends on the number and type of cylinders, key quantities, compatibility, and complexity of the keying plan.',
    faqs: [
      { question: 'What is a mechanical master-key system?', answer: 'It is a key hierarchy in which selected keys open specific compatible locks while a master opens a broader approved group.' },
      { question: 'Can existing locks be added to one master key?', answer: 'Possibly, when cylinders, keyways, brands, and keying capacity are compatible.' },
      { question: 'Does a master-key system track who entered?', answer: 'No. A mechanical system controls which key operates which lock but does not create an electronic audit trail.' },
    ],
    keywords: ['commercial lock rekeying', 'master key system', 'business rekey service', 'keyed alike commercial locks'],
  }),
  service(commercial, 'High-security locks', {
    intro: 'For businesses that need stronger mechanical key control or upgraded cylinders, MI Lock Pros can review compatible high-security lock and key options.',
    whenNeeded: ['Unauthorized key duplication is a concern', 'Existing commercial cylinders are worn or unsuitable', 'A business wants controlled mechanical key distribution', 'Compatible exterior or sensitive-area locks need an upgrade'],
    included: ['Current locks, doors, key control, and business needs reviewed', 'Compatible high-security mechanical cylinder and key options explained', 'Approved hardware installed, keyed, and aligned', 'Keys and each upgraded lock tested with the authorized contact'],
    process: [
      { title: 'Review key-control goals', description: 'Discuss who needs keys, which doors matter most, and current hardware concerns.' },
      { title: 'Inspect compatibility', description: 'Door preparation, cylinders, keyways, functions, and condition determine supported options.' },
      { title: 'Select and install', description: 'Approved mechanical high-security hardware is installed and keyed.' },
      { title: 'Test and manage keys', description: 'Operation is verified and the authorized contact receives the agreed keys and guidance.' },
    ],
    quoteNote: 'Pricing depends on the hardware selected, number of openings, key quantities, and installation requirements. Options and pricing are reviewed first.',
    faqs: [
      { question: 'What makes a lock high security?', answer: 'Features vary and may include stronger cylinders, resistance to common attacks, controlled keyways, and restricted duplication procedures.' },
      { question: 'Can a high-security key be copied anywhere?', answer: 'Many systems use restricted or controlled blanks and may require documented authorization through an approved source.' },
      { question: 'Is this electronic access control?', answer: 'No. This service covers supported mechanical high-security locks and keys, not card readers, electronic credentials, or wiring.' },
    ],
    keywords: ['high security locks', 'commercial high security cylinder', 'restricted key system', 'business security locks'],
  }),
  service(commercial, 'Door hardware and security upgrades', {
    intro: 'Worn locks, poor alignment, loose levers, and unsuitable mechanical hardware can make a business door unreliable. MI Lock Pros reviews supported commercial lock and door-hardware needs.',
    whenNeeded: ['A commercial door does not latch or lock reliably', 'Levers, cylinders, deadbolts, or strikes are worn or loose', 'A property turnover requires mechanical key and lock changes', 'Supported storefront or office hardware needs repair or replacement'],
    included: ['Visible lock, cylinder, lever, latch, strike, and door alignment reviewed', 'Compatible mechanical repair or replacement options explained', 'Approved supported hardware installed or adjusted', 'Door closing, latching, locking, and key operation tested'],
    process: [
      { title: 'Walk the affected openings', description: 'The authorized contact identifies problem doors, desired changes, and scheduling needs.' },
      { title: 'Inspect supported hardware', description: 'Visible mechanical lock and door-hardware condition and compatibility are checked.' },
      { title: 'Approve the scope', description: 'Repair, rekey, adjustment, or replacement recommendations and pricing are reviewed.' },
      { title: 'Complete and verify', description: 'Approved work is performed and each affected door is tested.' },
    ],
    quoteNote: 'Pricing varies by the number of openings, hardware, door condition, parts, and adjustments required. The approved scope and price are confirmed first.',
    faqs: [
      { question: 'What commercial door hardware do you service?', answer: 'Supported work may include compatible mechanical cylinders, levers, deadbolts, latches, strikes, and related lock hardware. Share photos and door details to confirm.' },
      { question: 'Do you install access-control or security systems?', answer: 'No. MI Lock Pros does not offer electronic access-control systems. The scope focuses on supported mechanical locks, keys, and related hardware.' },
      { question: 'Can you certify a door for fire or building-code compliance?', answer: 'MI Lock Pros does not make blanket code-certification claims. Owners and managers should confirm requirements with the authority having jurisdiction and use appropriately listed hardware.' },
    ],
    keywords: ['commercial door hardware', 'storefront door lock repair', 'business door lock upgrade', 'mechanical door security'],
  }),
];

export function getServiceDetail(categorySlug: string, slug: string) {
  const detail = serviceDetails.find((item) => item.categorySlug === categorySlug && item.slug === slug);
  const category = serviceCategories.find((item) => item.slug === categorySlug);
  const summary = category?.services.find((item) => item.name === detail?.name);
  return detail && category && summary ? { detail, category, summary } : undefined;
}

export function getRelatedServices(categorySlug: string, currentSlug: string, limit = 3) {
  return serviceDetails.filter((item) => item.categorySlug === categorySlug && item.slug !== currentSlug).slice(0, limit);
}
