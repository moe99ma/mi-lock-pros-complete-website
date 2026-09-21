<?php
/**
 * Site footer.
 *
 * @package MILockPros
 */
$services = mlp_service_data();
?>
<footer class="footer">
	<div class="footer-grid section-shell">
		<div class="footer-brand">
			<a class="brand" href="<?php echo esc_url( mlp_home_section_url( 'home' ) ); ?>" aria-label="<?php esc_attr_e( 'MI Lock Pros home', 'mi-lock-pros' ); ?>">
				<img class="header-logo" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mi-lock-pros-logo.png' ); ?>" alt="" width="64" height="64">
				<span>LOCK PROS</span>
			</a>
			<p>Professional locksmith solutions for vehicles, homes, and businesses<?php echo mlp_is_configured( mlp_get_option( 'service_area' ) ) ? ' in ' . esc_html( mlp_get_option( 'service_area' ) ) : ''; ?>.</p>
			<div class="social-placeholders" aria-label="Follow MI Lock Pros">
				<a href="<?php echo esc_url( mlp_get_option( 'facebook_url' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="MI Lock Pros on Facebook" title="Follow MI Lock Pros on Facebook"><span class="social-icon social-icon-facebook" aria-hidden="true"></span></a>
				<a href="<?php echo esc_url( mlp_get_option( 'instagram_url' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="MI Lock Pros on Instagram" title="Follow MI Lock Pros on Instagram"><span class="social-icon social-icon-instagram" aria-hidden="true"></span></a>
			</div>
		</div>
		<div class="footer-column">
			<h2>Services</h2>
			<a href="<?php echo esc_url( home_url( '/vehicles/' ) ); ?>">Vehicle Key Guide</a>
			<?php foreach ( $services as $slug => $service ) : ?>
				<?php $service_post = get_page_by_path( $slug, OBJECT, 'mlp_service' ); ?>
				<a href="<?php echo esc_url( $service_post ? get_permalink( $service_post ) : mlp_home_section_url( 'services' ) ); ?>"><?php echo esc_html( $service['short_title'] ); ?></a>
			<?php endforeach; ?>
		</div>
		<div class="footer-column">
			<h2>Company</h2>
			<a href="<?php echo esc_url( mlp_home_section_url( 'reviews' ) ); ?>">Reviews</a>
			<a href="<?php echo esc_url( mlp_home_section_url( 'recent-work' ) ); ?>">Recent Work</a>
			<a href="<?php echo esc_url( mlp_home_section_url( 'service-area' ) ); ?>">Service Area</a>
			<a href="<?php echo esc_url( mlp_home_section_url( 'about' ) ); ?>">About</a>
			<a href="<?php echo esc_url( mlp_get_updates_url() ); ?>">Updates &amp; Offers</a>
			<a href="<?php echo esc_url( mlp_home_section_url( 'contact' ) ); ?>">Contact</a>
			<a href="<?php echo esc_url( mlp_get_option( 'google_profile_url' ) ); ?>" target="_blank" rel="noreferrer">Google profile</a>
		</div>
		<div class="footer-column">
			<h2>Get in touch</h2>
			<a href="<?php echo esc_url( mlp_phone_href() ); ?>"><?php echo esc_html( mlp_get_option( 'phone' ) ); ?></a>
			<a href="mailto:<?php echo esc_attr( antispambot( mlp_get_option( 'email' ) ) ); ?>"><?php echo esc_html( antispambot( mlp_get_option( 'email' ) ) ); ?></a>
			<span><?php echo esc_html( mlp_get_option( 'business_hours' ) ); ?></span>
			<span><?php echo esc_html( mlp_get_option( 'service_area' ) ); ?></span>
		</div>
	</div>
	<div class="footer-assurance section-shell" aria-label="Business assurances">
		<div><span class="assurance-icon">✓</span><span><small>Coverage</small><strong>Insured locksmith service</strong></span></div>
		<div><span class="assurance-icon">✓</span><span><small>Technicians</small><strong>Background-checked technicians</strong></span></div>
		<a href="<?php echo esc_url( mlp_get_option( 'google_profile_url' ) ); ?>" target="_blank" rel="noreferrer"><span class="assurance-icon">G</span><span><small>Customer feedback</small><strong>4.9 ★ · 223 Google reviews</strong></span></a>
		<div><span class="assurance-icon">24</span><span><small>Availability</small><strong>24/7 emergency service</strong></span></div>
	</div>
	<div class="payment-acceptance section-shell" aria-labelledby="accepted-payments-title">
		<div class="payment-heading"><strong id="accepted-payments-title">Accepted payment methods</strong><span>Cards, cash &amp; digital payments</span></div>
		<div class="payment-logos" role="list" aria-label="Accepted payment methods">
			<span class="payment-logo payment-visa" role="listitem" aria-label="Visa">VISA</span>
			<span class="payment-logo payment-mastercard" role="listitem" aria-label="Mastercard"><i aria-hidden="true"></i><i aria-hidden="true"></i><b aria-hidden="true">mastercard</b></span>
			<span class="payment-logo payment-discover" role="listitem" aria-label="Discover">DISC<span aria-hidden="true">O</span>VER</span>
			<span class="payment-logo payment-amex" role="listitem" aria-label="American Express">AMERICAN<br>EXPRESS</span>
			<span class="payment-logo payment-cash" role="listitem" aria-label="Cash"><b aria-hidden="true">$</b> CASH</span>
			<span class="payment-logo payment-cashapp" role="listitem" aria-label="Cash App"><b aria-hidden="true">$</b><span>Cash App</span></span>
			<span class="payment-logo payment-zelle" role="listitem" aria-label="Zelle"><b aria-hidden="true">Z</b><span>Zelle</span></span>
		</div>
	</div>
	<div class="footer-bottom section-shell">
		<p>© <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( mlp_get_option( 'legal_name' ) ); ?>. All rights reserved.</p>
		<div>
			<a href="<?php echo esc_url( get_privacy_policy_url() ? get_privacy_policy_url() : home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a>
			<a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>">Terms &amp; Conditions</a>
		</div>
	</div>
</footer>
<dialog class="request-dialog" data-request-dialog aria-labelledby="request-dialog-title">
	<div class="request-dialog-shell">
		<button class="request-dialog-close" type="button" data-request-dialog-close aria-label="Close request service form"><span aria-hidden="true">×</span></button>
		<div class="request-dialog-heading">
			<p class="eyebrow"><span></span> Request service</p>
			<h2 id="request-dialog-title">Tell us how we can help.</h2>
			<p>Share the best way to reach you, your ZIP code, and a few service details. Submitting the form does not confirm an appointment.</p>
		</div>
		<?php get_template_part( 'template-parts/service-request-form', null, array( 'prefix' => 'dialog-request' ) ); ?>
	</div>
</dialog>
<div class="mobile-action-bar" aria-label="<?php esc_attr_e( 'Quick service actions', 'mi-lock-pros' ); ?>">
	<a href="<?php echo esc_url( mlp_phone_href() ); ?>">Call Now</a>
	<a href="<?php echo esc_url( mlp_text_href() ); ?>">Text Us</a>
	<a href="<?php echo esc_url( mlp_home_section_url( 'request-service' ) ); ?>" data-request-service>Request Service</a>
</div>
<?php wp_footer(); ?>
</body>
</html>
