/* Bee Cosmetics — catálogo frontend (CORRIGIDO) */
(function () {
  'use strict';

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
    { name:'Amazon', href:`https://www.amazon.com.br/s?k=${marketplaceQuery}`, key:'amazon' },
    { name:'Shopee', href:`https://shopee.com.br/search?keyword=${marketplaceQuery}`, key:'shopee' },
    { name:'Mercado Livre', href:'https://lista.mercadolivre.com.br/bee-cosmetics', key:'mercadolivre' }
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  // Render usa as classes corretas que o main.css e bee-cosmetics.css esperam:
  //   .bee-product-img (não bee-product-image)
  //   .bee-product-info (não bee-product-content)
  //   <h4> (não <h3>)
  //   .product-type (não bee-product-category)
  //   .bee-product-meta-row + .bee-product-pill.bee-product-pill--tag
  //   .bee-product-actions + .btn-mini
  function card(product) {
    const tagPills = product.tags.map(t =>
      `<span class="bee-product-pill bee-product-pill--tag">${esc(t)}</span>`
    ).join('');
    const phPill = product.ph
      ? `<span class="bee-product-pill bee-product-pill--ph">${esc(product.ph)}</span>`
      : '';
    return `
      <article class="bee-product-card" id="${esc(product.id)}" tabindex="0" data-category="${esc(product.category)}">
        <div class="bee-product-img">
          <img src="${esc(product.image)}" alt="${esc(product.name)} — ${esc(product.type)}" loading="lazy" onerror="this.style.visibility='hidden';">
        </div>
        <div class="bee-product-info">
          <div class="product-type">${esc(product.type)}</div>
          <h4>${esc(product.name)}</h4>
          <p>${esc(product.desc)}</p>
          <div class="bee-product-meta-row">${tagPills}${phPill}</div>
          <div class="bee-product-actions">
            <button type="button" class="btn-mini" data-product="${esc(product.id)}" aria-label="Ver detalhes de ${esc(product.name)}">Ver detalhes</button>
          </div>
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
    const tagPills = p.tags.map(t =>
      `<span class="bee-product-pill bee-product-pill--tag">${esc(t)}</span>`
    ).join('');
    const phPill = p.ph
      ? `<span class="bee-product-pill bee-product-pill--ph">${esc(p.ph)}</span>`
      : '';
    content.innerHTML = `
      <div class="pm-product">
        <div class="pm-image"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.visibility='hidden';"></div>
        <div class="pm-copy">
          <p class="pm-kicker">${esc(p.type)}</p>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.desc)}</p>
          <div class="bee-product-meta-row">${tagPills}${phPill}</div>
          <div class="pm-actions">
            ${MARKETPLACES.map(m => `<a class="btn btn-primary" href="${m.href}" target="_blank" rel="noopener" data-market="${m.key}" data-origin="product-modal">Buscar na ${m.name}</a>`).join('')}
          </div>
        </div>
      </div>`;
    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeProductModal() {
    const modal = $('#productModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  function openBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.add('active','is-open','open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeBeeModal() {
    const modal = $('#beeModal');
    if (!modal) return;
    modal.classList.remove('active','is-open','open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
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
