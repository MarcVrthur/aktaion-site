/* ==========================================================================
   AKTAION V2 — couche de mouvement décorative
   Chargée après site.js. Aucune information n’existe uniquement ici.
   Désactivée sous prefers-reduced-motion, Save-Data ou pointeur grossier
   pour les effets qui en dépendent.
   ========================================================================== */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)');
  var saveData = navigator.connection && navigator.connection.saveData;

  if ((reduce && reduce.matches) || saveData) return;

  root.classList.add('motion-ok');
  var finePointer = !!(fine && fine.matches);
  if (finePointer) root.classList.add('motion-fine');

  var clamp = function (value, min, max) {
    return Math.min(max, Math.max(min, value));
  };

  /* ------------------------------------------------------------------------
     Titres kinétiques — découpe en mots masqués, texte lisible sans JS
     ------------------------------------------------------------------------ */

  var kineticBlocks = [].slice.call(doc.querySelectorAll('[data-kinetic]'));

  kineticBlocks.forEach(function (block) {
    var textNodes = [];
    var walker = doc.createTreeWalker(block, NodeFilter.SHOW_TEXT, null);

    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
    }

    var wordIndex = 0;

    textNodes.forEach(function (node) {
      var parts = node.nodeValue.split(/(\s+)/);
      var fragment = doc.createDocumentFragment();

      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(doc.createTextNode(part));
          return;
        }
        var mask = doc.createElement('span');
        var word = doc.createElement('span');
        mask.className = 'kinetic__mask';
        word.className = 'kinetic__word';
        word.textContent = part;
        word.style.setProperty('--i', String(wordIndex));
        wordIndex += 1;
        mask.appendChild(word);
        fragment.appendChild(mask);
      });

      node.parentNode.replaceChild(fragment, node);
    });

    block.classList.add('is-split');
  });

  if (kineticBlocks.length) {
    if (!('IntersectionObserver' in window)) {
      kineticBlocks.forEach(function (block) { block.classList.add('is-in'); });
    } else {
      var kineticObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          kineticObserver.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      kineticBlocks.forEach(function (block) { kineticObserver.observe(block); });
    }
  }

  /* ------------------------------------------------------------------------
     Compteurs
     ------------------------------------------------------------------------ */

  var counters = [].slice.call(doc.querySelectorAll('[data-count-to]'));

  function renderCounter(el, value) {
    var pad = parseInt(el.getAttribute('data-count-pad') || '2', 10);
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    var text = String(Math.round(value));
    while (text.length < pad) text = '0' + text;
    el.textContent = prefix + text + suffix;
  }

  function runCounter(el) {
    if (el.getAttribute('data-count-started')) return;
    el.setAttribute('data-count-started', 'true');

    var target = parseInt(el.getAttribute('data-count-to'), 10);
    if (isNaN(target)) return;
    var duration = 1050;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = clamp((now - start) / duration, 0, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      renderCounter(el, target * eased);
      if (progress < 1) window.requestAnimationFrame(frame);
      else renderCounter(el, target);
    }

    window.requestAnimationFrame(frame);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { renderCounter(el, parseInt(el.getAttribute('data-count-to'), 10) || 0); });
    } else {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    }
  }

  /* ------------------------------------------------------------------------
     Décalage des révélations en groupe
     ------------------------------------------------------------------------ */

  [].slice.call(doc.querySelectorAll('[data-stagger]')).forEach(function (group) {
    [].slice.call(group.children).forEach(function (child, index) {
      if (!child.classList.contains('reveal')) return;
      child.style.setProperty('--reveal-delay', Math.min(index * 70, 420) + 'ms');
    });
  });

  /* ------------------------------------------------------------------------
     Barre de progression, parallaxe, rail de méthode, header escamotable
     ------------------------------------------------------------------------ */

  var progressBar = doc.querySelector('[data-scroll-progress]');
  var parallaxItems = [].slice.call(doc.querySelectorAll('[data-parallax]'));
  var timelines = [].slice.call(doc.querySelectorAll('[data-timeline]'));
  var header = doc.querySelector('[data-header]');
  var lastScroll = window.pageYOffset || 0;
  var ticking = false;

  function updateScrollEffects() {
    ticking = false;
    var y = window.pageYOffset || 0;

    if (progressBar) {
      var distance = doc.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + clamp(distance > 0 ? y / distance : 0, 0, 1) + ')';
    }

    if (window.innerWidth >= 768) {
      parallaxItems.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > window.innerHeight + 160) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.06;
        var offset = ((rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight) * speed * 100;
        el.style.setProperty('--parallax-y', clamp(offset, -42, 42).toFixed(2) + 'px');
      });
    } else {
      parallaxItems.forEach(function (el) { el.style.removeProperty('--parallax-y'); });
    }

    timelines.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
      el.style.setProperty('--timeline-progress', progress.toFixed(3));
    });

    if (header && !header.matches(':hover') && !header.contains(doc.activeElement)) {
      var delta = y - lastScroll;
      if (y > 280 && delta > 6) header.classList.add('is-hidden');
      else if (delta < -6 || y < 90) header.classList.remove('is-hidden');
    }

    lastScroll = y;
  }

  function requestScrollUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollEffects);
  }

  if (progressBar || parallaxItems.length || timelines.length || header) {
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });
    updateScrollEffects();
  }

  /* ------------------------------------------------------------------------
     Cartes : inclinaison et reflet
     ------------------------------------------------------------------------ */

  if (finePointer) {
    [].slice.call(doc.querySelectorAll('[data-tilt]')).forEach(function (el) {
      el.addEventListener('pointerenter', function () {
        el.classList.add('is-tilting');
      });

      el.addEventListener('pointermove', function (event) {
        var rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        var x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        var y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        el.style.setProperty('--ry', ((x - 0.5) * 5.4).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 5.4).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });

      function resetTilt() {
        el.classList.remove('is-tilting');
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
      }

      el.addEventListener('pointerleave', resetTilt);
      el.addEventListener('blur', resetTilt, true);
    });

    /* Boutons magnétiques */
    [].slice.call(doc.querySelectorAll('[data-magnetic]')).forEach(function (el) {
      el.addEventListener('pointermove', function (event) {
        var rect = el.getBoundingClientRect();
        var dx = clamp((event.clientX - (rect.left + rect.width / 2)) * 0.16, -5, 5);
        var dy = clamp((event.clientY - (rect.top + rect.height / 2)) * 0.16, -4, 4);
        el.style.setProperty('--mag-x', dx.toFixed(2) + 'px');
        el.style.setProperty('--mag-y', dy.toFixed(2) + 'px');
      });

      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mag-x', '0px');
        el.style.setProperty('--mag-y', '0px');
      });
    });
  }

  /* ------------------------------------------------------------------------
     Curseur complémentaire — le curseur natif reste visible
     ------------------------------------------------------------------------ */

  if (finePointer) {
    var cursor = doc.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__ring"></span><span class="cursor__dot"></span><span class="cursor__label"></span>';
    doc.body.appendChild(cursor);

    var dot = cursor.querySelector('.cursor__dot');
    var ring = cursor.querySelector('.cursor__ring');
    var label = cursor.querySelector('.cursor__label');
    var mouseX = -100;
    var mouseY = -100;
    var ringX = -100;
    var ringY = -100;
    var cursorFrame = null;

    function cursorLoop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0) translate(-50%,-50%)';
      ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';
      label.style.transform = 'translate3d(' + (ringX + 18) + 'px,' + (ringY + 16) + 'px,0)';
      cursorFrame = window.requestAnimationFrame(cursorLoop);
    }

    doc.addEventListener('pointermove', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.classList.add('is-visible');
      if (!cursorFrame) cursorLoop();

      var target = event.target && event.target.closest
        ? event.target.closest('a, button, [data-cursor], input, textarea, select')
        : null;

      cursor.classList.toggle('is-field', !!(target && target.matches('input, textarea, select')));
      cursor.classList.toggle('is-pointer', !!(target && target.matches('a, button')));

      var text = target && target.getAttribute('data-cursor');
      cursor.classList.toggle('has-label', !!text);
      label.textContent = text || '';
    }, { passive: true });

    doc.addEventListener('pointerdown', function () { cursor.classList.add('is-down'); });
    doc.addEventListener('pointerup', function () { cursor.classList.remove('is-down'); });
    doc.addEventListener('pointerleave', function () { cursor.classList.remove('is-visible'); });
    window.addEventListener('blur', function () { cursor.classList.remove('is-visible'); });
  }
})();
