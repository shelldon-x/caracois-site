/* =========================
   STATE & CONFIG
========================= */
let lastScrollY = 0;
let lastFocusedElement = null;
let activeTrapCleanup = null;

const STUDIO_UNITS = [
    {
        slug: 'tatuape',
        city: 'São Paulo',
        state: 'SP',
        label: 'São Paulo — Tatuapé',
        neighborhood: 'Vila Gomes Cardim',
        address: 'Rua Manoel dos Santos 70, Casa',
        postal: '03318-040',
        landmark: 'Próximo ao Metrô Shopping Tatuapé',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-tatuape',
        whatsappUrl: 'https://wa.me/5511998980874?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20na%20unidade%20Tatuapé.',
        lat: -23.5389,
        lng: -46.5766
    },
    {
        slug: 'sjc',
        city: 'São José dos Campos',
        state: 'SP',
        label: 'São José dos Campos — Vila Adyana',
        neighborhood: 'Vila Adyana',
        address: 'Avenida Paulo Becker 310, Boulevard 9 de Julho, Loja 07',
        postal: '12243-610',
        landmark: 'Em frente à Padaria 9 de Julho',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-sjc',
        whatsappUrl: 'https://wa.me/5512988636566?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20em%20São%20José%20dos%20Campos.',
        lat: -23.1896,
        lng: -45.8841
    },
    {
        slug: 'aguas-claras',
        city: 'Brasília',
        state: 'DF',
        label: 'Brasília — Águas Claras',
        neighborhood: 'Águas Claras',
        address: 'Avenida Pau Brasil 10, Le Quartier Águas Claras, Sala 1510',
        postal: '71926-000',
        landmark: 'Em frente ao Metrô Estação Águas Claras',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-aguas-claras',
        whatsappUrl: 'https://wa.me/5561993837705?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20em%20Águas%20Claras.',
        lat: -15.8394,
        lng: -48.0266
    },
    {
        slug: 'asa-sul',
        city: 'Brasília',
        state: 'DF',
        label: 'Brasília — Asa Sul',
        neighborhood: 'Asa Sul',
        address: 'CLS 411, Bloco B, Loja 20',
        postal: '70277-520',
        landmark: '',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-asa-sul',
        whatsappUrl: 'https://wa.me/5561996942312?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20na%20Asa%20Sul.',
        lat: -15.8267,
        lng: -47.9218
    },
    {
        slug: 'asa-norte',
        city: 'Brasília',
        state: 'DF',
        label: 'Brasília — Asa Norte',
        neighborhood: 'Asa Norte',
        address: 'SCLN 715, Bloco A, Loja 59',
        postal: '70770-511',
        landmark: '',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-asa-norte',
        whatsappUrl: 'https://wa.me/5561995251477?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20na%20Asa%20Norte.',
        lat: -15.7467,
        lng: -47.8826
    },
    {
        slug: 'taguatinga',
        city: 'Brasília',
        state: 'DF',
        label: 'Brasília — Taguatinga Norte',
        neighborhood: 'Taguatinga Norte',
        address: 'Avenida Comercial Norte, QND 2 Lote 11 Loja 01',
        postal: '72120-020',
        landmark: '',
        bookingUrl: 'https://linktr.ee/studiocaracois',
        whatsappUrl: 'https://wa.me/5561991446678?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20em%20Taguatinga.',
        lat: -15.8362,
        lng: -48.0558
    },
    {
        slug: 'goiania',
        city: 'Goiânia',
        state: 'GO',
        label: 'Goiânia — Setor Bueno',
        neighborhood: 'Setor Bueno',
        address: 'Avenida Mutirão 1932, Casablanca Center, Loja 4, Bloco B',
        postal: '74215-240',
        landmark: '',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-goiania',
        whatsappUrl: 'https://wa.me/5562993411230?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20em%20Goiânia.',
        lat: -16.7139,
        lng: -49.2537
    },
    {
        slug: 'recife',
        city: 'Recife',
        state: 'PE',
        label: 'Recife — Boa Viagem',
        neighborhood: 'Boa Viagem',
        address: 'Avenida Conselheiro Aguiar 1472, Recife Trade Center, Sala 42',
        postal: '51111-903',
        landmark: '',
        bookingUrl: 'https://www.salao99.com.br/studio-caracois-especialistas-em-cachos-recife',
        whatsappUrl: 'https://wa.me/5581973056302?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita%20em%20Recife.',
        lat: -8.1204,
        lng: -34.9013
    }
];

