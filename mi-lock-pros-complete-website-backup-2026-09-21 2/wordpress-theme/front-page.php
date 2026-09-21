<?php
/**
 * Front page.
 *
 * @package MILockPros
 */
get_header();
$services       = mlp_service_data();
$faqs           = mlp_faq_data();
$profile_url    = mlp_get_option( 'google_profile_url' );
$review_url     = mlp_get_option( 'google_review_url' );
$area_groups    = mlp_service_area_groups();
$area_count     = count( mlp_service_area_names() );
$featured_work  = array();
foreach ( mlp_work_gallery() as $work_item ) {
	$work_type = strtolower( $work_item['type'] );
	if ( ! isset( $featured_work[ $work_type ] ) ) {
		$featured_work[ $work_type ] = $work_item;
	}
	if ( 3 === count( $featured_work ) ) {
		break;
	}
}
?>
<main id="main-content">
	<section class="hero hero-copy-only section-shell" id="home">
		<div class="hero-copy">
			<p class="eyebrow"><span></span> Security, handled with care</p>
			<h1>Locked out, lost your keys, or need a lock changed? <em>Call MI Lock Pros.</em></h1>
			<p class="hero-intro">We come to your car, home, or business across Ann Arbor, Detroit, and Southeast Michigan for car lockouts, car key programming, home lockouts, lock rekeying, smart locks, and commercial door locks.</p>
			<div class="hero-actions">
				<a class="button button-primary button-large" href="<?php echo esc_url( mlp_phone_href() ); ?>"><svg class="button-phone-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7.1 3.5 4.6 4.7c-.8.4-1.2 1.3-1 2.2 1.2 6.7 6.4 11.9 13.1 13.1.9.2 1.8-.2 2.2-1l1.2-2.5c.3-.7.1-1.5-.5-1.9l-3.1-2.1c-.6-.4-1.4-.3-1.9.2l-1.2 1.2a13 13 0 0 1-3.3-3.3l1.2-1.2c.5-.5.6-1.3.2-1.9L9.4 4.1c-.5-.7-1.5-.9-2.3-.6Z"/></svg>Call Now <span class="theme-arrow" aria-hidden="true"></span></a>
				<a class="button button-secondary button-large" href="#request-service">Request Service</a>
			</div>
			<p class="trust-line" aria-label="Professional, reliable, responsive"><span>Professional</span><i></i><span>Reliable</span><i></i><span>Responsive</span></p>
		</div>
	</section>

	<section class="services section-shell" id="services">
		<div class="section-topline">
			<div class="section-heading"><p class="eyebrow"><span></span> Locksmith services</p><h2>The right service for every lock.</h2><p>Automotive, residential, and commercial locksmith help for customers across <?php echo esc_html( mlp_get_option( 'service_area' ) ); ?>.</p></div>
			<p class="section-index">03 / SERVICE CATEGORIES</p>
		</div>
		<div class="service-grid">
			<?php foreach ( $services as $slug => $service ) : ?>
				<?php $service_post = get_page_by_path( $slug, OBJECT, 'mlp_service' ); ?>
				<article class="service-card">
					<a class="service-card-click-target" href="<?php echo esc_url( $service_post ? get_permalink( $service_post ) : mlp_home_section_url( 'services' ) ); ?>" aria-label="Explore <?php echo esc_attr( $service['title'] ); ?>"></a>
					<div class="service-card-top"><span class="service-icon" aria-hidden="true">◇</span><small><?php echo esc_html( $service['code'] ); ?></small></div>
					<h3><?php echo esc_html( $service['title'] ); ?></h3><p><?php echo esc_html( $service['description'] ); ?></p>
					<ul><?php foreach ( $service['services'] as $item ) : ?><li><a href="<?php echo esc_url( mlp_service_item_url( $slug, $item ) ); ?>"><span aria-hidden="true">+</span><?php echo esc_html( $item ); ?><b>View</b></a></li><?php endforeach; ?></ul>
					<a class="service-detail-link" href="<?php echo esc_url( $service_post ? get_permalink( $service_post ) : mlp_home_section_url( 'services' ) ); ?>">Explore <?php echo esc_html( strtolower( $service['short_title'] ) ); ?> services <span class="theme-arrow" aria-hidden="true"></span></a>
					<a class="button button-card service-picker" href="#request-service" data-service="<?php echo esc_attr( strtolower( $service['short_title'] ) ); ?>">Request This Service <span class="theme-arrow" aria-hidden="true"></span></a>
				</article>
			<?php endforeach; ?>
		</div>
	</section>

	<section class="reviews section-shell" id="reviews">
		<div class="reviews-header">
			<div class="section-heading"><p class="eyebrow"><span></span> Google reviews</p><h2>Customer trust, verified on Google.</h2><p>MI Lock Pros has a 4.9 out of 5 Google rating based on 223 customer reviews. Follow the link to read the current profile and latest feedback.</p></div>
			<a class="button button-secondary" href="<?php echo esc_url( $profile_url ); ?>" target="_blank" rel="noreferrer">Read Google reviews <span class="theme-arrow" aria-hidden="true"></span></a>
		</div>
		<div class="review-integration" id="google-reviews" data-google-reviews>
			<div class="integration-bar"><div><span class="google-g" aria-hidden="true">G</span><strong>Google customer reviews</strong></div><div class="integration-controls"><span class="integration-status" data-review-status><i></i> 4.9 ★ · 223 reviews</span><button class="review-refresh" type="button" data-review-refresh aria-label="Refresh Google rating and review count">Refresh reviews</button></div></div>
			<div class="review-snapshot">
				<div class="review-metric-card"><small>Average Google rating</small><strong data-review-rating>4.9<span> / 5</span></strong><div class="review-stars snapshot-stars" aria-label="4.9 out of 5 stars"><span class="is-filled">★★★★★</span></div><p>Rating shown from the official MI Lock Pros Google Business Profile.</p></div>
				<div class="review-metric-card"><small>Customer feedback</small><strong data-review-count>223<span> reviews</span></strong><p>Read the latest review text and current totals directly on Google.</p></div>
			</div>
			<div class="review-actions"><a class="button button-primary" href="<?php echo esc_url( $profile_url ); ?>" target="_blank" rel="noreferrer">Read reviews on Google <span class="theme-arrow" aria-hidden="true"></span></a><a class="button button-secondary" href="<?php echo esc_url( $review_url ); ?>" target="_blank" rel="noreferrer">Leave a Google review <span class="theme-arrow" aria-hidden="true"></span></a></div>
			<div class="review-disclosure"><p data-review-updated>Google remains the source for current review text and totals. Use “Refresh reviews” to request the latest available rating and count.</p><div><a href="<?php echo esc_url( $profile_url ); ?>" target="_blank" rel="noreferrer">View on Google</a></div></div>
		</div>
	</section>

	<div class="trust-strip" aria-label="MI Lock Pros service categories"><span>Automotive</span><i>01</i><span>Residential</span><i>02</i><span>Commercial</span><i>03</i></div>

	<section class="service-work service-work-compact section-shell" id="recent-work" aria-labelledby="recent-work-title">
		<div class="work-section-heading"><div><p class="eyebrow"><span></span> Recent locksmith work</p><h2 id="recent-work-title">Real key, lock, and door projects.</h2></div><p>Original MI Lock Pros job photos from automotive key programming, residential lock installation, and commercial door-hardware work across Southeast Michigan.</p></div>
		<div class="work-grid">
			<?php foreach ( $featured_work as $work ) : ?>
			<figure class="work-card"><div class="work-photo"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/job-gallery/' . $work['image'] ); ?>" alt="<?php echo esc_attr( $work['alt'] ); ?>" loading="lazy" width="1200" height="1500" style="object-position: <?php echo esc_attr( 'Automotive' === $work['type'] ? 'center bottom' : 'center center' ); ?>;"><span class="work-watermark"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mi-lock-pros-logo.png' ); ?>" alt="" loading="lazy"></span></div><figcaption><small><?php echo esc_html( $work['type'] ); ?></small><h3><?php echo esc_html( $work['title'] ); ?></h3><p><?php echo esc_html( $work['caption'] ); ?></p></figcaption></figure>
			<?php endforeach; ?>
		</div>
		<div class="work-section-actions"><a class="button button-secondary" href="<?php echo esc_url( mlp_get_updates_url() . '#recent-work' ); ?>">View all recent work <span class="theme-arrow" aria-hidden="true"></span></a></div>
		<p class="work-gallery-note">Work shown is representative of completed projects. Vehicle, key, lock, and hardware compatibility varies; call with the exact details so current service can be confirmed.</p>
	</section>

	<section class="coverage section-shell" id="service-area" aria-labelledby="coverage-title">
		<div class="coverage-header">
			<div class="section-heading"><p class="eyebrow"><span></span> Service coverage</p><h2 id="coverage-title">Serving Southeast Michigan.</h2><p>MI Lock Pros serves <?php echo esc_html( $area_count ); ?> listed communities across Wayne, Oakland, Macomb, Washtenaw, Livingston, Monroe, and nearby areas.</p></div>
			<div class="coverage-stat" aria-label="<?php echo esc_attr( $area_count ); ?> listed service areas"><strong><?php echo esc_html( $area_count ); ?></strong><span>listed service areas</span></div>
		</div>
		<div class="coverage-panel">
			<figure class="coverage-map"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/service-area-map.svg' ); ?>" alt="Map of Southeast Michigan with MI Lock Pros service communities highlighted in gold" width="1000" height="760" loading="lazy"><figcaption>Gold boundaries show the service areas supplied by MI Lock Pros. The map is for service-coverage orientation; contact us to confirm an exact address.</figcaption></figure>
			<div class="area-directory">
				<div class="area-directory-top"><div><small>Coverage directory</small><strong>Find your community</strong></div><span><?php echo esc_html( mlp_get_option( 'business_hours' ) ); ?></span></div>
				<div class="area-groups">
					<?php foreach ( $area_groups as $group_name => $areas ) : ?>
						<details<?php echo 'Wayne County & Downriver' === $group_name ? ' open' : ''; ?>><summary><span><?php echo esc_html( $group_name ); ?></span><small><?php echo esc_html( count( $areas ) ); ?> areas</small><b aria-hidden="true">+</b></summary><ul><?php foreach ( $areas as $area ) : ?><li><a href="<?php echo esc_url( mlp_get_service_area_url( $area ) ); ?>"><?php echo esc_html( $area ); ?></a></li><?php endforeach; ?></ul></details>
					<?php endforeach; ?>
				</div>
				<div class="coverage-cta"><p>Not sure whether your address is covered?</p><a class="button button-primary" href="#request-service">Check your location <span class="theme-arrow" aria-hidden="true"></span></a></div>
			</div>
		</div>
		<p class="coverage-summary">Coverage includes Detroit, Dearborn, Ann Arbor, Royal Oak, Troy, Novi, Warren, Sterling Heights, Rochester Hills, Canton Township, and many neighboring Southeast Michigan communities. Select a location above for city-specific services and coverage details.</p>
	</section>

	<section class="about section-shell" id="about">
		<div class="about-panel">
			<div class="about-copy">
				<p class="eyebrow"><span></span> About MI Lock Pros</p>
				<h2>Security service built around people.</h2>
				<p>MI Lock Pros is a professional locksmith company focused on dependable service, thoughtful security solutions, and a straightforward customer experience. We listen first, explain the options clearly, and treat every vehicle, home, and workplace with care.</p>
				<p class="about-note">Serving drivers, homeowners, property managers, and businesses throughout <strong><?php echo esc_html( mlp_get_option( 'service_area' ) ); ?></strong>.</p>
				<a class="text-link" href="#request-service">Tell us what you need <span class="theme-arrow" aria-hidden="true"></span></a>
			</div>
			<div class="about-values" aria-label="Business details">
				<div class="business-value"><small>Service area</small><strong><?php echo esc_html( mlp_get_option( 'service_area' ) ); ?></strong></div>
				<div class="business-value"><small>Experience</small><strong><?php echo esc_html( mlp_get_option( 'years_experience' ) ); ?></strong></div>
				<div class="business-value"><small>Business hours</small><strong><?php echo esc_html( mlp_get_option( 'business_hours' ) ); ?></strong></div>
				<a class="business-value" href="<?php echo esc_url( mlp_phone_href() ); ?>"><small>Direct contact</small><strong><?php echo esc_html( mlp_get_option( 'phone' ) ); ?></strong></a>
			</div>
		</div>
	</section>

	<section class="process section-shell" id="process" aria-labelledby="process-title">
		<div><p class="eyebrow"><span></span> Simple process</p><h2 id="process-title">Clear from first contact.</h2></div>
		<ol class="process-list">
			<li><b>01</b><span><strong>Share the problem</strong><small>Call or use the service request form with the key details.</small></span></li>
			<li><b>02</b><span><strong>Discuss your options</strong><small>We’ll clarify the locksmith service that best fits the situation.</small></span></li>
			<li><b>03</b><span><strong>Confirm the service</strong><small>Choose how and when you prefer to be contacted next.</small></span></li>
		</ol>
	</section>

	<section class="request section-shell" id="request-service">
		<div class="request-panel">
			<aside class="request-copy"><p class="eyebrow"><span></span> Request service</p><h2>Tell us how we can help.</h2><p>Share a few details about the lock, key, or access issue. MI Lock Pros can follow up using the contact method you prefer.</p><div class="request-direct"><small>Prefer to speak now?</small><a href="<?php echo esc_url( mlp_phone_href() ); ?>"><?php echo esc_html( mlp_get_option( 'phone' ) ); ?> <span class="theme-arrow" aria-hidden="true"></span></a></div><div class="privacy-note"><span aria-hidden="true">◇</span><p>Your information is used only to respond to your service request. Do not include passwords, PINs, or sensitive access codes.</p></div></aside>
			<div class="form-wrap">
				<?php get_template_part( 'template-parts/service-request-form', null, array( 'prefix' => 'home-request' ) ); ?>
			</div>
		</div>
	</section>

	<section class="contact section-shell" id="contact">
		<div class="contact-copy"><p class="eyebrow"><span></span> Contact</p><h2>Let’s solve the access problem.</h2><p>Call, email, or send a service request. We’ll use the details you provide to understand the situation and discuss the next step.</p></div>
		<div class="contact-grid">
			<a class="business-value" href="<?php echo esc_url( mlp_phone_href() ); ?>"><small>Call now</small><strong><?php echo esc_html( mlp_get_option( 'phone' ) ); ?></strong></a>
			<a class="business-value" href="mailto:<?php echo esc_attr( antispambot( mlp_get_option( 'email' ) ) ); ?>"><small>Email</small><strong><?php echo esc_html( antispambot( mlp_get_option( 'email' ) ) ); ?></strong></a>
			<div class="business-value"><small>Business hours</small><strong><?php echo esc_html( mlp_get_option( 'business_hours' ) ); ?></strong></div>
			<div class="business-value"><small>Service area</small><strong><?php echo esc_html( mlp_get_option( 'service_area' ) ); ?></strong></div>
		</div>
	</section>

	<section class="faq section-shell" id="faq">
		<div class="faq-intro"><p class="eyebrow"><span></span> Frequently asked</p><h2>Locksmith service, explained clearly.</h2><p>Quick answers about MI Lock Pros services and how to request help.</p></div>
		<div class="faq-list"><?php foreach ( $faqs as $faq ) : ?><details><summary><?php echo esc_html( $faq['question'] ); ?><span aria-hidden="true">+</span></summary><p><?php echo esc_html( $faq['answer'] ); ?></p></details><?php endforeach; ?></div>
	</section>
</main>
<?php get_footer(); ?>
