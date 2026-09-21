<?php
/** Service-area detail page. @package MILockPros */
get_header();
while ( have_posts() ) :
	the_post();
	$area_slug  = get_post_field( 'post_name', get_the_ID() );
	$area       = mlp_get_service_area_record( $area_slug );
	$area_name  = get_post_meta( get_the_ID(), '_mlp_area_name', true );
	$area_name  = $area_name ? $area_name : ( $area ? $area['name'] : get_the_title() );
	$area_group = get_post_meta( get_the_ID(), '_mlp_area_group', true );
	$area_group = $area_group ? $area_group : ( $area ? $area['group'] : 'Southeast Michigan' );
	if ( ! $area ) {
		$area = array(
			'name'           => $area_name,
			'slug'           => $area_slug,
			'group'          => $area_group,
			'region_summary' => mlp_service_area_region_summary( $area_group ),
		);
	}
	$nearby  = mlp_get_nearby_service_areas( $area );
	$services = mlp_service_data();
	?>
	<main class="service-main location-main" id="main-content">
		<section class="service-hero location-hero section-shell">
			<nav class="breadcrumb" aria-label="Breadcrumb"><a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Home</a><span>/</span><a href="<?php echo esc_url( mlp_home_section_url( 'service-area' ) ); ?>">Service Area</a><span>/</span><span aria-current="page"><?php echo esc_html( $area_name ); ?></span></nav>
			<p class="eyebrow"><span></span> Mobile service coverage</p>
			<h1>Locksmith services in <em><?php echo esc_html( $area_name ); ?>, Michigan.</em></h1>
			<p>MI Lock Pros provides mobile automotive, residential, and commercial locksmith service for customers in <?php echo esc_html( $area_name ); ?>. Call or send your ZIP code so we can confirm coverage for your exact location and discuss the work you need.</p>
			<div class="hero-actions"><a class="button button-primary button-large" href="<?php echo esc_url( mlp_phone_href() ); ?>">Call <?php echo esc_html( mlp_get_option( 'phone' ) ); ?> <span class="theme-arrow" aria-hidden="true"></span></a><a class="button button-secondary button-large" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>">Request Service</a></div>
			<p class="location-disclosure"><strong>Mobile service area:</strong> This page describes coverage in <?php echo esc_html( $area_name ); ?>; it does not represent a separate MI Lock Pros storefront or office in the community.</p>
		</section>

		<section class="location-services section-shell" aria-labelledby="location-services-title">
			<div class="section-heading"><p class="eyebrow"><span></span> Services in <?php echo esc_html( $area_name ); ?></p><h2 id="location-services-title">Lock, key, and entry help for vehicles, homes, and businesses.</h2><p>Select a specific service to see details written for <?php echo esc_html( $area_name ); ?>, or call MI Lock Pros to confirm coverage and compatibility.</p></div>
			<div class="location-service-grid">
				<?php foreach ( $services as $service_slug => $service ) : ?>
					<?php $service_post = get_page_by_path( $service_slug, OBJECT, 'mlp_service' ); ?>
					<article class="location-service-card">
						<div><small><?php echo esc_html( $service['code'] ); ?></small><h3><?php echo esc_html( $service['title'] ); ?></h3><p><?php echo esc_html( $service['description'] ); ?></p></div>
						<ul><?php foreach ( $service['services'] as $item ) : ?><li><a href="<?php echo esc_url( mlp_service_item_url( $service_slug, $item, $area_slug ) ); ?>"><span aria-hidden="true">+</span><?php echo esc_html( $item ); ?> in <?php echo esc_html( $area_name ); ?><b>View</b></a></li><?php endforeach; ?></ul>
						<a class="service-detail-link" href="<?php echo esc_url( $service_post ? get_permalink( $service_post ) : mlp_home_section_url( 'services' ) ); ?>">Explore <?php echo esc_html( strtolower( $service['short_title'] ) ); ?> services <span class="theme-arrow" aria-hidden="true"></span></a>
					</article>
				<?php endforeach; ?>
			</div>
		</section>

		<section class="location-context section-shell">
			<div><p class="eyebrow"><span></span> <?php echo esc_html( $area_group ); ?></p><h2>Mobile coverage centered on your service location.</h2></div>
			<div class="service-guide-card">
				<div class="area-editor-content"><?php the_content(); ?></div>
				<p>Service availability can depend on the exact ZIP code, technician schedule, vehicle or hardware type, and parts compatibility. MI Lock Pros does not promise a specific arrival time on this page.</p>
			</div>
		</section>

		<section class="location-process section-shell" aria-labelledby="location-process-title">
			<div class="section-heading"><p class="eyebrow"><span></span> Requesting service</p><h2 id="location-process-title">What to include when you contact us.</h2></div>
			<ol>
				<li><span>01</span><div><strong>Share the ZIP code</strong><p>Provide the ZIP code for the vehicle, home, or business so coverage in <?php echo esc_html( $area_name ); ?> can be confirmed.</p></div></li>
				<li><span>02</span><div><strong>Describe the locksmith need</strong><p>Include the service category, lock or door type, and vehicle year, make, and model when applicable.</p></div></li>
				<li><span>03</span><div><strong>Confirm authorization</strong><p>Be prepared to show that you are authorized to request entry, key, lock, or door-hardware work.</p></div></li>
			</ol>
		</section>

		<section class="location-faq section-shell" aria-labelledby="location-faq-title">
			<div class="faq-intro"><p class="eyebrow"><span></span> <?php echo esc_html( $area_name ); ?> service questions</p><h2 id="location-faq-title">Helpful details before you call.</h2></div>
			<div class="faq-list">
				<details open><summary>Does MI Lock Pros serve <?php echo esc_html( $area_name ); ?>?<span aria-hidden="true">+</span></summary><p>Yes, <?php echo esc_html( $area_name ); ?> is included in the listed MI Lock Pros mobile service area. Contact us with the exact ZIP code and requested service so current coverage can be confirmed.</p></details>
				<details><summary>What locksmith services are available in <?php echo esc_html( $area_name ); ?>?<span aria-hidden="true">+</span></summary><p>Services include supported automotive keys and lockouts, residential lockouts, rekeying, lock changes and smart-lock installation, plus commercial lock, key, master-key, high-security lock, and mechanical door-hardware work.</p></details>
				<details><summary>Does this page mean there is a storefront in <?php echo esc_html( $area_name ); ?>?<span aria-hidden="true">+</span></summary><p>No. MI Lock Pros is a mobile locksmith company based in Ann Arbor and serving Detroit and communities across Southeast Michigan. This page identifies an area where mobile service may be available.</p></details>
			</div>
		</section>

		<section class="nearby-areas section-shell" aria-labelledby="nearby-areas-title">
			<div><p class="eyebrow"><span></span> Nearby coverage</p><h2 id="nearby-areas-title">Other listed areas in <?php echo esc_html( $area_group ); ?>.</h2></div>
			<div class="nearby-area-links">
				<?php foreach ( $nearby as $nearby_area ) : ?><a href="<?php echo esc_url( mlp_get_service_area_url( $nearby_area['name'] ) ); ?>"><?php echo esc_html( $nearby_area['name'] ); ?><span class="theme-arrow" aria-hidden="true"></span></a><?php endforeach; ?>
				<a href="<?php echo esc_url( mlp_home_section_url( 'service-area' ) ); ?>">View all service areas<span class="theme-arrow" aria-hidden="true"></span></a>
			</div>
		</section>
	</main>
	<?php
endwhile;
get_footer();