/* =========================
   UTILITIES
========================= */
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function unitRegionText(unit) {
    return unit.city + ' - ' + unit.state;
}

function createWaUnitMarkup(unit) {
    return (
        '<a href="' + escapeHtml(unit.whatsappUrl) + '" target="_blank" rel="noopener" class="wa-unit-item" data-lat="' + unit.lat + '" data-lng="' + unit.lng + '" data-unit-slug="' + escapeHtml(unit.slug) + '">' +
            '<div class="wa-unit-copy">' +
                '<div class="wa-unit-name">' + escapeHtml(unit.label) + '</div>' +
                '<div class="wa-unit-meta">' + escapeHtml(unit.address) + '</div>' +
                '<div class="wa-unit-meta wa-unit-meta--muted">' + escapeHtml(unitRegionText(unit) + ' • CEP ' + unit.postal) + '</div>' +
                (unit.landmark ? '<div class="wa-unit-meta wa-unit-meta--landmark">📍 ' + escapeHtml(unit.landmark) + '</div>' : '') +
                '<div class="wa-unit-distance"></div>' +
            '</div>' +
            '<svg width="18" height="18" aria-hidden="true"><use href="#i-arrow"></use></svg>' +
        '</a>'
    );
}

function createBookingUnitMarkup(unit) {
    return (
        '<a href="' + escapeHtml(unit.bookingUrl) + '" target="_blank" rel="noopener noreferrer" class="booking-card" data-lat="' + unit.lat + '" data-lng="' + unit.lng + '" data-unit-slug="' + escapeHtml(unit.slug) + '">' +
            '<div class="booking-card-name">' + escapeHtml(unit.label) + '</div>' +
            '<div class="booking-card-addr">' + escapeHtml(unit.address) + '</div>' +
            '<div class="booking-card-postal">' + escapeHtml(unitRegionText(unit) + ' • CEP ' + unit.postal) + '</div>' +
            (unit.landmark ? '<div class="booking-card-ref">📍 ' + escapeHtml(unit.landmark) + '</div>' : '') +
        '</a>'
    );
}

function renderUnitModals() {
    const waContainer = document.getElementById('waUnitItems');
    if (waContainer) {
        waContainer.innerHTML = STUDIO_UNITS.map(createWaUnitMarkup).join('');
    }

    const bookingGrid = document.getElementById('bookingGrid');
    if (bookingGrid) {
        bookingGrid.innerHTML = STUDIO_UNITS.map(createBookingUnitMarkup).join('');
    }
}

/* =========================
   SCROLL LOCK
========================= */
function lockScroll() {
    if (document.body.classList.contains('ui-locked')) return;
    lastScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.classList.add('ui-locked');
    document.documentElement.style.scrollBehavior = 'auto';
}

function unlockScroll() {
    const anyOpen = document.querySelector(
        '.wa-modal-overlay.open, .booking-overlay.open, .bee-modal-overlay.open, .product-modal-overlay.open, .mobile-menu.open, .mobile-overlay.open'
    );
    if (anyOpen) return;

    document.body.classList.remove('ui-locked');
    document.documentElement.style.scrollBehavior = '';
}

