<?php
/**
 * MI Lock Pros theme functions.
 *
 * @package MILockPros
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MLP_THEME_VERSION', '2.3.3' );
require_once get_template_directory() . '/inc/vehicle-data.php';

/**
 * Purge common WordPress/Hostinger caches once when a new theme build is installed.
 */
function mlp_purge_cache_after_theme_update() {
	if ( get_option( 'mlp_deployed_theme_version' ) === MLP_THEME_VERSION ) {
		return;
	}
	wp_cache_flush();
	do_action( 'litespeed_purge_all' );
	do_action( 'litespeed_control_set_nocache', 'MI Lock Pros theme updated' );
	if ( function_exists( 'rocket_clean_domain' ) ) {
		rocket_clean_domain();
	}
	update_option( 'mlp_deployed_theme_version', MLP_THEME_VERSION, false );
}
add_action( 'init', 'mlp_purge_cache_after_theme_update', 1 );

function mlp_theme_defaults() {
	return array(
		'legal_name'         => 'MI Lock Pros LLC',
		'phone'              => '734-249-5296',
		'email'              => 'admin@milockprosllc.com',
		'service_area'       => 'Southeast Michigan',
		'business_hours'     => 'Open 24 hours',
		'years_experience'   => '5 years',
		'google_profile_url' => 'https://share.google/v9Mx8tqQuBiI7ZhBa',
		'google_review_url'  => 'https://g.page/r/Caq7Ltopix8HEAI/review',
		'google_place_id'    => 'ChIJMziEN2m48qsRqrsu2imLHwc',
		'facebook_url'       => 'https://www.facebook.com/p/MI-LOCK-PROS-LLC-61566472695093/',
		'instagram_url'      => 'https://www.instagram.com/milockpros/',
	);
}

function mlp_service_area_groups() {
	return array(
		'Wayne County & Downriver' => array(
			'Allen Park', 'Belleville', 'Canton Township', 'Dearborn', 'Dearborn Heights',
			'Detroit', 'Ecorse', 'Flat Rock', 'Garden City', 'Grosse Ile Township',
			'Grosse Pointe', 'Grosse Pointe Farms', 'Grosse Pointe Park', 'Grosse Pointe Woods',
			'Hamtramck', 'Harper Woods', 'Highland Park', 'Inkster', 'Lincoln Park', 'Livonia',
			'Melvindale', 'Northville', 'Northville Township', 'Plymouth', 'Plymouth Township',
			'Redford Township', 'River Rouge', 'Riverview', 'Romulus', 'Southgate', 'Taylor',
			'Trenton', 'Van Buren Township', 'Wayne', 'Wayne County', 'Westland', 'Woodhaven',
			'Wyandotte',
		),
		'Oakland County'            => array(
			'Auburn Hills', 'Berkley', 'Beverly Hills', 'Bingham Farms', 'Birmingham',
			'Bloomfield Hills', 'Bloomfield Township', 'Clawson', 'Ferndale', 'Franklin',
			'Hazel Park', 'Huntington Woods', 'Keego Harbor', 'Madison Heights', 'Milford',
			'New Hudson', 'Novi', 'Oak Park', 'Oakland Township', 'Orchard Lake Village',
			'Pleasant Ridge', 'Pontiac', 'Rochester', 'Rochester Hills', 'Royal Oak', 'South Lyon',
			'Troy', 'Walled Lake', 'Waterford Township', 'West Bloomfield Township',
			'White Lake Township', 'Wixom', 'Wolverine Lake',
		),
		'Macomb County'             => array(
			'Center Line', 'Clinton Township', 'Eastpointe', 'Fraser', 'Harrison Township',
			'Macomb', 'Macomb County', 'Mount Clemens', 'New Baltimore', 'Roseville',
			'Shelby Township', 'St. Clair Shores', 'Sterling Heights', 'Utica', 'Warren',
			'Washington',
		),
		'Washtenaw, Livingston & Monroe' => array(
			'Ann Arbor', 'Ann Arbor Township', 'Brighton', 'Bryant Pattengill East',
			'Bryant Pattengill West', 'Carleton', 'Dexter', 'Haisley', 'Milan', 'Saline',
			'Superior Township', 'Whitmore Lake', 'Willis', 'York Township', 'Ypsilanti',
			'Ypsilanti Township',
		),
	);
}

function mlp_service_area_names() {
	$areas = array();
	foreach ( mlp_service_area_groups() as $group ) {
		$areas = array_merge( $areas, $group );
	}
	return $areas;
}

function mlp_service_area_slug( $name ) {
	return sanitize_title( $name );
}

function mlp_service_area_region_summary( $group_name ) {
	$summaries = array(
		'Wayne County & Downriver'       => 'This coverage group includes Detroit, western Wayne County, the Downriver communities, and nearby Wayne County locations.',
		'Oakland County'                  => 'This coverage group includes communities across southern and central Oakland County and neighboring areas.',
		'Macomb County'                   => 'This coverage group includes communities across southern and central Macomb County and neighboring areas.',
		'Washtenaw, Livingston & Monroe'  => 'This coverage group includes Ann Arbor and surrounding communities in Washtenaw County, plus listed Livingston and Monroe County locations.',
	);
	return isset( $summaries[ $group_name ] ) ? $summaries[ $group_name ] : 'This community is part of the listed MI Lock Pros mobile service area in Southeast Michigan.';
}

function mlp_service_area_records() {
	$records = array();
	foreach ( mlp_service_area_groups() as $group_name => $areas ) {
		foreach ( $areas as $area_name ) {
			$records[] = array(
				'name'           => $area_name,
				'slug'           => mlp_service_area_slug( $area_name ),
				'group'          => $group_name,
				'region_summary' => mlp_service_area_region_summary( $group_name ),
			);
		}
	}
	return $records;
}

function mlp_get_service_area_record( $slug ) {
	foreach ( mlp_service_area_records() as $record ) {
		if ( $record['slug'] === $slug ) {
			return $record;
		}
	}
	return null;
}

function mlp_get_service_area_url( $area_name ) {
	$post = get_page_by_path( mlp_service_area_slug( $area_name ), OBJECT, 'mlp_area' );
	return $post ? get_permalink( $post ) : home_url( '/service-areas/' . mlp_service_area_slug( $area_name ) . '/' );
}

function mlp_get_nearby_service_areas( $area_record, $limit = 8 ) {
	$nearby = array();
	foreach ( mlp_service_area_records() as $record ) {
		if ( $record['group'] === $area_record['group'] && $record['slug'] !== $area_record['slug'] ) {
			$nearby[] = $record;
		}
	}
	return array_slice( $nearby, 0, absint( $limit ) );
}

function mlp_get_option( $key ) {
	$defaults = mlp_theme_defaults();
	$default  = isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';
	return get_theme_mod( 'mlp_' . $key, $default );
}

function mlp_is_configured( $value ) {
	return is_string( $value ) && '' !== trim( $value ) && '[' !== substr( trim( $value ), 0, 1 );
}

function mlp_phone_href() {
	return 'tel:' . preg_replace( '/[^0-9+]/', '', mlp_get_option( 'phone' ) );
}

function mlp_text_href() {
	return 'sms:' . preg_replace( '/[^0-9+]/', '', mlp_get_option( 'phone' ) );
}

function mlp_home_section_url( $section = 'home' ) {
	$home_url = home_url( '/' );
	if ( ! is_front_page() ) {
		$home_url = add_query_arg( 'mlp_theme', MLP_THEME_VERSION, $home_url );
	}
	return $home_url . '#' . sanitize_title( $section );
}

function mlp_service_item_url( $category_slug, $service_name, $area_slug = '' ) {
	$service_slug = sanitize_title( $service_name );
	if ( $area_slug ) {
		return home_url( '/service-areas/' . sanitize_title( $area_slug ) . '/services/' . sanitize_title( $category_slug ) . '/' . $service_slug . '/' );
	}
	return home_url( '/locksmith-services/' . sanitize_title( $category_slug ) . '/' . $service_slug . '/' );
}

function mlp_get_service_item( $category_slug, $service_slug ) {
	$services = mlp_service_data();
	if ( ! isset( $services[ $category_slug ] ) ) { return null; }
	foreach ( $services[ $category_slug ]['services'] as $name ) {
		if ( sanitize_title( $name ) === $service_slug ) {
			return array(
				'name' => $name,
				'description' => isset( $services[ $category_slug ]['details'][ $name ] ) ? $services[ $category_slug ]['details'][ $name ] : $services[ $category_slug ]['description'],
				'category_slug' => $category_slug,
				'category' => $services[ $category_slug ],
			);
		}
	}
	return null;
}

