(function () {
  'use strict';

  // Back-to-top button
  var topBtn = document.querySelector('.back-to-top');
  if (topBtn) {
    var threshold = 400;
    var visible = false;

    var update = function () {
      var shouldShow = window.scrollY > threshold;
      if (shouldShow !== visible) {
        visible = shouldShow;
        topBtn.classList.toggle('back-to-top--visible', shouldShow);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    topBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Cookie modal
  var modal = document.querySelector('#cookie-modal');
  var openBtn = document.querySelector('[data-open-cookie-modal]');
  var closeBtn = document.querySelector('[data-close-cookie-modal]');

  if (modal && openBtn && typeof modal.showModal === 'function') {
    openBtn.addEventListener('click', function () {
      modal.showModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modal.close();
      });
    }

    // Close when clicking on the backdrop (outside the modal box)
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.close();
      }
    });
  }

  // Mobile nav menu (hamburger)
  var navMenu = document.querySelector('#nav-menu');
  var navOpenBtn = document.querySelector('[data-open-nav-menu]');

  if (navMenu && navOpenBtn && typeof navMenu.showModal === 'function') {
    var setExpanded = function (value) {
      navOpenBtn.setAttribute('aria-expanded', value ? 'true' : 'false');
    };

    navOpenBtn.addEventListener('click', function () {
      navMenu.showModal();
      setExpanded(true);
    });

    // Any element with data-close-nav-menu inside the dialog closes it
    // (close button, logo, and every menu link so navigating also dismisses the dialog)
    navMenu.querySelectorAll('[data-close-nav-menu]').forEach(function (el) {
      el.addEventListener('click', function () {
        navMenu.close();
      });
    });

    // Click on the backdrop (outside the dialog content) closes it
    navMenu.addEventListener('click', function (e) {
      if (e.target === navMenu) {
        navMenu.close();
      }
    });

    // Reset aria-expanded after close (covers ESC, backdrop, link click)
    navMenu.addEventListener('close', function () {
      setExpanded(false);
    });
  }

  // Contact form: build a mailto URL with prefilled subject and body, then open it
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    var recipient = (contactForm.getAttribute('action') || '').replace(/^mailto:/i, '') || 'info@openinnova.it';

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (document.getElementById('contact-name') || {}).value || '';
      var email = (document.getElementById('contact-email') || {}).value || '';
      var phone = (document.getElementById('contact-phone') || {}).value || '';
      var message = (document.getElementById('contact-message') || {}).value || '';

      name = name.trim();
      email = email.trim();
      phone = phone.trim();
      message = message.trim();

      var subject = name
        ? 'Contatto da ' + name + ' via openinnova.it'
        : 'Contatto via openinnova.it';

      var lines = [];
      lines.push('Salve,');
      lines.push('');
      var intro = 'sono ' + (name || '[nome]');
      if (email) intro += ' (' + email + ')';
      if (phone) intro += ', telefono ' + phone;
      intro += ' e vi scrivo da openinnova.it.';
      lines.push(intro);
      lines.push('');
      lines.push(message || '[scrivi qui il tuo messaggio]');
      lines.push('');
      lines.push('Grazie,');
      lines.push(name || '');

      var url = 'mailto:' + recipient
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = url;
    });
  }
})();