/* =========================
   FOCUS TRAP
========================= */
function trapFocus(container) {
    if (!container) return function() {};

    const selectors = [
        'a[href]', 'button:not([disabled])', 'input:not([disabled])',
        'select:not([disabled])', 'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function getFocusable() {
        return Array.prototype.slice.call(container.querySelectorAll(selectors))
            .filter(function(el) { return el.offsetParent !== null || el === document.activeElement; });
    }

    function onKeyDown(e) {
        if (e.key !== 'Tab') return;
        const focusable = getFocusable();
        if (!focusable.length) return;
        let first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first || !container.contains(document.activeElement)) {
                e.preventDefault(); last.focus();
            }
        } else {
            if (document.activeElement === last || !container.contains(document.activeElement)) {
                e.preventDefault(); first.focus();
            }
        }
    }

    container.addEventListener('keydown', onKeyDown);
    return function cleanup() { container.removeEventListener('keydown', onKeyDown); };
}

function activateFocusTrap(container) {
    if (typeof activeTrapCleanup === 'function') { activeTrapCleanup(); activeTrapCleanup = null; }
    activeTrapCleanup = trapFocus(container);
}

function clearFocusTrap() {
    if (typeof activeTrapCleanup === 'function') { activeTrapCleanup(); activeTrapCleanup = null; }
}

/* =========================
   HELPERS
========================= */
function getFocusableFirst(container) {
    if (!container) return null;
    return container.querySelector(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
}

function resetGeoButton(btnId, textId, defaultText) {
    let btn = document.getElementById(btnId);
    const txt = document.getElementById(textId);
    if (!btn || !txt) return;
    btn.disabled = false;
    btn.style.background = '';
    btn.style.color = '';
    txt.textContent = defaultText;
}

/* =========================
   MODAL CORE
========================= */
class ModalManager {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.id = modalId;
    }

    open() {
        if (!this.modal) return;
        closeAllOverlaysSilently();
        lastFocusedElement = document.activeElement;
        this.modal.classList.add('open');
        this.modal.setAttribute('aria-hidden', 'false');
        lockScroll();
        activateFocusTrap(this.modal);

        setTimeout(() => {
            let first = getFocusableFirst(this.modal);
            if (first) first.focus();
        }, 50);
    }

    close() {
        if (!this.modal || !this.modal.classList.contains('open')) return;
        this.modal.classList.remove('open');
        this.modal.setAttribute('aria-hidden', 'true');
        clearFocusTrap();
        unlockScroll();

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            setTimeout(() => { lastFocusedElement.focus(); }, 30);
        }
    }

    closeOnOverlay(e) {
        if (e.target === this.modal) this.close();
    }
}

const waModal = new ModalManager('waModal');
const bookingModal = new ModalManager('bookingModal');
const beeModal = new ModalManager('beeModal');

function closeAllOverlaysSilently() {
    [waModal, bookingModal, beeModal].forEach(m => { if (m.modal) { m.modal.classList.remove('open'); m.modal.setAttribute('aria-hidden', 'true'); } });
    const mm = document.getElementById('mm');
    const mobileOverlay = document.getElementById('mobileOverlay');
    let toggle = document.querySelector('.mobile-toggle');

    if (mm) { mm.classList.remove('open'); mm.setAttribute('aria-hidden', 'true'); }
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');

    clearFocusTrap();
    unlockScroll();
}

function openModal(id) {
    if (id === 'waModal') waModal.open();
    else if (id === 'bookingModal') bookingModal.open();
    else if (id === 'beeModal') beeModal.open();
}

function closeModal(id) {
    if (id === 'waModal') waModal.close();
    else if (id === 'bookingModal') bookingModal.close();
    else if (id === 'beeModal') beeModal.close();
}

function closeModalOnOverlay(e, id) {
    if (id === 'waModal') waModal.closeOnOverlay(e);
    else if (id === 'bookingModal') bookingModal.closeOnOverlay(e);
}

/* =========================
   MOBILE MENU
========================= */
function openMobileMenu() {
    closeAllOverlaysSilently();
    let menu = document.getElementById('mm');
    let overlay = document.getElementById('mobileOverlay');
    let toggle = document.querySelector('.mobile-toggle');
    if (!menu || !overlay || !toggle) return;

    lastFocusedElement = document.activeElement;
    menu.classList.add('open');
    overlay.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    lockScroll();
    activateFocusTrap(menu);

    setTimeout(() => {
        let first = getFocusableFirst(menu);
        if (first) first.focus();
    }, 50);
}

