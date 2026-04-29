/* Bee Cosmetics — catálogo frontend home-safe
   Corrige o grid e os modais usando exatamente as classes esperadas pelo main.css.
   Mantém tracking seguro para GA4, Meta Pixel, Clarity e dataLayer.
*/
(function () {
  'use strict';

  const PRODUCTS = [
    { id:'born-to-bee', name:'Born to BEE', type:'Shampoo Sem Sulfato', category:'limpeza', image:'/images/products/born-to-bee.webp', desc:'Limpeza eficaz sem ressecar, com ingredientes naturais hidratantes e condicionantes.', tags:['Low poo','Sem sulfato','Limpeza suave'] },
    { id:'feel-the-beeat', name:'Feel the BEEat', type:'Co-Wash', category:'limpeza', image:'/images/products/cowash-linha1.webp', desc:'Limpeza, condicionamento e hidratação com aloe vera, manteiga de oliva e queratina.', tags:['No poo','Co-wash','Hidratação'] },
    { id:'beetween-gardens', name:'BEEtween Gardens', type:'Máscara de Nutrição', category:'tratamento', image:'/images/products/beetween-gardens.webp', desc:'Hidratação e nutrição com D-pantenol, manteiga de abacate e óleo de coco.', tags:['Nutrição','Brilho','Maciez'] },
    { id:'after-beeach', name:'After BEEch', type:'Máscara de Reconstrução', category:'tratamento', image:'/images/products/after-beeach.webp', desc:'Reparo intensivo com manteiga de oliva e proteína do trigo.', tags:['Reconstrução','Força','Reparo'] },
    { id:'beeloved-oil', name:'BEEloved Oil', type:'Máscara de Umectação', category:'tratamento', image:'/images/products/beeloved-oil.webp', desc:'Umectação profunda com óleo de coco, linhaça, manteiga de oliva e cera de arroz.', tags:['Umectação','Nutrição intensa','Óleos'] },
    { id:'bee-yourself', name:'BEE Yourself', type:'Leave-in Super Definição', category:'finalizacao', image:'/images/products/bee-yourself.webp', desc:'Definição com hidratação, brilho, redução de porosidade e acabamento impecável.', tags:['Definição','Brilho','Finalização'] },
    { id:'bee-proud', name:'BEE Proud', type:'Leave-in Antiencolhimento', category:'finalizacao', image:'/images/products/bee-proud.webp', desc:'Reduz fator encolhimento com manteiga de oliva e óleo de algodão.', tags:['Antiencolhimento','Volume','Finalização'] },
    { id:'be-my-bee', name:'Be my BEE', type:'Gelatina Capilar', category:'finalizacao', image:'/images/products/be-my-bee.webp', desc:'Definição com fixação e hidratação com aloe vera e extrato de cana-de-açúcar.', tags:['Fixação','Definição','Day after'] },
    { id:'beelieve-in-acid', name:'BEElieve in Acid', type:'Acidificante', category:'tratamento', image:'/images/products/beelieve-in-acid.webp', desc:'Sela cutículas, equilibra o pH e intensifica o brilho dos fios.', tags:['Acidificação','Porosidade','Brilho'] },
    { id:'let-it-bee', name:'Let it BEE', type:'Leave-in Leveza Natural', category:'finalizacao', image:'/images/products/let-it-bee.webp', desc:'Proteção térmica, controle de frizz e leveza para todos os tipos de curvatura.', tags:['Leveza','Frizz','Proteção térmica'] }
  ];

  const marketplaceQuery = encodeURIComponent('bee cosmetics cabelo cacheado');
  const MARKETPLACES = [
    { name:'Amazon', href:`https://www.amazon.com.br/s?k=${marketplaceQuery}`, key:'amazon', icon:'/images/icons/amazon.svg', subtitle:'Buscar produtos Bee' },
    { name:'Shopee', href:`https://shopee.com.br/search?keyword=${marketplaceQuery}`, key:'shopee', icon:'/images/icons/shopee.svg', subtitle:'Buscar ofertas Bee' },
    { name:'Mercado Livre', href:'https://lista.mercadolivre.com.br/bee-cosmetics', key:'mercadolivre', icon:'/images/icons/mercadolivre.svg', subtitle:'Buscar Bee Cosmetics' }
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function track(eventName, payload) {
    const data = Object.assign({
      site: 'caracois.com.br',
      page_path: window.location.pathname,
      page_location: window.location.href
    }, payload || {});

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, data));

    try { if (typeof window.gtag === 'function') window.gtag('event', eventName, data); } catch(e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, data); } catch(e) {}
    try {
      if (typeof window.clarity === 'function') {
        window.clarity('event', eventName);
        if (data.product_id) window.clarity('set', 'bee_product', data.product_id);
        if (data.market) window.clarity('set', 'bee_marketplace', data.market);
      }
    } catch(e) {}
  }

  function card(product) {
    // IMPORTANTE: essas classes são as que o main.css da home estiliza.
    // Não trocar para bee-product-image/bee-product-content, pois quebra o layout da home.
    return `
      <article class="bee-product-card" id="${esc(product.id)}" tabindex="0" data-category="${esc(product.category)}" data-product-card="${esc(product.id)}">
        <div class="bee-product-img">
          <span class="bee-product-tag-float">${esc(product.category)}</span>
          <img src="${esc(product.image)}" alt="${esc(product.name)} — ${esc(product.type)}" loading="lazy" decoding="async" onerror="this.style.display='none'; this.parentElement.classList.add('image-fallback');">
        </div>
        <div class="bee-product-info">
          <div class="product-type">${esc(product.type)}</div>
          <h4>${esc(product.name)}</h4>
          <p>${esc(product.desc)}</p>
          <div class="bee-product-meta-row">
            ${product.tags.map(t => `<span class="bee-product-pill bee-product-pill--tag">${esc(t)}</span>`).join('')}
          </div>
          <div class="bee-product-actions">
            <button type="button" class="btn-mini" data-product="${esc(product.id)}" data-cta="bee_product_details">Ver detalhes</button>
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
    });
  }

  function productById(id) {
    return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  }

  function closeProductModal() {
    const modal = $('#productModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  function openProductModal(id) {
    const p = productById(id);
    const modal = $('#productModal');
    const content = $('#productModalContent') || $('.product-modal-content', modal) || $('.product-modal-body', modal) || $('.product-modal', modal);
    if (!modal || !content) return;

    content.innerHTML = `
      <button type="button" class="pm-close" onclick="closeProductModal()" aria-label="Fechar">&times;</button>
      <div class="pm-grid">
        <div class="pm-image">
          <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async">
        </div>
        <div class="pm-content">
          <div class="pm-eyebrow">${esc(p.type)}</div>
          <h2>${esc(p.name)}</h2>
          <p class="pm-desc">${esc(p.desc)}</p>

          <div class="pm-specs">
            <div class="pm-spec"><span>Categoria</span><strong>${esc(p.category)}</strong></div>
            <div class="pm-spec"><span>Indicado para</span><strong>Cabelos com curvatura</strong></div>
            <div class="pm-spec"><span>Rotina</span><strong>${p.tags.includes('No poo') ? 'No poo' : 'Low/No poo'}</strong></div>
            <div class="pm-spec"><span>Destaques</span><strong>${esc(p.tags.slice(0,2).join(' + '))}</strong></div>
          </div>

          <div class="pm-section">
            <h3>Como usar na rotina</h3>
            <p>Use conforme a orientação da especialista e de acordo com a etapa do cronograma capilar: limpeza, tratamento ou finalização.</p>
          </div>

          <div class="pm-markets" aria-label="Comprar Bee Cosmetics">
            ${MARKETPLACES.map(m => `
              <a class="pm-market-link" href="${esc(m.href)}" target="_blank" rel="noopener noreferrer" data-market="${esc(m.key)}" data-origin="product-modal" data-product="${esc(p.id)}">
                <img src="${esc(m.icon)}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none';">
                <span><strong>${esc(m.name)}</strong><small>${esc(m.subtitle)}</small></span>
              </a>`).join('')}
          </div>
        </div>
      </div>`;

    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    track('bee_product_modal_open', {
      channel: 'bee',
      cta_type: 'product_details',
      product_id: p.id,
      product_name: p.name,
      product_category: p.category
    });
  }

  function openBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    track('bee_marketplace_modal_open', { channel: 'bee', cta_type: 'marketplace_modal' });
  }

  function closeBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
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
        track('bee_filter_click', { channel: 'bee', filter: filterValue });
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
          channel: 'bee',
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
