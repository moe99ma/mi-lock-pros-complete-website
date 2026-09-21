<?php /** Current MI Lock Pros site header. */ ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script>(function(){var t='dark';try{var s=sessionStorage.getItem('mlp-theme');if(s==='light'||s==='dark'){t=s;}}catch(e){}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}());</script>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content"><?php esc_html_e( 'Skip to main content', 'mi-lock-pros' ); ?></a>
<div class="top-trust-bar" aria-label="MI Lock Pros business credentials">
	<div class="top-trust-marquee"><div class="top-trust-track">
		<div class="top-trust-group"><span><i class="trust-status-dot"></i>24/7 Emergency Service</span><span>Insured</span><span>Background-Checked Technicians</span><span>Serving Southeast Michigan</span></div>
		<div class="top-trust-group" aria-hidden="true"><span><i class="trust-status-dot"></i>24/7 Emergency Service</span><span>Insured</span><span>Background-Checked Technicians</span><span>Serving Southeast Michigan</span></div>
	</div></div>
</div>
<header class="site-header">
	<a class="brand" href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>" aria-label="MI Lock Pros home">
		<?php if ( has_custom_logo() ) : $logo_id = get_theme_mod( 'custom_logo' ); echo wp_get_attachment_image( $logo_id, 'full', false, array( 'class' => 'header-logo', 'alt' => '' ) ); else : ?>
		<img class="header-logo" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mi-lock-pros-logo.png' ); ?>" alt="" width="64" height="64">
		<?php endif; ?><span>LOCK PROS</span>
	</a>
	<nav class="desktop-nav" aria-label="Primary navigation"><a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>">Home</a><a href="<?php echo esc_url( mlp_home_section_url( 'services' ) ); ?>">Services</a><a href="<?php echo esc_url( home_url( '/vehicles/' ) ); ?>">Vehicles</a><a href="<?php echo esc_url( mlp_home_section_url( 'reviews' ) ); ?>">Reviews</a><a href="<?php echo esc_url( mlp_home_section_url( 'recent-work' ) ); ?>">Recent Work</a><a href="<?php echo esc_url( mlp_home_section_url( 'service-area' ) ); ?>">Service Area</a><a href="<?php echo esc_url( mlp_home_section_url( 'about' ) ); ?>">About</a><a href="<?php echo esc_url( mlp_get_updates_url() ); ?>">Updates</a><a href="<?php echo esc_url( mlp_home_section_url( 'contact' ) ); ?>">Contact</a></nav>
	<div class="header-actions">
		<a class="button button-ghost header-request" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>">Request Service</a><a class="button button-text header-text" href="<?php echo esc_url( mlp_text_href() ); ?>">Text Us</a><a class="button button-primary header-call" href="<?php echo esc_url( mlp_phone_href() ); ?>">Call Now</a>
		<button class="theme-toggle theme-toggle-header" type="button" data-theme-toggle aria-label="Switch color theme"><span class="theme-icon" aria-hidden="true">☀</span><span class="theme-icon" aria-hidden="true">☾</span><span class="theme-toggle-knob"></span></button>
		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation menu"><span></span><span></span><span></span></button>
	</div>
	<button class="mobile-menu-backdrop" type="button" data-menu-close aria-label="Close navigation menu"></button>
	<div class="mobile-menu" id="mobile-navigation" aria-hidden="true">
		<div class="mobile-menu-heading"><div><small>Navigation</small><strong>Choose a page</strong></div><button type="button" data-menu-close aria-label="Close navigation menu">×</button></div>
		<nav aria-label="Menu navigation">
			<a href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>"><small>01</small><strong>Home</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_home_section_url( 'services' ) ); ?>"><small>02</small><strong>Services</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( home_url( '/vehicles/' ) ); ?>"><small>03</small><strong>Vehicles</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_home_section_url( 'reviews' ) ); ?>"><small>04</small><strong>Reviews</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_home_section_url( 'recent-work' ) ); ?>"><small>05</small><strong>Recent Work</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_home_section_url( 'service-area' ) ); ?>"><small>06</small><strong>Service Area</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_home_section_url( 'about' ) ); ?>"><small>07</small><strong>About</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_get_updates_url() ); ?>"><small>08</small><strong>Updates</strong><span class="theme-arrow" aria-hidden="true"></span></a><a href="<?php echo esc_url( mlp_home_section_url( 'contact' ) ); ?>"><small>09</small><strong>Contact</strong><span class="theme-arrow" aria-hidden="true"></span></a>
		</nav>
		<div class="mobile-theme-row"><div><small>Appearance</small><strong><span data-theme-name>Dark</span> theme</strong></div><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme"><span class="theme-icon" aria-hidden="true">☀</span><span class="theme-icon" aria-hidden="true">☾</span><span class="theme-toggle-knob"></span></button></div>
		<div class="mobile-menu-actions"><a class="button button-secondary" href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>">Request Service</a><a class="button button-text" href="<?php echo esc_url( mlp_text_href() ); ?>">Text Us</a><a class="button button-primary" href="<?php echo esc_url( mlp_phone_href() ); ?>">Call Now</a></div>
	</div>
</header>
