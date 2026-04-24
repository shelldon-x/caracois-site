/* =========================================================
   BEE TRACKING — eventos de marketing para o catálogo Bee Cosmetics
   Dispara em: Meta Pixel, GA4 e Clarity
   Dependências: bee-catalog.js (BEE_PRODUCTS), fbq, gtag, clarity
========================================================= */
(function () {
    'use strict';

    const SESSION_KEY = 'bee_tracking_session_v1';
    let seenProducts = new Set();

    // Recupera produtos já rastreados nesta sessão (evita spam)
    try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored) seenProducts = new Set(JSON.parse(stored));
    } catch (_) {}

    function _persistSeen() {
        try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify([...seenProducts]));
        } catch (_) {}
    }

    // Wrappers defensivos — nunca quebram se o tracker não carregou
    function _fbq() {
        if (typeof window.fbq === 'function') {
            try { window.fbq.apply(window, arguments); } catch (_) {}
        }
    }
    function _gtag() {
        if (typeof window.gtag === 'function') {
            try { window.gtag.apply(window, arguments); } catch (_) {}
        }
    }
    function _clarity() {
        if (typeof window.clarity === 'function') {
            try { window.clarity.apply(window, arguments); } catch (_) {}
        }
    }

    function _productByCardEl(cardEl) {
        const id = cardEl && cardEl.getAttribute('data-product-id');
        if (!id || typeof BEE_PRODUCTS === 'undefined') return null;
        return BEE_PRODUCTS.find(p => p.id === id) || null;
    }

    /* =========================================================
       EVENTO 1 — Page view do catálogo completo
       Dispara: fbq ViewContent (genérico) + GA4 view_item_list
    ========================================================= */
    function trackCatalogView() {
        if (typeof BEE_PRODUCTS === 'undefined') return;

        _fbq('track', 'ViewContent', {
            content_name: 'Bee Cosmetics — Catálogo Completo',
            content_category: 'catálogo',
            content_type: 'product_group',
            content_ids: BEE_PRODUCTS.map(p => p.id),
            num_items: BEE_PRODUCTS.length
        });

        _gtag('event', 'view_item_list', {
            item_list_id: 'bee_cosmetics_catalog',
            item_list_name: 'Bee Cosmetics — Catálogo',
            items: BEE_PRODUCTS.map((p, i) => ({
                item_id: p.id,
                item_name: p.name,
                item_brand: 'Bee Cosmetics',
                item_category: p.kind,
                item_category2: p.tag,
                index: i
            }))
        });

        _clarity('set', 'page_type', 'bee_catalog');
    }

    /* =========================================================
       EVENTO 2 — ViewContent por produto (intersecção com viewport)
       Dispara quando o card entra na tela — 1x por produto/sessão
    ========================================================= */
    function trackProductImpression(cardEl) {
        const p = _productByCardEl(cardEl);
        if (!p) return;
        const key = 'impression:' + p.id;
        if (seenProducts.has(key)) return;
        seenProducts.add(key);
        _persistSeen();

        _fbq('track', 'ViewContent', {
            content_name: p.name,
            content_category: p.kind,
            content_type: 'product',
            content_ids: [p.id]
        });

        _gtag('event', 'view_item', {
            items: [{
                item_id: p.id,
                item_name: p.name,
                item_brand: 'Bee Cosmetics',
                item_category: p.kind,
                item_category2: p.tag
            }]
        });
    }

    /* =========================================================
       EVENTO 3 — Clique em card (abertura da ficha)
       Dispara ProductDetailView — evento custom do Pixel e select_item no GA4
    ========================================================= */
    function trackProductDetailOpen(productId) {
        if (typeof BEE_PRODUCTS === 'undefined') return;
        const p = BEE_PRODUCTS.find(x => x.id === productId);
        if (!p) return;

        _fbq('trackCustom', 'ProductDetailView', {
            product_id: p.id,
            product_name: p.name,
            product_category: p.kind,
            product_tag: p.tag,
            content_ids: [p.id],
            content_type: 'product',
            content_name: p.name
        });

        _gtag('event', 'select_item', {
            item_list_id: 'bee_cosmetics_catalog',
            item_list_name: 'Bee Cosmetics — Catálogo',
            items: [{
                item_id: p.id,
                item_name: p.name,
                item_brand: 'Bee Cosmetics',
                item_category: p.kind,
                item_category2: p.tag
            }]
        });

        _clarity('event', 'bee_product_detail');
        _clarity('set', 'last_product_viewed', p.id);
    }

    /* =========================================================
       EVENTO 4 — Clique em marketplace (Amazon / Shopee / ML)
       Dispara Lead (Meta) + select_content (GA4) + outbound (GA4)
    ========================================================= */
    function trackMarketplaceClick(marketplace, origin, productId) {
        const product = productId && typeof BEE_PRODUCTS !== 'undefined'
            ? BEE_PRODUCTS.find(p => p.id === productId) : null;

        _fbq('track', 'Lead', {
            content_name: product ? ('Comprar ' + product.name + ' em ' + marketplace) : ('Ver catálogo na ' + marketplace),
            content_category: 'marketplace:' + marketplace,
            content_ids: product ? [product.id] : ['catalog'],
            content_type: product ? 'product' : 'product_group',
            value: 0,
            currency: 'BRL'
        });

        _gtag('event', 'select_content', {
            content_type: 'marketplace_link',
            content_id: marketplace + (product ? (':' + product.id) : ':catalog'),
            marketplace: marketplace,
            origin: origin || 'unknown',
            product_id: product ? product.id : null,
            product_name: product ? product.name : null
        });

        _gtag('event', 'click', {
            event_category: 'outbound',
            event_label: marketplace,
            outbound: true,
            transport_type: 'beacon'
        });

        _clarity('event', 'bee_marketplace_click');
        _clarity('set', 'last_marketplace', marketplace);
    }

    /* =========================================================
       EVENTO 5 — CTA de agendamento ou WhatsApp
    ========================================================= */
    function trackCta(action, origin) {
        _fbq('track', action === 'whatsapp' ? 'Contact' : 'Schedule', {
            content_name: 'Bee Catalog — ' + origin,
            content_category: action
        });

        _gtag('event', 'generate_lead', {
            method: action,
            origin: origin,
            page_location: 'bee_cosmetics'
        });

        _clarity('event', 'bee_cta_' + action);
    }

    /* =========================================================
       FILTROS — manter filtro funcional via bee-catalog.js
       (O bee-catalog.js já faz rebind a cada render)
    ========================================================= */
    function setupFilters() {
        const bar = document.querySelector('.bee-cat-filter-bar');
        if (!bar) return;

        bar.addEventListener('click', function (e) {
            const btn = e.target.closest('.bee-cat-filter-btn');
            if (!btn) return;
            const filter = btn.getAttribute('data-filter');
            if (!filter) return;

            // Atualiza visual
            bar.querySelectorAll('.bee-cat-filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Renderiza (bee-catalog.js expõe renderBeeProducts)
            if (typeof renderBeeProducts === 'function') renderBeeProducts(filter);

            // Reinstala observers após render
            setupProductObserver();

            // Tracking do filtro
            _gtag('event', 'filter_products', {
                content_type: 'bee_catalog',
                filter_value: filter
            });
            _clarity('event', 'bee_filter_' + filter);
        });
    }

    /* =========================================================
       OBSERVER DE IMPRESSÃO — trackProductImpression
    ========================================================= */
    let impressionObserver = null;
    function setupProductObserver() {
        if (impressionObserver) impressionObserver.disconnect();

        if (!('IntersectionObserver' in window)) return;

        impressionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    trackProductImpression(entry.target);
                    impressionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('#beeProductsGrid .bee-product-card').forEach(function (card) {
            impressionObserver.observe(card);
        });
    }

    /* =========================================================
       DELEGAÇÃO DE CLIQUES — cards e CTAs
    ========================================================= */
    function setupClickDelegation() {
        // Cliques no grid (cards + botões "Ver ficha")
        const grid = document.getElementById('beeProductsGrid');
        if (grid) {
            grid.addEventListener('click', function (e) {
                const btn = e.target.closest('.btn-mini[data-product-id]');
                const card = e.target.closest('.bee-product-card');
                const id = (btn && btn.getAttribute('data-product-id'))
                    || (card && card.getAttribute('data-product-id'));
                if (id) trackProductDetailOpen(id);
            });
        }

        // Cliques em marketplaces na seção "Onde comprar"
        document.querySelectorAll('.bee-cat-buy-card[data-market]').forEach(function (el) {
            el.addEventListener('click', function () {
                const market = el.getAttribute('data-market');
                const origin = el.getAttribute('data-origin') || 'section-buy';
                trackMarketplaceClick(market, origin, null);
            });
        });

        // Cliques em marketplaces DENTRO do productModal (bee-catalog renderiza)
        document.addEventListener('click', function (e) {
            const link = e.target.closest('#productModal a[data-market]');
            if (!link) return;
            const market = link.getAttribute('data-market');
            const productId = link.getAttribute('data-product-id')
                || link.closest('[data-product-id]')?.getAttribute('data-product-id');
            trackMarketplaceClick(market, 'product-modal', productId);
        });

        // CTAs agendar / WhatsApp com data-cta
        document.querySelectorAll('[data-cta]').forEach(function (el) {
            el.addEventListener('click', function () {
                const cta = el.getAttribute('data-cta') || 'unknown';
                const isWa = /wa|whatsapp/i.test(cta);
                trackCta(isWa ? 'whatsapp' : 'schedule', cta);
            });
        });

        // WhatsApp float (elemento comum a todas as páginas)
        const waFloat = document.querySelector('.whatsapp-float');
        if (waFloat && !waFloat.hasAttribute('data-cta')) {
            waFloat.addEventListener('click', function () {
                trackCta('whatsapp', 'whatsapp-float');
            });
        }
    }

    /* =========================================================
       BOOT
    ========================================================= */
    function init() {
        // Espera renderização do grid pelo bee-catalog.js
        // (ele roda no parse — defer garante ordem)
        trackCatalogView();
        setupFilters();
        setupProductObserver();
        setupClickDelegation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exposição para debug ou uso externo
    window.BeeTracking = {
        trackCatalogView: trackCatalogView,
        trackProductDetailOpen: trackProductDetailOpen,
        trackMarketplaceClick: trackMarketplaceClick,
        trackCta: trackCta
    };
})();