function mlp_work_gallery() {
	return array(
		array( 'type' => 'Automotive', 'title' => 'BMW Push-to-Start Key Programming', 'image' => 'bmw-push-start-key-programming.jpg', 'alt' => 'MI Lock Pros BMW push-to-start key programming work in Southeast Michigan', 'caption' => 'A replacement BMW smart key programmed and tested for compatible push-to-start operation.' ),
		array( 'type' => 'Automotive', 'title' => 'Cadillac Spare Key Fob Programming', 'image' => 'cadillac-spare-key-fob-programming.jpg', 'alt' => 'MI Lock Pros Cadillac spare key fob programming work in Southeast Michigan', 'caption' => 'A compatible Cadillac spare fob programmed and verified alongside the existing key.' ),
		array( 'type' => 'Automotive', 'title' => 'Maserati Spare Smart Key Programming', 'image' => 'maserati-spare-smart-key-programming.jpg', 'alt' => 'MI Lock Pros Maserati spare smart key programming work in Southeast Michigan', 'caption' => 'A compatible Maserati spare smart key programmed and checked for vehicle recognition.' ),
		array( 'type' => 'Automotive', 'title' => 'Chevrolet Push-to-Start Key Programming', 'image' => 'chevrolet-push-start-key-programming.jpg', 'alt' => 'MI Lock Pros Chevrolet push-to-start key programming work in Southeast Michigan', 'caption' => 'Compatible Chevrolet smart keys programmed and verified with professional diagnostic equipment.' ),
		array( 'type' => 'Automotive', 'title' => 'Ford All-Keys-Lost Smart Key Programming', 'image' => 'ford-all-keys-lost-key-programming.jpg', 'alt' => 'MI Lock Pros Ford all-keys-lost smart key programming work in Southeast Michigan', 'caption' => 'A replacement Ford push-to-start smart key programmed during an all-keys-lost service.' ),
		array( 'type' => 'Automotive', 'title' => 'Kia All-Keys-Lost Key Programming', 'image' => 'kia-all-keys-lost-key-programming.jpg', 'alt' => 'MI Lock Pros Kia all-keys-lost key programming work in Southeast Michigan', 'caption' => 'A replacement Kia smart key programmed and checked after all working keys were unavailable.' ),
		array( 'type' => 'Automotive', 'title' => 'Mercedes-Benz All-Keys-Lost Programming', 'image' => 'mercedes-benz-all-keys-lost-programming.jpg', 'alt' => 'MI Lock Pros Mercedes-Benz key programming equipment in Southeast Michigan', 'caption' => 'Specialized programming equipment used during an all-keys-lost Mercedes-Benz key service.' ),
		array( 'type' => 'Automotive', 'title' => 'Jeep FOBIK Key Programming', 'image' => 'jeep-fobik-key-programming.jpg', 'alt' => 'MI Lock Pros Jeep FOBIK key programming work in Southeast Michigan', 'caption' => 'A compatible Jeep FOBIK remote key programmed and checked with diagnostic equipment.' ),
		array( 'type' => 'Automotive', 'title' => 'Honda Key Fob Programming', 'image' => 'honda-key-fob-programming.jpg', 'alt' => 'MI Lock Pros Honda key fob programming work in Southeast Michigan', 'caption' => 'A compatible Honda key fob programmed and verified with professional diagnostic equipment.' ),
		array( 'type' => 'Residential', 'title' => 'Smart Deadbolt & Entry Handleset Installation', 'image' => 'residential-smart-deadbolt-handleset.jpg', 'alt' => 'MI Lock Pros residential smart deadbolt and entry handleset installation in Southeast Michigan', 'caption' => 'A compatible smart deadbolt and coordinated entry handleset installed on a residential front door.' ),
		array( 'type' => 'Residential', 'title' => 'Deadbolt & Handleset Replacement', 'image' => 'residential-deadbolt-handleset-replacement.jpg', 'alt' => 'MI Lock Pros residential deadbolt and entry handleset replacement in Southeast Michigan', 'caption' => 'Updated mechanical deadbolt and entry handleset hardware fitted to an existing residential door.' ),
		array( 'type' => 'Residential', 'title' => 'Keypad Deadbolt Installation', 'image' => 'residential-keypad-deadbolt.jpg', 'alt' => 'MI Lock Pros residential keypad deadbolt installation in Southeast Michigan', 'caption' => 'A compatible keypad deadbolt installed and aligned with the existing residential door hardware.' ),
		array( 'type' => 'Commercial', 'title' => 'Storefront Mortise Cylinder Service', 'image' => 'commercial-storefront-mortise-lock.jpg', 'alt' => 'MI Lock Pros storefront glass door mortise cylinder locksmith work in Southeast Michigan', 'caption' => 'Mechanical lock service completed on a narrow-stile storefront glass entry door.' ),
		array( 'type' => 'Commercial', 'title' => 'Commercial Keypad Lever Installation', 'image' => 'commercial-keypad-lever-lock.jpg', 'alt' => 'MI Lock Pros commercial keypad lever lock installation in Southeast Michigan', 'caption' => 'A compatible mechanical keypad lever installed on a commercial exterior door.' ),
		array( 'type' => 'Commercial', 'title' => 'Double-Door Cylinder Lock Service', 'image' => 'commercial-double-door-cylinder-locks.jpg', 'alt' => 'MI Lock Pros commercial double glass door cylinder lock service in Southeast Michigan', 'caption' => 'Paired mechanical cylinders serviced on an aluminum double-door entrance.' ),
		array( 'type' => 'Commercial', 'title' => 'Glass Entry Door Lock Replacement', 'image' => 'commercial-glass-door-lock-replacement.jpg', 'alt' => 'MI Lock Pros commercial glass entry door lock replacement in Southeast Michigan', 'caption' => 'A replacement mechanical cylinder fitted to a commercial double glass entry door.' ),
	);
}

function mlp_service_data() {
	return array(
		'automotive-locksmith' => array(
			'code'        => 'AUTO / 01',
			'title'       => 'Automotive Locksmith',
			'short_title' => 'Automotive',
			'description' => 'Car lockout help, car key replacement, key fob programming, push-to-start smart key service, and ignition locksmith work.',
			'preparation' => 'When requesting automotive service, share the vehicle year, make, and model; whether every key is lost or a key is locked inside; and any dashboard or ignition symptoms. Be prepared to confirm authorization for the vehicle before access or replacement-key work begins.',
			'services'    => array( 'Car lockouts', 'Car key replacement', 'Key duplication', 'Transponder key programming', 'Key fob programming', 'Push-to-start smart keys', 'Ignition-related locksmith services' ),
			'details'     => array(
				'Car lockouts' => 'Careful entry assistance when a vehicle key is locked inside or unavailable. Authorization for the vehicle may be verified before work begins.',
				'Car key replacement' => 'Replacement options for lost, damaged, or nonworking vehicle keys based on the vehicle year, make, model, and key type.',
				'Key duplication' => 'Duplicate supported vehicle keys so you can keep a working spare before the original key is lost or damaged.',
				'Transponder key programming' => 'Programming for compatible chip keys so the vehicle can recognize and operate with the replacement key.',
				'Key fob programming' => 'Programming and replacement options for compatible key fobs and remote-head vehicle keys.',
				'Push-to-start smart keys' => 'Replacement and programming options for compatible push-to-start smart key systems, based on the vehicle year, make, and model.',
				'Ignition-related locksmith services' => 'Locksmith diagnosis and service for keys that stick, turn poorly, or no longer operate the ignition as expected.',
			),
		),
		'residential-locksmith' => array(
			'code'        => 'HOME / 02',
			'title'       => 'Residential Locksmith',
			'short_title' => 'Residential',
			'description' => 'Dependable lock and key service designed to help protect your home and household.',
			'preparation' => 'Describe the door and lock type, whether the issue affects entry or security, and how many locks need attention. Be prepared to confirm that you are authorized to request work at the property.',
			'services'    => array( 'Home lockouts', 'Lock changes and replacement', 'Lock rekeying', 'Key duplication', 'Deadbolt installation', 'Smart lock installation', 'Home security upgrades' ),
			'details'     => array(
				'Home lockouts' => 'Entry assistance when an authorized occupant is locked out of a house, apartment, or other residence.',
				'Lock changes and replacement' => 'Changing, installing, or replacing compatible door locks when hardware is worn, damaged, or ready for an update.',
				'Lock rekeying' => 'Reconfiguring supported locks to work with a new key while keeping the existing lock hardware in place.',
				'Key duplication' => 'Copies of supported residential keys for household members, trusted family, or a secure spare.',
				'Deadbolt installation' => 'Installation or replacement of compatible deadbolts to strengthen a home’s exterior-door locking hardware.',
				'Smart lock installation' => 'Installation and setup of compatible smart locks for residential doors, including replacing suitable existing lock hardware.',
				'Home security upgrades' => 'A practical review of existing locks and door hardware with recommendations for appropriate mechanical upgrades.',
			),
		),
		'commercial-locksmith' => array(
			'code'        => 'BIZ / 03',
			'title'       => 'Commercial Locksmith',
			'short_title' => 'Commercial',
			'description' => 'Professional lock, key, and door-hardware support for businesses and commercial spaces.',
			'preparation' => 'Share the number and type of doors involved, the existing lock or key hardware, and the work you need completed. For occupied workplaces, include scheduling constraints and the authorized business contact for the project.',
			'services'    => array( 'Business lockouts', 'Commercial lock changes and installation', 'Rekeying and master key systems', 'High-security locks', 'Door hardware and security upgrades' ),
			'details'     => array(
				'Business lockouts' => 'Entry assistance for authorized owners, managers, or employees who are locked out of a commercial property.',
				'Commercial lock changes and installation' => 'Changing, installing, or replacing compatible commercial lock hardware for offices, storefronts, and other business doors.',
				'Rekeying and master key systems' => 'Rekeying supported commercial locks and organizing mechanical master-key systems for practical key management.',
				'High-security locks' => 'Installation and service options for compatible high-security mechanical lock and key systems.',
				'Door hardware and security upgrades' => 'Evaluation and improvement of compatible commercial locks and related mechanical door hardware.',
			),
		),
	);
}

