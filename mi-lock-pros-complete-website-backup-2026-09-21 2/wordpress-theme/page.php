<?php
/** Standard page. @package MILockPros */
get_header();
?>
<main class="legal-main" id="main-content"><div class="legal-shell"><?php while ( have_posts() ) : the_post(); ?><p class="eyebrow"><span></span> MI Lock Pros</p><h1><?php the_title(); ?></h1><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?><a class="legal-back" href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">← Back to home</a></div></main>
<?php get_footer(); ?>
