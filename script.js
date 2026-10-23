/* =====================================================================
   Invitation de mariage — comportement du site
   (les textes se modifient dans config.js, pas ici)
   ===================================================================== */
(function () {
  'use strict';

  var C = window.INVITATION;
  if (!C) { console.error('config.js est introuvable ou contient une erreur.'); return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Outils ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* Titre révélé mot par mot */
  function words(text, base) {
    var out = String(text).split(' ').map(function (w, i) {
      return '<span class="w" aria-hidden="true" style="--i:' + i + '">' + esc(w) + '</span>';
    }).join(' ');
    return { html: out, base: base || 0 };
  }
  function titleHTML(tag, cls, text, base) {
    var w = words(text, base);
    return '<' + tag + ' class="' + cls + ' split" aria-label="' + esc(text) + '" style="--base:' + w.base + 'ms">' + w.html + '</' + tag + '>';
  }

  /* Icônes de la frise */
  var ICONS = {
    rencontre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>',
    sablier: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 21h12"/><path d="M7 3c0 5 3 6 5 9-2 3-5 4-5 9"/><path d="M17 3c0 5-3 6-5 9 2 3 5 4 5 9"/></svg>',
    croix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M6 9h12"/></svg>'
  };

  var noms = C.prenom1 + ' & ' + C.prenom2;
  document.title = noms + ' — Invitation de mariage';

  /* =====================================================================
     ENVELOPPE
     ===================================================================== */
  $('#introTop').textContent = C.enveloppe.texteHaut;
  $('#cardSurtitre').textContent = C.enveloppe.carteSurtitre;
  $('#cardNoms').textContent = noms;
  $('#cardDate').textContent = C.enveloppe.carteDate;
  $('#sealText').textContent = C.initiales[0] + '&' + C.initiales[1];
  $('#openBtn').textContent = C.enveloppe.bouton;

  /* =====================================================================
     CONSTRUCTION DES SECTIONS
     ===================================================================== */
  var A = C.accueil, H = C.histoire, G = C.galerie, P = C.programme,
      L = C.lieu, T = C.tenue, R = C.rsvp, F = C.pied;

  var html = '';

  /* 1. Accueil */
  html += '' +
    '<section class="hero" id="accueil">' +
      '<img class="hero-img" id="heroImg" src="' + esc(A.photo) + '" alt="" fetchpriority="high" decoding="async">' +
      '<span class="eyebrow reveal" style="--d:300ms">' + esc(A.surtitre) + '</span>' +
      '<h1 class="names split" aria-label="' + esc(noms) + '" style="--base:500ms">' +
        '<span class="w" aria-hidden="true" style="--i:0">' + esc(C.prenom1) + '</span>' +
        '<span class="w amp" aria-hidden="true" style="--i:1">&amp;</span>' +
        '<span class="w" aria-hidden="true" style="--i:2">' + esc(C.prenom2) + '</span>' +
      '</h1>' +
      '<p class="hero-date reveal" style="--d:1300ms">' + esc(A.dateTexte) + '</p>' +
      '<p class="hero-lieu reveal" style="--d:1500ms">' + esc(A.lieuTexte) + '</p>' +
      '<p class="hero-phrase reveal" style="--d:1800ms">' + esc(A.phrase) + '</p>' +
      '<div class="countdown reveal" id="countdown" role="timer" style="--d:2100ms">' +
        '<p class="count-title">' + esc(A.compteTitre) + '</p>' +
        '<div class="count-grid" id="countGrid">' +
          ['jours', 'heures', 'minutes', 'secondes'].map(function (k) {
            return '<div class="count-cell"><b data-k="' + k + '">00</b><span>' + esc(A.libelles[k]) + '</span></div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<a class="scroll-hint" href="#histoire">' + esc(A.defiler) + '</a>' +
    '</section>';

  /* 2. Notre histoire */
  html += '' +
    '<section class="section" id="histoire"><div class="section-inner">' +
      '<span class="eyebrow reveal">' + esc(H.surtitre) + '</span>' +
      titleHTML('h2', 'title', H.titre) +
      '<div class="orn reveal"><i></i></div>' +
      '<div class="timeline" id="timeline">' +
        '<div class="tl-line"><i></i></div>' +
        H.etapes.map(function (e) {
          return '<div class="tl-item">' +
            '<div class="tl-node">' + (ICONS[e.icone] || ICONS.croix) + '</div>' +
            '<div class="tl-body"><h3>' + esc(e.titre) + '</h3><p>' + esc(e.texte) + '</p></div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div></section>';

  /* 3. Galerie */
  var depths = [0.09, -0.06, 0.07, -0.08, 0.06, -0.05, 0.08];
  html += '' +
    '<section class="section alt galerie" id="galerie">' +
      '<div class="head">' +
        '<span class="eyebrow reveal">' + esc(G.surtitre) + '</span>' +
        titleHTML('h2', 'title', G.titre) +
        '<div class="orn reveal"><i></i></div>' +
      '</div>' +
      '<div class="gal" id="gal">' +
        G.photos.map(function (p, i) {
          return '<figure class="ph ' + esc(p.format || 'portrait') + '" data-depth="' + depths[i % depths.length] + '" style="margin-top:0;margin-bottom:0">' +
            '<div class="ph-frame"><img src="' + esc(p.src) + '" alt="' + esc(p.alt || '') + '" loading="lazy" decoding="async"></div>' +
          '</figure>';
        }).join('') +
      '</div>' +
    '</section>';

  /* 4. Le programme */
  html += '' +
    '<section class="section" id="programme"><div class="section-inner">' +
      '<span class="eyebrow reveal">' + esc(P.surtitre) + '</span>' +
      titleHTML('h2', 'title', P.titre) +
      '<div class="orn reveal"><i></i></div>' +
      '<div class="prog">' +
        P.etapes.map(function (e, i) {
          var soft = /\d/.test(e.heure) ? '' : ' soft';
          return '<div class="pg reveal" style="--d:' + (i * 90) + 'ms">' +
            '<div class="pg-time' + soft + '">' + esc(e.heure) + '</div>' +
            '<div><h3>' + esc(e.titre) + '</h3><p>' + esc(e.lieu) + '</p></div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="sunday reveal">' +
        '<span class="eyebrow">' + esc(P.dimanche.jour) + '</span>' +
        '<h3>' + esc(P.dimanche.titre) + '</h3>' +
        '<p class="where">' + esc(P.dimanche.lieu) + '</p>' +
        '<p class="note">' + esc(P.dimanche.texte) + '</p>' +
      '</div>' +
    '</div></section>';

  /* 5. Le lieu de réception */
  html += '' +
    '<section class="section alt lieu" id="lieu"><div class="section-inner">' +
      '<span class="eyebrow reveal">' + esc(L.surtitre) + '</span>' +
      titleHTML('h2', 'title', L.titre) +
      '<div class="orn reveal"><i></i></div>' +
      '<div class="tabs reveal" role="tablist" id="tabs">' +
        L.lieux.map(function (l, i) {
          return '<button class="tab" role="tab" type="button" data-i="' + i + '" aria-selected="' + (i === 0) + '">' + esc(l.onglet) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="venue" id="venue">' +
        '<h3 id="vNom"></h3>' +
        '<p class="when" id="vQuand"></p>' +
        '<p class="addr" id="vAdresse"></p>' +
      '</div>' +
      '<div class="map reveal"><iframe id="mapFrame" title="Carte Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>' +
      '<a class="btn reveal" id="itineraire" href="#" target="_blank" rel="noopener">' + esc(L.boutonItineraire) + '</a>' +
    '</div></section>';

  /* 6. Tenue */
  html += '' +
    '<section class="section tenue" id="tenue"><div class="section-inner">' +
      '<span class="eyebrow reveal">' + esc(T.surtitre) + '</span>' +
      titleHTML('h2', 'title', T.titre) +
      '<div class="orn reveal"><i></i></div>' +
      '<p class="lead reveal">' + esc(T.texte) + '</p>' +
      '<div class="swatches">' +
        T.couleurs.map(function (c, i) {
          return '<div class="sw reveal" style="--d:' + (i * 160) + 'ms"><div class="sw-dot" style="--c:' + esc(c.hex) + '"></div><span>' + esc(c.nom) + '</span></div>';
        }).join('') +
      '</div>' +
      '<span class="badge reveal">' + esc(T.mention) + '</span>' +
      '<p class="note reveal">' + esc(T.note) + '</p>' +
    '</div></section>';

  /* 7. Confirmer ma présence */
  html += '' +
    '<section class="section alt rsvp" id="rsvp"><div class="section-inner">' +
      '<div class="card reveal">' +
        '<span class="eyebrow">' + esc(R.surtitre) + '</span>' +
        titleHTML('h2', 'title', R.titre) +
        '<div class="orn"><i></i></div>' +
        '<p class="lead">' + esc(R.texte) + '</p>' +
        '<a class="btn" href="' + esc(R.lien) + '" target="_blank" rel="noopener">' + esc(R.bouton) + '</a>' +
        '<div class="deadline"><small>' + esc(R.limiteLibelle) + '</small><strong>' + esc(R.dateLimite) + '</strong></div>' +
      '</div>' +
    '</div></section>';

  /* 8. Pied de page */
  html += '' +
    '<footer class="footer" id="pied">' +
      titleHTML('p', 'merci', F.merci) +
      '<div class="initials reveal">' + esc(C.initiales[0]) + '<em>&amp;</em>' + esc(C.initiales[1]) + '</div>' +
      '<p class="slogan reveal">' + esc(F.slogan) + '</p>' +
      '<p class="hashtag reveal">' + esc(F.hashtag) + '</p>' +
    '</footer>';

  $('#site').innerHTML = html;

  /* =====================================================================
     COMPTE À REBOURS
     ===================================================================== */
  var target = new Date(C.dateJourJ).getTime();
  var cells = {};
  $$('#countGrid b').forEach(function (b) { cells[b.getAttribute('data-k')] = b; });

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tick() {
    var diff = target - Date.now();
    if (isNaN(diff)) return;
    if (diff <= 0) {
      $('#countdown').innerHTML = '<p class="count-end">' + esc(A.compteFin) + '</p>';
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    cells.jours.textContent = pad(Math.floor(s / 86400));
    cells.heures.textContent = pad(Math.floor((s % 86400) / 3600));
    cells.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    cells.secondes.textContent = pad(s % 60);
  }
  var timer = setInterval(tick, 1000);
  tick();

  /* =====================================================================
     LIEUX + CARTE GOOGLE MAPS
     ===================================================================== */
  var frame = $('#mapFrame'), venue = $('#venue'), itin = $('#itineraire');

  function showLieu(i, animate) {
    var l = L.lieux[i];
    var q = encodeURIComponent(l.recherche);
    function apply() {
      $('#vNom').textContent = l.nom;
      $('#vQuand').textContent = l.quand;
      $('#vAdresse').textContent = l.adresse;
      frame.src = 'https://www.google.com/maps?q=' + q + '&hl=fr&z=16&output=embed';
      itin.href = 'https://www.google.com/maps/dir/?api=1&destination=' + q;
      venue.classList.remove('swap');
    }
    $$('.tab').forEach(function (t, k) { t.setAttribute('aria-selected', String(k === i)); });
    if (animate && !reduce) {
      venue.classList.add('swap');
      setTimeout(apply, 450);
    } else {
      apply();
    }
  }
  showLieu(0, false);
  $('#tabs').addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (b) showLieu(Number(b.getAttribute('data-i')), true);
  });

  /* =====================================================================
     DÉFILEMENT : parallaxe, frise, galerie
     ===================================================================== */
  var heroImg = $('#heroImg');
  var timeline = $('#timeline');
  var tlItems = $$('.tl-item', timeline);
  var figs = $$('.ph');
  var visibleFigs = new Set();
  var ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var y = window.pageYOffset;

    /* Photo d'accueil : léger décalage */
    if (heroImg && y < vh * 1.3) {
      heroImg.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
    }

    /* Frise qui se dessine */
    var r = timeline.getBoundingClientRect();
    var line = vh * 0.6;
    var p = clamp((line - r.top) / r.height, 0, 1);
    timeline.style.setProperty('--p', p.toFixed(4));
    tlItems.forEach(function (it) {
      var nodeY = it.offsetTop + 22;
      it.classList.toggle('on', p * r.height >= nodeY - 8);
    });

    /* Galerie : profondeur */
    visibleFigs.forEach(function (fig) {
      var fr = fig.getBoundingClientRect();
      var off = fr.top + fr.height / 2 - vh / 2;
      var d = parseFloat(fig.getAttribute('data-depth')) || 0;
      fig.style.transform = 'translate3d(0,' + (off * d).toFixed(1) + 'px,0)';
      var img = fig.querySelector('img');
      img.style.transform = 'translate3d(0,' + (off * -0.07).toFixed(1) + 'px,0) scale(1.2)';
    });
  }
  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  function startScroll() {
    if (reduce) {
      timeline.style.setProperty('--p', '1');
      tlItems.forEach(function (it) { it.classList.add('on'); });
      return;
    }
    if ('IntersectionObserver' in window) {
      var figObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) visibleFigs.add(en.target); else visibleFigs.delete(en.target);
        });
        requestUpdate();
      }, { rootMargin: '20% 0px' });
      figs.forEach(function (f) { figObs.observe(f); });
    }
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();
  }

  /* =====================================================================
     APPARITION DOUCE DES BLOCS
     ===================================================================== */
  function startReveal() {
    var items = $$('.reveal, .split');
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* =====================================================================
     OUVERTURE DE L'ENVELOPPE
     ===================================================================== */
  var intro = $('#intro');
  var openBtn = $('#openBtn');
  var opened = false;

  function revealSite() {
    document.body.classList.add('revealed');
    startReveal();
    startScroll();
  }
  function endIntro() {
    intro.parentNode && intro.parentNode.removeChild(intro);
    document.documentElement.classList.remove('locked');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    requestUpdate();
  }

  function openInvitation() {
    if (opened) return;
    opened = true;
    openBtn.disabled = true;

    if (reduce) {
      intro.classList.add('leaving');
      revealSite();
      endIntro();
      return;
    }
    intro.classList.add('open');                                   /* le rabat s'ouvre */
    setTimeout(function () { intro.classList.add('flap-back'); }, 520);
    setTimeout(function () { intro.classList.add('card-up'); }, 1000);   /* la carte sort */
    setTimeout(function () { intro.classList.add('leaving'); revealSite(); }, 2900); /* fondu vers le site */
    setTimeout(endIntro, 4900);
  }
  openBtn.addEventListener('click', openInvitation);

  /* Le bouton garde le focus clavier dès l'arrivée */
  try { openBtn.focus({ preventScroll: true }); } catch (e) { /* ignoré */ }
})();