function mlp_faq_data() {
	return array(
		array( 'question' => 'What types of locksmith services does MI Lock Pros provide?', 'answer' => 'MI Lock Pros provides automotive, residential, and commercial locksmith services, including lockouts, key services, lock installation, rekeying, high-security locks, and door-hardware upgrades.' ),
		array( 'question' => 'Can MI Lock Pros help with car keys and key fobs?', 'answer' => 'Automotive services include car lockout help, car key replacement and duplication, transponder key programming, key fob programming, push-to-start smart key service, and ignition-related locksmith work. Compatibility depends on the vehicle year, make, model, and key system.' ),
		array( 'question' => 'Can MI Lock Pros rekey, change, or install smart locks?', 'answer' => 'Residential locksmith services include lock rekeying, lock changes and replacement, deadbolt installation, and installation of compatible smart locks. Contact MI Lock Pros with the lock or door details to confirm compatibility.' ),
		array( 'question' => 'What residential locksmith services are available?', 'answer' => 'Residential services include home lockouts, lock changes and replacement, lock rekeying, key duplication, deadbolt installation, smart lock installation, and home security upgrades.' ),
		array( 'question' => 'What commercial locksmith services are available?', 'answer' => 'Commercial services include business lockouts, commercial lock changes and installation, rekeying, master key systems, high-security locks, and door-hardware upgrades.' ),
		array( 'question' => 'How do I request locksmith service?', 'answer' => 'Call MI Lock Pros at ' . mlp_get_option( 'phone' ) . ' or complete the request-service form with your contact details, service type, location, preferred time, and a short description of the problem.' ),
		array( 'question' => 'What areas does MI Lock Pros serve?', 'answer' => 'MI Lock Pros serves ' . count( mlp_service_area_names() ) . ' listed communities across Southeast Michigan, including areas in Wayne, Oakland, Macomb, Washtenaw, Livingston, and Monroe counties. Check the service-area map and directory or contact us to confirm your location.' ),
	);
}

function mlp_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'custom-logo', array( 'height' => 160, 'width' => 160, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	register_nav_menus( array( 'primary' => __( 'Primary navigation', 'mi-lock-pros' ) ) );
}
add_action( 'after_setup_theme', 'mlp_theme_setup' );

