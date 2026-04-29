/* Bee Cosmetics — catálogo frontend 10/10
   Compatível com o main.css atual da home e com modal de produto refinado.
   Não depende de bee-tracking.js.
*/
(function () {
  'use strict';

  const BUILD_VERSION = '20260429-home-bee-modal-10-10';

  const PRODUCTS = [
    { id:'born-to-bee', name:'Born to BEE', type:'Shampoo Sem Sulfato', category:'limpeza', image:'/images/products/born-to-bee.webp', desc:'Limpeza eficaz sem ressecar, com ingredientes naturais hidratantes e condicionantes.', tags:['Low poo','Sem sulfato','Limpeza suave'], ph:'pH 4,5' },
    { id:'feel-the-beeat', name:'Feel the BEEat', type:'Co-Wash', category:'limpeza', image:'/images/products/cowash-linha1.webp', desc:'Limpeza, condicionamento e hidratação com aloe vera, manteiga de oliva e queratina.', tags:['No poo','Co-wash','Hidratação'], ph:'pH 4,5' },
    { id:'beetween-gardens', name:'BEEtween Gardens', type:'Máscara de Nutrição', category:'tratamento', image:'/images/products/beetween-gardens.webp', desc:'Hidratação e nutrição com D-pantenol, manteiga de abacate e óleo de coco.', tags:['Nutrição','Brilho','Maciez'], ph:'pH 4,0' },
    { id:'after-beeach', name:'After BEEach', type:'Máscara de Reconstrução', category:'tratamento', image:'/images/products/after-beeach.webp', desc:'Reparo intensivo com manteiga de oliva e proteína do trigo.', tags:['Reconstrução','Força','Reparo'], ph:'pH 4,0' },
    { id:'beeloved-oil', name:'BEEloved Oil', type:'Máscara de Umectação', category:'tratamento', image:'/images/products/beeloved-oil.webp', desc:'Umectação profunda com óleo de coco, linhaça, manteiga de oliva e cera de arroz.', tags:['Umectação','Nutrição intensa','Óleos'], ph:'pH 4,0' },
    { id:'bee-yourself', name:'BEE Yourself', type:'Leave-in Super Definição', category:'finalizacao', image:'/images/products/bee-yourself.webp', desc:'Definição com hidratação, brilho, redução de porosidade e acabamento impecável.', tags:['Definição','Brilho','Finalização'], ph:'pH 4,0' },
    { id:'bee-proud', name:'BEE Proud', type:'Leave-in Antiencolhimento', category:'finalizacao', image:'/images/products/bee-proud.webp', desc:'Reduz fator encolhimento com manteiga de oliva e óleo de algodão.', tags:['Antiencolhimento','Volume','Finalização'], ph:'pH 4,0' },
    { id:'be-my-bee', name:'Be my BEE', type:'Gelatina Capilar', category:'finalizacao', image:'/images/products/be-my-bee.webp', desc:'Definição com fixação e hidratação com aloe vera e extrato de cana-de-açúcar.', tags:['Fixação','Definição','Day after'], ph:'pH 4,0' },
    { id:'beelieve-in-acid', name:'BEElieve in Acid', type:'Acidificante', category:'tratamento', image:'/images/products/beelieve-in-acid.webp', desc:'Sela cutículas, equilibra o pH e intensifica o brilho dos fios.', tags:['Acidificação','Porosidade','Brilho'], ph:'pH 3,5' },
    { id:'let-it-bee', name:'Let it BEE', type:'Leave-in Leveza Natural', category:'finalizacao', image:'/images/products/let-it-bee.webp', desc:'Proteção térmica, controle de frizz e leveza para todos os tipos de curvatura.', tags:['Leveza','Frizz','Proteção térmica'], ph:'pH 4,0' }
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
          <img src="${esc(product.image)}" alt="${esc(product.name)} — ${esc(product.type)}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden';">
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
      <button type="button" class="pm-close" onclick="closeProductModal()" aria-label="Fechar">&times;</button>
      <div class="pm-grid">
        <div class="pm-image">
          <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden';">
        </div>
        <div class="pm-content">
          <div class="pm-eyebrow">${esc(p.type)}</div>
          <h2>${esc(p.name)}</h2>
          <p class="pm-desc">${esc(p.desc)}</p>
          <div class="bee-product-meta-row pm-pills">${tagPills}${phPill}</div>

          <div class="pm-info">
            <div class="pm-info-item"><span>Categoria</span><strong>${esc(p.category)}</strong></div>
            <div class="pm-info-item"><span>Rotina</span><strong>${p.tags.includes('No poo') ? 'No poo' : 'Low/No poo'}</strong></div>
          </div>

          <div class="pm-section">
            <h3>Onde comprar</h3>
            <p>Confira a disponibilidade da linha Bee Cosmetics nos marketplaces.</p>
          </div>

          <div class="pm-markets">
            ${MARKETPLACES.map(m => `
              <a class="pm-market-link" href="${esc(m.href)}" target="_blank" rel="noopener noreferrer" data-market="${esc(m.key)}" data-origin="product-modal" data-product="${esc(p.id)}">
                <img src="${esc(m.icon)}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none';">
                <span><strong>${esc(m.name)}</strong><small>Buscar produto</small></span>
              </a>`).join('')}
          </div>
        </div>
      </div>`;

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
  });

  window.BEE_PRODUCTS = PRODUCTS;
  window.openBeeModal = openBeeModal;
  window.closeBeeModal = closeBeeModal;
  window.closeBeeModalOnOverlay = closeBeeModalOnOverlay;
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
})();
