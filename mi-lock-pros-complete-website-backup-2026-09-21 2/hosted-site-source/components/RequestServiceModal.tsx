'use client';

import { useEffect, useRef, useState } from 'react';
import { ServiceRequestForm } from '@/components/ServiceRequestForm';

export function RequestServiceModal() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openFromRequestLink = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-request-service], a[href*="#request-service"]') : null;
      if (!target || target.closest('[data-request-modal]')) return;
      event.preventDefault();
      event.stopPropagation();
      opener.current = target;
      setOpen(true);
    };

    document.addEventListener('click', openFromRequestLink, true);
    return () => document.removeEventListener('click', openFromRequestLink, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.classList.add('request-modal-open');
    window.addEventListener('keydown', closeOnEscape);
    window.setTimeout(() => closeButton.current?.focus(), 20);
    return () => {
      document.body.classList.remove('request-modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
    window.setTimeout(() => opener.current?.focus(), 20);
  }

  if (!open) return null;

  return (
    <div className="request-modal" data-request-modal role="presentation">
      <button className="request-modal-backdrop" type="button" aria-label="Close request service form" onClick={closeModal} />
      <section className="request-modal-panel" role="dialog" aria-modal="true" aria-labelledby="request-modal-title">
        <button ref={closeButton} className="request-modal-close" type="button" aria-label="Close request service form" onClick={closeModal}><span aria-hidden="true">×</span></button>
        <div className="request-modal-heading">
          <p className="eyebrow"><span /> Request service</p>
          <h2 id="request-modal-title">Tell us how we can help.</h2>
          <p>Share the best way to reach you, your ZIP code, and a few service details. Submitting the form does not confirm an appointment.</p>
        </div>
        <ServiceRequestForm idPrefix="modal-request" />
      </section>
    </div>
  );
}