function mlp_enqueue_assets() {
	wp_enqueue_style( 'mlp-site', get_template_directory_uri() . '/assets/css/site.css', array(), MLP_THEME_VERSION );
	wp_enqueue_style( 'mlp-current', get_template_directory_uri() . '/assets/css/current.css', array( 'mlp-site' ), MLP_THEME_VERSION );
	wp_enqueue_script( 'mlp-site', get_template_directory_uri() . '/assets/js/site.js', array(), MLP_THEME_VERSION, true );
	wp_localize_script(
		'mlp-site',
		'miLockPros',
		array(
			'reviewsUrl' => esc_url_raw( rest_url( 'mi-lock-pros/v1/google-reviews' ) ),
			'requestUrl' => esc_url_raw( rest_url( 'mi-lock-pros/v1/service-request' ) ),
			'profileUrl' => esc_url_raw( mlp_get_option( 'google_profile_url' ) ),
			'reviewUrl'  => esc_url_raw( mlp_get_option( 'google_review_url' ) ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'mlp_enqueue_assets' );

function mlp_prevent_stale_homepage_cache() {
	if ( is_admin() || ( ! is_front_page() && ! is_home() ) ) {
		return;
	}
	nocache_headers();
	header( 'Cache-Control: private, no-cache, no-store, must-revalidate, max-age=0' );
	header( 'CDN-Cache-Control: no-cache, no-store' );
	header( 'Surrogate-Control: no-store' );
	header( 'X-LiteSpeed-Cache-Control: no-cache' );
}
add_action( 'send_headers', 'mlp_prevent_stale_homepage_cache', 20 );

function mlp_register_service_post_type() {
	register_post_type(
		'mlp_service',
		array(
			'labels'       => array(
				'name'          => __( 'Locksmith Services', 'mi-lock-pros' ),
				'singular_name' => __( 'Locksmith Service', 'mi-lock-pros' ),
				'add_new_item'  => __( 'Add Locksmith Service', 'mi-lock-pros' ),
				'edit_item'     => __( 'Edit Locksmith Service', 'mi-lock-pros' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'rewrite'      => array( 'slug' => 'locksmith-services', 'with_front' => false ),
			'menu_icon'    => 'dashicons-lock',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
		)
	);
	register_post_type(
		'mlp_area',
		array(
			'labels'       => array(
				'name'          => __( 'Service Areas', 'mi-lock-pros' ),
				'singular_name' => __( 'Service Area', 'mi-lock-pros' ),
				'add_new_item'  => __( 'Add Service Area', 'mi-lock-pros' ),
				'edit_item'     => __( 'Edit Service Area', 'mi-lock-pros' ),
				'all_items'     => __( 'All Service Areas', 'mi-lock-pros' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'rewrite'      => array( 'slug' => 'service-areas', 'with_front' => false ),
			'menu_icon'    => 'dashicons-location-alt',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
		)
	);
}
add_action( 'init', 'mlp_register_service_post_type' );

function mlp_register_virtual_routes() {
	add_rewrite_rule( '^vehicles/?$', 'index.php?mlp_vehicle_directory=1', 'top' );
	add_rewrite_rule( '^vehicles/([^/]+)/?$', 'index.php?mlp_vehicle_make=$matches[1]', 'top' );
	add_rewrite_rule( '^locksmith-services/([^/]+)/([^/]+)/?$', 'index.php?mlp_service_category=$matches[1]&mlp_service_item=$matches[2]', 'top' );
	add_rewrite_rule( '^service-areas/([^/]+)/services/([^/]+)/([^/]+)/?$', 'index.php?mlp_service_area=$matches[1]&mlp_service_category=$matches[2]&mlp_service_item=$matches[3]', 'top' );
}
add_action( 'init', 'mlp_register_virtual_routes', 20 );

function mlp_virtual_query_vars( $vars ) {
	$vars[] = 'mlp_vehicle_directory';
	$vars[] = 'mlp_vehicle_make';
	$vars[] = 'mlp_service_category';
	$vars[] = 'mlp_service_item';
	$vars[] = 'mlp_service_area';
	return $vars;
}
add_filter( 'query_vars', 'mlp_virtual_query_vars' );

function mlp_virtual_template( $template ) {
	if ( get_query_var( 'mlp_vehicle_directory' ) ) { return get_template_directory() . '/vehicles.php'; }
	if ( get_query_var( 'mlp_vehicle_make' ) ) {
		return mlp_get_vehicle_make( sanitize_title( get_query_var( 'mlp_vehicle_make' ) ) ) ? get_template_directory() . '/vehicle-make.php' : get_404_template();
	}
	if ( get_query_var( 'mlp_service_category' ) && get_query_var( 'mlp_service_item' ) ) {
		$item = mlp_get_service_item( sanitize_title( get_query_var( 'mlp_service_category' ) ), sanitize_title( get_query_var( 'mlp_service_item' ) ) );
		if ( ! $item ) { return get_404_template(); }
		if ( get_query_var( 'mlp_service_area' ) && ! mlp_get_service_area_record( sanitize_title( get_query_var( 'mlp_service_area' ) ) ) ) { return get_404_template(); }
		return get_template_directory() . '/service-item.php';
	}
	return $template;
}
add_filter( 'template_include', 'mlp_virtual_template', 99 );

function mlp_virtual_route_status() {
	if ( get_query_var( 'mlp_vehicle_directory' ) || get_query_var( 'mlp_vehicle_make' ) || ( get_query_var( 'mlp_service_category' ) && get_query_var( 'mlp_service_item' ) ) ) {
		global $wp_query;
		$wp_query->is_404 = false;
		status_header( 200 );
	}
}
add_action( 'template_redirect', 'mlp_virtual_route_status', 1 );

function mlp_get_updates_url() {
	$updates_page = get_page_by_path( 'updates', OBJECT, 'page' );
	return $updates_page ? get_permalink( $updates_page ) : home_url( '/updates/' );
}

function mlp_ensure_updates_content() {
	$updates_page = get_page_by_path( 'updates', OBJECT, 'page' );
	if ( ! $updates_page ) {
		wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'Updates & Offers',
				'post_name'    => 'updates',
				'post_content' => '<p>Service stories, locksmith tips, company news, and current offers from MI Lock Pros.</p>',
			)
		);
	}

	$categories = array(
		'deals'           => 'Deals & Offers',
		'recent-work'     => 'Recent Work',
		'locksmith-tips'  => 'Locksmith Tips',
		'service-updates' => 'Service Updates',
	);
	foreach ( $categories as $slug => $name ) {
		if ( ! term_exists( $slug, 'category' ) ) {
			wp_insert_term( $name, 'category', array( 'slug' => $slug ) );
		}
	}
}

function mlp_legal_page_data() {
	return array(
		'privacy-policy' => array(
			'title'   => 'Privacy Policy',
			'content' => <<<'HTML'
<p><strong>Effective September 16, 2026.</strong> This Privacy Policy explains how MI Lock Pros LLC collects, uses, discloses, and protects information when you use this website, submit a service request, or contact us through the details provided here.</p>
<h2>Information we collect</h2>
<p>Information you choose to provide may include your name, phone number or email address, service address or ZIP code, service category, requested locksmith work, preferred contact method, preferred date or time, and the details in your message. One contact detail (a phone number or email address), service type, ZIP code, and matching preferred contact method are required to submit the website form; other fields are optional.</p>
<p>The website and its hosting, security, and form systems may automatically process limited technical information such as an IP address, browser or device type, date and time, referring page, pages visited, and security or error logs. Necessary cookies or similar local-storage technologies may be used to operate, secure, and remember basic website functions.</p>
<h2>How we use information</h2>
<ul>
<li>Respond to inquiries and discuss, schedule, or provide requested locksmith services.</li>
<li>Communicate about service details, authorization, estimates, follow-up, or customer support.</li>
<li>Operate, maintain, troubleshoot, and improve the website and service-request process.</li>
<li>Detect spam, fraud, misuse, security incidents, or unlawful activity.</li>
<li>Comply with legal obligations, enforce our terms, and protect customers, MI Lock Pros, and others.</li>
</ul>
<h2>When information may be shared</h2>
<p>We may share information with service providers that help us host, secure, maintain, or deliver the website, email, and service-request communications. Those providers receive information only for the functions they perform for us and are subject to their own terms and privacy practices.</p>
<p>We may also disclose information when reasonably necessary to comply with law or legal process; protect rights, safety, property, or security; investigate fraud or misuse; or complete a business reorganization or transfer. We do not sell or rent personal information submitted through the service-request form.</p>
<h2>Google and external services</h2>
<p>This website links to the MI Lock Pros Google Business Profile, Google review pages, Facebook, Instagram, and other third-party services. If you follow one of those links or interact with a connected third-party feature, that service may collect information under its own privacy policy. MI Lock Pros does not control those external services.</p>
<h2>Data retention and your choices</h2>
<p>We retain information only as long as reasonably needed to respond to requests, provide and document services, maintain business and tax records, resolve disputes, protect the website, and meet legal obligations. Retention periods may differ depending on the type of record and why it is needed.</p>
<p>You may ask to access, correct, or delete personal information you submitted through the website by contacting us. We may need to verify your identity, and we may retain information when required by law or reasonably needed for legitimate business records, security, or dispute resolution.</p>
<h2>Security and sensitive information</h2>
<p>We use reasonable administrative and technical safeguards appropriate to the information we handle. No internet transmission, email, or storage system is completely secure, so we cannot guarantee absolute security.</p>
<p>Do not submit card numbers, bank information, passwords, alarm codes, PINs, key codes, or other sensitive access credentials through the website form. Share any information needed to verify ownership or authorization directly through an appropriate service channel.</p>
<h2>Children’s privacy</h2>
<p>This website is intended for adults requesting locksmith services and is not directed to children under 13. We do not knowingly collect personal information from children under 13 through the website.</p>
<h2>Changes to this policy</h2>
<p>We may update this Privacy Policy when our practices, technology, or legal obligations change. The effective date at the top of the page shows when the current version became effective.</p>
<h2>Questions</h2>
<p>Questions about this policy can be sent to <a href="mailto:admin@milockprosllc.com">admin@milockprosllc.com</a> or <a href="tel:7342495296">734-249-5296</a>.</p>
HTML,
		),
		'terms'          => array(
			'title'   => 'Terms and Conditions',
			'content' => <<<'HTML'
<p><strong>Effective September 16, 2026.</strong> These Terms and Conditions govern use of the MI Lock Pros LLC website and apply to service requests made through it. Additional written terms, estimates, or authorizations presented before work begins may also apply.</p>
<h2>Website use and service requests</h2>
<p>This website provides general information about MI Lock Pros and a way to request contact about locksmith services. Submitting a form, email, or message does not confirm an appointment, price, arrival time, availability, or scope of work and does not by itself create a service agreement. MI Lock Pros will confirm the relevant service details directly.</p>
<p>You must be at least 18 years old to submit a service request through this website or authorize locksmith work.</p>
<p>You agree to provide accurate information and not to misuse the website, interfere with its operation, submit unlawful requests, or use MI Lock Pros names, logos, photographs, or other content without permission.</p>
<h2>Authority to request locksmith work</h2>
<p>You represent that you own, lawfully possess, manage, or are otherwise authorized to request work on the relevant vehicle, home, business, lock, key, safe, door, or access point. MI Lock Pros may request identification, proof of ownership, proof of occupancy, or other authorization and may decline or stop work when authorization cannot be reasonably verified or when safety or legality is in question.</p>
<h2>Estimates, scope, and payment</h2>
<p>Website descriptions are general. The exact work, price, parts, payment method, and any applicable service conditions should be confirmed before work begins. Conditions discovered during service may change the work or price; MI Lock Pros will explain material changes and obtain approval before proceeding with additional work.</p>
<p>Payment is due as agreed for authorized work, parts, keys, and programming. A service request may be declined or rescheduled when necessary because of access, safety, parts availability, equipment compatibility, weather, legal requirements, or other circumstances.</p>
<h2>Cut and programmed key policy</h2>
<p>Keys, transponder keys, key fobs, remote-head keys, and push-to-start smart keys that are specially cut or programmed for a customer or vehicle are custom items. Once cutting or programming begins or is completed, those items and the associated cutting or programming services are final sale and are not eligible for a cash, card, or digital-payment refund, except when a refund is required by applicable law.</p>
<p>If a key supplied, cut, or programmed by MI Lock Pros stops working on its own, contact us promptly and keep the original item and proof of purchase. If the key has no physical damage, water or liquid damage, misuse, tampering, unauthorized modification, lost components, or other customer-caused damage, MI Lock Pros will inspect it. When we determine that the problem resulted from our cutting or programming work or from a defect in an item we supplied, we will return to repair or reprogram the key. If repair or reprogramming is not reasonably practical, we may provide an appropriate replacement. This repair, reprogramming, or replacement remedy is provided instead of a refund, except where applicable law requires another remedy.</p>
<p>This remedy does not cover loss or theft; water, impact, crushing, heat, battery leakage, misuse, tampering, or unauthorized modification; a vehicle-side, ignition, battery, immobilizer, electrical, or module problem; normal battery replacement; incompatible or defective customer-supplied parts; or a key or vehicle condition unrelated to MI Lock Pros’ work. Nothing in this policy limits a consumer right or remedy that cannot legally be waived.</p>
<h2>Customer-supplied parts and information</h2>
<p>A customer who asks MI Lock Pros to use a customer-supplied key, fob, lock, hardware item, code, or electronic component accepts the risk that it may be incompatible, previously programmed, defective, counterfeit, or otherwise unsuitable. MI Lock Pros is not responsible for defects in customer-supplied items, but remains responsible for its own work to the extent required by law.</p>
<h2>Cancellations and legally protected rights</h2>
<p>Any cancellation right depends on the type and circumstances of the transaction. Nothing in these Terms limits a cancellation, refund, warranty, or other consumer right that applies under federal, Michigan, or other applicable law and cannot be waived. If a separate written estimate, work order, or disclosure gives you additional rights, that document also applies.</p>
<h2>Website information and third-party links</h2>
<p>We work to keep website information accurate, but service descriptions, availability, coverage, and content may change. The website may link to Google, Facebook, Instagram, payment services, or other third parties. MI Lock Pros does not control and is not responsible for the content, availability, security, or policies of external services.</p>
<h2>Disclaimers and limitations</h2>
<p>To the fullest extent permitted by law, the website is provided on an “as available” basis, and MI Lock Pros is not liable for indirect, incidental, special, or consequential loss caused solely by use of or inability to use the website. These Terms do not exclude liability or obligations that cannot legally be excluded and do not replace any express written commitment MI Lock Pros makes for an authorized service.</p>
<h2>Michigan law and changes</h2>
<p>These Terms are governed by Michigan law, without limiting any mandatory protection that applies to you. We may update these Terms as services or legal requirements change. The effective date at the top identifies the current version.</p>
<h2>Questions</h2>
<p>Questions about these Terms can be sent to <a href="mailto:admin@milockprosllc.com">admin@milockprosllc.com</a> or <a href="tel:7342495296">734-249-5296</a>.</p>
HTML,
		),
	);
}

function mlp_upsert_legal_pages( $overwrite_existing = false ) {
	foreach ( mlp_legal_page_data() as $page_slug => $page_data ) {
		$existing  = get_page_by_path( $page_slug, OBJECT, 'page' );
		$post_data = array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $page_data['title'],
			'post_name'    => $page_slug,
			'post_content' => $page_data['content'],
		);

		if ( $existing && ! $overwrite_existing ) {
			$page_id = $existing->ID;
		} elseif ( $existing ) {
			$post_data['ID'] = $existing->ID;
			$page_id         = wp_update_post( $post_data, true );
		} else {
			$page_id = wp_insert_post( $post_data, true );
		}

		if ( 'privacy-policy' === $page_slug && ! is_wp_error( $page_id ) ) {
			update_option( 'wp_page_for_privacy_policy', $page_id );
		}
	}
}

function mlp_ensure_service_area_pages() {
	mlp_register_service_post_type();
	foreach ( mlp_service_area_records() as $area ) {
		$existing = get_page_by_path( $area['slug'], OBJECT, 'mlp_area' );
		if ( $existing ) {
			if ( '' === get_post_meta( $existing->ID, '_mlp_area_name', true ) ) {
				update_post_meta( $existing->ID, '_mlp_area_name', $area['name'] );
				update_post_meta( $existing->ID, '_mlp_area_group', $area['group'] );
			}
			continue;
		}

		$excerpt = sprintf(
			'Mobile automotive, residential, and commercial locksmith services in %s, Michigan, including car keys, lockouts, rekeying, lock changes, and door hardware.',
			$area['name']
		);
		$content = '<p>' . esc_html( sprintf( 'MI Lock Pros provides mobile automotive, residential, and commercial locksmith service for customers in %s, Michigan.', $area['name'] ) ) . '</p>';
		$content .= '<p>' . esc_html( $area['region_summary'] ) . '</p>';
		$content .= '<p>' . esc_html( sprintf( 'Call %s or send your ZIP code to confirm coverage for the exact service location and discuss the locksmith work you need.', mlp_get_option( 'phone' ) ) ) . '</p>';
		$post_id = wp_insert_post(
			array(
				'post_type'    => 'mlp_area',
				'post_status'  => 'publish',
				'post_title'   => $area['name'] . ' Locksmith',
				'post_name'    => $area['slug'],
				'post_excerpt' => $excerpt,
				'post_content' => $content,
			),
			true
		);
		if ( ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_mlp_area_name', $area['name'] );
			update_post_meta( $post_id, '_mlp_area_group', $area['group'] );
		}
	}
}

function mlp_create_default_services() {
	mlp_register_service_post_type();
	foreach ( mlp_service_data() as $slug => $service ) {
		if ( get_page_by_path( $slug, OBJECT, 'mlp_service' ) ) {
			continue;
		}

		$list = '<ul>';
		foreach ( $service['services'] as $item ) {
			$list .= '<li>' . esc_html( $item ) . '</li>';
		}
		$list .= '</ul>';

		wp_insert_post(
			array(
				'post_type'    => 'mlp_service',
				'post_status'  => 'publish',
				'post_title'   => $service['title'],
				'post_name'    => $slug,
				'post_excerpt' => $service['description'],
				'post_content' => '<p>' . esc_html( $service['description'] ) . '</p>' . $list,
			)
		);
	}

	mlp_upsert_legal_pages();
	mlp_ensure_updates_content();
	mlp_ensure_service_area_pages();
	update_option( 'mlp_legal_policy_version', '2.1.0' );
	update_option( 'mlp_updates_content_version', '1.0.0' );
	update_option( 'mlp_service_area_content_version', '1.0.0' );
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'mlp_create_default_services' );

function mlp_sync_legal_pages() {
	if ( '2.1.0' === get_option( 'mlp_legal_policy_version' ) ) {
		return;
	}
	mlp_upsert_legal_pages( true );
	update_option( 'mlp_legal_policy_version', '2.1.0' );
}
add_action( 'admin_init', 'mlp_sync_legal_pages' );

function mlp_sync_version_two_routes() {
	if ( '2.2.0' === get_option( 'mlp_theme_routes_version' ) ) { return; }
	mlp_register_service_post_type();
	mlp_register_virtual_routes();
	flush_rewrite_rules( false );
	update_option( 'mlp_theme_routes_version', '2.2.0' );
}
add_action( 'admin_init', 'mlp_sync_version_two_routes' );

function mlp_sync_updates_content() {
	if ( '1.0.0' === get_option( 'mlp_updates_content_version' ) ) {
		return;
	}
	mlp_ensure_updates_content();
	update_option( 'mlp_updates_content_version', '1.0.0' );
	flush_rewrite_rules( false );
}
add_action( 'admin_init', 'mlp_sync_updates_content' );

function mlp_sync_service_area_pages() {
	if ( '1.0.0' === get_option( 'mlp_service_area_content_version' ) ) {
		return;
	}
	mlp_ensure_service_area_pages();
	update_option( 'mlp_service_area_content_version', '1.0.0' );
	flush_rewrite_rules( false );
}
add_action( 'admin_init', 'mlp_sync_service_area_pages' );

function mlp_add_post_safety_meta_box() {
	foreach ( array( 'post', 'mlp_area' ) as $screen ) {
		add_meta_box(
			'mlp-publishing-checklist',
			__( 'MI Lock Pros publishing checklist', 'mi-lock-pros' ),
			'mlp_render_post_safety_meta_box',
			$screen,
			'side',
			'high'
		);
	}
}
add_action( 'add_meta_boxes', 'mlp_add_post_safety_meta_box' );

function mlp_render_post_safety_meta_box() {
	?>
	<p><strong><?php esc_html_e( 'Before publishing:', 'mi-lock-pros' ); ?></strong></p>
	<ul style="list-style:disc;padding-left:18px">
		<li><?php esc_html_e( 'Use accurate, first-hand information and original photos you are allowed to publish.', 'mi-lock-pros' ); ?></li>
		<li><?php esc_html_e( 'Get permission before showing customers, employees, homes, vehicles, or workplaces.', 'mi-lock-pros' ); ?></li>
		<li><?php esc_html_e( 'Hide faces, addresses, plates, VINs, IDs, key cuts, codes, and security details when needed.', 'mi-lock-pros' ); ?></li>
		<li><?php esc_html_e( 'For a deal, include dates, eligibility, limits, and important conditions.', 'mi-lock-pros' ); ?></li>
		<li><?php esc_html_e( 'Never promise rewards or discounts in exchange for a Google review.', 'mi-lock-pros' ); ?></li>
		<li><?php esc_html_e( 'Avoid keyword stuffing, copied articles, fake jobs, or claims you cannot verify.', 'mi-lock-pros' ); ?></li>
		<li><?php esc_html_e( 'On service-area pages, add only real local details, jobs, or photos and never imply a storefront where none exists.', 'mi-lock-pros' ); ?></li>
	</ul>
	<?php
}

function mlp_customize_register( $customizer ) {
	$customizer->add_section( 'mlp_business_details', array( 'title' => __( 'MI Lock Pros business details', 'mi-lock-pros' ), 'priority' => 30 ) );
	$fields = array(
		'legal_name'         => array( 'Legal business name', 'text', 'sanitize_text_field' ),
		'phone'              => array( 'Phone number', 'text', 'sanitize_text_field' ),
		'email'              => array( 'Email address', 'email', 'sanitize_email' ),
		'service_area'       => array( 'Service area', 'text', 'sanitize_text_field' ),
		'business_hours'     => array( 'Business hours', 'text', 'sanitize_text_field' ),
		'years_experience'   => array( 'Years of experience', 'text', 'sanitize_text_field' ),
		'google_profile_url' => array( 'Google Business Profile URL', 'url', 'esc_url_raw' ),
		'google_review_url'  => array( 'Google leave-a-review URL', 'url', 'esc_url_raw' ),
		'google_place_id'    => array( 'Google Place ID', 'text', 'sanitize_text_field' ),
		'facebook_url'       => array( 'Facebook URL', 'url', 'esc_url_raw' ),
		'instagram_url'      => array( 'Instagram URL', 'url', 'esc_url_raw' ),
	);

	foreach ( $fields as $key => $field ) {
		$customizer->add_setting( 'mlp_' . $key, array( 'default' => mlp_get_option( $key ), 'sanitize_callback' => $field[2], 'transport' => 'refresh' ) );
		$customizer->add_control( 'mlp_' . $key, array( 'label' => __( $field[0], 'mi-lock-pros' ), 'section' => 'mlp_business_details', 'type' => $field[1] ) );
	}
}
add_action( 'customize_register', 'mlp_customize_register' );

function mlp_get_google_api_key() {
	if ( defined( 'MI_LOCK_PROS_GOOGLE_PLACES_API_KEY' ) ) {
		return trim( (string) MI_LOCK_PROS_GOOGLE_PLACES_API_KEY );
	}
	$environment_key = getenv( 'GOOGLE_PLACES_API_KEY' );
	return $environment_key ? trim( $environment_key ) : '';
}

function mlp_reviews_response( WP_REST_Request $request ) {
	$api_key  = mlp_get_google_api_key();
	$place_id = trim( mlp_get_option( 'google_place_id' ) );
	if ( '' === $api_key || ! mlp_is_configured( $place_id ) ) {
		return new WP_REST_Response( array( 'status' => 'unconfigured', 'reviews' => array() ), 200 );
	}

	$cache_key = 'mlp_reviews_v2_' . md5( $place_id );
	$refresh_key = 'mlp_reviews_refresh_' . md5( $place_id );
	if ( '1' === (string) $request->get_param( 'refresh' ) && false === get_transient( $refresh_key ) ) {
		delete_transient( $cache_key );
		set_transient( $refresh_key, 1, MINUTE_IN_SECONDS );
	}
	$cached    = get_transient( $cache_key );
	if ( false !== $cached ) {
		return new WP_REST_Response( $cached, 200, array( 'Cache-Control' => 'public, max-age=300' ) );
	}

	$url      = 'https://places.googleapis.com/v1/places/' . rawurlencode( $place_id ) . '?languageCode=en';
	$response = wp_remote_get(
		$url,
		array(
			'timeout' => 10,
			'headers' => array(
				'X-Goog-Api-Key'   => $api_key,
				'X-Goog-FieldMask' => 'displayName,rating,userRatingCount,googleMapsUri,reviews',
			),
		)
	);

	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
		return new WP_REST_Response( array( 'status' => 'error', 'reviews' => array() ), 502 );
	}

	$place   = json_decode( wp_remote_retrieve_body( $response ), true );
	$reviews = array();
	foreach ( isset( $place['reviews'] ) && is_array( $place['reviews'] ) ? $place['reviews'] : array() as $index => $review ) {
		$text   = isset( $review['text']['text'] ) ? wp_strip_all_tags( $review['text']['text'] ) : '';
		if ( '' === $text && isset( $review['originalText']['text'] ) ) {
			$text = wp_strip_all_tags( $review['originalText']['text'] );
		}
		$author = isset( $review['authorAttribution']['displayName'] ) ? sanitize_text_field( $review['authorAttribution']['displayName'] ) : '';
		$source = isset( $review['googleMapsUri'] ) ? esc_url_raw( $review['googleMapsUri'] ) : '';
		if ( '' === $source && isset( $place['googleMapsUri'] ) ) {
			$source = esc_url_raw( $place['googleMapsUri'] );
		}
		if ( '' === $source ) {
			$source = esc_url_raw( mlp_get_option( 'google_profile_url' ) );
		}
		if ( '' === $text || '' === $author || ! isset( $review['rating'] ) ) {
			continue;
		}
		$reviews[] = array(
			'id'             => isset( $review['name'] ) ? sanitize_text_field( $review['name'] ) : $place_id . '-' . $index,
			'authorName'     => $author,
			'authorUri'      => isset( $review['authorAttribution']['uri'] ) ? esc_url_raw( $review['authorAttribution']['uri'] ) : '',
			'authorPhotoUri' => isset( $review['authorAttribution']['photoUri'] ) ? esc_url_raw( $review['authorAttribution']['photoUri'] ) : '',
			'rating'         => min( 5, max( 0, (float) $review['rating'] ) ),
			'relativeTime'   => isset( $review['relativePublishTimeDescription'] ) ? sanitize_text_field( $review['relativePublishTimeDescription'] ) : '',
			'text'           => $text,
			'googleMapsUri'  => $source,
		);
	}

	$data = array(
		'status'        => 'ready',
		'placeName'     => isset( $place['displayName']['text'] ) ? sanitize_text_field( $place['displayName']['text'] ) : 'MI Lock Pros',
		'rating'        => isset( $place['rating'] ) ? (float) $place['rating'] : null,
		'reviewCount'   => isset( $place['userRatingCount'] ) ? (int) $place['userRatingCount'] : null,
		'googleMapsUri' => isset( $place['googleMapsUri'] ) ? esc_url_raw( $place['googleMapsUri'] ) : esc_url_raw( mlp_get_option( 'google_profile_url' ) ),
		'reviews'       => $reviews,
	);
	set_transient( $cache_key, $data, HOUR_IN_SECONDS );
	return new WP_REST_Response( $data, 200, array( 'Cache-Control' => 'public, max-age=300' ) );
}

function mlp_service_request( WP_REST_Request $request ) {
	$params = $request->get_json_params();
	if ( ! is_array( $params ) ) {
		$params = $request->get_params();
	}
	if ( ! empty( $params['website'] ) ) {
		return new WP_REST_Response( array( 'success' => true ), 200 );
	}

	$remote_address = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$rate_key       = 'mlp_form_' . md5( $remote_address );
	$attempts       = (int) get_transient( $rate_key );
	if ( $attempts >= 5 ) {
		return new WP_REST_Response( array( 'success' => false, 'message' => 'Too many requests. Please call MI Lock Pros instead.' ), 429 );
	}

	$name            = isset( $params['full_name'] ) ? sanitize_text_field( $params['full_name'] ) : '';
	$contact         = isset( $params['contact'] ) ? sanitize_text_field( $params['contact'] ) : '';
	$phone           = isset( $params['phone'] ) ? sanitize_text_field( $params['phone'] ) : '';
	$email           = isset( $params['email'] ) ? sanitize_email( $params['email'] ) : '';
	if ( '' !== $contact ) {
		if ( is_email( $contact ) ) {
			$email = sanitize_email( $contact );
			$phone = '';
		} else {
			$phone = $contact;
			$email = '';
		}
	}
	$location        = isset( $params['service_address'] ) ? sanitize_text_field( $params['service_address'] ) : '';
	$service_type    = isset( $params['service_type'] ) ? sanitize_key( $params['service_type'] ) : '';
	$contact_method  = isset( $params['contact_method'] ) ? sanitize_key( $params['contact_method'] ) : '';
	$preferred_time  = isset( $params['preferred_time'] ) ? sanitize_text_field( $params['preferred_time'] ) : '';
	$message         = isset( $params['message'] ) ? sanitize_textarea_field( $params['message'] ) : '';
	$consent         = ! empty( $params['consent'] );
	$allowed_types   = array( 'automotive', 'residential', 'commercial' );
	$allowed_contact = array( 'phone', 'email', 'text' );

	$phone_digits    = preg_replace( '/\D/', '', $phone );
	$has_phone       = strlen( $phone_digits ) >= 10;
	$has_email       = '' !== $email && is_email( $email );
	$valid_phone     = '' === $phone || $has_phone;
	$valid_email     = '' === $email || $has_email;
	$valid_zip       = (bool) preg_match( '/^\d{5}(?:-\d{4})?$/', $location );
	$valid_contact   = in_array( $contact_method, $allowed_contact, true );
	$contact_matches = ( 'email' === $contact_method && $has_email ) || ( in_array( $contact_method, array( 'phone', 'text' ), true ) && $has_phone );
	if ( ( ! $has_phone && ! $has_email ) || ! $valid_phone || ! $valid_email || ! $valid_zip || ! in_array( $service_type, $allowed_types, true ) || ! $valid_contact || ! $contact_matches ) {
		return new WP_REST_Response( array( 'success' => false, 'message' => 'Enter a valid phone number or email address, ZIP code, service type, and matching preferred contact method.' ), 400 );
	}

	set_transient( $rate_key, $attempts + 1, HOUR_IN_SECONDS );
	$recipient = sanitize_email( mlp_get_option( 'email' ) );
	$subject   = sprintf( 'MI Lock Pros service request: %s', ucfirst( $service_type ) );
	$body      = implode(
		"\n",
		array(
			'Name: ' . $name,
			'Phone: ' . $phone,
			'Email: ' . $email,
			'Service address or ZIP: ' . $location,
			'Service type: ' . ucfirst( $service_type ),
			'Preferred contact: ' . ucfirst( $contact_method ),
			'Preferred date/time: ' . $preferred_time,
			'Optional contact consent: ' . ( $consent ? 'Yes' : 'Not selected' ),
			'',
			'Message:',
			$message,
		)
	);
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( '' !== $email && is_email( $email ) ) {
		$reply_name = '' !== $name ? $name : 'MI Lock Pros website visitor';
		$headers[]  = 'Reply-To: ' . $reply_name . ' <' . $email . '>';
	}
	$sent = wp_mail( $recipient, $subject, $body, $headers );

	if ( ! $sent ) {
		return new WP_REST_Response( array( 'success' => false, 'message' => 'The request could not be sent. Please call MI Lock Pros.' ), 500 );
	}
	return new WP_REST_Response( array( 'success' => true, 'message' => 'Your request was sent to MI Lock Pros.' ), 200 );
}

function mlp_register_rest_routes() {
	register_rest_route( 'mi-lock-pros/v1', '/google-reviews', array( 'methods' => WP_REST_Server::READABLE, 'callback' => 'mlp_reviews_response', 'permission_callback' => '__return_true' ) );
	register_rest_route( 'mi-lock-pros/v1', '/service-request', array( 'methods' => WP_REST_Server::CREATABLE, 'callback' => 'mlp_service_request', 'permission_callback' => '__return_true' ) );
}
add_action( 'rest_api_init', 'mlp_register_rest_routes' );

function mlp_robots_txt( $output, $public ) {
	if ( ! $public ) {
		return $output;
	}
	return $output . "\nUser-agent: OAI-SearchBot\nAllow: /\nDisallow: /wp-json/mi-lock-pros/\n\nUser-agent: ChatGPT-User\nAllow: /\nDisallow: /wp-json/mi-lock-pros/\n\nSitemap: " . home_url( '/mi-lock-pros-sitemap.xml' ) . "\n";
}
add_filter( 'robots_txt', 'mlp_robots_txt', 10, 2 );

function mlp_xml_sitemap() {
	$request_path = isset( $_SERVER['REQUEST_URI'] ) ? wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), PHP_URL_PATH ) : '';
	if ( '/mi-lock-pros-sitemap.xml' !== $request_path ) { return; }
	$urls = array( home_url( '/' ), home_url( '/vehicles/' ), mlp_get_updates_url() );
	foreach ( mlp_service_data() as $category_slug => $service ) {
		$post   = get_page_by_path( $category_slug, OBJECT, 'mlp_service' );
		$urls[] = $post ? get_permalink( $post ) : home_url( '/locksmith-services/' . $category_slug . '/' );
		foreach ( $service['services'] as $item ) { $urls[] = mlp_service_item_url( $category_slug, $item ); }
	}
	foreach ( mlp_service_area_names() as $area_name ) { $urls[] = mlp_get_service_area_url( $area_name ); }
	foreach ( mlp_vehicle_makes() as $make ) { $urls[] = home_url( '/vehicles/' . $make['slug'] . '/' ); }
	$urls = array_values( array_unique( $urls ) );
	status_header( 200 );
	header( 'Content-Type: application/xml; charset=UTF-8' );
	echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
	foreach ( $urls as $url ) { echo '<url><loc>' . esc_xml( $url ) . '</loc></url>' . "\n"; }
	echo '</urlset>';
	exit;
}
add_action( 'template_redirect', 'mlp_xml_sitemap', 0 );

function mlp_virtual_page_robots( $robots ) {
	if ( get_query_var( 'mlp_service_area' ) && get_query_var( 'mlp_service_item' ) ) {
		$robots['noindex'] = true;
		$robots['follow']  = true;
		unset( $robots['index'], $robots['nofollow'] );
	}
	return $robots;
}
add_filter( 'wp_robots', 'mlp_virtual_page_robots' );

function mlp_has_seo_plugin() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'AIOSEO_VERSION' );
}

