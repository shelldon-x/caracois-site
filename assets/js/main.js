/* Studio Caracóis — JS global seguro para navegação, modais, geolocalização, UX e tracking profissional */
(function () {
  'use strict';

  const BUILD_VERSION = '20260429-stability-patch-10-10';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  const UNITS = [
    { id:'tatuape', slug:'sao-paulo-tatuape', name:'São Paulo — Tatuapé', city:'São Paulo', phone:'5511998980874', address:'Rua Manoel dos Santos, 70 — Vila Gomes Cardim', postal:'03318-040', ref:'Próximo ao Metrô Shopping Tatuapé', lat:-23.5389, lng:-46.5766, maps:'https://maps.app.goo.gl/rikzFumT3g2TfLNQ9', booking:'/agendar/sao-paulo-tatuape' },
    { id:'sjc', slug:'sao-jose-dos-campos', name:'São José dos Campos — Vila Adyana', city:'São José dos Campos', phone:'5512988636566', address:'Av. Paulo Becker, 310 — Loja 07', postal:'12243-610', ref:'Em frente à Padaria 9 de Julho', lat:-23.1896, lng:-45.8841, maps:'https://maps.app.goo.gl/oQhpMcut21hrSncu9', booking:'/agendar/sao-jose-dos-campos' },
    { id:'aguas-claras', slug:'brasilia-aguas-claras', name:'Brasília — Águas Claras', city:'Brasília', phone:'5561993837705', address:'Av. Pau Brasil, 10 — Le Quartier, sala 1510', postal:'71926-000', ref:'Em frente ao Metrô Águas Claras', lat:-15.8394, lng:-48.0266, maps:'https://maps.app.goo.gl/jp9yMAhistUUCkDg6', booking:'/agendar/brasilia-aguas-claras' },
    { id:'asa-sul', slug:'brasilia-asa-sul', name:'Brasília — Asa Sul', city:'Brasília', phone:'5561996942312', address:'CLS 411, Bloco B, Loja 20 — Asa Sul', postal:'70277-520', ref:'Plano Piloto', lat:-15.8196, lng:-47.9003, maps:'https://maps.app.goo.gl/vhw7aWZNtqqosijH8', booking:'/agendar/brasilia-asa-sul' },
    { id:'asa-norte', slug:'brasilia-asa-norte', name:'Brasília — Asa Norte', city:'Brasília', phone:'5561995251477', address:'SCLN 715, Bloco A, Loja 59 — Asa Norte', postal:'70770-511', ref:'Plano Piloto', lat:-15.7478, lng:-47.8918, maps:'https://maps.app.goo.gl/RB7ZLSYmTKN3CEx28', booking:'/agendar/brasilia-asa-norte' },
    { id:'taguatinga', slug:'brasilia-taguatinga', name:'Brasília — Taguatinga', city:'Brasília', phone:'5561991446678', address:'Av. Comercial Norte, QND 2 Lote 11 Loja 01', postal:'72120-020', ref:'Taguatinga Norte', lat:-15.8311, lng:-48.0565, maps:'https://linktr.ee/studiocaracois', booking:'/agendar/brasilia-taguatinga' },
    { id:'goiania', slug:'goiania', name:'Goiânia — Setor Bueno', city:'Goiânia', phone:'5562993411230', address:'Av. Mutirão, 1932 — Casablanca Center, Loja 4', postal:'74215-240', ref:'Setor Bueno', lat:-16.6990, lng:-49.2721, maps:'https://maps.app.goo.gl/omRQWSphCoc5syuA7', booking:'/agendar/goiania' },
    { id:'recife', slug:'recife', name:'Recife — Boa Viagem', city:'Recife', phone:'5581973056302', address:'Av. Conselheiro Aguiar, 1472 — Recife Trade Center, sala 42', postal:'51111-903', ref:'Boa Viagem', lat:-8.1058, lng:-34.8919, maps:'https://maps.app.goo.gl/G6gtbi2ApXVezo9D6', booking:'/agendar/recife' }
  ];

  const UNIT_BY_ID = UNITS.reduce((acc, u) => { acc[u.id] = u; acc[u.slug] = u; return acc; }, {});
  const ATTR_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid','fbclid','msclkid'];
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (str) => String(str || '').replace(/[&<>'"]/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function safeUrl(href) {
    try { return new URL(href, window.location.origin); } catch (e) { return null; }
  }

  function getParamsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const out = {};
    ATTR_KEYS.forEach((key) => { if (params.get(key)) out[key] = params.get(key); });
    return out;
  }

  function storageGet(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function inferReferrerSource() {
    const ref = document.referrer || '';
    if (!ref) return { source: 'direct', medium: 'none' };
    try {
      const host = new URL(ref).hostname.replace(/^www\./, '');
      if (host.includes('google.')) return { source: 'google', medium: 'organic' };
      if (host.includes('bing.')) return { source: 'bing', medium: 'organic' };
      if (host.includes('instagram.')) return { source: 'instagram', medium: 'social' };
      if (host.includes('facebook.') || host.includes('fb.')) return { source: 'facebook', medium: 'social' };
      if (host.includes('tiktok.')) return { source: 'tiktok', medium: 'social' };
      if (host.includes('whatsapp.')) return { source: 'whatsapp', medium: 'referral' };
      return { source: host, medium: 'referral' };
    } catch (e) {
      return { source: 'referral', medium: 'referral' };
    }
  }

  function initAttribution() {
    const urlAttrs = getParamsFromUrl();
    const ref = inferReferrerSource();
    const now = new Date().toISOString();
    const current = {
      source: urlAttrs.utm_source || ref.source,
      medium: urlAttrs.utm_medium || ref.medium,
      campaign: urlAttrs.utm_campaign || '',
      content: urlAttrs.utm_content || '',
      term: urlAttrs.utm_term || '',
      gclid: urlAttrs.gclid || '',
      fbclid: urlAttrs.fbclid || '',
      msclkid: urlAttrs.msclkid || '',
      landing_page: window.location.pathname,
      captured_at: now
    };
    const first = storageGet('sc_first_touch', null);
    if (!first) storageSet('sc_first_touch', current);
    storageSet('sc_last_touch', current);
    return { first: first || current, last: current };
  }

  const ATTRIBUTION = initAttribution();

  function getAttributionPayload() {
    const first = storageGet('sc_first_touch', ATTRIBUTION.first) || {};
    const last = storageGet('sc_last_touch', ATTRIBUTION.last) || {};
    return {
      source: last.source || '',
      medium: last.medium || '',
      campaign: last.campaign || '',
      content: last.content || '',
      term: last.term || '',
      first_source: first.source || '',
      first_medium: first.medium || '',
      first_campaign: first.campaign || '',
      landing_page: first.landing_page || '',
      page_path: window.location.pathname,
      page_title: document.title || ''
    };
  }

  function inferUnitFromText(text) {
    const t = String(text || '').toLowerCase();
    if (t.includes('asa sul')) return 'asa-sul';
    if (t.includes('asa norte')) return 'asa-norte';
    if (t.includes('águas claras') || t.includes('aguas claras')) return 'aguas-claras';
    if (t.includes('taguatinga')) return 'taguatinga';
    if (t.includes('tatuapé') || t.includes('tatuape')) return 'tatuape';
    if (t.includes('são josé') || t.includes('sao jose') || t.includes('sjc')) return 'sjc';
    if (t.includes('goiânia') || t.includes('goiania')) return 'goiania';
    if (t.includes('recife') || t.includes('boa viagem')) return 'recife';
    return '';
  }

  function inferUnitFromHref(href) {
    const h = decodeURIComponent(String(href || '')).toLowerCase();
    for (const u of UNITS) {
      if (h.includes(u.slug) || h.includes(u.id) || h.includes(u.phone)) return u.id;
    }
    return inferUnitFromText(h);
  }

  function inferUnit(link, href) {
    return link.dataset.unit || link.dataset.unidade || inferUnitFromHref(href) || inferUnitFromText(link.textContent) || inferUnitFromHref(window.location.pathname);
  }

  function destinationHost(href) {
    const u = safeUrl(href);
    return u ? u.hostname.replace(/^www\./, '') : '';
  }

  function cleanPayload(payload) {
    const out = {};
    Object.entries(payload || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') out[key] = String(value).slice(0, 120);
    });
    return out;
  }

  function track(name, params) {
    const payload = cleanPayload({ build_version: BUILD_VERSION, ...getAttributionPayload(), ...(params || {}) });
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, {
          ...payload,
          event_category: payload.channel || payload.category || 'engagement',
          transport_type: 'beacon'
        });
      }
    } catch (e) {}
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', name, {
          content_name: payload.cta || name,
          content_category: payload.channel || payload.category || 'engagement',
          unidade: payload.unidade || '',
          source: payload.source || '',
          medium: payload.medium || '',
          campaign: payload.campaign || ''
        });
      }
    } catch (e) {}
    try {
      if (typeof window.clarity === 'function') {
        window.clarity('event', name);
        ['unidade','channel','source','medium','campaign'].forEach((key) => {
          if (payload[key]) window.clarity('set', key, payload[key]);
        });
      }
    } catch (e) {}
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  }

  function appendAttributionToBookingLinks() {
    const current = getParamsFromUrl();
    const last = storageGet('sc_last_touch', ATTRIBUTION.last) || {};
    const paramsToForward = new URLSearchParams();
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid','msclkid'].forEach((key) => {
      const normalized = key.replace('utm_', '');
      const value = current[key] || last[normalized] || last[key] || '';
      if (value) paramsToForward.set(key, value);
    });
    if (!paramsToForward.toString()) return;

    $$('a[href*="/agendar/"]').forEach((link) => {
      const url = safeUrl(link.getAttribute('href'));
      if (!url || url.origin !== window.location.origin) return;
      paramsToForward.forEach((value, key) => { if (!url.searchParams.has(key)) url.searchParams.set(key, value); });
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
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
    track('modal_open', { channel: 'modal', modal_id: id });
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
    track('mobile_menu_open', { channel: 'navigation' });
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

  function getHumanOrigin() {
    const a = getAttributionPayload();
    if (a.source && a.medium && a.source !== 'direct') return `${a.source}/${a.medium}`;
    if (a.source) return a.source;
    return 'site';
  }

  function waMessage(unit) {
    const origin = getHumanOrigin();
    return `Olá! Vim pelo site do Studio Caracóis (origem: ${origin}) — ${unit.name} e quero atendimento/agendamento.`;
  }

  function waLink(unit) {
    return `https://wa.me/${unit.phone}?text=${encodeURIComponent(waMessage(unit))}`;
  }

  function enhanceWhatsAppLinks() {
    $$('a[href*="wa.me/"], a[href*="api.whatsapp.com/send"]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const unidade = inferUnit(link, href);
      const unit = UNIT_BY_ID[unidade];
      if (!unit) return;
      const url = safeUrl(href);
      if (!url) return;
      if (url.hostname.includes('wa.me')) {
        url.pathname = `/${unit.phone}`;
        url.searchParams.set('text', waMessage(unit));
        link.setAttribute('href', url.toString());
      } else if (url.hostname.includes('whatsapp.com')) {
        url.searchParams.set('phone', unit.phone);
        url.searchParams.set('text', waMessage(unit));
        link.setAttribute('href', url.toString());
      }
      link.dataset.unit = link.dataset.unit || unit.id;
      link.dataset.unitSlug = link.dataset.unitSlug || unit.slug;
      link.dataset.channel = link.dataset.channel || 'whatsapp';
      link.dataset.cta = link.dataset.cta || 'whatsapp_unidade';
    });
  }

  function renderUnits() {
    const waWrap = $('#waUnitItems');
    if (waWrap && !waWrap.dataset.rendered) {
      waWrap.innerHTML = UNITS.map((u) => `
        <a class="wa-unit-item" href="${waLink(u)}" target="_blank" rel="noopener noreferrer" data-cta="whatsapp_unidade" data-channel="whatsapp" data-unit="${esc(u.id)}" data-unit-slug="${esc(u.slug)}">
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
    if (bookingGrid) {
      // Re-render sempre ao abrir para impedir links antigos em cache/HTML legado.
      bookingGrid.innerHTML = UNITS.map((u) => `
        <a class="booking-card" href="${esc(u.booking || ('/agendar/' + u.slug))}" data-cta="agendar_unidade" data-channel="booking" data-unit="${esc(u.id)}" data-unit-slug="${esc(u.slug)}">
          <div class="booking-card-content">
            <div class="booking-card-name">${esc(u.name)}</div>
            <div class="booking-card-addr">${esc(u.address)}</div>
            <div class="booking-card-postal">${esc(u.postal)}</div>
            <div class="booking-card-ref">${esc(u.ref)}</div>
          </div>
        </a>`).join('');
      bookingGrid.dataset.rendered = 'true';
    }
    appendAttributionToBookingLinks();
    enhanceWhatsAppLinks();
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
    if (card) {
      card.href = href;
      card.dataset.unit = unit.id;
      card.dataset.unitSlug = unit.slug;
      card.dataset.cta = prefix === 'booking' ? 'agendar_unidade_mais_proxima' : 'whatsapp_unidade_mais_proxima';
      card.dataset.channel = prefix === 'booking' ? 'booking' : 'whatsapp';
    }
    if (name) name.textContent = unit.name;
    if (addr) addr.textContent = unit.address;
    if (postal) postal.textContent = unit.postal;
    if (ref) { ref.textContent = unit.ref; ref.style.display = unit.ref ? '' : 'none'; }
    if (dist) dist.textContent = `Aproximadamente ${unit.distance.toFixed(1).replace('.', ',')} km de você`;
    appendAttributionToBookingLinks();
  }

  function findNearest() {
    if (!navigator.geolocation) return;
    const btn = $('#waGeoBtn');
    if (btn) btn.disabled = true;
    navigator.geolocation.getCurrentPosition((pos) => {
      const unit = nearestUnit(pos);
      fillNearest('wa', unit, waLink(unit));
      if (btn) btn.disabled = false;
      track('nearest_unit_found', { channel: 'whatsapp', unidade: unit.id, unit_slug: unit.slug, distance_km: unit.distance.toFixed(1) });
    }, () => {
      if (btn) btn.disabled = false;
      track('nearest_unit_error', { channel: 'whatsapp' });
    }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
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
      track('nearest_unit_found', { channel: 'booking', unidade: unit.id, unit_slug: unit.slug, distance_km: unit.distance.toFixed(1) });
    }, () => {
      if (btn) btn.disabled = false;
      track('nearest_unit_error', { channel: 'booking' });
    }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
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

  function classifyClick(link, href, onclickText) {
    const combined = `${href || ''} ${onclickText || ''}`.toLowerCase();
    if (combined.includes('/agendar/') || combined.includes('booksy.com') || combined.includes('salao99.com.br')) return { event: 'booking_click', cta_type: 'agendar', channel: 'booking' };
    if (combined.includes('wa.me') || combined.includes('api.whatsapp.com')) return { event: 'whatsapp_click', cta_type: 'whatsapp', channel: 'whatsapp' };
    if (combined.includes('maps.app.goo.gl') || combined.includes('google.com/maps')) return { event: 'map_click', cta_type: 'mapa', channel: 'maps' };
    if (combined.startsWith('tel:') || combined.includes('tel:')) return { event: 'phone_click', cta_type: 'telefone', channel: 'phone' };
    if (combined.includes('instagram.com')) return { event: 'instagram_click', cta_type: 'instagram', channel: 'social' };
    if (combined.includes('tiktok.com')) return { event: 'tiktok_click', cta_type: 'tiktok', channel: 'social' };
    if (link.dataset.market || combined.includes('amazon.com.br') || combined.includes('shopee.com.br') || combined.includes('mercadolivre.com.br')) return { event: 'marketplace_click', cta_type: 'marketplace', channel: 'marketplace' };
    const url = safeUrl(href);
    if (url && url.origin !== window.location.origin) return { event: 'outbound_click', cta_type: 'outbound', channel: 'outbound' };
    return null;
  }

  function initTracking() {
    appendAttributionToBookingLinks();
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a, button');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const onclickText = link.getAttribute('onclick') || '';
      const classification = classifyClick(link, href, onclickText);
      if (!classification) return;
      const cta = link.dataset.cta || link.getAttribute('aria-label') || link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80) || classification.event;
      const unidade = inferUnit(link, `${href} ${onclickText}`);
      const unit = UNIT_BY_ID[unidade] || null;
      const payload = {
        channel: link.dataset.channel || classification.channel,
        cta_type: link.dataset.ctaType || classification.cta_type,
        cta,
        unidade,
        unit_slug: unit ? unit.slug : '',
        destination_host: destinationHost(href || onclickText),
        destination_url_type: href && href.startsWith('/') ? 'internal_agendar_page' : 'external',
        market: link.dataset.market || '',
        origin: link.dataset.origin || '',
        link_text: link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80)
      };
      track('cta_click', payload);
      track(classification.event, payload);
    }, { capture: true });
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
    appendAttributionToBookingLinks();
    enhanceWhatsAppLinks();
    initNav();
    initReveal();
    initTracking();
    initEscClose();
  });


  // Defesa extra: qualquer card/link do modal de agendamento deve sempre seguir /agendar/<slug>.
  document.addEventListener('click', function(event) {
    const card = event.target.closest && event.target.closest('#bookingUnitItems a.booking-card[data-unit-slug], #bookingGrid a.booking-card[data-unit-slug]');
    if (!card) return;
    const slug = card.dataset.unitSlug;
    if (slug && !card.getAttribute('href').includes('/agendar/')) {
      card.setAttribute('href', '/agendar/' + slug);
    }
  }, true);

  window.openModal = openModal;
  window.closeModal = closeModal;
  window.closeModalOnOverlay = closeModalOnOverlay;
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.openWaModal = openWaModal;
  window.openBooking = openBooking;
  window.findNearest = findNearest;
  window.findNearestBooking = findNearestBooking;
  window.scTrack = track;
  window.STUDIO_CARACOIS_UNITS = UNITS;
})();
