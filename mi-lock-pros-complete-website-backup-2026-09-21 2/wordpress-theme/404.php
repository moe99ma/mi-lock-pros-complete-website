<?php
/** 404 template. @package MILockPros */
get_header();
?>
<main class="legal-main" id="main-content"><div class="legal-shell"><p class="eyebrow"><span></span> Error 404</p><h1>That page could not be found.</h1><p class="legal-intro">The link may have changed. Return to MI Lock Pros or call for service.</p><div class="hero-actions"><a class="button button-primary" href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Return home</a><a class="button button-secondary" href="<?php echo esc_url( mlp_phone_href() ); ?>">Call <?php echo esc_html( mlp_get_option( 'phone' ) ); ?></a></div></div></main>
<?php get_footer(); ?>