function mlp_document_title( $title ) {
	if ( is_front_page() ) {
		return 'Ann Arbor & Detroit Locksmith | MI Lock Pros';
	}
	if ( get_query_var( 'mlp_vehicle_directory' ) ) { return 'Car Key & Key Fob Vehicle Guide | MI Lock Pros'; }
	if ( get_query_var( 'mlp_vehicle_make' ) ) {
		$make = mlp_get_vehicle_make( sanitize_title( get_query_var( 'mlp_vehicle_make' ) ) );
		return $make ? $make['name'] . ' Car Key & Fob Service | MI Lock Pros' : $title;
	}
	if ( get_query_var( 'mlp_service_category' ) && get_query_var( 'mlp_service_item' ) ) {
		$item = mlp_get_service_item( sanitize_title( get_query_var( 'mlp_service_category' ) ), sanitize_title( get_query_var( 'mlp_service_item' ) ) );
		$area_record = get_query_var( 'mlp_service_area' ) ? mlp_get_service_area_record( sanitize_title( get_query_var( 'mlp_service_area' ) ) ) : null;
		return $item ? $item['name'] . ( $area_record ? ' in ' . $area_record['name'] . ', MI' : ' in Southeast Michigan' ) . ' | MI Lock Pros' : $title;
	}
	if ( is_singular( 'mlp_area' ) ) {
		$area_name = get_post_meta( get_queried_object_id(), '_mlp_area_name', true );
		return ( $area_name ? $area_name : get_the_title() ) . ', MI Locksmith | MI Lock Pros';
	}
	return $title;
}
add_filter( 'pre_get_document_title', 'mlp_document_title' );

