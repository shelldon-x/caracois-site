/* =========================================================
   BEE PRODUCT PAGES — renderizador dinâmico completo
   Build: 20260503-bee-dynamic-system-v2-final
   Objetivo:
   - 1 JS para todas as páginas /bee-cosmetics/{produto}
   - renderização premium sem HTML cru
   - integração com modal global Bee
   - tracking GA4/Meta Pixel/Clarity
   - fallback visual para evitar links azuis/blocos quebrados
========================================================= */
(function () {
  'use strict';

  const BUILD_VERSION = '20260504-bee-product-fix-v13';
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
    {
      number: '01',
      title: 'Limpe',
      text: 'Born to BEE para low poo ou Feel the BEEat para no poo.'
    },
    {
      number: '02',
      title: 'Trate',
      text: 'Nutrição, reconstrução, umectação ou acidificação conforme a necessidade.'
    },
    {
      number: '03',
      title: 'Finalize',
      text: 'BEE Yourself, Let it BEE ou BEE Proud — escolha o efeito que você quer.'
    },
    {
      number: '04',
      title: 'Sele',
      text: 'Be my BEE para fixar a definição e proteger contra a umidade.'
    }
  ];

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function esc(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[ch]));
  }

  function safeJson(value) {
    try {
      return esc(JSON.stringify(value || []));
    } catch (e) {
      return '[]';
    }
  }

  function categoryLabel(category) {
    const key = String(category || '').toLowerCase();
    return CATEGORY_LABELS[key] || category || 'Produto';
  }

  function getProducts() {
    return Array.isArray(window.BEE_PRODUCTS) ? window.BEE_PRODUCTS : [];
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
      page_type: 'bee_product',
      page_path: window.location.pathname,
      page_title: document.title,
      ...(params || {})
    });

    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }
    } catch (e) {}

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, payload);
      }
    } catch (e) {}

    try {
      if (typeof window.clarity === 'function') {
        window.clarity('event', eventName);
      }
    } catch (e) {}
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


  function beeProductSearchQuery(product) {
    if (typeof window.beeProductSearchQuery === 'function') return window.beeProductSearchQuery(product);
    const p = product || {};
    const categoryTerms = {
      'Shampoo Sem Sulfato': 'shampoo sem sulfato cabelo cacheado',
      'Co-Wash': 'co-wash no poo cabelo cacheado',
      'Máscara de Nutrição': 'máscara de nutrição para cabelo cacheado',
      'Máscara de Reconstrução': 'máscara de reconstrução para cabelo cacheado',
      'Máscara de Umectação': 'máscara de umectação para cachos',
      'Leave-in Super Definição': 'leave-in super definição cachos',
      'Leave-in Leveza Natural': 'leave-in leve para cabelo cacheado',
      'Leave-in Antiencolhimento': 'leave-in antiencolhimento cachos',
      'Gelatina Capilar': 'gelatina capilar para definição dos cachos',
      'Elixir Acidificante': 'acidificante capilar para cachos'
    };
    return ['Bee Cosmetics', p.name || '', categoryTerms[p.type] || p.type || '', 'Studio Caracóis'].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function buildBeeMarketplaceUrl(market, product) {
    if (typeof window.buildBeeMarketplaceUrl === 'function') return window.buildBeeMarketplaceUrl(market, product);
    const query = encodeURIComponent(beeProductSearchQuery(product || {}));
    const key = typeof market === 'string' ? market : (market && market.key) || '';
    if (key === 'amazon') return `https://www.amazon.com.br/s?k=${query}`;
    if (key === 'shopee') return `https://shopee.com.br/search?keyword=${query}`;
    if (key === 'mercadolivre') return `https://lista.mercadolivre.com.br/${query}`;
    return `https://www.google.com/search?q=${query}`;
  }

  function marketplaceCards(product, compact = false) {
    return MARKETPLACES.map((market) => `
      <a
        class="${compact ? 'bee-product-market-chip' : 'bee-cat-buy-card bee-product-market-card'}"
        href="${esc(buildBeeMarketplaceUrl(market, product))}"
        target="_blank"
        rel="noopener noreferrer"
        data-market="${esc(market.key)}"
        data-origin="${compact ? 'product-hero' : 'product-buy-section'}"
        data-product="${esc(product.id)}" data-product-name="${esc(product.name)}" data-search-query="${esc(beeProductSearchQuery(product))}"
      >
        ${compact ? `${esc(market.name)} ↗` : `
          <div class="bee-cat-buy-logo">${esc(market.name)}</div>
          <span class="bee-cat-buy-label">${esc(market.label)}</span>
          <span class="bee-cat-buy-arrow" aria-hidden="true">→</span>
        `}
      </a>
    `).join('');
  }

  function renderGuideSection() {
    return `
      <section class="bee-cat-guide bee-product-guide" id="guia-de-uso" aria-labelledby="guide-title">
        <div class="container">
          <div class="bee-cat-guide-intro reveal visible">
            <div class="section-label">Guia de uso</div>
            <h2 class="section-title" id="guide-title">Um jeito simples de entender por onde começar</h2>
          </div>
          <div class="bee-cat-guide-steps">
            ${CATEGORY_GUIDE.map((step) => `
              <article class="bee-cat-guide-step reveal visible">
                <div class="bee-cat-guide-num">${esc(step.number)}</div>
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
      <section class="bee-cat-buy bee-product-buy-section" id="onde-comprar" aria-labelledby="buy-title">
        <div class="container">
          <div class="bee-cat-buy-inner reveal visible">
            <div class="section-label">Onde comprar</div>
            <h2 class="section-title" id="buy-title">Disponível nos principais marketplaces</h2>
            <p class="section-desc">Entrega para todo o Brasil. Escolha onde preferir comprar.</p>
            <div class="bee-cat-buy-grid">
              ${marketplaceCards(product, false)}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderNextStepSection(product) {
    return `
      <section class="bee-cat-cta-final bee-product-next-step" id="avaliacao-gratuita">
        <div class="container">
          <div class="bee-cat-cta-inner reveal visible">
            <div class="section-label">Próximo passo</div>
            <h2 class="section-title">Quer saber quais produtos são ideais para os seus cachos?</h2>
            <p class="bee-cat-cta-sub">Na avaliação gratuita, analisamos curvatura, porosidade e rotina para indicar o protocolo e os produtos certos.</p>
            <div class="bee-cat-cta-btns">
              <button type="button" class="btn btn-white" onclick="openBooking()" data-cta="agendar_avaliacao_produto_bee" data-product="${esc(product.id)}" data-product-name="${esc(product.name)}" data-search-query="${esc(beeProductSearchQuery(product))}">Agendar avaliação gratuita</button>
              <button type="button" class="btn btn-outline-white" onclick="openWaModal()" data-cta="whatsapp_produto_bee" data-product="${esc(product.id)}" data-product-name="${esc(product.name)}" data-search-query="${esc(beeProductSearchQuery(product))}">Falar no WhatsApp</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderProductRelated(product) {
    return relatedProducts(product).map((item) => `
      <a class="bee-product-related-card" href="/bee-cosmetics/${esc(item.id)}" data-product-related="${esc(item.id)}">
        ${imageMarkup(item, 'lazy')}
        <span>${esc(categoryLabel(item.category))}</span>
        <strong>${esc(item.name)}</strong>
        <small>${esc(item.type)}</small>
      </a>
    `).join('');
  }

  function updateMetaTags(product) {
    const title = `${product.name} | ${product.type} Bee Cosmetics`;
    const description = product.shortDesc || product.desc || `${product.name}, produto Bee Cosmetics para cabelos com curvatura.`;
    const url = `https://caracois.com.br/bee-cosmetics/${product.id}`;
    const image = product.image ? `https://caracois.com.br${product.image}` : 'https://caracois.com.br/images/og/og-bee-cosmetics.png';

    // Sempre atualiza o title para refletir o produto atual.
    // (A versão anterior tinha a condicional invertida e o title nunca era
    // atualizado pelo JS — funcionava só porque os HTMLs já vinham com
    // titles ricos estáticos. Mantém o comportamento defensivo: se chegar
    // sem document.title, usa o título gerado.)
    if (title) document.title = title;

    const metaMap = [
      ['meta[name="description"]', 'content', description],
      ['link[rel="canonical"]', 'href', url],
      ['meta[property="og:title"]', 'content', `${product.name} | Bee Cosmetics`],
      ['meta[property="og:description"]', 'content', description],
      ['meta[property="og:url"]', 'content', url],
      ['meta[property="og:image"]', 'content', image],
      ['meta[property="og:image:secure_url"]', 'content', image],
      ['meta[name="twitter:title"]', 'content', `${product.name} | Bee Cosmetics`],
      ['meta[name="twitter:description"]', 'content', description],
      ['meta[name="twitter:image"]', 'content', image]
    ];

    metaMap.forEach(([selector, attr, value]) => setAttr(selector, attr, value));
  }

  function renderProductPage(product) {
    document.body.classList.add('bee-product-page');
    document.body.dataset.productId = product.id;

    updateMetaTags(product);

    setText('#beeProductBreadcrumbCurrent', product.name);
    setText('#beeProductCategory', categoryLabel(product.category));
    setText('#beeProductName', product.name);
    setText('#beeProductType', product.type);
    setText('#beeProductDesc', product.desc || product.shortDesc || '');

    const pills = (product.tags || [])
      .map((tag) => `<span class="bee-product-pill">${esc(tag)}</span>`)
      .join('');
    setHtml('#beeProductPills', pills + (product.ph ? `<span class="bee-product-pill">${esc(product.ph)}</span>` : ''));

    setHtml('#beeProductImage', imageMarkup(product, 'eager'));
    setText('#beeProductVolume', product.volume || '—');
    setText('#beeProductPh', product.ph || '—');
    setText('#beeProductAnvisa', product.anvisa || '—');
    setText('#beeProductBarcode', product.barcode || product.gtin13 || '—');
    setText('#beeProductEditorialTitle', `${product.name}: ${product.type}`);
    setText('#beeProductEditorialText', product.shortDesc || product.desc || '');
    setText('#beeProductHowToUse', product.howToUse || '');
    setText('#beeProductIngredients', product.ingredients || '');
    setHtml('#beeProductMarkets', '');
    setHtml('#beeProductRelated', renderProductRelated(product));

    // Renderiza blocos inferiores premium de forma idempotente.
    // Remove versões antigas/duplicadas que causavam texto cru, links azuis e repetição visual.
    $$('.bee-product-dynamic-extra, #guia-de-uso.bee-product-guide, #onde-comprar.bee-product-buy-section, #avaliacao-gratuita.bee-product-next-step').forEach((el) => el.remove());
    const main = $('#main');
    if (main) {
      const wrapper = document.createElement('div');
      wrapper.className = 'bee-product-dynamic-extra';
      wrapper.innerHTML = renderGuideSection() + renderNextStepSection(product);
      main.insertAdjacentElement('beforeend', wrapper);
    }

    const buyBarTitle = $('#beeBuyBarTitle');
    if (buyBarTitle) buyBarTitle.textContent = product.name;

    $$('[data-current-product]').forEach((element) => {
      element.dataset.currentProduct = product.id;
    });

    bindImageFallbacks(document);
    document.body.classList.remove('js-render-pending');
    document.body.classList.add('js-render-ready');

    trackViewItem(product);
  }

  function injectRescueStyles() {
    if ($('#beeDynamicRescueStyles')) return;
    const style = document.createElement('style');
    style.id = 'beeDynamicRescueStyles';
    style.textContent = `
      .bee-product-page .bee-cat-guide,
      .bee-product-page .bee-cat-buy,
      .bee-product-page .bee-cat-cta-final { display:block; }

      .bee-product-page .bee-cat-buy a,
      .bee-product-page .bee-cat-guide a,
      .bee-product-page .bee-cat-cta-final a { text-decoration:none; }

      .bee-product-page .bee-cat-buy-grid {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:20px;
        margin-top:44px;
      }

      .bee-product-page .bee-cat-buy-card,
      .bee-product-page .bee-product-market-card {
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

      .bee-product-page .bee-cat-buy-card:hover,
      .bee-product-page .bee-product-market-card:hover {
        transform:translateY(-5px);
        border-color:var(--gold,#C4A265);
        box-shadow:0 22px 52px rgba(155,68,66,.12);
      }

      .bee-product-page .bee-cat-buy-logo {
        font-family:var(--serif);
        font-size:1.45rem;
        color:var(--terracota,#9B4442);
        font-weight:600;
      }

      .bee-product-page .bee-cat-buy-label {
        color:var(--text-light,#444);
        font-size:.86rem;
      }

      .bee-product-page .bee-cat-buy-arrow {
        color:var(--gold,#C4A265);
        font-size:1.1rem;
      }

      .bee-product-page .bee-cat-guide-steps {
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:24px;
      }

      .bee-product-page .bee-cat-guide-step {
        border-radius:18px;
        padding:30px 24px;
      }



      /* Rescue/compat para impedir links azuis e layout cru nos blocos dinâmicos */
      .bee-product-page .bee-product-dynamic-extra { background:#fff; color:var(--text,#2A2A2A); }
      .bee-product-page .bee-product-guide,
      .bee-product-page .bee-product-buy-section { background:#fff !important; color:var(--text,#2A2A2A) !important; padding:88px 0 !important; }
      .bee-product-page .bee-product-guide { background:linear-gradient(135deg,var(--nude-ultra,#FBF6F5),#fff) !important; }
      .bee-product-page .bee-product-next-step { background:linear-gradient(165deg,#120d0c 0%,#211514 42%,#7C3331 100%) !important; color:#fff !important; padding:86px 0 calc(94px + env(safe-area-inset-bottom)) !important; }
      .bee-product-page .bee-product-next-step .section-title,
      .bee-product-page .bee-product-next-step .bee-cat-cta-sub { color:#fff !important; }
      .bee-product-page .bee-product-next-step .section-label { color:var(--gold-light,#D4B97A) !important; }
      .bee-product-page .bee-cat-guide-intro,
      .bee-product-page .bee-cat-buy-inner,
      .bee-product-page .bee-cat-cta-inner { max-width:900px; margin:0 auto; text-align:center; }
      .bee-product-page .bee-cat-guide-steps { margin-top:42px; }
      .bee-product-page .bee-cat-guide-step { background:#fff; border:1px solid rgba(155,68,66,.08); box-shadow:0 18px 46px rgba(0,0,0,.045); text-align:left; }
      .bee-product-page .bee-cat-guide-num { color:var(--terracota,#9B4442); font-weight:700; letter-spacing:.10em; margin-bottom:12px; }
      .bee-product-page .bee-cat-guide-step h3 { font-family:var(--serif); color:var(--black,#141414); font-size:1.45rem; margin-bottom:8px; }
      .bee-product-page .bee-cat-guide-step p { color:var(--text-light,#444); line-height:1.65; }
      .bee-product-page .bee-product-buy-section a { color:inherit !important; text-decoration:none !important; }

      @media (max-width: 900px) {
        .bee-product-page .bee-cat-buy-grid,
        .bee-product-page .bee-cat-guide-steps { grid-template-columns:1fr; }
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
    track('bee_product_buy_intent', {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      origin: origin || 'unknown'
    });

    if (typeof window.openBeeModal === 'function') {
      window.openBeeModal();
      return;
    }

    const target = document.getElementById('onde-comprar');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const url = buildBeeMarketplaceUrl(MARKETPLACES[0], product);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function bindEvents(product) {
    if (window.__BEE_PRODUCT_PAGE_EVENTS_BOUND__) return;
    window.__BEE_PRODUCT_PAGE_EVENTS_BOUND__ = true;

    document.addEventListener('click', (event) => {
      const buy = event.target.closest('[data-bee-buy]');
      if (buy) {
        openMarketplaceModal(event, product, buy.dataset.origin || 'product-page');
        return;
      }

      const market = event.target.closest('[data-market]');
      if (market) {
        track('bee_marketplace_click', {
          product_id: market.dataset.product || product.id,
          product_name: product.name,
          market: market.dataset.market || '',
          origin: market.dataset.origin || '',
          link_url: market.href || ''
        });
      }

      const related = event.target.closest('[data-product-related]');
      if (related) {
        track('bee_related_product_click', {
          product_id: product.id,
          product_name: product.name,
          related_product_id: related.dataset.productRelated || ''
        });
      }
    });
  }

  function initStickyBuyBar(product) {
    const bar = $('#beeBuyBar');
    const hero = $('.bee-product-hero');
    if (!bar || !hero) return;

    const button = $('[data-bee-buy]', bar);
    if (button) {
      button.dataset.currentProduct = product.id;
      button.dataset.origin = button.dataset.origin || 'sticky-buy-bar';
    }

    if (!('IntersectionObserver' in window)) {
      bar.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        bar.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0.08 });

    observer.observe(hero);
  }

  function reportNotFound(slug) {
    document.body.classList.remove('js-render-pending');
    document.body.classList.add('js-render-ready', 'bee-product-not-found');
    setText('#beeProductName', 'Produto não encontrado');
    setText('#beeProductType', 'Bee Cosmetics');
    setText('#beeProductDesc', 'Não encontramos esse produto no catálogo dinâmico. Volte para a página Bee Cosmetics e escolha um item da linha.');
    // Substitui CTAs por um link de retorno ao catálogo, evitando botões mortos
    const ctas = $('.bee-product-ctas');
    if (ctas) {
      ctas.innerHTML = '<a href="/bee-cosmetics" class="btn btn-gold">Ver catálogo Bee Cosmetics</a>';
    }
    track('bee_product_not_found', { slug });
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
    initStickyBuyBar(product);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  } else {
    boot();
  }
})();
