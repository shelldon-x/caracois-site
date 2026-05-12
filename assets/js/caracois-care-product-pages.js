/* =========================================================
   CARACÓIS CARE — PRODUCT PAGES — renderizador dinâmico completo
   Build: 20260504-care-product-fix-v1
   Espelha bee-product-pages.js, escopado em .care-product-page
========================================================= */
(function () {
  'use strict';

  const BUILD_VERSION = '20260504-care-product-fix-v1';
  const MAX_BOOT_TRIES = 60;
  const BOOT_DELAY = 50;

  const MARKETPLACES = [
    { key: 'amazon', name: 'Amazon', label: 'Buscar na Amazon' },
    { key: 'shopee', name: 'Shopee', label: 'Buscar na Shopee' },
    { key: 'mercadolivre', name: 'Mercado Livre', label: 'Buscar no Mercado Livre' }
  ];

  const CATEGORY_LABELS = {
    limpeza: 'Limpeza',
    tratamento: 'Tratamento',
    finalizacao: 'Finalização',
    finalização: 'Finalização'
  };

  const CATEGORY_GUIDE = [
    { number: '01', title: 'Limpe', text: 'Shampoo Sem Sulfato para low poo ou Co-wash para no poo.' },
    { number: '02', title: 'Trate', text: 'Máscara 3 em 1 para hidratação, nutrição e reconstrução em um passo.' },
    { number: '03', title: 'Finalize', text: 'Leave-in Multiuso para definição, antifrizz e proteção térmica.' },
    { number: '04', title: 'Fixe', text: 'Gelatina Capilar para prolongar a definição com toque flexível.' }
  ];

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function esc(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[ch]));
  }

  function safeJson(value) {
    try { return esc(JSON.stringify(value || [])); } catch (e) { return '[]'; }
  }

  function categoryLabel(category) {
    const key = String(category || '').toLowerCase();
    return CATEGORY_LABELS[key] || category || 'Produto';
  }

  function getProducts() {
    return Array.isArray(window.CARE_PRODUCTS) ? window.CARE_PRODUCTS : [];
  }

  function getSlug() {
    const explicit = document.body && (document.body.dataset.productId || document.body.dataset.productSlug);
    if (explicit) return explicit.replace(/\.html$/i, '');
    return window.location.pathname
      .replace(/\/$/, '')
      .split('/')
      .pop()
      .replace(/\.html$/i, '');
  }

  function findProduct(slug) {
    return getProducts().find((product) => product && product.id === slug) || null;
  }

  function relatedProducts(product) {
    const all = getProducts().filter(Boolean);
    const sameCategory = all.filter((item) => item.id !== product.id && item.category === product.category);
    const others = all.filter((item) => item.id !== product.id && item.category !== product.category);
    return sameCategory.concat(others).slice(0, 4);
  }

  function cleanPayload(payload) {
    const out = {};
    Object.entries(payload || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') out[key] = String(value).slice(0, 220);
    });
    return out;
  }

  function track(eventName, params) {
    const payload = cleanPayload({
      build_version: BUILD_VERSION,
      page_type: 'care_product',
      page_path: window.location.pathname,
      page_title: document.title,
      ...(params || {})
    });
    try { if (typeof window.gtag === 'function') window.gtag('event', eventName, payload); } catch (e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, payload); } catch (e) {}
    try { if (typeof window.clarity === 'function') window.clarity('event', eventName); } catch (e) {}
  }

  function trackViewItem(product) {
    track('view_item', {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_variant: product.type,
      currency: 'BRL',
      value: product.price || ''
    });
  }

  function imageMarkup(product, loading = 'lazy') {
    const fallbacks = [product.image].concat(product.fallbacks || []).filter(Boolean);
    const first = fallbacks[0] || '/images/logos/logo-terracota.svg';
    return `
      <img
        src="${esc(first)}"
        data-fallbacks="${safeJson(fallbacks)}"
        alt="${esc(product.name)} — ${esc(product.type)}"
        loading="${esc(loading)}"
        decoding="async"
      >
    `;
  }

  function bindImageFallbacks(root = document) {
    $$('img[data-fallbacks]:not([data-fallback-bound])', root).forEach((img) => {
      img.dataset.fallbackBound = 'true';
      img.addEventListener('error', () => {
        let list = [];
        try { list = JSON.parse(img.dataset.fallbacks || '[]'); } catch (e) {}
        const current = img.getAttribute('src');
        const index = list.indexOf(current);
        const next = list[index + 1];
        if (next) img.src = next;
      });
    });
  }

  function setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = value || '';
  }

  function setHtml(selector, value) {
    const el = $(selector);
    if (el) el.innerHTML = value || '';
  }

  function setAttr(selector, attr, value) {
    const el = $(selector);
    if (el && value !== undefined && value !== null) el.setAttribute(attr, value);
  }

  function careProductSearchQuery(product) {
    if (typeof window.careProductSearchQuery === 'function') return window.careProductSearchQuery(product);
    const p = product || {};
    return ['Caracóis Care', p.name || '', p.type || '', 'Studio Caracóis']
      .filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function buildCareMarketplaceUrl(market, product) {
    if (typeof window.buildCareMarketplaceUrl === 'function') return window.buildCareMarketplaceUrl(market, product);
    const query = encodeURIComponent(careProductSearchQuery(product || {}));
    const key = typeof market === 'string' ? market : (market && market.key) || '';
    if (key === 'amazon') return `https://www.amazon.com.br/s?k=${query}`;
    if (key === 'shopee') return `https://shopee.com.br/search?keyword=${query}`;
    if (key === 'mercadolivre') return `https://lista.mercadolivre.com.br/${query}`;
    return `https://www.google.com/search?q=${query}`;
  }

  function marketplaceCards(product, compact = false) {
    return MARKETPLACES.map((market) => `
      <a
        class="${compact ? 'care-product-market-chip' : 'care-cat-buy-card care-product-market-card'}"
        href="${esc(buildCareMarketplaceUrl(market, product))}"
        target="_blank"
        rel="noopener noreferrer"
        data-market="${esc(market.key)}"
        data-origin="${compact ? 'product-hero' : 'product-buy-section'}"
        data-product="${esc(product.id)}" data-product-name="${esc(product.name)}" data-search-query="${esc(careProductSearchQuery(product))}"
      >
        ${compact ? `${esc(market.name)} ↗` : `
          <div class="care-cat-buy-logo">${esc(market.name)}</div>
          <span class="care-cat-buy-label">${esc(market.label)}</span>
          <span class="care-cat-buy-arrow" aria-hidden="true">→</span>
        `}
      </a>
    `).join('');
  }

  function renderGuideSection() {
    return `
      <section class="care-cat-guide care-product-guide" id="guia-de-uso" aria-labelledby="guide-title">
        <div class="container">
          <div class="care-cat-guide-intro reveal visible">
            <div class="section-label">Guia de uso</div>
            <h2 class="section-title" id="guide-title">Um jeito simples de entender por onde começar</h2>
          </div>
          <div class="care-cat-guide-steps">
            ${CATEGORY_GUIDE.map((step) => `
              <article class="care-cat-guide-step reveal visible">
                <div class="care-cat-guide-num">${esc(step.number)}</div>
                <h3>${esc(step.title)}</h3>
                <p>${esc(step.text)}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderBuySection(product) {
    return `
      <section class="care-cat-buy care-product-buy-section" id="onde-comprar" aria-labelledby="buy-title">
        <div class="container">
          <div class="care-cat-buy-inner reveal visible">
            <div class="section-label">Onde comprar</div>
            <h2 class="section-title" id="buy-title">Disponível nos principais marketplaces</h2>
            <p class="section-desc">Entrega para todo o Brasil. Escolha onde preferir comprar.</p>
            <div class="care-cat-buy-grid">
              ${marketplaceCards(product, false)}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderNextStepSection(product) {
    return `
      <section class="care-cat-cta-final care-product-next-step" id="avaliacao-gratuita">
        <div class="container">
          <div class="care-cat-cta-inner reveal visible">
            <div class="section-label">Próximo passo</div>
            <h2 class="section-title">Quer saber quais produtos são ideais para os seus cachos?</h2>
            <p class="care-cat-cta-sub">Na avaliação gratuita, analisamos curvatura, porosidade e rotina para indicar o protocolo e os produtos certos.</p>
            <div class="care-cat-cta-btns">
              <button type="button" class="btn btn-white" onclick="openBooking()" data-cta="agendar_avaliacao_produto_care" data-product="${esc(product.id)}" data-product-name="${esc(product.name)}" data-search-query="${esc(careProductSearchQuery(product))}">Agendar avaliação gratuita</button>
              <button type="button" class="btn btn-outline-white" onclick="openWaModal()" data-cta="whatsapp_produto_care" data-product="${esc(product.id)}" data-product-name="${esc(product.name)}" data-search-query="${esc(careProductSearchQuery(product))}">Falar no WhatsApp</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderProductRelated(product) {
    return relatedProducts(product).map((item) => `
      <a class="care-product-related-card" href="/caracois-care/${esc(item.id)}" data-product-related="${esc(item.id)}">
        ${imageMarkup(item, 'lazy')}
        <span>${esc(categoryLabel(item.category))}</span>
        <strong>${esc(item.name)}</strong>
        <small>${esc(item.type)}</small>
      </a>
    `).join('');
  }

  function updateMetaTags(product) {
    const title = `${product.name} | ${product.type} Caracóis Care`;
    const description = product.shortDesc || product.desc || `${product.name}, produto Caracóis Care para cabelos com curvatura.`;
    const url = `https://caracois.com.br/caracois-care/${product.id}`;
    const image = product.image ? `https://caracois.com.br${product.image.split('?')[0]}` : 'https://caracois.com.br/images/og/og-caracois-care.png';

    if (title) document.title = title;

    const metaMap = [
      ['meta[name="description"]', 'content', description],
      ['link[rel="canonical"]', 'href', url],
      ['meta[property="og:title"]', 'content', `${product.name} | Caracóis Care`],
      ['meta[property="og:description"]', 'content', description],
      ['meta[property="og:url"]', 'content', url],
      ['meta[property="og:image"]', 'content', image],
      ['meta[property="og:image:secure_url"]', 'content', image],
      ['meta[name="twitter:title"]', 'content', `${product.name} | Caracóis Care`],
      ['meta[name="twitter:description"]', 'content', description],
      ['meta[name="twitter:image"]', 'content', image]
    ];
    metaMap.forEach(([selector, attr, value]) => setAttr(selector, attr, value));
  }

  function renderProductPage(product) {
    document.body.classList.add('care-product-page');
    document.body.dataset.productId = product.id;

    updateMetaTags(product);

    setText('#careProductBreadcrumbCurrent', product.name);
    setText('#careProductCategory', categoryLabel(product.category));
    setText('#careProductName', product.name);
    setText('#careProductType', product.type);
    setText('#careProductDesc', product.desc || product.shortDesc || '');

    const pills = (product.tags || [])
      .map((tag) => `<span class="care-product-pill">${esc(tag)}</span>`).join('');
    setHtml('#careProductPills', pills + (product.ph ? `<span class="care-product-pill">${esc(product.ph)}</span>` : ''));

    setHtml('#careProductImage', imageMarkup(product, 'eager'));
    setText('#careProductVolume', product.volume || '—');
    setText('#careProductPh', product.ph || '—');
    setText('#careProductAnvisa', product.anvisa || '—');
    setText('#careProductBarcode', product.barcode || product.gtin13 || '—');
    setText('#careProductEditorialTitle', `${product.name}: ${product.type}`);
    setText('#careProductEditorialText', product.shortDesc || product.desc || '');
    setText('#careProductHowToUse', product.howToUse || '');
    setText('#careProductIngredients', product.ingredients || '');
    setHtml('#careProductMarkets', marketplaceCards(product, true));
    setHtml('#careProductRelated', renderProductRelated(product));

    // Renderiza blocos inferiores premium de forma idempotente
    $$('.care-product-dynamic-extra, #guia-de-uso.care-product-guide, #onde-comprar.care-product-buy-section, #avaliacao-gratuita.care-product-next-step').forEach((el) => el.remove());
    const main = $('#main');
    if (main) {
      const wrapper = document.createElement('div');
      wrapper.className = 'care-product-dynamic-extra';
      wrapper.innerHTML = renderGuideSection() + renderNextStepSection(product);
      main.insertAdjacentElement('beforeend', wrapper);
    }

    $$('[data-current-product]').forEach((element) => {
      element.dataset.currentProduct = product.id;
    });

    bindImageFallbacks(document);
    document.body.classList.remove('js-render-pending');
    document.body.classList.add('js-render-ready');

    trackViewItem(product);
  }

  function injectRescueStyles() {
    if ($('#careDynamicRescueStyles')) return;
    const style = document.createElement('style');
    style.id = 'careDynamicRescueStyles';
    style.textContent = `
      .care-product-page .care-cat-guide,
      .care-product-page .care-cat-buy,
      .care-product-page .care-cat-cta-final { display:block; }

      .care-product-page .care-cat-buy a,
      .care-product-page .care-cat-guide a,
      .care-product-page .care-cat-cta-final a { text-decoration:none; }

      .care-product-page .care-cat-buy-grid {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:20px;
        margin-top:44px;
      }

      .care-product-page .care-cat-buy-card,
      .care-product-page .care-product-market-card {
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:10px;
        min-height:160px;
        padding:34px 24px;
        border-radius:22px;
        background:#fff;
        border:1px solid rgba(155,68,66,.08);
        color:var(--black,#141414);
        box-shadow:0 16px 44px rgba(0,0,0,.045);
        text-decoration:none!important;
        transition:transform .32s var(--ease), box-shadow .32s var(--ease), border-color .32s var(--ease);
      }

      .care-product-page .care-cat-buy-card:hover,
      .care-product-page .care-product-market-card:hover {
        transform:translateY(-5px);
        border-color:var(--gold,#C4A265);
        box-shadow:0 22px 52px rgba(155,68,66,.12);
      }

      .care-product-page .care-cat-buy-logo {
        font-family:var(--serif);
        font-size:1.45rem;
        color:var(--terracota,#9B4442);
        font-weight:600;
      }

      .care-product-page .care-cat-buy-label {
        color:var(--text-light,#444);
        font-size:.86rem;
      }

      .care-product-page .care-cat-buy-arrow {
        color:var(--gold,#C4A265);
        font-size:1.1rem;
      }

      .care-product-page .care-cat-guide-steps {
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:24px;
      }

      .care-product-page .care-cat-guide-step {
        border-radius:18px;
        padding:30px 24px;
      }

      /* Rescue/compat — impede links azuis e layout cru nos blocos dinâmicos */
      .care-product-page .care-product-dynamic-extra { background:#fff; color:var(--text,#2A2A2A); }
      .care-product-page .care-product-guide,
      .care-product-page .care-product-buy-section { background:#fff !important; color:var(--text,#2A2A2A) !important; padding:88px 0 !important; }
      .care-product-page .care-product-guide { background:linear-gradient(135deg,var(--nude-ultra,#FBF6F5),#fff) !important; }
      .care-product-page .care-product-next-step { background:linear-gradient(165deg,#120d0c 0%,#211514 42%,#7C3331 100%) !important; color:#fff !important; padding:86px 0 calc(94px + env(safe-area-inset-bottom)) !important; }
      .care-product-page .care-product-next-step .section-title,
      .care-product-page .care-product-next-step .care-cat-cta-sub { color:#fff !important; }
      .care-product-page .care-product-next-step .section-label { color:var(--gold-light,#D4B97A) !important; }
      .care-product-page .care-cat-guide-intro,
      .care-product-page .care-cat-buy-inner,
      .care-product-page .care-cat-cta-inner { max-width:900px; margin:0 auto; text-align:center; }
      .care-product-page .care-cat-guide-steps { margin-top:42px; }
      .care-product-page .care-cat-guide-step { background:#fff; border:1px solid rgba(155,68,66,.08); box-shadow:0 18px 46px rgba(0,0,0,.045); text-align:left; }
      .care-product-page .care-cat-guide-num { color:var(--terracota,#9B4442); font-weight:700; letter-spacing:.10em; margin-bottom:12px; }
      .care-product-page .care-cat-guide-step h3 { font-family:var(--serif); color:var(--black,#141414); font-size:1.45rem; margin-bottom:8px; }
      .care-product-page .care-cat-guide-step p { color:var(--text-light,#444); line-height:1.65; }
      .care-product-page .care-product-buy-section a { color:inherit !important; text-decoration:none !important; }

      @media (max-width: 900px) {
        .care-product-page .care-cat-buy-grid,
        .care-product-page .care-cat-guide-steps { grid-template-columns:1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureLogoDynamic() {
    const logo = $('#navLogoImg') || $('.nav-logo img');
    if (!logo) return;
    logo.dataset.logoLight = logo.dataset.logoLight || '/images/logos/logo-nude.svg';
    logo.dataset.logoDark = logo.dataset.logoDark || '/images/logos/logo-terracota.svg';

    const nav = $('nav');
    const apply = () => {
      const isScrolled = nav && nav.classList.contains('scrolled');
      const wanted = isScrolled ? logo.dataset.logoDark : logo.dataset.logoLight;
      if (wanted && logo.getAttribute('src') !== wanted) logo.setAttribute('src', wanted);
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
    setTimeout(apply, 250);
  }

  function openMarketplaceModal(event, product, origin) {
    if (event) event.preventDefault();
    track('care_product_buy_intent', {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      origin: origin || 'unknown'
    });

    if (typeof window.openCareModal === 'function') {
      const trigger = (event && event.target && event.target.closest('[data-care-buy]')) || null;
      window.openCareModal(trigger);
      return;
    }

    const target = document.getElementById('onde-comprar');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const url = buildCareMarketplaceUrl(MARKETPLACES[0], product);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function bindEvents(product) {
    if (window.__CARE_PRODUCT_PAGE_EVENTS_BOUND__) return;
    window.__CARE_PRODUCT_PAGE_EVENTS_BOUND__ = true;

    document.addEventListener('click', (event) => {
      const buy = event.target.closest('[data-care-buy]');
      if (buy) {
        openMarketplaceModal(event, product, buy.dataset.origin || 'product-page');
        return;
      }
      const market = event.target.closest('[data-market]');
      if (market) {
        track('care_marketplace_click', {
          product_id: market.dataset.product || product.id,
          product_name: product.name,
          market: market.dataset.market || '',
          origin: market.dataset.origin || '',
          link_url: market.href || ''
        });
      }
      const related = event.target.closest('[data-product-related]');
      if (related) {
        track('care_related_product_click', {
          product_id: product.id,
          product_name: product.name,
          related_product_id: related.dataset.productRelated || ''
        });
      }
    });
  }

  function reportNotFound(slug) {
    document.body.classList.remove('js-render-pending');
    document.body.classList.add('js-render-ready', 'care-product-not-found');
    setText('#careProductName', 'Produto não encontrado');
    setText('#careProductType', 'Caracóis Care');
    setText('#careProductDesc', 'Não encontramos esse produto no catálogo dinâmico. Volte para a página Caracóis Care e escolha um item da linha.');
    const ctas = $('.care-product-ctas');
    if (ctas) {
      ctas.innerHTML = '<a href="/caracois-care" class="btn btn-gold">Ver catálogo Caracóis Care</a>';
    }
    track('care_product_not_found', { slug });
  }

  function boot(tryNumber = 0) {
    injectRescueStyles();
    ensureLogoDynamic();

    const products = getProducts();
    if (!products.length && tryNumber < MAX_BOOT_TRIES) {
      setTimeout(() => boot(tryNumber + 1), BOOT_DELAY);
      return;
    }

    const slug = getSlug();
    const product = findProduct(slug);

    if (!product) {
      reportNotFound(slug);
      return;
    }

    renderProductPage(product);
    bindEvents(product);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  } else {
    boot();
  }
})();
