<?php
/**
 * Standard update post.
 *
 * @package MILockPros
 */
get_header();
while ( have_posts() ) :
	the_post();
	$categories = get_the_category();
	$category   = ! empty( $categories ) ? $categories[0] : null;
	?>
	<main class="article-main" id="main-content">
		<article>
			<header class="article-header section-shell">
				<nav class="breadcrumb" aria-label="Breadcrumb"><a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Home</a><span>/</span><a href="<?php echo esc_url( mlp_get_updates_url() ); ?>">Updates</a><span>/</span><span aria-current="page"><?php the_title(); ?></span></nav>
				<div class="article-meta"><?php if ( $category ) : ?><a href="<?php echo esc_url( get_category_link( $category ) ); ?>"><?php echo esc_html( $category->name ); ?></a><?php endif; ?><time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time></div>
				<h1><?php the_title(); ?></h1>
				<?php if ( has_excerpt() ) : ?><p><?php echo esc_html( get_the_excerpt() ); ?></p><?php endif; ?>
			</header>
			<?php if ( has_post_thumbnail() ) : ?><figure class="article-featured section-shell"><?php the_post_thumbnail( 'full' ); ?></figure><?php endif; ?>
			<div class="article-layout section-shell">
				<div class="article-content entry-content"><?php the_content(); ?></div>
				<aside class="article-cta"><small>Need locksmith service?</small><strong>Talk directly with MI Lock Pros.</strong><a class="button button-primary" href="<?php echo esc_url( mlp_phone_href() ); ?>">Call Now <span class="theme-arrow" aria-hidden="true"></span></a><a class="button button-secondary" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>">Request Service</a></aside>
			</div>
			<footer class="article-footer section-shell"><a href="<?php echo esc_url( mlp_get_updates_url() ); ?>">← All updates</a><?php edit_post_link( 'Edit this update', '<span>', '</span>' ); ?></footer>
		</article>
	</main>
	<?php
endwhile;
get_footer();
