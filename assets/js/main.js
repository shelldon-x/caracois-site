/* Studio Caracóis — JS global seguro para navegação, modais, geolocalização, UX e tracking */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  const UNITS = [
    { id:'tatuape', name:'São Paulo — Tatuapé', city:'São Paulo', phone:'5511998980874', address:'Rua Manoel dos Santos, 70 — Vila Gomes Cardim', postal:'03318-040', ref:'Próximo ao Metrô Shopping Tatuapé', lat:-23.5389, lng:-46.5766, maps:'https://maps.app.goo.gl/rikzFumT3g2TfLNQ9', booking:'https://wa.me/5511998980874?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20Tatuapé.' },
    { id:'sjc', name:'São José dos Campos — Vila Adyana', city:'São José dos Campos', phone:'5512988636566', address:'Av. Paulo Becker, 310 — Loja 07', postal:'12243-610', ref:'Em frente à Padaria 9 de Julho', lat:-23.1896, lng:-45.8841, maps:'https://maps.app.goo.gl/oQhpMcut21hrSncu9', booking:'https://wa.me/5512988636566?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20São%20José%20dos%20Campos.' },
    { id:'aguas-claras', name:'Brasília — Águas Claras', city:'Brasília', phone:'5561993837705', address:'Av. Pau Brasil, 10 — Le Quartier, sala 1510', postal:'71926-000', ref:'Em frente ao Metrô Águas Claras', lat:-15.8394, lng:-48.0266, maps:'https://maps.app.goo.gl/jp9yMAhistUUCkDg6', booking:'https://wa.me/5561993837705?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20Águas%20Claras.' },
    { id:'asa-sul', name:'Brasília — Asa Sul', city:'Brasília', phone:'5561996942312', address:'CLS 411, Bloco B, Loja 20 — Asa Sul', postal:'70277-520', ref:'Plano Piloto', lat:-15.8196, lng:-47.9003, maps:'https://maps.app.goo.gl/vhw7aWZNtqqosijH8', booking:'https://caracois-brasilia-asa-sul.booksy.com/a/' },
    { id:'asa-norte', name:'Brasília — Asa Norte', city:'Brasília', phone:'5561995251477', address:'SCLN 715, Bloco A, Loja 59 — Asa Norte', postal:'70770-511', ref:'Plano Piloto', lat:-15.7478, lng:-47.8918, maps:'https://maps.app.goo.gl/RB7ZLSYmTKN3CEx28', booking:'https://wa.me/5561995251477?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20Asa%20Norte.' },
    { id:'taguatinga', name:'Brasília — Taguatinga', city:'Brasília', phone:'5561991446678', address:'Av. Comercial Norte, QND 2 Lote 11 Loja 01', postal:'72120-020', ref:'Taguatinga Norte', lat:-15.8311, lng:-48.0565, maps:'https://linktr.ee/studiocaracois', booking:'https://wa.me/5561991446678?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20Taguatinga.' },
    { id:'goiania', name:'Goiânia — Setor Bueno', city:'Goiânia', phone:'5562993411230', address:'Av. Mutirão, 1932 — Casablanca Center, Loja 4', postal:'74215-240', ref:'Setor Bueno', lat:-16.6990, lng:-49.2721, maps:'https://maps.app.goo.gl/omRQWSphCoc5syuA7', booking:'https://wa.me/5562993411230?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20Goiânia.' },
    { id:'recife', name:'Recife — Boa Viagem', city:'Recife', phone:'5581973056302', address:'Av. Conselheiro Aguiar, 1472 — Recife Trade Center, sala 42', postal:'51111-903', ref:'Boa Viagem', lat:-8.1058, lng:-34.8919, maps:'https://maps.app.goo.gl/G6gtbi2ApXVezo9D6', booking:'https://wa.me/5581973056302?text=Olá!%20Quero%20agendar%20uma%20avaliação%20no%20Studio%20Caracóis%20Recife.' }
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (str) => String(str || '').replace(/[&<>'"]/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params || {}); } catch (e) {}
    try { if (typeof window.clarity === 'function') window.clarity('event', name); } catch (e) {}
  }

  function setScrollLock(locked) {
    document.documentElement.classList.toggle('modal-open', locked);
    document.body.classList.toggle('modal-open', locked);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active', 'is-open', 'open');
    modal.setAttribute('aria-hidden', 'false');
    setScrollLock(true);
    const focusable = modal.querySelector('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 40);
    track('open_modal', { modal: id });
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active', 'is-open', 'open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.active[role="dialog"], .is-open[role="dialog"], .open[role="dialog"]')) setScrollLock(false);
  }

  function closeModalOnOverlay(event, id) {
    if (event && event.target && event.currentTarget === event.target) closeModal(id);
  }

  function openMobileMenu() {
    const menu = $('#mm');
    const overlay = $('#mobileOverlay');
    const toggle = $('.mobile-toggle');
    if (menu) { menu.classList.add('active', 'is-open', 'open'); menu.setAttribute('aria-hidden', 'false'); }
    if (overlay) overlay.classList.add('active', 'is-open', 'open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    setScrollLock(true);
  }

  function closeMobileMenu(unlock = true) {
    const menu = $('#mm');
    const overlay = $('#mobileOverlay');
    const toggle = $('.mobile-toggle');
    if (menu) { menu.classList.remove('active', 'is-open', 'open'); menu.setAttribute('aria-hidden', 'true'); }
    if (overlay) overlay.classList.remove('active', 'is-open', 'open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (unlock) setScrollLock(false);
  }

  function waLink(unit) {
    const msg = `Olá! Quero falar com o Studio Caracóis ${unit.name}.`;
    return `https://wa.me/${unit.phone}?text=${encodeURIComponent(msg)}`;
  }

  function renderUnits() {
    const waWrap = $('#waUnitItems');
    if (waWrap && !waWrap.dataset.rendered) {
      waWrap.innerHTML = UNITS.map((u) => `
        <a class="wa-unit-item" href="${waLink(u)}" target="_blank" rel="noopener noreferrer" data-unit="${esc(u.id)}">
          <div class="wa-unit-copy">
            <div class="wa-unit-name">${esc(u.name)}</div>
            <div class="wa-unit-meta">${esc(u.address)}</div>
            <div class="wa-unit-meta wa-unit-meta--muted">${esc(u.postal)}</div>
            <div class="wa-unit-meta wa-unit-meta--landmark">${esc(u.ref)}</div>
          </div>
        </a>`).join('');
      waWrap.dataset.rendered = 'true';
    }

    const bookingGrid = $('#bookingGrid');
    if (bookingGrid && !bookingGrid.dataset.rendered) {
      bookingGrid.innerHTML = UNITS.map((u) => `
        <a class="booking-card" href="${esc(u.booking || waLink(u))}" target="_blank" rel="noopener noreferrer" data-unit="${esc(u.id)}">
          <div class="booking-card-content">
            <div class="booking-card-name">${esc(u.name)}</div>
            <div class="booking-card-addr">${esc(u.address)}</div>
            <div class="booking-card-postal">${esc(u.postal)}</div>
            <div class="booking-card-ref">${esc(u.ref)}</div>
          </div>
        </a>`).join('');
      bookingGrid.dataset.rendered = 'true';
    }
  }

  function openWaModal() { renderUnits(); openModal('waModal'); }
  function openBooking() { renderUnits(); openModal('bookingModal'); }

  function distanceKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function nearestUnit(pos) {
    const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    return UNITS.map((u) => ({ ...u, distance: distanceKm(p, u) })).sort((a,b) => a.distance - b.distance)[0];
  }

  function fillNearest(prefix, unit, href) {
    const wrap = $(`#${prefix}NearestWrap`);
    const card = $(`#${prefix}NearestCard`);
    const name = $(`#${prefix}NearestName`);
    const addr = $(`#${prefix}NearestAddr`);
    const postal = $(`#${prefix}NearestPostal`);
    const ref = $(`#${prefix}NearestRef`);
    const dist = $(`#${prefix}NearestDist`);
    if (wrap) wrap.style.display = '';
    if (card) card.href = href;
    if (name) name.textContent = unit.name;
    if (addr) addr.textContent = unit.address;
    if (postal) postal.textContent = unit.postal;
    if (ref) { ref.textContent = unit.ref; ref.style.display = unit.ref ? '' : 'none'; }
    if (dist) dist.textContent = `Aproximadamente ${unit.distance.toFixed(1).replace('.', ',')} km de você`;
  }

  function findNearest() {
    if (!navigator.geolocation) return;
    const btn = $('#waGeoBtn');
    if (btn) btn.disabled = true;
    navigator.geolocation.getCurrentPosition((pos) => {
      const unit = nearestUnit(pos);
      fillNearest('wa', unit, waLink(unit));
      if (btn) btn.disabled = false;
      track('nearest_unit', { type: 'whatsapp', unit: unit.id });
    }, () => { if (btn) btn.disabled = false; }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
  }

  function findNearestBooking() {
    if (!navigator.geolocation) return;
    const btn = $('#bookingGeoBtn');
    const label = $('#bookingOtherLabel');
    if (btn) btn.disabled = true;
    navigator.geolocation.getCurrentPosition((pos) => {
      const unit = nearestUnit(pos);
      fillNearest('booking', unit, unit.booking || waLink(unit));
      if (label) label.style.display = '';
      if (btn) btn.disabled = false;
      track('nearest_unit', { type: 'booking', unit: unit.id });
    }, () => { if (btn) btn.disabled = false; }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
  }

  function initNav() {
    const nav = $('nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

  function initTracking() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a, button');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const cta = link.dataset.cta || link.textContent.trim().slice(0, 60);
      if (href.includes('wa.me') || href.includes('api.whatsapp.com')) track('click_whatsapp', { cta, href });
      if (href.includes('booksy.com') || href.includes('salao99.com.br')) track('click_booking', { cta, href });
      if (href.includes('instagram.com')) track('click_instagram', { cta, href });
      if (link.dataset.market) track('click_marketplace', { market: link.dataset.market, origin: link.dataset.origin || 'site' });
    });
  }

  function initEscClose() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      ['waModal','bookingModal','beeModal','productModal'].forEach(closeModal);
      closeMobileMenu();
      if (typeof window.closeBeeModal === 'function') window.closeBeeModal();
      if (typeof window.closeProductModal === 'function') window.closeProductModal();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderUnits();
    initNav();
    initReveal();
    initTracking();
    initEscClose();
  });

  window.openModal = openModal;
  window.closeModal = closeModal;
  window.closeModalOnOverlay = closeModalOnOverlay;
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.openWaModal = openWaModal;
  window.openBooking = openBooking;
  window.findNearest = findNearest;
  window.findNearestBooking = findNearestBooking;
  window.STUDIO_CARACOIS_UNITS = UNITS;
})();
