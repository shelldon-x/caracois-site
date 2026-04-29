/* Bee Cosmetics — catálogo frontend */
(function () {
  'use strict';

  const PRODUCTS = [
    { id:'born-to-bee', name:'Born to BEE', type:'Shampoo Sem Sulfato', category:'limpeza', image:'/images/products/born-to-bee.webp', desc:'Limpeza eficaz sem ressecar, com ingredientes naturais hidratantes e condicionantes.', tags:['Low poo','Sem sulfato','Limpeza suave'] },
    { id:'feel-the-beeat', name:'Feel the BEEat', type:'Co-Wash', category:'limpeza', image:'/images/products/cowash-linha1.webp', desc:'Limpeza, condicionamento e hidratação com aloe vera, manteiga de oliva e queratina.', tags:['No poo','Co-wash','Hidratação'] },
    { id:'beetween-gardens', name:'BEEtween Gardens', type:'Máscara de Nutrição', category:'tratamento', image:'/images/products/beetween-gardens.webp', desc:'Hidratação e nutrição com D-pantenol, manteiga de abacate e óleo de coco.', tags:['Nutrição','Brilho','Maciez'] },
    { id:'after-beeach', name:'After BEEach', type:'Máscara de Reconstrução', category:'tratamento', image:'/images/products/after-beeach.webp', desc:'Reparo intensivo com manteiga de oliva e proteína do trigo.', tags:['Reconstrução','Força','Reparo'] },
    { id:'beeloved-oil', name:'BEEloved Oil', type:'Máscara de Umectação', category:'tratamento', image:'/images/products/beeloved-oil.webp', desc:'Umectação profunda com óleo de coco, linhaça, manteiga de oliva e cera de arroz.', tags:['Umectação','Nutrição intensa','Óleos'] },
    { id:'bee-yourself', name:'BEE Yourself', type:'Leave-in Super Definição', category:'finalizacao', image:'/images/products/bee-yourself.webp', desc:'Definição com hidratação, brilho, redução de porosidade e acabamento impecável.', tags:['Definição','Brilho','Finalização'] },
    { id:'bee-proud', name:'BEE Proud', type:'Leave-in Antiencolhimento', category:'finalizacao', image:'/images/products/bee-proud.webp', desc:'Reduz fator encolhimento com manteiga de oliva e óleo de algodão.', tags:['Antiencolhimento','Volume','Finalização'] },
    { id:'be-my-bee', name:'Be my BEE', type:'Gelatina Capilar', category:'finalizacao', image:'/images/products/be-my-bee.webp', desc:'Definição com fixação e hidratação com aloe vera e extrato de cana-de-açúcar.', tags:['Fixação','Definição','Day after'] },
    { id:'beelieve-in-acid', name:'BEElieve in Acid', type:'Acidificante', category:'tratamento', image:'/images/products/beelieve-in-acid.webp', desc:'Sela cutículas, equilibra o pH e intensifica o brilho dos fios.', tags:['Acidificação','Porosidade','Brilho'] },
    { id:'let-it-bee', name:'Let it BEE', type:'Leave-in Leveza Natural', category:'finalizacao', image:'/images/products/let-it-bee.webp', desc:'Proteção térmica, controle de frizz e leveza para todos os tipos de curvatura.', tags:['Leveza','Frizz','Proteção térmica'] }
  ];

  const marketplaceQuery = encodeURIComponent('bee cosmetics cabelo cacheado');
  const MARKETPLACES = [
    { name:'Amazon', href:`https://www.amazon.com.br/s?k=${marketplaceQuery}`, key:'amazon' },
    { name:'Shopee', href:`https://shopee.com.br/search?keyword=${marketplaceQuery}`, key:'shopee' },
    { name:'Mercado Livre', href:'https://lista.mercadolivre.com.br/bee-cosmetics', key:'mercadolivre' }
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function card(product) {
    return `
      <article class="bee-product-card bee-cat-product-card" id="${esc(product.id)}" tabindex="0" data-category="${esc(product.category)}">
        <div class="bee-product-image bee-cat-product-image">
          <img src="${esc(product.image)}" alt="${esc(product.name)} — ${esc(product.type)}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('image-fallback');">
        </div>
        <div class="bee-product-content bee-cat-product-content">
          <div class="bee-product-category">${esc(product.type)}</div>
          <h3>${esc(product.name)}</h3>
          <p>${esc(product.desc)}</p>
          <div class="bee-product-tags">${product.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
          <button type="button" class="btn btn-primary bee-product-more" data-product="${esc(product.id)}">Ver detalhes</button>
        </div>
      </article>`;
  }

  function render(filter = 'all') {
    const grids = ['#beeProductsGrid', '#beeProducts'];
    grids.forEach((selector) => {
      const grid = $(selector);
      if (!grid) return;
      const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
      grid.innerHTML = list.map(card).join('');
    });
  }

  function productById(id) { return PRODUCTS.find(p => p.id === id) || PRODUCTS[0]; }

  function openProductModal(id) {
    const p = productById(id);
    const modal = $('#productModal');
    const content = $('#productModalContent') || $('.product-modal-content', modal) || $('.product-modal-body', modal) || $('.product-modal');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="pm-grid">
        <div class="pm-image">
          <img src="${esc(p.image)}" alt="${esc(p.name)} — ${esc(p.type)}" loading="lazy" decoding="async">
        </div>
        <div class="pm-content">
          <div class="pm-eyebrow">${esc(p.type)}</div>
          <h2>${esc(p.name)}</h2>
          <p class="pm-desc">${esc(p.desc)}</p>

          <div class="pm-specs">
            <div class="pm-spec">
              <span>Categoria</span>
              <strong>${esc(p.category)}</strong>
            </div>
            <div class="pm-spec">
              <span>Indicação</span>
              <strong>${p.tags.map(t => esc(t)).join(' · ')}</strong>
            </div>
          </div>

          <div class="pm-section">
            <h3>Por que usar</h3>
            <p>${esc(p.desc)}</p>
          </div>

          <div class="pm-markets">
            ${MARKETPLACES.map(m => `
              <a class="pm-market-link" href="${m.href}" target="_blank" rel="noopener noreferrer" data-market="${m.key}" data-cta="bee_marketplace_click" data-origin="product-modal">
                <img src="/images/icons/${m.key}.svg" alt="${esc(m.name)}" width="24" height="24" loading="lazy" onerror="this.style.display='none'">
                <span>
                  <strong>${esc(m.name)}</strong>
                  <small>Buscar produto</small>
                </span>
              </a>`).join('')}
          </div>
        </div>
      </div>`;

    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'bee_product_modal_open', product_id: p.id, product_name: p.name, category: p.category });
      if (typeof gtag === 'function') gtag('event', 'bee_product_modal_open', { product_id: p.id, product_name: p.name, category: p.category });
      if (typeof fbq === 'function') fbq('trackCustom', 'BeeProductModalOpen', { product_id: p.id, product_name: p.name, category: p.category });
      if (typeof clarity === 'function') clarity('event', 'bee_product_modal_open');
    } catch(e) {}
  }

  function closeProductModal() {
    const modal = $('#productModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
  }

  function openBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'bee_modal_open', area: 'marketplace_hub' }); if (typeof gtag === 'function') gtag('event', 'bee_modal_open', { area: 'marketplace_hub' }); if (typeof fbq === 'function') fbq('trackCustom', 'BeeModalOpen', { area: 'marketplace_hub' }); if (typeof clarity === 'function') clarity('event', 'bee_modal_open'); } catch(e) {}
  }

  function closeBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
  }

  function closeBeeModalOnOverlay(event) {
    if (event && event.currentTarget === event.target) closeBeeModal();
  }

  document.addEventListener('DOMContentLoaded', () => {
    render('all');
    document.addEventListener('click', (event) => {
      const filter = event.target.closest('.bee-filter-btn, .bee-cat-filter-btn');
      if (filter) {
        $$('.bee-filter-btn, .bee-cat-filter-btn').forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected','false'); });
        filter.classList.add('active');
        filter.setAttribute('aria-selected','true');
        render(filter.dataset.filter || 'all');
      }
      const productBtn = event.target.closest('[data-product]');
      if (productBtn) openProductModal(productBtn.dataset.product);
    });
  });

  window.BEE_PRODUCTS = PRODUCTS;
  window.openBeeModal = openBeeModal;
  window.closeBeeModal = closeBeeModal;
  window.closeBeeModalOnOverlay = closeBeeModalOnOverlay;
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
})();
