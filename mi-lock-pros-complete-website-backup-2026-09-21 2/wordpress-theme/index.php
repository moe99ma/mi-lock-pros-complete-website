<?php
/** Required fallback template. @package MILockPros */
get_header();
?>
<main class="legal-main" id="main-content"><div class="legal-shell"><p class="eyebrow"><span></span> MI Lock Pros</p><h1><?php bloginfo( 'name' ); ?></h1><?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?><article class="entry-content"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article><?php endwhile; else : ?><p>No content was found.</p><?php endif; ?></div></main>
<?php get_footer(); ?>
