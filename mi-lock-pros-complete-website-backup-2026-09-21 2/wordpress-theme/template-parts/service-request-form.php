<?php
/**
 * Shared service-request form.
 *
 * @package MILockPros
 */

$form_prefix = isset( $args['prefix'] ) ? sanitize_html_class( $args['prefix'] ) : 'service';
?>
<form class="service-form" data-service-form novalidate>
	<div class="honeypot" aria-hidden="true"><label for="<?php echo esc_attr( $form_prefix ); ?>-website">Website</label><input id="<?php echo esc_attr( $form_prefix ); ?>-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
	<div class="form-grid">
		<div class="field"><label for="<?php echo esc_attr( $form_prefix ); ?>-full-name">Full name <small>(optional)</small></label><input id="<?php echo esc_attr( $form_prefix ); ?>-full-name" name="full_name" type="text" autocomplete="name"><p class="field-error" data-error-for="full_name"></p></div>
		<div class="field field-full"><label for="<?php echo esc_attr( $form_prefix ); ?>-contact">Phone number or email <span>*</span></label><input id="<?php echo esc_attr( $form_prefix ); ?>-contact" name="contact" type="text" placeholder="Enter a phone number or email" required aria-describedby="<?php echo esc_attr( $form_prefix ); ?>-contact-hint"><p class="field-hint" id="<?php echo esc_attr( $form_prefix ); ?>-contact-hint">Only one is required. Enter the contact detail that matches your preferred contact method.</p><p class="field-error" data-error-for="contact"></p></div>
		<div class="field"><label for="<?php echo esc_attr( $form_prefix ); ?>-service-address">Service ZIP code <span>*</span></label><input id="<?php echo esc_attr( $form_prefix ); ?>-service-address" name="service_address" type="text" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" placeholder="5-digit ZIP code" required><p class="field-error" data-error-for="service_address"></p></div>
		<div class="field"><label for="<?php echo esc_attr( $form_prefix ); ?>-service-type">Service type <span>*</span></label><select id="<?php echo esc_attr( $form_prefix ); ?>-service-type" name="service_type" required><option value="">Select a category</option><option value="automotive">Automotive</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select><p class="field-error" data-error-for="service_type"></p></div>
		<div class="field"><label for="<?php echo esc_attr( $form_prefix ); ?>-contact-method">Preferred contact method <span>*</span></label><select id="<?php echo esc_attr( $form_prefix ); ?>-contact-method" name="contact_method" required><option value="">Choose one</option><option value="phone">Phone call</option><option value="text">Text message</option><option value="email">Email</option></select><p class="field-error" data-error-for="contact_method"></p></div>
		<div class="field"><label for="<?php echo esc_attr( $form_prefix ); ?>-preferred-time">Preferred date and time <small>(optional)</small></label><input id="<?php echo esc_attr( $form_prefix ); ?>-preferred-time" name="preferred_time" type="datetime-local"></div>
		<div class="field field-full"><label for="<?php echo esc_attr( $form_prefix ); ?>-message">Message or problem description <small>(optional)</small></label><textarea id="<?php echo esc_attr( $form_prefix ); ?>-message" name="message" placeholder="Tell us what happened and any useful details."></textarea></div>
		<div class="field field-full"><label class="check-label" for="<?php echo esc_attr( $form_prefix ); ?>-consent"><input id="<?php echo esc_attr( $form_prefix ); ?>-consent" name="consent" type="checkbox" value="1"><span>MI Lock Pros may contact me about this service request. <small>(optional)</small></span></label><p class="field-error" data-error-for="consent"></p></div>
	</div>
	<button class="button button-primary submit-button" type="submit"><span data-submit-label>Send Service Request</span><span class="spinner" data-submit-spinner hidden></span></button>
	<p class="form-note">Enter either a phone number or an email in the single contact field. ZIP code, service type, and preferred contact method are also required.</p>
	<div class="submit-message" data-submit-message role="status" aria-live="polite"></div>
</form>
