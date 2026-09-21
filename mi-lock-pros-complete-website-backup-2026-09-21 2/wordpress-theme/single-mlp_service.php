<?php
/** Service detail page. @package MILockPros */
get_header();
while ( have_posts() ) : the_post();
	$slug     = get_post_field( 'post_name', get_the_ID() );
	$services = mlp_service_data();
	$service  = isset( $services[ $slug ] ) ? $services[ $slug ] : null;
	?>
	<main class="service-main" id="main-content">
		<section class="service-hero section-shell">
			<nav class="breadcrumb" aria-label="Breadcrumb"><a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Home</a><span>/</span><a href="<?php echo esc_url( mlp_home_section_url( 'services' ) ); ?>">Services</a><span>/</span><span aria-current="page"><?php the_title(); ?></span></nav>
			<p class="eyebrow"><span></span> MI Lock Pros service</p><h1><?php the_title(); ?> <em>solutions.</em></h1>
			<p><?php echo esc_html( has_excerpt() ? get_the_excerpt() : 'Professional locksmith service with clear communication and care.' ); ?></p>
			<div class="hero-actions"><a class="button button-primary button-large" href="<?php echo esc_url( mlp_phone_href() ); ?>">Call Now <span class="theme-arrow" aria-hidden="true"></span></a><a class="button button-secondary button-large" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>">Request Service</a></div>
		</section>
		<section class="service-content section-shell">
			<div class="service-content-heading"><p class="eyebrow"><span></span> Available services</p><h2>Focused help for the job at hand.</h2></div>
			<?php if ( $service ) : ?>
				<ol class="service-detail-list">
					<?php foreach ( $service['services'] as $index => $item ) : ?>
						<li>
							<span><?php echo esc_html( sprintf( '%02d', $index + 1 ) ); ?></span>
							<a href="<?php echo esc_url( mlp_service_item_url( $slug, $item ) ); ?>"><strong><?php echo esc_html( $item ); ?></strong><p><?php echo esc_html( isset( $service['details'][ $item ] ) ? $service['details'][ $item ] : '' ); ?></p><b>View <?php echo esc_html( strtolower( $item ) ); ?> details</b></a>
						</li>
					<?php endforeach; ?>
				</ol>
			<?php else : ?><div class="entry-content"><?php the_content(); ?></div><?php endif; ?>
		</section>
		<section class="service-guide section-shell"><div><p class="eyebrow"><span></span> Before service</p><h2>A little detail helps us understand the request.</h2></div><div class="service-guide-card"><p><?php echo esc_html( $service ? $service['preparation'] : 'Share the location, the type of lock or access problem, and your preferred contact method.' ); ?></p><p>For security, MI Lock Pros may ask for proof that you are authorized to request access or key work.</p></div></section>
		<section class="service-next section-shell"><p class="eyebrow"><span></span> More services</p><div><?php foreach ( $services as $other_slug => $other ) : if ( $other_slug === $slug ) { continue; } $post = get_page_by_path( $other_slug, OBJECT, 'mlp_service' ); ?><a href="<?php echo esc_url( $post ? get_permalink( $post ) : mlp_home_section_url( 'services' ) ); ?>"><span><?php echo esc_html( $other['code'] ); ?></span><strong><?php echo esc_html( $other['title'] ); ?></strong><b class="theme-arrow" aria-hidden="true"></b></a><?php endforeach; ?></div></section>
	</main>
	<?php
endwhile;
get_footer();
