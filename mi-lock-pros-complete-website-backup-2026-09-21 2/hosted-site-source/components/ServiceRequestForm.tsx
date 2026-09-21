'use client';

import { FormEvent, useState } from 'react';
import { serviceCategories, siteConfig } from '@/lib/site-config';

type FormErrors = Record<string, string>;
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

function splitContact(value: string) {
  const contact = value.trim();
  const isEmail = contact.includes('@');
  return {
    contact,
    email: isEmail ? contact : '',
    phone: isEmail ? '' : contact,
  };
}

function validate(form: FormData) {
  const errors: FormErrors = {};
  const { contact, phone, email } = splitContact(String(form.get('contactInfo') || ''));
  const zipCode = String(form.get('serviceAddress') || '').trim();
  const contactMethod = String(form.get('contactMethod') || '').trim();

  if (!contact) errors.contactInfo = 'Enter a phone number or email address.';
  if (phone && phone.replace(/\D/g, '').length < 10) errors.contactInfo = 'Please enter a valid phone number.';
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.contactInfo = 'Please enter a valid email address.';
  if (!/^\d{5}(?:-\d{4})?$/.test(zipCode)) errors.serviceAddress = 'Please enter a valid 5-digit ZIP code.';
  if (!form.get('serviceType')) errors.serviceType = 'Choose a service type.';
  if (!contactMethod) errors.contactMethod = 'Choose your preferred contact method.';
  if (contactMethod === 'Email' && !email) errors.contactInfo = 'Enter an email address when email is your preferred contact method.';
  if ((contactMethod === 'Phone call' || contactMethod === 'Text message') && !phone) errors.contactInfo = 'Enter a phone number for calls or text messages.';
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="field-error" id={`${id}-error`} role="alert">{message}</p> : null;
}

