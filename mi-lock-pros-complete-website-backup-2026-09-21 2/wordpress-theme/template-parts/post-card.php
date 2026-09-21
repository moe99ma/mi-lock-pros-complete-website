<?php
/**
 * Reusable update-card markup.
 *
 * @package MILockPros
 */
$categories = get_the_category();
$category   = ! empty( $categories ) ? $categories[0] : null;
?>
<article <?php post_class( 'update-card' ); ?>>
	<a class="update-card-media" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( sprintf( 'Read %s', get_the_title() ) ); ?>">
		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?>
		<?php else : ?>
			<span aria-hidden="true">MI</span>
		<?php endif; ?>
	</a>
	<div class="update-card-body">
		<div class="update-card-meta">
			<?php if ( $category ) : ?><a href="<?php echo esc_url( get_category_link( $category ) ); ?>"><?php echo esc_html( $category->name ); ?></a><?php endif; ?>
			<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
		</div>
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
		<a class="update-card-link" href="<?php the_permalink(); ?>">Read update <span class="theme-arrow" aria-hidden="true"></span></a>
	</div>
</article>
