(function () {
  'use strict';

  function currentTheme() {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  }
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { sessionStorage.setItem('mlp-theme', theme); } catch (error) { /* Storage may be unavailable. */ }
    document.querySelectorAll('[data-theme-name]').forEach(function (item) { item.textContent = theme === 'light' ? 'Light' : 'Dark'; });
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) { button.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'); });
    var color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute('content', theme === 'light' ? '#f6f1e7' : '#050504');
  }
  applyTheme(currentTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
    button.addEventListener('click', function () { applyTheme(currentTheme() === 'light' ? 'dark' : 'light'); });
  });

  var menuButton = document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  var menuBackdrop = document.querySelector('.mobile-menu-backdrop');
  var setMenu = function () {};
  if (menuButton && mobileMenu) {
    setMenu = function (open) {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
      if (menuBackdrop) menuBackdrop.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    };
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.querySelectorAll('[data-menu-close]').forEach(function (button) { button.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setMenu(false);
        menuButton.focus();
      }
    });
  }

  var requestDialog = document.querySelector('[data-request-dialog]');
  var requestDialogOpener = null;

  function openRequestDialog(opener) {
    if (!requestDialog) return false;
    requestDialogOpener = opener || document.activeElement;
    var requestedService = opener && opener.getAttribute ? opener.getAttribute('data-service') : '';
    if (requestedService) {
      requestDialog.querySelectorAll('[name="service_type"]').forEach(function (select) { select.value = requestedService; });
    }
    if (typeof requestDialog.showModal === 'function') {
      if (!requestDialog.open) requestDialog.showModal();
    } else {
      requestDialog.setAttribute('open', '');
      requestDialog.classList.add('is-fallback-open');
      requestDialog.setAttribute('aria-modal', 'true');
      document.body.classList.add('request-dialog-fallback-open');
    }
    document.body.classList.add('request-dialog-open');
    var firstField = requestDialog.querySelector('input:not([type="hidden"]):not([tabindex="-1"]), select, textarea');
    if (firstField) window.setTimeout(function () { firstField.focus(); }, 30);
    return true;
  }

  function closeRequestDialog() {
    if (!requestDialog || !requestDialog.hasAttribute('open')) return;
    if (typeof requestDialog.close === 'function') requestDialog.close();
    else requestDialog.removeAttribute('open');
    requestDialog.classList.remove('is-fallback-open');
    document.body.classList.remove('request-dialog-open');
    document.body.classList.remove('request-dialog-fallback-open');
    if (requestDialogOpener && typeof requestDialogOpener.focus === 'function') requestDialogOpener.focus();
  }

  if (requestDialog) {
    requestDialog.querySelectorAll('[data-request-dialog-close]').forEach(function (button) { button.addEventListener('click', closeRequestDialog); });
    requestDialog.addEventListener('cancel', function () { document.body.classList.remove('request-dialog-open'); });
    requestDialog.addEventListener('click', function (event) {
      if (event.target === requestDialog) closeRequestDialog();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && requestDialog.hasAttribute('open')) closeRequestDialog();
    });
  }

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;
    var requestTrigger = event.target.closest('[data-request-service], a[href*="#request-service"]');
    if (requestTrigger) {
      event.preventDefault();
      if (openRequestDialog(requestTrigger)) {
        if (menuButton && mobileMenu) setMenu(false);
        return;
      }
    }
    var anchor = event.target.closest('a[href*="#"]');
    if (!anchor) return;
    var targetUrl = new URL(anchor.href, window.location.href);
    if (targetUrl.origin !== window.location.origin || targetUrl.pathname !== window.location.pathname || !targetUrl.hash) return;
    var target = document.getElementById(targetUrl.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', targetUrl.hash);
    if (menuButton && mobileMenu) setMenu(false);
  });

  document.querySelectorAll('.service-picker').forEach(function (link) {
    link.addEventListener('click', function () {
      document.querySelectorAll('[name="service_type"]').forEach(function (select) { select.value = link.getAttribute('data-service') || ''; });
    });
  });

  function makeElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (typeof text === 'string') element.textContent = text;
    return element;
  }

  function setReviewStatus(statusElement, label, className) {
    statusElement.className = 'integration-status' + (className ? ' ' + className : '');
    statusElement.replaceChildren(makeElement('i'), document.createTextNode(' ' + label));
  }

  function renderReview(review) {
    var article = makeElement('article', 'review-card');
    var author = makeElement('div', 'review-author');
    if (review.authorPhotoUri) {
      var image = makeElement('img', 'review-avatar');
      image.src = review.authorPhotoUri;
      image.alt = '';
      image.loading = 'lazy';
      image.referrerPolicy = 'no-referrer';
      author.appendChild(image);
    } else {
      author.appendChild(makeElement('span', 'review-avatar review-avatar-fallback', (review.authorName || '?').charAt(0).toUpperCase()));
    }
    var authorCopy = makeElement('span', 'review-author-copy');
    authorCopy.appendChild(makeElement('strong', '', review.authorName));
    authorCopy.appendChild(makeElement('small', '', review.relativeTime || 'Google review'));
    author.appendChild(authorCopy);
    article.appendChild(author);

    var stars = makeElement('div', 'review-stars');
    stars.setAttribute('aria-label', String(review.rating) + ' out of 5 stars');
    for (var index = 1; index <= 5; index += 1) {
      stars.appendChild(makeElement('span', index <= Math.round(review.rating) ? 'filled' : '', '★'));
    }
    article.appendChild(stars);
    article.appendChild(makeElement('p', '', review.text));
    var source = makeElement('a', 'review-source', 'Read on Google');
    var sourceArrow = makeElement('span', 'theme-arrow');
    sourceArrow.setAttribute('aria-hidden', 'true');
    source.appendChild(sourceArrow);
    source.href = review.googleMapsUri;
    source.target = '_blank';
    source.rel = 'noreferrer';
    article.appendChild(source);
    return article;
  }

  var reviewsRoot = document.querySelector('[data-google-reviews]');
  if (reviewsRoot && window.miLockPros) {
    var status = reviewsRoot.querySelector('[data-review-status]');
    var loading = reviewsRoot.querySelector('[data-review-loading]');
    var summary = reviewsRoot.querySelector('[data-review-summary]');
    var grid = reviewsRoot.querySelector('[data-review-grid]');
    var empty = reviewsRoot.querySelector('[data-review-empty]');
    var ratingMetric = reviewsRoot.querySelector('[data-review-rating]');
    var countMetric = reviewsRoot.querySelector('[data-review-count]');
    var updatedNote = reviewsRoot.querySelector('[data-review-updated]');
    var refreshButton = reviewsRoot.querySelector('[data-review-refresh]');

    function loadReviews(forceRefresh) {
      var reviewsUrl = new URL(window.miLockPros.reviewsUrl, window.location.origin);
      if (forceRefresh) reviewsUrl.searchParams.set('refresh', '1');
      reviewsUrl.searchParams.set('_', String(Date.now()));
      if (refreshButton) {
        refreshButton.disabled = true;
        refreshButton.textContent = 'Refreshing…';
      }
      if (status) setReviewStatus(status, forceRefresh ? 'Refreshing from Google' : 'Checking Google', 'is-loading');
      fetch(reviewsUrl.toString(), { headers: { Accept: 'application/json' }, cache: 'no-store' })
        .then(function (response) { if (!response.ok) throw new Error('Reviews unavailable'); return response.json(); })
        .then(function (data) {
          if (loading) loading.hidden = true;
          if (data.status !== 'ready') {
            if (empty) empty.hidden = false;
            if (status) setReviewStatus(status, 'Google profile linked');
            return;
          }
          var statusLabel = 'Live from Google';
          if (typeof data.rating === 'number' && typeof data.reviewCount === 'number') statusLabel = data.rating.toFixed(1) + ' ★ · ' + data.reviewCount + ' reviews';
          if (status) setReviewStatus(status, statusLabel);
          if (ratingMetric && typeof data.rating === 'number') {
            ratingMetric.replaceChildren(document.createTextNode(data.rating.toFixed(1)), makeElement('span', '', ' / 5'));
          }
          if (countMetric && typeof data.reviewCount === 'number') {
            countMetric.replaceChildren(document.createTextNode(String(data.reviewCount)), makeElement('span', '', ' reviews'));
          }
          if (summary && typeof data.rating === 'number') {
            summary.replaceChildren(makeElement('strong', '', data.rating.toFixed(1) + ' ★'), document.createTextNode(typeof data.reviewCount === 'number' ? data.reviewCount + ' Google reviews' : 'Google rating'));
            summary.hidden = false;
          }
          if (grid && Array.isArray(data.reviews) && data.reviews.length) {
            grid.replaceChildren();
            data.reviews.slice(0, 3).forEach(function (review) { grid.appendChild(renderReview(review)); });
            grid.hidden = false;
          }
          if (updatedNote) updatedNote.textContent = 'Rating and review count refreshed from the official Google Business Profile. Google remains the source for current review text and totals.';
        })
        .catch(function () {
          if (loading) loading.hidden = true;
          if (empty) empty.hidden = false;
          if (status) setReviewStatus(status, 'Showing saved Google rating', 'is-error');
        })
        .finally(function () {
          if (refreshButton) {
            refreshButton.disabled = false;
            refreshButton.textContent = 'Refresh reviews';
          }
        });
    }

    if (refreshButton) refreshButton.addEventListener('click', function () { loadReviews(true); });
    loadReviews(false);
  }

  document.querySelectorAll('[data-service-form]').forEach(function (form) {
    if (!window.miLockPros) return;
    var submitButton = form.querySelector('button[type="submit"]');
    var submitLabel = form.querySelector('[data-submit-label]');
    var spinner = form.querySelector('[data-submit-spinner]');
    var message = form.querySelector('[data-submit-message]');

    function fieldError(field, text) {
      var error = form.querySelector('[data-error-for="' + field.name + '"]');
      field.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (error) error.textContent = text || '';
    }
    function validate() {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var error = '';
        if (field.required && !field.value.trim()) error = 'This field is required.';
        else if (field.name === 'service_address' && !/^\d{5}(?:-\d{4})?$/.test(field.value.trim())) error = 'Enter a valid 5-digit ZIP code.';
        fieldError(field, error);
        if (error) valid = false;
      });
      var contactValue = form.elements.contact.value.trim();
      var contactIsEmail = contactValue.indexOf('@') !== -1;
      var phoneDigits = contactIsEmail ? '' : contactValue.replace(/\D/g, '');
      var emailValue = contactIsEmail ? contactValue : '';
      var contactMethod = form.elements.contact_method.value;
      if (!contactValue) {
        fieldError(form.elements.contact, 'Enter a phone number or email address.');
        valid = false;
      } else if (contactIsEmail && !/^\S+@\S+\.\S+$/.test(emailValue)) {
        fieldError(form.elements.contact, 'Enter a valid email address.');
        valid = false;
      } else if (!contactIsEmail && phoneDigits.length < 10) {
        fieldError(form.elements.contact, 'Enter a valid phone number.');
        valid = false;
      } else if ((contactMethod === 'phone' || contactMethod === 'text') && phoneDigits.length < 10) {
        fieldError(form.elements.contact, 'Enter a phone number for calls or text messages.');
        valid = false;
      } else if (contactMethod === 'email' && !emailValue) {
        fieldError(form.elements.contact, 'Enter an email address when email is your preferred contact method.');
        valid = false;
      }
      return valid;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      message.className = 'submit-message';
      message.textContent = '';
      if (!validate()) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });
      var contactValue = form.elements.contact.value.trim();
      var contactIsEmail = contactValue.indexOf('@') !== -1;
      payload.phone = contactIsEmail ? '' : contactValue;
      payload.email = contactIsEmail ? contactValue : '';
      payload.consent = form.elements.consent.checked;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitLabel.textContent = 'Sending…';
      spinner.hidden = false;
      fetch(window.miLockPros.requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (response) { return response.json().then(function (data) { if (!response.ok) throw new Error(data.message || 'Request failed'); return data; }); })
        .then(function (data) {
          form.reset();
          message.className = 'submit-message is-success';
          message.textContent = data.message || 'Your request was sent to MI Lock Pros.';
        })
        .catch(function (error) {
          message.className = 'submit-message is-error';
          message.textContent = error.message || 'The request could not be sent. Please call MI Lock Pros.';
        })
        .finally(function () {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
          submitLabel.textContent = 'Send Service Request';
          spinner.hidden = true;
        });
    });
  });
}());