function closeMobileMenu(restoreFocus = true) {
    let menu = document.getElementById('mm');
    let overlay = document.getElementById('mobileOverlay');
    let toggle = document.querySelector('.mobile-toggle');
    if (!menu || !menu.classList.contains('open')) return;

    menu.classList.remove('open');
    overlay.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    clearFocusTrap();
    unlockScroll();

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        setTimeout(() => { lastFocusedElement.focus(); }, 30);
    }
}

/* =========================
   GEO HELPERS
========================= */
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(km) {
    return km < 1 ? Math.round(km * 1000) + ' m' : km.toFixed(1) + ' km';
}

function getNearestUnits(userLat, userLng, elements) {
    const arr = [];
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const lat = parseFloat(el.dataset.lat);
        const lng = parseFloat(el.dataset.lng);
        if (!isNaN(lat) && !isNaN(lng)) arr.push({ el: el, dist: haversine(userLat, userLng, lat, lng) });
    }
    arr.sort((a, b) => a.dist - b.dist);
    return arr;
}

/* =========================
   SPECIFIC MODAL OPENERS
========================= */
function openWaModal() {
    resetGeoButton('waGeoBtn', 'geoBtnText', 'Usar minha localização');
    const wrap = document.getElementById('waNearestWrap');
    const label = document.getElementById('waOtherLabel');
    if (wrap) wrap.style.display = 'none';
    if (label) label.style.display = 'none';
    ['waNearestName', 'waNearestAddr', 'waNearestPostal', 'waNearestDist', 'waNearestRef'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = '';
        if (id === 'waNearestRef') el.style.display = 'none';
    });
    document.querySelectorAll('#waUnitItems .wa-unit-item').forEach(item => {
        item.classList.remove('nearest');
        const dist = item.querySelector('.wa-unit-distance');
        if (dist) {
            dist.textContent = '';
            dist.style.display = 'none';
        }
    });
    waModal.open();
}

function openBooking() {
    resetGeoButton('bookingGeoBtn', 'bookingGeoBtnText', 'Encontrar unidade mais próxima');
    let wrap = document.getElementById('bookingNearestWrap');
    const label = document.getElementById('bookingOtherLabel');
    if (wrap) wrap.style.display = 'none';
    if (label) label.style.display = 'none';
    ['bookingNearestName', 'bookingNearestAddr', 'bookingNearestPostal', 'bookingNearestDist', 'bookingNearestRef'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = '';
        if (id === 'bookingNearestRef') el.style.display = 'none';
    });
    document.querySelectorAll('#bookingModal .booking-card-dist').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    bookingModal.open();
}

function openBeeModal() {
    beeModal.open();
}

function closeBeeModal() {
    beeModal.close();
}

function closeBeeModalOnOverlay(e) {
    beeModal.closeOnOverlay(e);
}

