<?php
/**
 * Updates and offers index.
 *
 * @package MILockPros
 */
get_header();
$paged   = max( 1, (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
$updates = new WP_Query(
	array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => 9,
		'paged'               => $paged,
		'ignore_sticky_posts' => false,
	)
);
$categories = get_categories( array( 'hide_empty' => true ) );
$work_gallery = mlp_work_gallery();
?>
<main class="updates-main" id="main-content">
	<section class="updates-hero section-shell">
		<nav class="breadcrumb" aria-label="Breadcrumb"><a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Home</a><span>/</span><span aria-current="page">Updates &amp; Offers</span></nav>
		<p class="eyebrow"><span></span> From MI Lock Pros</p>
		<h1>Locksmith updates, <em>work &amp; offers.</em></h1>
		<p>Explore real service stories, practical locksmith tips, company updates, and current MI Lock Pros offers across Southeast Michigan.</p>
		<?php if ( ! empty( $categories ) ) : ?>
			<nav class="update-filters" aria-label="Update categories">
				<span>Browse:</span>
				<?php foreach ( $categories as $category ) : ?><a href="<?php echo esc_url( get_category_link( $category ) ); ?>"><?php echo esc_html( $category->name ); ?></a><?php endforeach; ?>
			</nav>
		<?php endif; ?>
	</section>

	<section class="work-gallery section-shell" id="recent-work" aria-labelledby="all-work-title">
		<div class="work-section-heading">
			<div><p class="eyebrow"><span></span> Recent locksmith work</p><h2 id="all-work-title">Real work from across Southeast Michigan.</h2></div>
			<p>Browse automotive key programming, residential lock installation, and commercial door-hardware projects completed by MI Lock Pros.</p>
		</div>
		<div class="updates-work-grid">
			<?php foreach ( $work_gallery as $work ) : ?>
				<article class="updates-work-card">
					<div class="updates-work-media"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/job-gallery/' . $work['image'] ); ?>" alt="<?php echo esc_attr( $work['alt'] ); ?>" loading="lazy" width="1200" height="1500" style="object-position: <?php echo esc_attr( 'Automotive' === $work['type'] ? 'center bottom' : 'center center' ); ?>;"><span class="work-watermark"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mi-lock-pros-logo.png' ); ?>" alt="" loading="lazy"></span></div>
					<div><small><?php echo esc_html( $work['type'] ); ?></small><h2><?php echo esc_html( $work['title'] ); ?></h2><p><?php echo esc_html( $work['caption'] ); ?></p><a class="text-link" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>" data-request-service>Request this service <span class="theme-arrow" aria-hidden="true"></span></a></div>
				</article>
			<?php endforeach; ?>
		</div>
		<p class="work-gallery-note">Photos show representative completed work. Compatibility and current service availability vary by vehicle, lock, hardware, and location; call with the exact details so MI Lock Pros can confirm service.</p>
	</section>

	<section class="updates-listing section-shell" aria-label="MI Lock Pros updates">
		<?php if ( $updates->have_posts() ) : ?>
			<div class="updates-grid">
				<?php while ( $updates->have_posts() ) : $updates->the_post(); ?>
					<?php get_template_part( 'template-parts/post', 'card' ); ?>
				<?php endwhile; ?>
			</div>
			<?php
			$pagination = paginate_links(
				array(
					'total'   => $updates->max_num_pages,
					'current' => $paged,
					'type'    => 'list',
				)
			);
			if ( $pagination ) {
				echo '<nav class="updates-pagination" aria-label="Updates pages">' . wp_kses_post( $pagination ) . '</nav>';
			}
			?>
		<?php else : ?>
			<div class="updates-empty">
				<p class="eyebrow"><span></span> First update coming soon</p>
				<h2>Real work. Useful information. No filler.</h2>
				<p>MI Lock Pros will use this page for service photos, locksmith advice, company updates, and active offers. Until then, contact us directly for current service information.</p>
				<div><a class="button button-primary" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>">Request Service <span class="theme-arrow" aria-hidden="true"></span></a><a class="button button-secondary" href="<?php echo esc_url( mlp_get_option( 'instagram_url' ) ); ?>" target="_blank" rel="noreferrer">Follow on Instagram <span class="theme-arrow" aria-hidden="true"></span></a></div>
				<?php if ( current_user_can( 'edit_posts' ) ) : ?><a class="update-admin-link" href="<?php echo esc_url( admin_url( 'post-new.php' ) ); ?>">Add the first update in WordPress →</a><?php endif; ?>
			</div>
		<?php endif; ?>
		<?php wp_reset_postdata(); ?>
	</section>
</main>
<?php get_footer(); ?>
