/* ==========================================================================
   AKTAION V2 — interactions
   Navigation, recherche, méga-menu mobile, FAQ, filtres, formulaires, reveals
   ========================================================================== */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* Signale que JS est disponible (les reveals ne masquent rien sans JS). */
  root.classList.add('js');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Thème : version de base (rouge) ↔ variante violette
     Seules les couleurs rouges changent, rien d'autre.
     ------------------------------------------------------------------------ */

  var THEME_KEY = 'aktaion-theme';
  var themeToggle = doc.querySelector('[data-theme-toggle]');

  function isViolet() {
    return root.getAttribute('data-theme') === 'violet';
  }

  function applyTheme(violet, persist) {
    if (violet) root.setAttribute('data-theme', 'violet');
    else root.removeAttribute('data-theme');

    var label = violet ? 'Revenir à la version rouge' : 'Passer à la version violette';

    doc.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', violet ? 'true' : 'false');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });

    var icon = doc.querySelector('[data-theme-favicon]');
    if (icon) {
      icon.setAttribute('href', violet ? 'assets/img/favicon-violet.svg' : 'assets/img/favicon.svg');
    }

    if (persist) {
      try {
        if (violet) localStorage.setItem(THEME_KEY, 'violet');
        else localStorage.removeItem(THEME_KEY);
      } catch (error) {
        /* Stockage indisponible : le choix vaut pour la page en cours. */
      }
    }
  }

  applyTheme(isViolet(), false);

  function toggleTheme() {
    var next = !isViolet();
    var canTransition = document.startViewTransition && !reduceMotion;

    if (!canTransition) {
      applyTheme(next, true);
      return;
    }

    var rect = themeToggle ? themeToggle.getBoundingClientRect() : null;
    var x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    var y = rect ? rect.top + rect.height / 2 : 0;
    var radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.classList.add('theme-transition');
    var transition = document.startViewTransition(function () {
      applyTheme(next, true);
    });

    transition.ready.then(function () {
      document.documentElement.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        {
          duration: 620,
          easing: 'cubic-bezier(.2,0,.2,1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    }).catch(function () {});

    transition.finished.finally(function () {
      root.classList.remove('theme-transition');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  /* ------------------------------------------------------------------------
     Header : ombre au scroll
     ------------------------------------------------------------------------ */

  var header = doc.querySelector('[data-header]');

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------------ */

  var menu = doc.getElementById('mobile-menu');
  var menuToggle = doc.querySelector('[data-menu-toggle]');
  var menuClose = doc.querySelector('[data-menu-close]');

  function openMenu() {
    if (!menu) return;
    menu.hidden = false;
    doc.body.classList.add('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    var first = menu.querySelector('a, button');
    if (first) first.focus();
  }

  function closeMenu() {
    if (!menu) return;
    menu.hidden = true;
    doc.body.classList.remove('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      if (menu.hidden) openMenu();
      else closeMenu();
    });
  }

  if (menuClose) menuClose.addEventListener('click', closeMenu);

  if (menu) {
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1180 && menu && !menu.hidden) closeMenu();
  });

  /* ------------------------------------------------------------------------
     Recherche
     ------------------------------------------------------------------------ */

  var searchOverlay = doc.getElementById('search-overlay');
  var searchOpen = doc.querySelectorAll('[data-search-open]');
  var searchClose = doc.querySelector('[data-search-close]');
  var searchInput = doc.getElementById('site-search');
  var searchResults = doc.querySelector('[data-search-results]');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
    doc.body.classList.add('menu-open');
    if (searchInput) {
      searchInput.value = '';
      filterSearch('');
      setTimeout(function () { searchInput.focus(); }, 40);
    }
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = true;
    doc.body.classList.remove('menu-open');
  }

  function filterSearch(query) {
    if (!searchResults) return;
    var q = query.trim().toLowerCase();
    var items = searchResults.querySelectorAll('li');
    var visible = 0;

    items.forEach(function (item) {
      var text = item.textContent.toLowerCase();
      var match = !q || text.indexOf(q) !== -1;
      item.hidden = !match;
      if (match) visible += 1;
    });

    var empty = searchResults.querySelector('.search-empty');
    if (!empty) {
      empty = doc.createElement('li');
      empty.className = 'search-empty';
      empty.textContent = 'Aucun résultat. Essayez « digitalisation », « web », « data » ou « contact ».';
      searchResults.appendChild(empty);
    }
    empty.hidden = visible > 0;
  }

  searchOpen.forEach(function (btn) {
    btn.addEventListener('click', openSearch);
  });

  if (searchClose) searchClose.addEventListener('click', closeSearch);

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (event) {
      if (event.target === searchOverlay) closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterSearch(searchInput.value);
    });
  }

  /* ------------------------------------------------------------------------
     Échap ferme les surcouches ; clic sur un résultat ferme la recherche
     ------------------------------------------------------------------------ */

  doc.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (menu && !menu.hidden) closeMenu();
    if (searchOverlay && !searchOverlay.hidden) closeSearch();
  });

  if (searchResults) {
    searchResults.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeSearch);
    });
  }

  /* ------------------------------------------------------------------------
     FAQ
     ------------------------------------------------------------------------ */

  var faqItems = doc.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__btn');
    var panel = item.querySelector('.faq__panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        var otherBtn = other.querySelector('.faq__btn');
        var otherPanel = other.querySelector('.faq__panel');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherPanel) {
          otherPanel.style.maxHeight = '';
          otherPanel.setAttribute('aria-hidden', 'true');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      panel.setAttribute('aria-hidden', !isOpen ? 'false' : 'true');
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : '';
    });
  });

  /* ------------------------------------------------------------------------
     Filtres (réalisations, ressources)
     ------------------------------------------------------------------------ */

  function animateFilter(cards, update) {
    if (reduceMotion || !('animate' in Element.prototype)) {
      update();
      return;
    }

    var before = new Map();
    cards.forEach(function (card) {
      if (!card.hidden) before.set(card, card.getBoundingClientRect());
    });

    update();

    cards.forEach(function (card) {
      if (card.hidden) return;
      var rect = card.getBoundingClientRect();
      var old = before.get(card);

      if (old) {
        var dx = old.left - rect.left;
        var dy = old.top - rect.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          card.animate(
            [{ transform: 'translate(' + dx + 'px, ' + dy + 'px)' }, { transform: 'none' }],
            { duration: 420, easing: 'cubic-bezier(.2,0,.2,1)' }
          );
        }
      } else {
        card.animate(
          [
            { opacity: 0, transform: 'translateY(16px) scale(.985)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 460, easing: 'cubic-bezier(0,0,.2,1)', delay: 30 }
        );
      }
    });
  }

  doc.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-filter]');
    var section = group.closest('section') || doc;
    var cards = section.querySelectorAll('[data-card]');
    var count = section.querySelector('[data-count]');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-filter');

        animateFilter(cards, function () {
          buttons.forEach(function (b) {
            b.classList.toggle('is-active', b === btn);
            b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
          });

          var visible = 0;
          cards.forEach(function (card) {
            var match = value === 'Tous' || card.getAttribute('data-category') === value;
            card.hidden = !match;
            if (match) {
              visible += 1;
              if (!card.classList.contains('is-in')) card.classList.add('is-in');
            }
          });

          if (count) count.textContent = visible;
        });

        if (section.dispatchEvent) {
          section.dispatchEvent(new CustomEvent('aktaion:filtered', {
            bubbles: true,
            detail: { value: value },
          }));
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     Formulaire de contact (démo, pas d'envoi réseau)
     ------------------------------------------------------------------------ */

  var contactForm = doc.querySelector('[data-contact-form]');
  var contactSuccess = doc.querySelector('[data-contact-success]');
  var contactReset = doc.querySelector('[data-contact-reset]');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      contactForm.hidden = true;
      contactSuccess.hidden = false;
      contactSuccess.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  if (contactReset && contactForm && contactSuccess) {
    contactReset.addEventListener('click', function () {
      contactSuccess.hidden = true;
      contactForm.hidden = false;
      var firstField = contactForm.querySelector('input, select, textarea');
      if (firstField) firstField.focus();
    });
  }

  /* ------------------------------------------------------------------------
     Newsletter (démo)
     ------------------------------------------------------------------------ */

  doc.querySelectorAll('[data-newsletter]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var button = form.querySelector('button');
      var note = form.querySelector('[data-newsletter-note]');

      if (input && !input.value) {
        input.focus();
        return;
      }

      if (button) {
        button.textContent = 'Inscrit ✓';
        button.disabled = true;
      }
      if (input) input.disabled = true;
      if (note) {
        note.textContent = 'Merci — votre inscription est enregistrée (démonstration).';
        note.hidden = false;
      }
    });
  });

  /* ------------------------------------------------------------------------
     Révélation au scroll
     ------------------------------------------------------------------------ */

  var reveals = doc.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    reveals.forEach(function (el) { observer.observe(el); });
  }
})();