/* =========================
   GEO - WA MODAL
========================= */
function findNearest() {
    let btn = document.getElementById('waGeoBtn');
    let btnText = document.getElementById('geoBtnText');

    if (!navigator.geolocation) {
        btnText.textContent = 'Localização não disponível neste navegador';
        return;
    }

    btn.disabled = true;
    btnText.innerHTML = '<span class="spinner"></span> Localizando...';

    try {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                const items = document.querySelectorAll('#waUnitItems .wa-unit-item');
                let sorted = getNearestUnits(pos.coords.latitude, pos.coords.longitude, items);

                if (sorted.length > 0) {
                    let n = sorted[0];
                    let wrap = document.getElementById('waNearestWrap');
                    const card = document.getElementById('waNearestCard');
                    const unit = STUDIO_UNITS.find(u => u.slug === n.el.getAttribute('data-unit-slug'));

                    if (card) card.setAttribute('href', n.el.getAttribute('href'));
                    document.getElementById('waNearestName').textContent = n.el.querySelector('.wa-unit-name').textContent;
                    document.getElementById('waNearestAddr').textContent = n.el.querySelector('.wa-unit-meta').textContent;
                    document.getElementById('waNearestPostal').textContent = unit ? (unitRegionText(unit) + ' • CEP ' + unit.postal) : '';
                    document.getElementById('waNearestDist').textContent = '≈ ' + formatDist(n.dist) + ' de você';
                    const nearestRef = document.getElementById('waNearestRef');
                    if (nearestRef) {
                        if (unit && unit.landmark) {
                            nearestRef.textContent = '📍 ' + unit.landmark;
                            nearestRef.style.display = 'block';
                        } else {
                            nearestRef.textContent = '';
                            nearestRef.style.display = 'none';
                        }
                    }

                    if (wrap) wrap.style.display = 'block';
                    const otherLabel = document.getElementById('waOtherLabel');
                    if (otherLabel) otherLabel.style.display = 'block';
                    btnText.textContent = '✓ Encontramos a unidade mais próxima';
                    btn.disabled = false;

                    sorted.forEach(entry => {
                        entry.el.classList.remove('nearest');
                        const dist = entry.el.querySelector('.wa-unit-distance');
                        if (dist) {
                            dist.textContent = '≈ ' + formatDist(entry.dist) + ' de você';
                            dist.style.display = 'block';
                        }
                    });
                }
            },
            function() {
                btnText.textContent = 'Localização indisponível — escolha manualmente abaixo';
                btn.disabled = false;
            },
            { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
        );
    } catch(e) {
        btnText.textContent = 'Erro ao localizar';
        btn.disabled = false;
    }
}

/* =========================
   GEO - BOOKING MODAL
========================= */
function findNearestBooking() {
    let btn = document.getElementById('bookingGeoBtn');
    let btnText = document.getElementById('bookingGeoBtnText');

    if (!navigator.geolocation) {
        btnText.textContent = 'Localização não disponível neste navegador';
        return;
    }

    btn.disabled = true;
    btnText.innerHTML = '<span class="spinner"></span> Localizando...';

    try {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                const cards = document.querySelectorAll('#bookingModal .booking-grid .booking-card');
                let sorted = getNearestUnits(pos.coords.latitude, pos.coords.longitude, cards);

                if (sorted.length > 0) {
                    let n = sorted[0];
                    let wrap = document.getElementById('bookingNearestWrap');
                    const card = document.getElementById('bookingNearestCard');
                    const unit = STUDIO_UNITS.find(u => u.slug === n.el.getAttribute('data-unit-slug'));

                    card.setAttribute('href', n.el.getAttribute('href'));
                    document.getElementById('bookingNearestName').textContent = n.el.querySelector('.booking-card-name').textContent;
                    document.getElementById('bookingNearestAddr').textContent = n.el.querySelector('.booking-card-addr').textContent;
                    document.getElementById('bookingNearestPostal').textContent = unit ? (unitRegionText(unit) + ' • CEP ' + unit.postal) : '';
                    document.getElementById('bookingNearestDist').textContent = '≈ ' + formatDist(n.dist) + ' de você';
                    const nearestRef = document.getElementById('bookingNearestRef');
                    if (nearestRef) {
                        if (unit && unit.landmark) {
                            nearestRef.textContent = '📍 ' + unit.landmark;
                            nearestRef.style.display = 'block';
                        } else {
                            nearestRef.textContent = '';
                            nearestRef.style.display = 'none';
                        }
                    }

                    wrap.style.display = 'block';
                    document.getElementById('bookingOtherLabel').style.display = 'block';
                    btnText.textContent = '✓ Encontramos a unidade mais próxima';
                    btn.disabled = false;

                    sorted.forEach(entry => {
                        const existing = entry.el.querySelector('.booking-card-dist');
                        if (existing) {
                            existing.textContent = '≈ ' + formatDist(entry.dist);
                            existing.style.display = 'block';
                        } else {
                            let d = document.createElement('div');
                            d.className = 'booking-card-dist';
                            d.textContent = '≈ ' + formatDist(entry.dist);
                            entry.el.appendChild(d);
                        }
                    });
                }
            },
            function() {
                btnText.textContent = 'Localização indisponível — escolha manualmente abaixo';
                btn.disabled = false;
            },
            { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
        );
    } catch(e) {
        btnText.textContent = 'Erro ao localizar';
        btn.disabled = false;
    }
}

