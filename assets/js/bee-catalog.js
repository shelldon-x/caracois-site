/* Bee Cosmetics — catálogo frontend 100% final
   Correções finais:
   - fallback robusto para imagens ausentes/renomeadas;
   - placeholder premium quando a imagem não carrega;
   - contraste melhorado dos marketplaces dentro da ficha do produto;
   - modal geral Bee preservado.
*/
(function () {
  'use strict';

  const BUILD_VERSION = '20260429-bee-final-100';

  const PRODUCTS = [
    { id:'born-to-bee', name:'Born to BEE', type:'Shampoo Sem Sulfato', category:'limpeza', image:'/images/products/born-to-bee.webp', fallbacks:['/images/products/born-to-bee.png','/images/products/shampoo-born-to-bee.webp'], desc:'Limpeza eficaz sem ressecar, com ingredientes naturais hidratantes e condicionantes.', tags:['Low poo','Sem sulfato','Limpeza suave'], ph:'pH 4,5' },
    { id:'feel-the-beeat', name:'Feel the BEEat', type:'Co-Wash', category:'limpeza', image:'/images/products/cowash-linha1.webp', fallbacks:['/images/products/feel-the-beeat.webp','/images/products/cowash.webp','/images/products/co-wash.webp'], desc:'Limpeza, condicionamento e hidratação com aloe vera, manteiga de oliva e queratina.', tags:['No poo','Co-wash','Hidratação'], ph:'pH 4,5' },
    { id:'beetween-gardens', name:'BEEtween Gardens', type:'Máscara de Nutrição', category:'tratamento', image:'/images/products/beetween-gardens.webp', fallbacks:['/images/products/between-gardens.webp','/images/products/mascara-nutricao.webp'], desc:'Hidratação e nutrição com D-pantenol, manteiga de abacate e óleo de coco.', tags:['Nutrição','Brilho','Maciez'], ph:'pH 4,0' },
    { id:'after-beeach', name:'After BEEach', type:'Máscara de Reconstrução', category:'tratamento', image:'/images/products/after-beeach.webp', fallbacks:['/images/products/after-beach.webp','/images/products/after-beeatch.webp','/images/products/mascara-reconstrucao.webp'], desc:'Reparo intensivo com manteiga de oliva e proteína do trigo.', tags:['Reconstrução','Força','Reparo'], ph:'pH 4,0' },
    { id:'beeloved-oil', name:'BEEloved Oil', type:'Máscara de Umectação', category:'tratamento', image:'/images/products/beeloved-oil.webp', fallbacks:['/images/products/bee-loved-oil.webp','/images/products/beeloved.webp','/images/products/mascara-umectacao.webp'], desc:'Umectação profunda com óleo de coco, linhaça, manteiga de oliva e cera de arroz.', tags:['Umectação','Nutrição intensa','Óleos'], ph:'pH 4,0' },
    { id:'bee-yourself', name:'BEE Yourself', type:'Leave-in Super Definição', category:'finalizacao', image:'/images/products/bee-yourself.webp', fallbacks:['/images/products/leavein-bee-yourself.webp','/images/products/leave-in-bee-yourself.webp'], desc:'Definição com hidratação, brilho, redução de porosidade e acabamento impecável.', tags:['Definição','Brilho','Finalização'], ph:'pH 4,0' },
    { id:'bee-proud', name:'BEE Proud', type:'Leave-in Antiencolhimento', category:'finalizacao', image:'/images/products/bee-proud.webp', fallbacks:['/images/products/leavein-bee-proud.webp','/images/products/leave-in-bee-proud.webp'], desc:'Reduz fator encolhimento com manteiga de oliva e óleo de algodão.', tags:['Antiencolhimento','Volume','Finalização'], ph:'pH 4,0' },
    { id:'be-my-bee', name:'Be my BEE', type:'Gelatina Capilar', category:'finalizacao', image:'/images/products/be-my-bee.webp', fallbacks:['/images/products/gelatina-be-my-bee.webp','/images/products/gelatina.webp'], desc:'Definição com fixação e hidratação com aloe vera e extrato de cana-de-açúcar.', tags:['Fixação','Definição','Day after'], ph:'pH 4,0' },
    { id:'beelieve-in-acid', name:'BEElieve in Acid', type:'Acidificante', category:'tratamento', image:'/images/products/beelieve-in-acid.webp', fallbacks:['/images/products/believe-in-acid.webp','/images/products/acidificante.webp'], desc:'Sela cutículas, equilibra o pH e intensifica o brilho dos fios.', tags:['Acidificação','Porosidade','Brilho'], ph:'pH 3,5' },
    { id:'let-it-bee', name:'Let it BEE', type:'Leave-in Leveza Natural', category:'finalizacao', image:'/images/products/let-it-bee.webp', fallbacks:['/images/products/leavein-let-it-bee.webp','/images/products/leave-in-let-it-bee.webp'], desc:'Proteção térmica, controle de frizz e leveza para todos os tipos de curvatura.', tags:['Leveza','Frizz','Proteção térmica'], ph:'pH 4,0' }
  ];

  const marketplaceQuery = encodeURIComponent('bee cosmetics cabelo cacheado');
  const MARKETPLACES = [
    { name:'Amazon', href:`https://www.amazon.com.br/s?k=${marketplaceQuery}`, key:'amazon', icon:'/images/icons/amazon.svg' },
    { name:'Shopee', href:`https://shopee.com.br/search?keyword=${marketplaceQuery}`, key:'shopee', icon:'/images/icons/shopee.svg' },
    { name:'Mercado Livre', href:'https://lista.mercadolivre.com.br/bee-cosmetics', key:'mercadolivre', icon:'/images/icons/mercadolivre.svg' }
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function imageAttrs(product) {
    const list = [product.image].concat(product.fallbacks || []);
    return `src="${esc(list[0])}" data-fallbacks='${esc(JSON.stringify(list.slice(1)))}'`;
  }

  function installImageFallback(img) {
    if (!img || img.dataset.fallbackReady === '1') return;
    img.dataset.fallbackReady = '1';
    img.addEventListener('error', function () {
      let fallbacks = [];
      try { fallbacks = JSON.parse(this.dataset.fallbacks || '[]'); } catch(e) {}
      const next = fallbacks.shift();
      if (next) {
        this.dataset.fallbacks = JSON.stringify(fallbacks);
        this.src = next;
        return;
      }
      const wrap = this.closest('.bee-product-img, .pm-image');
      this.style.display = 'none';
      if (wrap) {
        wrap.classList.add('bee-image-missing');
        if (!wrap.querySelector('.bee-image-placeholder')) {
          const ph = document.createElement('div');
          ph.className = 'bee-image-placeholder';
          ph.innerHTML = '<span>Bee<br>Cosmetics</span>';
          wrap.appendChild(ph);
        }
      }
    });
  }

  function initImageFallbacks(root = document) {
    $$('img[data-fallbacks]', root).forEach(installImageFallback);
  }

  function cleanPayload(payload) {
    const out = {};
    Object.entries(payload || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') out[key] = String(value).slice(0, 160);
    });
    return out;
  }

  function track(eventName, payload) {
    const data = cleanPayload(Object.assign({
      site: 'caracois.com.br',
      channel: 'bee',
      page_path: window.location.pathname,
      page_title: document.title || '',
      build_version: BUILD_VERSION
    }, payload || {}));

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, data));

    try { if (typeof window.gtag === 'function') window.gtag('event', eventName, Object.assign({ transport_type: 'beacon' }, data)); } catch(e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, data); } catch(e) {}
    try {
      if (typeof window.clarity === 'function') {
        window.clarity('event', eventName);
        if (data.product_id) window.clarity('set', 'bee_product_id', data.product_id);
        if (data.market) window.clarity('set', 'bee_marketplace', data.market);
      }
    } catch(e) {}
  }

  function card(product) {
    const tagPills = product.tags.map(t => `<span class="bee-product-pill bee-product-pill--tag">${esc(t)}</span>`).join('');
    const phPill = product.ph ? `<span class="bee-product-pill bee-product-pill--ph">${esc(product.ph)}</span>` : '';

    return `
      <article class="bee-product-card" id="${esc(product.id)}" tabindex="0" data-category="${esc(product.category)}" data-product-card="${esc(product.id)}">
        <div class="bee-product-img">
          <img ${imageAttrs(product)} alt="${esc(product.name)} — ${esc(product.type)}" loading="lazy" decoding="async">
        </div>
        <div class="bee-product-info">
          <div class="product-type">${esc(product.type)}</div>
          <h4>${esc(product.name)}</h4>
          <p>${esc(product.desc)}</p>
          <div class="bee-product-meta-row">${tagPills}${phPill}</div>
          <div class="bee-product-actions">
            <button type="button" class="btn-mini" data-product="${esc(product.id)}" data-cta="bee_product_details" aria-label="Ver detalhes de ${esc(product.name)}">Ver detalhes</button>
          </div>
        </div>
      </article>`;
  }

  function render(filter = 'all') {
    ['#beeProductsGrid', '#beeProducts'].forEach((selector) => {
      const grid = $(selector);
      if (!grid) return;
      const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
      grid.innerHTML = list.map(card).join('');
      grid.dataset.beeRendered = 'true';
      grid.dataset.beeFilter = filter;
      initImageFallbacks(grid);
    });
  }

  function productById(id) {
    return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  }

  function setModalLock(locked) {
    document.documentElement.classList.toggle('modal-open', locked);
    document.body.classList.toggle('modal-open', locked);
  }

  function openProductModal(id) {
    const p = productById(id);
    const modal = $('#productModal');
    const content = $('#productModalContent') || $('.product-modal-content', modal) || $('.product-modal-body', modal) || $('.product-modal', modal);
    if (!modal || !content) return;

    const tagPills = p.tags.map(t => `<span class="bee-product-pill bee-product-pill--tag">${esc(t)}</span>`).join('');
    const phPill = p.ph ? `<span class="bee-product-pill bee-product-pill--ph">${esc(p.ph)}</span>` : '';

    content.innerHTML = `
      <div class="pm-grid">
        <div class="pm-image">
          <img ${imageAttrs(p)} alt="${esc(p.name)}" loading="lazy" decoding="async">
        </div>
        <div class="pm-content">
          <div class="pm-eyebrow">${esc(p.type)}</div>
          <h2>${esc(p.name)}</h2>
          <p class="pm-desc">${esc(p.desc)}</p>

          <div class="pm-specs">
            <div class="pm-spec"><span>Categoria</span><strong>${esc(p.category)}</strong></div>
            <div class="pm-spec"><span>Rotina</span><strong>${p.tags.includes('No poo') ? 'No poo' : 'Low/No poo'}</strong></div>
          </div>

          <div class="bee-product-meta-row pm-pills">${tagPills}${phPill}</div>

          <div class="pm-section">
            <h3>Onde comprar</h3>
            <p>Confira a disponibilidade da linha Bee Cosmetics nos marketplaces.</p>
          </div>

          <div class="pm-markets">
            ${MARKETPLACES.map(m => `
              <a class="pm-market-link pm-market-link--${esc(m.key)}" href="${esc(m.href)}" target="_blank" rel="noopener noreferrer" data-market="${esc(m.key)}" data-origin="product-modal" data-product="${esc(p.id)}">
                <span class="pm-market-icon"><img src="${esc(m.icon)}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'; this.parentElement.classList.add('pm-market-icon--fallback');"></span>
                <span class="pm-market-copy"><strong>${esc(m.name)}</strong><small>Buscar produto</small></span>
              </a>`).join('')}
          </div>
        </div>
      </div>`;

    initImageFallbacks(content);
    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    setModalLock(true);

    track('bee_product_modal_open', {
      cta_type: 'product_details',
      product_id: p.id,
      product_name: p.name,
      product_category: p.category
    });
  }

  function closeProductModal() {
    const modal = $('#productModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    setModalLock(false);
  }

  function openBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    setModalLock(true);
    track('bee_marketplace_modal_open', { cta_type: 'marketplace_modal' });
  }

  function closeBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    setModalLock(false);
  }

  function closeBeeModalOnOverlay(event) {
    if (event && event.currentTarget === event.target) closeBeeModal();
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const filter = event.target.closest('.bee-filter-btn, .bee-cat-filter-btn');
      if (filter) {
        $$('.bee-filter-btn, .bee-cat-filter-btn').forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected','false');
        });
        filter.classList.add('active');
        filter.setAttribute('aria-selected','true');
        const filterValue = filter.dataset.filter || 'all';
        render(filterValue);
        track('bee_filter_click', { cta_type: 'filter', filter: filterValue });
        return;
      }

      const productBtn = event.target.closest('[data-product][data-cta="bee_product_details"], .bee-product-card[data-product-card]');
      if (productBtn) {
        const id = productBtn.dataset.product || productBtn.dataset.productCard;
        if (id) openProductModal(id);
        return;
      }

      const market = event.target.closest('[data-market]');
      if (market) {
        track('bee_marketplace_click', {
          cta_type: 'marketplace',
          market: market.dataset.market || '',
          origin: market.dataset.origin || '',
          product_id: market.dataset.product || '',
          link_url: market.href || ''
        });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeBeeModal();
        closeProductModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    render('all');
    bindEvents();
    initImageFallbacks();
  });

  window.BEE_PRODUCTS = PRODUCTS;
  window.openBeeModal = openBeeModal;
  window.closeBeeModal = closeBeeModal;
  window.closeBeeModalOnOverlay = closeBeeModalOnOverlay;
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
})();
