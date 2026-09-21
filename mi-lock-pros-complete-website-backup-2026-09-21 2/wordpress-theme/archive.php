<?php
/**
 * Post category and date archives.
 *
 * @package MILockPros
 */
get_header();
?>
<main class="updates-main" id="main-content">
	<section class="updates-hero section-shell">
		<nav class="breadcrumb" aria-label="Breadcrumb"><a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Home</a><span>/</span><a href="<?php echo esc_url( mlp_get_updates_url() ); ?>">Updates</a><span>/</span><span aria-current="page"><?php the_archive_title(); ?></span></nav>
		<p class="eyebrow"><span></span> MI Lock Pros updates</p>
		<h1><?php the_archive_title(); ?></h1>
		<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
	</section>
	<section class="updates-listing section-shell">
		<?php if ( have_posts() ) : ?>
			<div class="updates-grid"><?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post', 'card' ); endwhile; ?></div>
			<?php the_posts_pagination( array( 'mid_size' => 1, 'prev_text' => '← Newer', 'next_text' => 'Older →' ) ); ?>
		<?php else : ?><div class="updates-empty"><h2>No published updates in this category yet.</h2><a class="button button-secondary" href="<?php echo esc_url( mlp_get_updates_url() ); ?>">View all updates</a></div><?php endif; ?>
	</section>
</main>
<?php get_footer(); ?>