/* =========================
   ESC HANDLER
========================= */
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;

    const productModalEl = document.getElementById('productModal');
    if (productModalEl && productModalEl.classList.contains('open')) {
        if (typeof closeProductModal === 'function') closeProductModal();
        return;
    }

    if (beeModal.modal && beeModal.modal.classList.contains('open')) {
        beeModal.close(); return;
    }
    if (bookingModal.modal && bookingModal.modal.classList.contains('open')) {
        bookingModal.close(); return;
    }
    if (waModal.modal && waModal.modal.classList.contains('open')) {
        waModal.close(); return;
    }

    const mobileMenu = document.getElementById('mm');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu(true);
    }
});

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', function() {
    renderUnitModals();
});

/* =========================
   NAV SCROLL + LOGO
========================= */
(function() {
    const nav = document.getElementById('navbar');
    const logo = document.getElementById('navLogoImg');

    window.addEventListener('scroll', function() {
        const s = window.scrollY > 60;
        nav.classList.toggle('scrolled', s);
        const nextLogo = s ? '/images/logos/logo-terracota.svg' : '/images/logos/logo-nude.svg';
        if (logo && !logo.src.endsWith(nextLogo)) logo.src = nextLogo;
    });
})();

/* =========================
   SCROLL REVEAL
========================= */
const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        const href = a.getAttribute('href');
        if (!href || href === '#' || href.length <= 1) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* =========================
   MAIN SLIDER (BEFORE/AFTER)
========================= */
(function() {
    const slider = document.getElementById('sliderInput');
    let afterImg = document.getElementById('afterImg');
    let handle = document.getElementById('sliderHandle');
    let divider = document.getElementById('sliderDivider');

    if (slider && afterImg) {
        function updateMainSlider() {
            const value = slider.value + '%';
            afterImg.style.width = value;
            if (handle) handle.style.left = value;
            if (divider) divider.style.left = value;
        }
        slider.addEventListener('input', updateMainSlider);
        updateMainSlider();
    }
})();

/* =========================
   MINI SLIDERS (GALLERY)
========================= */
document.querySelectorAll('.before-after-images').forEach(function(container) {
    let afterImg = container.querySelector('.after-img');
    let handle = container.querySelector('.mini-handle');
    let divider = container.querySelector('.mini-divider');
    const range = container.querySelector('.mini-range');
    if (!afterImg || !handle || !range) return;

    function updateMiniSlider(value) {
        const pct = Math.max(0, Math.min(100, Number(value)));
        afterImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        handle.style.left = pct + '%';
        if (divider) divider.style.left = pct + '%';
    }

    range.addEventListener('input', function() {
        updateMiniSlider(this.value);
    });

    range.addEventListener('change', function() {
        updateMiniSlider(this.value);
    });

    updateMiniSlider(range.value || 50);
});

/* =========================
   FAQ ACCORDION
========================= */
document.querySelectorAll('.faq-item').forEach(function(item) {
    const summary = item.querySelector('summary');
    item.addEventListener('toggle', function() {
        if (summary) summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
        if (!item.open) return;
        document.querySelectorAll('.faq-item').forEach(function(other) {
            if (other !== item) {
                other.open = false;
                const otherSummary = other.querySelector('summary');
                if (otherSummary) otherSummary.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

/* Expor funções globalmente para uso nos atributos onclick */
window.openWaModal = openWaModal;
window.openBooking = openBooking;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.closeModal = closeModal;
window.closeModalOnOverlay = closeModalOnOverlay;
window.findNearest = findNearest;
window.findNearestBooking = findNearestBooking;
window.openBeeModal = openBeeModal;
window.closeBeeModal = closeBeeModal;
window.closeBeeModalOnOverlay = closeBeeModalOnOverlay;