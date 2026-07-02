/* Daniele Nucciarelli — portfolio
   Vanilla JS, no dependencies. No theme toggle, no storage:
   the dark theme follows the OS preference (see CSS @media). */
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

  // Cookie modal ("this site uses no cookies")
  var modal = document.querySelector('#cookie-modal');
  var openBtn = document.querySelector('[data-open-cookie-modal]');
  var closeBtn = document.querySelector('[data-close-cookie-modal]');
  if (modal && openBtn && typeof modal.showModal === 'function') {
    openBtn.addEventListener('click', function () { modal.showModal(); });
    if (closeBtn) {
      closeBtn.addEventListener('click', function () { modal.close(); });
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal) { modal.close(); }
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
    navMenu.querySelectorAll('[data-close-nav-menu]').forEach(function (el) {
      el.addEventListener('click', function () { navMenu.close(); });
    });
    navMenu.addEventListener('click', function (e) {
      if (e.target === navMenu) { navMenu.close(); }
    });
    navMenu.addEventListener('close', function () { setExpanded(false); });
  }

  // Print / Save-as-PDF (CV page). CSP blocks inline onclick, so wire it here.
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      try { window.print(); } catch (e) {}
    });
  });
})();