function mlp_seo_head() {
	$home        = home_url( '/' );
	$area        = mlp_is_configured( mlp_get_option( 'service_area' ) ) ? ' in ' . mlp_get_option( 'service_area' ) : '';
	$description = 'Mobile automotive, residential, and commercial locksmith services in Ann Arbor, Detroit, and across Southeast Michigan. Call MI Lock Pros at ' . mlp_get_option( 'phone' ) . '.';
	$title       = 'Ann Arbor & Detroit Locksmith | MI Lock Pros';
	$url         = is_singular() ? get_permalink() : $home;
	$og_type     = 'website';
	$og_image    = '';
	$is_virtual  = false;

	if ( get_query_var( 'mlp_vehicle_directory' ) ) {
		$is_virtual = true; $title = 'Car Key & Key Fob Vehicle Guide | MI Lock Pros'; $description = 'Browse supported vehicle makes and models for car key replacement, key duplication, transponder programming, key fob programming, and push-to-start keys in Southeast Michigan.'; $url = home_url( '/vehicles/' );
	}
	if ( get_query_var( 'mlp_vehicle_make' ) ) {
		$make = mlp_get_vehicle_make( sanitize_title( get_query_var( 'mlp_vehicle_make' ) ) );
		if ( $make ) { $is_virtual = true; $title = $make['name'] . ' Car Key & Fob Service | MI Lock Pros'; $description = $make['summary'] . ' Call to confirm the exact year and key system.'; $url = home_url( '/vehicles/' . $make['slug'] . '/' ); }
	}
	if ( get_query_var( 'mlp_service_category' ) && get_query_var( 'mlp_service_item' ) ) {
		$item = mlp_get_service_item( sanitize_title( get_query_var( 'mlp_service_category' ) ), sanitize_title( get_query_var( 'mlp_service_item' ) ) );
		$area_record = get_query_var( 'mlp_service_area' ) ? mlp_get_service_area_record( sanitize_title( get_query_var( 'mlp_service_area' ) ) ) : null;
		if ( $item ) { $is_virtual = true; $title = $item['name'] . ( $area_record ? ' in ' . $area_record['name'] . ', MI' : ' in Southeast Michigan' ) . ' | MI Lock Pros'; $description = $item['description'] . ( $area_record ? ' Mobile service in ' . $area_record['name'] . ', Michigan.' : ' Mobile service across Southeast Michigan.' ) . ' Call ' . mlp_get_option( 'phone' ) . ' to confirm.'; $url = mlp_service_item_url( $item['category_slug'], $item['name'], $area_record ? $area_record['slug'] : '' ); }
	}

	if ( is_singular( 'mlp_service' ) ) {
		$title       = get_the_title() . $area . ' | MI Lock Pros';
		$description = has_excerpt() ? wp_strip_all_tags( get_the_excerpt() ) : $description;
	}
	if ( is_singular( 'mlp_area' ) ) {
		$area_name   = get_post_meta( get_the_ID(), '_mlp_area_name', true );
		$area_name   = $area_name ? $area_name : get_the_title();
		$title       = $area_name . ', MI Locksmith | MI Lock Pros';
		$description = has_excerpt() ? wp_strip_all_tags( get_the_excerpt() ) : 'Mobile automotive, residential, and commercial locksmith services in ' . $area_name . ', Michigan. Call MI Lock Pros at ' . mlp_get_option( 'phone' ) . '.';
	}
	if ( is_singular( 'post' ) ) {
		$title       = get_the_title() . ' | MI Lock Pros';
		$description = wp_trim_words( wp_strip_all_tags( get_the_excerpt() ), 28 );
		$og_type     = 'article';
		$og_image    = get_the_post_thumbnail_url( get_the_ID(), 'full' );
	}
	if ( is_page( 'updates' ) ) {
		$title       = 'Locksmith Updates & Offers | MI Lock Pros';
		$description = 'Recent MI Lock Pros service stories, locksmith tips, company updates, and current offers across Southeast Michigan.';
	}
	if ( is_category() ) {
		$title       = single_cat_title( '', false ) . ' | MI Lock Pros Updates';
		$description = wp_strip_all_tags( category_description() );
		$url         = get_category_link( get_queried_object_id() );
	}

	if ( ! mlp_has_seo_plugin() || $is_virtual ) {
		echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
		if ( is_front_page() ) {
			echo '<link rel="canonical" href="' . esc_url( $home ) . '">' . "\n";
		}
		if ( $is_virtual ) { echo '<link rel="canonical" href="' . esc_url( $url ) . '">' . "\n"; }
		echo '<meta property="og:type" content="' . esc_attr( $og_type ) . '">' . "\n";
		echo '<meta property="og:locale" content="en_US">' . "\n";
		echo '<meta property="og:site_name" content="MI Lock Pros">' . "\n";
		echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
		echo '<meta property="og:description" content="' . esc_attr( $description ) . '">' . "\n";
		echo '<meta property="og:url" content="' . esc_url( $url ) . '">' . "\n";
		echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";
		echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '">' . "\n";
		if ( is_front_page() ) {
			$social_image = get_template_directory_uri() . '/assets/images/og-gold.png';
			echo '<meta property="og:image" content="' . esc_url( $social_image ) . '">' . "\n";
			echo '<meta property="og:image:width" content="1200">' . "\n";
			echo '<meta property="og:image:height" content="630">' . "\n";
			echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
			echo '<meta name="twitter:image" content="' . esc_url( $social_image ) . '">' . "\n";
		} elseif ( $og_image ) {
			echo '<meta property="og:image" content="' . esc_url( $og_image ) . '">' . "\n";
			echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
			echo '<meta name="twitter:image" content="' . esc_url( $og_image ) . '">' . "\n";
		}
	}
	echo '<meta name="theme-color" content="#050504">' . "\n";

	$business_id = trailingslashit( $home ) . '#business';
	$business    = array(
		'@type'           => array( 'LocalBusiness', 'Locksmith' ),
		'@id'             => $business_id,
		'name'            => 'MI Lock Pros',
		'legalName'       => mlp_get_option( 'legal_name' ),
		'alternateName'   => array( 'MI Lock Pros LLC', 'MI LOCK PROS LLC' ),
		'url'             => $home,
		'logo'            => get_template_directory_uri() . '/assets/images/mi-lock-pros-logo.png',
		'image'           => get_template_directory_uri() . '/assets/images/og-gold.png',
		'telephone'       => mlp_get_option( 'phone' ),
		'email'           => mlp_get_option( 'email' ),
		'openingHours'    => 'Mo-Su 00:00-23:59',
		'openingHoursSpecification' => array(
			'@type'     => 'OpeningHoursSpecification',
			'dayOfWeek' => array( 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ),
			'opens'     => '00:00',
			'closes'    => '23:59',
		),
		'paymentAccepted'  => 'Cash, Visa, Mastercard, Discover, American Express, Cash App, Zelle',
		'currenciesAccepted' => 'USD',
		'knowsLanguage'    => 'English',
		'contactPoint'     => array(
			'@type'             => 'ContactPoint',
			'telephone'         => mlp_get_option( 'phone' ),
			'email'             => mlp_get_option( 'email' ),
			'contactType'       => 'customer service',
			'areaServed'        => mlp_get_option( 'service_area' ),
			'availableLanguage' => array( 'English' ),
		),
		'description'     => 'Mobile automotive, residential, and commercial locksmith services in Ann Arbor, Detroit, and across Southeast Michigan, with clear communication and dependable customer care.',
		'hasOfferCatalog' => array(
			'@type'           => 'OfferCatalog',
			'name'            => 'Locksmith services',
			'itemListElement' => array(),
		),
	);
	$business['areaServed'] = array_map(
		function ( $area ) {
			return array( '@type' => 'Place', 'name' => $area );
		},
		mlp_service_area_names()
	);
	if ( mlp_is_configured( mlp_get_option( 'google_profile_url' ) ) ) {
		$business['hasMap'] = mlp_get_option( 'google_profile_url' );
	}
	$business['sameAs'] = array_values(
		array_filter(
			array(
				mlp_get_option( 'google_profile_url' ),
				mlp_get_option( 'facebook_url' ),
				mlp_get_option( 'instagram_url' ),
			),
			'mlp_is_configured'
		)
	);
	foreach ( mlp_service_data() as $slug => $service ) {
		$post = get_page_by_path( $slug, OBJECT, 'mlp_service' );
		$business['hasOfferCatalog']['itemListElement'][] = array(
			'@type'       => 'Offer',
			'itemOffered' => array( '@type' => 'Service', 'name' => $service['title'], 'description' => $service['description'], 'url' => $post ? get_permalink( $post ) : $home . '#services' ),
		);
	}
	$known_services = array();
	foreach ( mlp_service_data() as $service ) {
		foreach ( $service['services'] as $service_item ) {
			$known_services[] = $service_item;
		}
	}
	$business['knowsAbout'] = $known_services;

	$graph = array(
		$business,
		array( '@type' => 'WebSite', '@id' => trailingslashit( $home ) . '#website', 'url' => $home, 'name' => 'MI Lock Pros', 'alternateName' => mlp_get_option( 'legal_name' ), 'publisher' => array( '@id' => $business_id ), 'inLanguage' => 'en-US' ),
	);
	if ( get_query_var( 'mlp_vehicle_directory' ) ) {
		$list = array(); $position = 1;
		foreach ( mlp_vehicle_makes() as $make ) { $list[] = array( '@type' => 'ListItem', 'position' => $position++, 'name' => $make['name'], 'url' => home_url( '/vehicles/' . $make['slug'] . '/' ) ); }
		$graph[] = array( '@type' => 'CollectionPage', '@id' => $url . '#webpage', 'url' => $url, 'name' => $title, 'description' => $description, 'isPartOf' => array( '@id' => trailingslashit( $home ) . '#website' ), 'mainEntity' => array( '@type' => 'ItemList', 'itemListElement' => $list ) );
	}
	if ( get_query_var( 'mlp_vehicle_make' ) ) {
		$make = mlp_get_vehicle_make( sanitize_title( get_query_var( 'mlp_vehicle_make' ) ) );
		if ( $make ) { $graph[] = array( '@type' => 'WebPage', '@id' => $url . '#webpage', 'url' => $url, 'name' => $title, 'description' => $description, 'isPartOf' => array( '@id' => trailingslashit( $home ) . '#website' ), 'about' => array( '@id' => $business_id ), 'keywords' => array_merge( array( $make['name'] . ' car key replacement', $make['name'] . ' key fob programming' ), $make['models'] ) ); }
	}
	if ( get_query_var( 'mlp_service_category' ) && get_query_var( 'mlp_service_item' ) ) {
		$service_item = mlp_get_service_item( sanitize_title( get_query_var( 'mlp_service_category' ) ), sanitize_title( get_query_var( 'mlp_service_item' ) ) );
		$service_area = get_query_var( 'mlp_service_area' ) ? mlp_get_service_area_record( sanitize_title( get_query_var( 'mlp_service_area' ) ) ) : null;
		if ( $service_item ) { $graph[] = array( '@type' => 'Service', '@id' => $url . '#service', 'name' => $service_item['name'] . ( $service_area ? ' in ' . $service_area['name'] . ', Michigan' : '' ), 'serviceType' => $service_item['name'], 'url' => $url, 'description' => $description, 'provider' => array( '@id' => $business_id ), 'areaServed' => array( '@type' => 'AdministrativeArea', 'name' => $service_area ? $service_area['name'] . ', Michigan' : 'Southeast Michigan' ) ); }
	}
	if ( is_front_page() ) {
		$graph[] = array(
			'@type'              => 'WebPage',
			'@id'                => trailingslashit( $home ) . '#webpage',
			'url'                => $home,
			'name'               => 'Ann Arbor & Detroit Locksmith | MI Lock Pros',
			'description'        => 'Mobile automotive, residential, and commercial locksmith services in Ann Arbor, Detroit, and across Southeast Michigan for locks, keys, lockouts, rekeying, and door hardware.',
			'isPartOf'           => array( '@id' => trailingslashit( $home ) . '#website' ),
			'about'              => array( '@id' => $business_id ),
			'primaryImageOfPage' => array( '@type' => 'ImageObject', 'url' => get_template_directory_uri() . '/assets/images/og-gold.png' ),
		);
		$questions = array();
		foreach ( mlp_faq_data() as $faq ) {
			$questions[] = array( '@type' => 'Question', 'name' => $faq['question'], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $faq['answer'] ) );
		}
		$graph[] = array( '@type' => 'FAQPage', '@id' => trailingslashit( $home ) . '#faq', 'mainEntity' => $questions );
	}
	if ( is_singular( 'mlp_service' ) ) {
		$counties = array( 'Wayne County', 'Oakland County', 'Macomb County', 'Washtenaw County', 'Livingston County', 'Monroe County' );
		$graph[] = array(
			'@type'       => 'Service',
			'@id'         => get_permalink() . '#service',
			'name'        => get_the_title(),
			'serviceType' => get_the_title(),
			'url'         => get_permalink(),
			'description' => has_excerpt() ? wp_strip_all_tags( get_the_excerpt() ) : '',
			'provider'    => array( '@id' => $business_id ),
			'areaServed'  => array_map(
				function ( $county ) {
					return array( '@type' => 'AdministrativeArea', 'name' => $county );
				},
				$counties
			),
		);
	}
	if ( is_singular( 'mlp_area' ) ) {
		$area_name = get_post_meta( get_the_ID(), '_mlp_area_name', true );
		$area_name = $area_name ? $area_name : get_the_title();
		$area_url  = get_permalink();
		$graph[]   = array(
			'@type'       => 'WebPage',
			'@id'         => $area_url . '#webpage',
			'url'         => $area_url,
			'name'        => $area_name . ', MI Locksmith | MI Lock Pros',
			'description' => $description,
			'isPartOf'    => array( '@id' => trailingslashit( $home ) . '#website' ),
			'about'       => array( '@id' => $business_id ),
		);
		$graph[]   = array(
			'@type'       => 'Service',
			'@id'         => $area_url . '#service',
			'name'        => 'Mobile locksmith services in ' . $area_name . ', Michigan',
			'serviceType' => 'Automotive, residential, and commercial locksmith services',
			'url'         => $area_url,
			'description' => $description,
			'provider'    => array( '@id' => $business_id ),
			'areaServed'  => array( '@type' => 'AdministrativeArea', 'name' => $area_name . ', Michigan' ),
		);
		$graph[]   = array(
			'@type'           => 'BreadcrumbList',
			'@id'             => $area_url . '#breadcrumb',
			'itemListElement' => array(
				array( '@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $home ),
				array( '@type' => 'ListItem', 'position' => 2, 'name' => 'Service Area', 'item' => $home . '#service-area' ),
				array( '@type' => 'ListItem', 'position' => 3, 'name' => $area_name, 'item' => $area_url ),
			),
		);
	}
	if ( is_singular( 'post' ) ) {
		$article = array(
			'@type'            => 'BlogPosting',
			'@id'              => get_permalink() . '#article',
			'headline'         => get_the_title(),
			'description'      => wp_trim_words( wp_strip_all_tags( get_the_excerpt() ), 35 ),
			'url'              => get_permalink(),
			'datePublished'    => get_the_date( DATE_W3C ),
			'dateModified'     => get_the_modified_date( DATE_W3C ),
			'mainEntityOfPage' => get_permalink(),
			'author'           => array( '@id' => $business_id ),
			'publisher'        => array( '@id' => $business_id ),
			'isPartOf'         => array( '@id' => trailingslashit( $home ) . '#website' ),
		);
		if ( has_post_thumbnail() ) {
			$article['image'] = get_the_post_thumbnail_url( get_the_ID(), 'full' );
		}
		$graph[] = $article;
	}

	echo '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@graph' => $graph ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
	if ( ! has_site_icon() ) {
		echo '<link rel="icon" href="' . esc_url( get_template_directory_uri() . '/assets/images/favicon.png' ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'mlp_seo_head', 5 );

function mlp_llms_txt() {
	$request_path = isset( $_SERVER['REQUEST_URI'] ) ? wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), PHP_URL_PATH ) : '';
	if ( '/llms.txt' !== untrailingslashit( (string) $request_path ) ) {
		return;
	}

	$lines = array(
		'# ' . mlp_get_option( 'legal_name' ),
		'',
		'> MI Lock Pros provides mobile automotive, residential, and commercial locksmith services in Ann Arbor, Detroit, and across Southeast Michigan.',
		'',
		'Canonical website: ' . home_url( '/' ),
		'Phone: ' . mlp_get_option( 'phone' ),
		'Email: ' . mlp_get_option( 'email' ),
		'Business hours: ' . mlp_get_option( 'business_hours' ),
		'Primary service region: ' . mlp_get_option( 'service_area' ),
		'Google Business Profile: ' . mlp_get_option( 'google_profile_url' ),
		'Updates and offers: ' . mlp_get_updates_url(),
		'',
		'# Services',
		'',
	);
	foreach ( mlp_service_data() as $slug => $service ) {
		$lines[] = '## ' . $service['title'];
		$lines[] = $service['description'];
		foreach ( $service['services'] as $service_item ) {
			$detail  = isset( $service['details'][ $service_item ] ) ? $service['details'][ $service_item ] : '';
			$lines[] = '- ' . $service_item . ( '' !== $detail ? ': ' . $detail : '' );
		}
		$service_post = get_page_by_path( $slug, OBJECT, 'mlp_service' );
		$lines[]      = 'Details: ' . ( $service_post ? get_permalink( $service_post ) : home_url( '/#services' ) );
		$lines[]      = '';
	}
	$lines[] = '# Service areas';
	$lines[] = '';
	foreach ( mlp_service_area_groups() as $group_name => $areas ) {
		$lines[] = '## ' . $group_name;
		foreach ( $areas as $area_name ) {
			$lines[] = '- ' . $area_name . ': ' . mlp_get_service_area_url( $area_name );
		}
		$lines[] = '';
	}
	$lines[] = '# Important notes';
	$lines[] = '';
	$lines[] = '- Contact MI Lock Pros to confirm service for an exact ZIP code or address.';
	$lines[] = '- The website does not claim a guaranteed response time.';

	status_header( 200 );
	header( 'Content-Type: text/plain; charset=utf-8' );
	header( 'Cache-Control: public, max-age=3600' );
	echo implode( "\n", array_map( 'wp_strip_all_tags', $lines ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit;
}
add_action( 'template_redirect', 'mlp_llms_txt', 0 );
