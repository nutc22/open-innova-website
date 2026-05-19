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
    var fallbackRecipient = (contactForm.getAttribute('action') || '').replace(/^mailto:/i, '') || 'info@openinnova.it';
    var isEnglish = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;

    var i18n = isEnglish ? {
      greeting: 'Hello,',
      intro: function (name, topic) {
        return 'I\'m writing through the contact form on openinnova.it regarding "' + topic + '".';
      },
      contactsHeader: 'My details:',
      labelName: 'Name',
      labelEmail: 'Email',
      labelPhone: 'Phone',
      signoff: 'Best regards,',
      subjectPrefix: function (topic, name) {
        var who = name || 'a visitor';
        return '[' + topic + '] Request from ' + who + ' — openinnova.it';
      }
    } : {
      greeting: 'Buongiorno,',
      intro: function (name, topic) {
        return 'vi scrivo tramite il modulo di contatto di openinnova.it in merito a "' + topic + '".';
      },
      contactsHeader: 'I miei recapiti:',
      labelName: 'Nome',
      labelEmail: 'Email',
      labelPhone: 'Telefono',
      signoff: 'Cordiali saluti,',
      subjectPrefix: function (topic, name) {
        var who = name || 'un visitatore';
        return '[' + topic + '] Richiesta da ' + who + ' — openinnova.it';
      }
    };

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = ((document.getElementById('contact-name') || {}).value || '').trim();
      var email = ((document.getElementById('contact-email') || {}).value || '').trim();
      var phone = ((document.getElementById('contact-phone') || {}).value || '').trim();
      var message = ((document.getElementById('contact-message') || {}).value || '').trim();

      var topicSelect = document.getElementById('contact-topic');
      var selectedOption = topicSelect ? topicSelect.options[topicSelect.selectedIndex] : null;
      var recipient = (selectedOption && selectedOption.getAttribute('data-recipient')) || fallbackRecipient;
      var topicLabel = selectedOption ? selectedOption.textContent.trim() : '';

      var subject = i18n.subjectPrefix(topicLabel, name);

      var lines = [];
      lines.push(i18n.greeting);
      lines.push('');
      lines.push(i18n.intro(name, topicLabel));
      lines.push('');
      lines.push(i18n.contactsHeader);
      lines.push('· ' + i18n.labelName + ': ' + (name || '___'));
      lines.push('· ' + i18n.labelEmail + ': ' + (email || '___'));
      if (phone) lines.push('· ' + i18n.labelPhone + ': ' + phone);
      lines.push('');
      lines.push(message);
      lines.push('');
      lines.push(i18n.signoff);
      lines.push(name);

      var url = 'mailto:' + recipient
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = url;
    });
  }
})();
