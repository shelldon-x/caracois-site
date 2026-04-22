/* =========================
   STATE
========================= */
let lastScrollY = 0;
let lastFocusedElement = null;
let activeTrapCleanup = null;

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
        '.wa-modal-overlay.open, .booking-overlay.open, .mobile-menu.open, .mobile-overlay.open'
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
function closeAllOverlaysSilently() {
    const wa = document.getElementById('waModal');
    const booking = document.getElementById('bookingModal');
    const mm = document.getElementById('mm');
    const mobileOverlay = document.getElementById('mobileOverlay');
    let toggle = document.querySelector('.mobile-toggle');

    if (wa) { wa.classList.remove('open'); wa.setAttribute('aria-hidden', 'true'); }
    if (booking) { booking.classList.remove('open'); booking.setAttribute('aria-hidden', 'true'); }
    if (mm) { mm.classList.remove('open'); mm.setAttribute('aria-hidden', 'true'); }
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');

    clearFocusTrap();
    unlockScroll();
}

function openModal(id) {
    closeAllOverlaysSilently();
    let modal = document.getElementById(id);
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();
    activateFocusTrap(modal);

    setTimeout(function() {
        let first = getFocusableFirst(modal);
        if (first) first.focus();
    }, 50);
}

function closeModal(id) {
    let modal = document.getElementById(id);
    if (!modal || !modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    clearFocusTrap();
    unlockScroll();

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        setTimeout(function() { lastFocusedElement.focus(); }, 30);
    }
}

function closeModalOnOverlay(e, id) {
    if (e.target.id === id) closeModal(id);
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

    setTimeout(function() {
        let first = getFocusableFirst(menu);
        if (first) first.focus();
    }, 50);
}

function closeMobileMenu(restoreFocus) {
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

    if (restoreFocus !== false && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        setTimeout(function() { lastFocusedElement.focus(); }, 30);
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
    arr.sort(function(a, b) { return a.dist - b.dist; });
    return arr;
}

/* =========================
   SPECIFIC MODALS
========================= */
function openWaModal() {
    resetGeoButton('waGeoBtn', 'geoBtnText', 'Usar minha localização');
    document.querySelectorAll('#waUnitList .wa-unit-item').forEach(function(item) {
        item.classList.remove('nearest');
        const dist = item.querySelector('.wa-unit-distance');
        if (dist) dist.textContent = '';
    });
    openModal('waModal');
}

function openBooking() {
    resetGeoButton('bookingGeoBtn', 'bookingGeoBtnText', 'Encontrar unidade mais próxima');
    let wrap = document.getElementById('bookingNearestWrap');
    const label = document.getElementById('bookingOtherLabel');
    if (wrap) wrap.style.display = 'none';
    if (label) label.style.display = 'none';
    const nName = document.getElementById('bookingNearestName');
    const nAddr = document.getElementById('bookingNearestAddr');
    const nDist = document.getElementById('bookingNearestDist');
    if (nName) nName.textContent = '';
    if (nAddr) nAddr.textContent = '';
    if (nDist) nDist.textContent = '';
    document.querySelectorAll('#bookingModal .booking-card-dist').forEach(function(el) { el.remove(); });
    openModal('bookingModal');
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
            const list = document.getElementById('waUnitList');
            const items = list.querySelectorAll('.wa-unit-item');
            let sorted = getNearestUnits(pos.coords.latitude, pos.coords.longitude, items);

            items.forEach(function(item) { item.classList.remove('nearest'); });

            sorted.forEach(function(entry, i) {
                let d = entry.el.querySelector('.wa-unit-distance');
                if (d) d.textContent = '\u2248 ' + formatDist(entry.dist) + ' de voc\u00ea';
                if (i === 0) entry.el.classList.add('nearest');
                list.appendChild(entry.el);
            });

            btnText.textContent = '\u2713 Unidade mais pr\u00f3xima destacada';
            btn.disabled = false;
        },
        function() {
            btnText.textContent = 'Escolha manualmente \u2193';
            btn.disabled = false;
            setTimeout(function() { btnText.textContent = 'Usar minha localiza\u00e7\u00e3o'; }, 3000);
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

                /* CORREÇÃO: usar getAttribute('href') para pegar o valor literal do
                   atributo HTML — evita que o browser resolva o link relativo antes
                   de copiar, o que fazia o card dinâmico apontar para '#' ou para a
                   URL incorreta da página atual. */
                const bookingUrl = n.el.getAttribute('href');
                card.setAttribute('href', bookingUrl);
                document.getElementById('bookingNearestName').textContent = n.el.querySelector('.booking-card-name').textContent;
                document.getElementById('bookingNearestAddr').textContent = n.el.querySelector('.booking-card-addr').textContent;
                document.getElementById('bookingNearestDist').textContent = '\u2248 ' + formatDist(n.dist) + ' de voc\u00ea';

                wrap.style.display = 'block';
                document.getElementById('bookingOtherLabel').style.display = 'block';
                btnText.textContent = '\u2713 Encontramos a unidade mais pr\u00f3xima';
                btn.disabled = false;

                sorted.forEach(function(entry) {
                    const existing = entry.el.querySelector('.booking-card-dist');
                    if (existing) {
                        existing.textContent = '\u2248 ' + formatDist(entry.dist);
                    } else {
                        let d = document.createElement('div');
                        d.className = 'booking-card-dist';
                        d.style.cssText = 'font-size:0.65rem;color:var(--text-muted);margin-top:3px;';
                        d.textContent = '\u2248 ' + formatDist(entry.dist);
                        entry.el.appendChild(d);
                    }
                });
            }
        },
        function() {
            btnText.textContent = 'Escolha manualmente \u2193';
            btn.disabled = false;
            setTimeout(function() { btnText.textContent = 'Encontrar unidade mais pr\u00f3xima'; }, 3000);
        },
        { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
    );
    } catch(e) {
        btnText.textContent = 'Erro ao localizar';
        btn.disabled = false;
    }
}

/* =========================
   BEE MODAL HUB
========================= */
function openBeeModal() {
    let overlay = document.getElementById('beeModal');
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    lockScroll();
    const closeBtn = overlay.querySelector('.bee-modal-close');
    if (closeBtn) { setTimeout(function() { closeBtn.focus(); }, 50); }
}

function closeBeeModal() {
    let overlay = document.getElementById('beeModal');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    unlockScroll();
}

function closeBeeModalOnOverlay(e) {
    if (e.target === document.getElementById('beeModal')) closeBeeModal();
}

/* =========================
   ESC HANDLER
========================= */
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;

    const productModalEl = document.getElementById('productModal');
    if (productModalEl && productModalEl.classList.contains('open')) {
        closeProductModal(); return;
    }
    if (document.getElementById('beeModal').classList.contains('open')) {
        closeBeeModal(); return;
    }
    if (document.getElementById('bookingModal').classList.contains('open')) {
        closeModal('bookingModal'); return;
    }
    if (document.getElementById('waModal').classList.contains('open')) {
        closeModal('waModal'); return;
    }
    if (document.getElementById('mm').classList.contains('open')) {
        closeMobileMenu(true);
    }
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

        // Sai imediatamente se não houver href, for '#' puro ou string vazia
        if (!href || href === '#' || href.length <= 1) return;

        // Sai se não existir elemento-alvo na página — evita interceptar links externos
        // que eventualmente recebam um href dinâmico começando com '#'
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
   LEAD FORM (WA)
========================= */

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