function createEmailFallback(form: FormData) {
  const value = (name: string) => String(form.get(name) || '').trim() || 'Not provided';
  const contact = splitContact(String(form.get('contactInfo') || ''));
  const subject = encodeURIComponent(`Website service request: ${value('serviceType')}`);
  const body = encodeURIComponent([
    'New service request from the MI Lock Pros website',
    '',
    `Name: ${value('fullName')}`,
    `Phone: ${contact.phone || 'Not provided'}`,
    `Email: ${contact.email || 'Not provided'}`,
    `ZIP code: ${value('serviceAddress')}`,
    `Service type: ${value('serviceType')}`,
    `Preferred contact: ${value('contactMethod')}`,
    `Preferred date and time: ${value('preferredDateTime')}`,
    '',
    `Message: ${value('message')}`,
  ].join('\n'));

  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

export function ServiceRequestForm({ idPrefix = 'home-request' }: { idPrefix?: string }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitState>('idle');
  const [deliveryConnected, setDeliveryConnected] = useState(false);
  const fieldId = (name: string) => `${idPrefix}-${name}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    if (String(form.get('website') || '')) {
      setStatus('success');
      return;
    }

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      formElement.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('loading');
    setDeliveryConnected(Boolean(siteConfig.formEndpoint));

    try {
      if (siteConfig.formEndpoint) {
        const contact = splitContact(String(form.get('contactInfo') || ''));
        const payload = Object.fromEntries(form.entries());
        const response = await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, phone: contact.phone, email: contact.email }),
        });
        if (!response.ok) throw new Error('Request failed');
      } else {
        window.location.href = createEmailFallback(form);
      }
      setStatus('success');
      formElement.reset();
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-confirmation" role="status" aria-live="polite">
        <div className="confirmation-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">Request status</p>
        <h3>{deliveryConnected ? 'Thanks—your request was sent.' : 'Your request details are ready.'}</h3>
        <p>
          {deliveryConnected
            ? 'MI Lock Pros can now follow up using the information you provided.'
            : 'Your email app was opened with the request details filled in. Review the message and press Send to deliver it to MI Lock Pros.'}
        </p>
        <button className="button button-secondary" type="button" onClick={() => setStatus('idle')}>Send another request</button>
      </div>
    );
  }

  return (
    <form className="service-form" noValidate onSubmit={handleSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={fieldId('website')}>Leave this field empty</label>
        <input id={fieldId('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor={fieldId('fullName')}>Full name <small>(optional)</small></label>
          <input id={fieldId('fullName')} name="fullName" type="text" autoComplete="name" placeholder="Your name" />
        </div>
        <div className="field field-full">
          <label htmlFor={fieldId('contactInfo')}>Phone number or email <span>*</span></label>
          <input id={fieldId('contactInfo')} name="contactInfo" type="text" placeholder="Enter a phone number or email" required aria-required="true" aria-invalid={Boolean(errors.contactInfo)} aria-describedby={`${fieldId('contactInfo')}-hint${errors.contactInfo ? ` ${fieldId('contactInfo')}-error` : ''}`} />
          <p className="field-hint" id={fieldId('contactInfo-hint')}>Only one is required. Enter the contact detail that matches your preferred contact method.</p>
          <FieldError id={fieldId('contactInfo')} message={errors.contactInfo} />
        </div>
        <div className="field">
          <label htmlFor={fieldId('serviceAddress')}>Service ZIP code <span>*</span></label>
          <input id={fieldId('serviceAddress')} name="serviceAddress" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="5-digit ZIP code" pattern="[0-9]{5}(-[0-9]{4})?" required aria-required="true" aria-invalid={Boolean(errors.serviceAddress)} aria-describedby={errors.serviceAddress ? `${fieldId('serviceAddress')}-error` : undefined} />
          <FieldError id={fieldId('serviceAddress')} message={errors.serviceAddress} />
        </div>
        <div className="field">
          <label htmlFor={fieldId('serviceType')}>Service type <span>*</span></label>
          <select id={fieldId('serviceType')} name="serviceType" defaultValue="" required aria-required="true" aria-invalid={Boolean(errors.serviceType)} aria-describedby={errors.serviceType ? `${fieldId('serviceType')}-error` : undefined}>
            <option value="" disabled>Select a category</option>
            {serviceCategories.map((category) => <option key={category.id} value={category.shortTitle}>{category.shortTitle}</option>)}
          </select>
          <FieldError id={fieldId('serviceType')} message={errors.serviceType} />
        </div>
        <div className="field">
          <label htmlFor={fieldId('contactMethod')}>Preferred contact method <span>*</span></label>
          <select id={fieldId('contactMethod')} name="contactMethod" defaultValue="" required aria-required="true" aria-invalid={Boolean(errors.contactMethod)} aria-describedby={errors.contactMethod ? `${fieldId('contactMethod')}-error` : undefined}>
            <option value="" disabled>Choose phone, text, or email</option>
            <option value="Phone call">Phone call</option>
            <option value="Text message">Text message</option>
            <option value="Email">Email</option>
          </select>
          <FieldError id={fieldId('contactMethod')} message={errors.contactMethod} />
        </div>
        <div className="field">
          <label htmlFor={fieldId('preferredDateTime')}>Preferred date and time <small>(optional)</small></label>
          <input id={fieldId('preferredDateTime')} name="preferredDateTime" type="datetime-local" />
        </div>
        <div className="field field-full">
          <label htmlFor={fieldId('message')}>Message or problem description <small>(optional)</small></label>
          <textarea id={fieldId('message')} name="message" rows={5} placeholder="Tell us what happened and what help you need." aria-describedby={fieldId('message-hint')} />
          <p className="field-hint" id={fieldId('message-hint')}>Please do not include payment details or other sensitive information.</p>
        </div>
        <div className="field field-full consent-field">
          <label className="check-label" htmlFor={fieldId('consent')}>
            <input id={fieldId('consent')} name="consent" type="checkbox" value="yes" />
            <span>MI Lock Pros may contact me about this service request. <small>(optional)</small></span>
          </label>
        </div>
      </div>

      {status === 'error' && <p className="submit-error" role="alert">We could not send your request. Please try again or contact MI Lock Pros directly.</p>}
      <button className="button button-primary submit-button" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? <><span className="spinner" aria-hidden="true" /> Sending request…</> : <>Submit request <span>↗</span></>}
      </button>
      <p className="form-note">Enter either a phone number or an email in the single contact field. ZIP code, service type, and preferred contact method are also required.</p>
    </form>
  );
}
