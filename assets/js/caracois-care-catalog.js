/* Caracóis Care — catálogo frontend rico 100%
   Build: 20260512
   Dados enriquecidos: volume, pH, ANVISA, código de barras, descrição, modo de usar e composição.
   Espelha o bee-catalog.js para manter coerência arquitetural.
   Queries de marketplace no padrão "Caracóis Care {Nome} para Cabelos Cacheados".
*/
(function () {
  'use strict';

  const BUILD_VERSION = '20260512';
  const CARE_IMAGE_VERSION = '20260512';
  const careImage = (slug) => `/images/products/${slug}.webp?v=${CARE_IMAGE_VERSION}`;

  const PRODUCTS = [
    {
      "id": "shampoo-sem-sulfato",
      "name": "Shampoo Sem Sulfato",
      "type": "Limpeza Inteligente",
      "category": "limpeza",
      "price": "89.00",
      "image": careImage("shampoo-sem-sulfato"),
      "desc": "Limpeza inteligente para cabelos com curvatura. Remove impurezas e oleosidade do dia a dia sem agredir, sem pesar e sem comprometer a hidratação natural dos fios. Ideal para quem busca couro cabeludo limpo, cachos soltos e a sensação de leveza desde a primeira etapa da rotina.",
      "shortDesc": "Limpeza suave sem ressecar, ideal para rotinas low poo e cuidado frequente dos cachos.",
      "tags": ["Low poo", "Sem sulfato", "Limpeza suave"],
      "volume": "300 ml / 10.14 fl.oz",
      "ph": "pH 4,5",
      "anvisa": "xxxx",
      "barcode": "xxxx",
      "howToUse": "Aplique nos cabelos molhados, massageando o couro cabeludo com a ponta dos dedos em movimentos circulares. Enxágue bem e repita se necessário. Em seguida, use a Máscara 3 em 1 ou o Leave-in Multiuso Caracóis Care conforme a necessidade dos fios.",
      "ingredients": "Água Deionizada, Tensoativos suaves de origem vegetal, Cocoamidopropil Betaína, Glicerina, Pantenol, Extrato de Aloe Vera (Babosa), Polímeros condicionantes de origem vegetal, Cloreto de Guar Hidroxipropiltrimônio, Fragrância, Conservantes aprovados pela ANVISA, EDTA Dissódico, Ácido Cítrico."
    },
    {
      "id": "co-wash",
      "name": "Co-wash",
      "type": "Limpeza Condicionante",
      "category": "limpeza",
      "price": "89.00",
      "image": careImage("co-wash"),
      "desc": "Limpeza cremosa e condicionante para rotinas no poo, criada para higienizar com delicadeza enquanto preserva maciez, movimento e definição. Uma opção estratégica para alternar com o Shampoo Sem Sulfato e manter a saúde dos fios em dias de lavagem mais suave.",
      "shortDesc": "Limpa e condiciona em um só passo, com toque macio e proposta no poo.",
      "tags": ["No poo", "Co-wash", "Maciez"],
      "volume": "300 ml / 10.14 fl.oz",
      "ph": "pH 4,5",
      "anvisa": "xxxx",
      "barcode": "xxxx",
      "howToUse": "Aplique diretamente no couro cabeludo e comprimento molhados. Massageie com calma, distribua pelo comprimento e enxágue completamente. Use em dias de lavagem mais suave ou quando os fios pedirem menos detergência. Combine com a Máscara 3 em 1 para tratamento profundo.",
      "ingredients": "Água Deionizada, Álcool Cetoestearílico, Álcool Cetílico, Cloreto de Cetrimônio, Cloreto de Berrentrimônio, Cocoamidopropil Betaína, Glicerina, Manteigas vegetais, Extrato de Aloe Vera (Babosa), Pantenol, Cloreto de Guar Hidroxipropiltrimônio, Fragrância, Conservantes aprovados pela ANVISA, EDTA Dissódico."
    },
    {
      "id": "mascara-3-em-1",
      "name": "Máscara 3 em 1",
      "type": "Hidratação • Nutrição • Reconstrução",
      "category": "tratamento",
      "price": "125.00",
      "image": careImage("mascara-3-em-1"),
      "desc": "Tratamento versátil que simplifica a rotina capilar combinando hidratação, nutrição e reposição de massa em uma única máscara. Desenvolvida para entregar sensorial profissional, brilho, maciez e força aos cabelos com curvatura sem pesar nem comprometer o movimento natural dos cachos.",
      "shortDesc": "Tratamento completo para hidratar, nutrir e fortalecer cabelos cacheados, ondulados e crespos.",
      "tags": ["3 em 1", "Brilho", "Força"],
      "volume": "300 g / 10.58 oz",
      "ph": "pH 4,0",
      "anvisa": "xxxx",
      "barcode": "xxxx",
      "howToUse": "Após a limpeza com Shampoo Sem Sulfato ou Co-wash, retire o excesso de água e aplique mecha a mecha, enluvando os fios. Deixe agir de 5 a 10 minutos e enxágue com água fria ou morna. Use semanalmente ou conforme orientação profissional. Finalize com Leave-in Multiuso e Gelatina Capilar.",
      "ingredients": "Água Deionizada, Álcool Cetoestearílico, Álcool Cetílico, Cloreto de Cetrimônio, Pantenol, Manteiga de Karité, Manteiga de Cupuaçu, Óleo de Coco, Aminoácidos, Proteína Hidrolisada do Trigo, Queratina Hidrolisada, Glicerina, Extrato de Babosa, Hidroxietilcelulose, Fragrância, Conservantes aprovados pela ANVISA, EDTA Dissódico."
    },
    {
      "id": "leave-in-multiuso",
      "name": "Leave-in Multiuso",
      "type": "Finalização Versátil",
      "category": "finalizacao",
      "price": "99.00",
      "image": careImage("leave-in-multiuso"),
      "desc": "Finalizador multifuncional para definição, controle de frizz, proteção térmica e toque leve. Pensado para funcionar em diferentes curvaturas e técnicas de finalização — da fitagem ao acabamento mais natural — entregando maciez, brilho e durabilidade aos cachos sem rigidez.",
      "shortDesc": "Finalização, definição, proteção térmica e controle de frizz em um único produto.",
      "tags": ["Proteção térmica", "Definição", "Antifrizz"],
      "volume": "300 ml / 10.14 fl.oz",
      "ph": "pH 4,5",
      "anvisa": "xxxx",
      "barcode": "xxxx",
      "howToUse": "Com os fios úmidos, aplique do comprimento às pontas e finalize como preferir. Para mais definição, combine com a Gelatina Capilar Caracóis Care. Para efeito leve, use menor quantidade e amasse os cachos. Pode ser usado também para reativar cachos no day after.",
      "ingredients": "Água Deionizada, Polímeros condicionantes, Manteigas leves vegetais, Pantenol, Glicerina, Cloreto de Behentrimônio, Complexo termoativo, Óleo de Argan, Extrato de Aloe Vera (Babosa), Silicones leves, Fragrância, Conservantes aprovados pela ANVISA, EDTA Dissódico."
    },
    {
      "id": "gelatina-capilar",
      "name": "Gelatina Capilar",
      "type": "Fixação e Definição",
      "category": "finalizacao",
      "price": "99.00",
      "image": careImage("gelatina-capilar"),
      "desc": "Gelatina de finalização com fixação equilibrada para prolongar a definição sem rigidez excessiva. Criada para ajudar no controle do frizz, na durabilidade dos cachos e no acabamento profissional da rotina. Perfeita para day after com toque flexível e movimento natural.",
      "shortDesc": "Fixação equilibrada, definição duradoura e acabamento leve para cabelos com curvatura.",
      "tags": ["Fixação", "Definição", "Day after"],
      "volume": "300 g / 10.58 oz",
      "ph": "pH 4,5",
      "anvisa": "xxxx",
      "barcode": "xxxx",
      "howToUse": "Aplique após o Leave-in Multiuso, distribuindo por mechas ou amassando os fios de baixo para cima. Use mais produto para maior fixação ou menos produto para um acabamento natural. Para o day after, borrife água e reative com leave-in.",
      "ingredients": "Água Deionizada, Extrato de Aloe Vera (Babosa), Carbomer, Goma Xantana, Glicerina, Pantenol, Polímeros filmógenos flexíveis, PVP, Trietanolamina, Hidroxietilcelulose, Cloreto de Guar Hidroxipropiltrimônio, Fragrância, Conservantes aprovados pela ANVISA, EDTA Dissódico, Ácido Cítrico."
    }
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (str) => String(str || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  const CATEGORY_LABELS = {
    limpeza: 'Limpeza',
    tratamento: 'Tratamento',
    finalizacao: 'Finalização'
  };

  function track(name, payload) {
    const data = { brand: 'caracois-care', build_version: BUILD_VERSION, ...(payload || {}) };
    try { if (typeof window.gtag === 'function') window.gtag('event', name, data); } catch (e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', name, data); } catch (e) {}
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...data });
  }

  function careProductSearchQuery(product) {
    const p = product || {};
    // Padrão amigável: "Caracóis Care {Nome} para Cabelos Cacheados"
    // Fallback (sem produto): "Caracóis Care para Cabelos Cacheados"
    return ['Caracóis Care', p.name || '', 'para Cabelos Cacheados']
      .filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function buildCareMarketplaceUrl(market, product) {
    const query = encodeURIComponent(careProductSearchQuery(product || {}));
    const key = typeof market === 'string' ? market : (market && market.key) || '';
    if (key === 'amazon') return `https://www.amazon.com.br/s?k=${query}`;
    if (key === 'shopee') return `https://shopee.com.br/search?keyword=${query}`;
    if (key === 'mercadolivre') return `https://lista.mercadolivre.com.br/${query}`;
    return `https://www.google.com/search?q=${query}`;
  }

  // ─────────────────────────────────────────────────────────────
  // CATÁLOGO (página /caracois-care) — grid + filtros
  // ─────────────────────────────────────────────────────────────

  function catalogCard(product) {
    const tags = (product.tags || []).slice(0, 3)
      .map(t => `<span class="care-product-pill care-product-pill--tag">${esc(t)}</span>`).join('');
    return `<article class="care-product-card reveal" data-product-id="${esc(product.id)}">
      <a href="/caracois-care/${esc(product.id)}" class="care-product-link" aria-label="Ver página de ${esc(product.name)}">
        <div class="care-product-img">
          <span class="care-product-tag-float">${esc(product.category)}</span>
          <img src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="care-product-placeholder" aria-hidden="true" style="display:none">${esc(product.name.charAt(0))}</div>
        </div>
        <div class="care-product-info">
          <div class="care-product-type">${esc(product.type)}</div>
          <h4>${esc(product.name)}</h4>
          <p>${esc(product.shortDesc)}</p>
          <div class="care-product-meta-row">${tags}<span class="care-product-pill care-product-pill--ph">${esc(product.ph)}</span></div>
          <div class="care-product-actions"><span class="care-btn-mini">Ver produto →</span></div>
        </div>
      </a>
    </article>`;
  }

  function renderCatalog(filter = 'all') {
    const grid = $('#careProductsGrid');
    if (!grid) return;
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    grid.innerHTML = list.map(catalogCard).join('');
    grid.classList.remove('care-cat-products-grid--loading');
    grid.setAttribute('aria-busy', 'false');
    $$('.care-product-card', grid).forEach(el => setTimeout(() => el.classList.add('visible'), 50));
  }

  function initFilters() {
    $$('.care-cat-filter-btn').forEach(btn => btn.addEventListener('click', () => {
      $$('.care-cat-filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderCatalog(btn.dataset.filter || 'all');
      track('care_filter_click', { filter: btn.dataset.filter || 'all' });
    }));
  }

  // ─────────────────────────────────────────────────────────────
  // MODAL GLOBAL DE MARKETPLACES (igual ao Bee)
  // ─────────────────────────────────────────────────────────────

  function findProductForModal(button) {
    const slug = (button && (button.dataset.currentProduct || button.dataset.product || '')) || '';
    return PRODUCTS.find(p => p.id === slug) || null;
  }

  function openCareModal(button) {
    const overlay = $('#careModal');
    if (!overlay) return;
    const product = findProductForModal(button);
    const grid = $('#careModalGrid', overlay);
    const titleEl = $('#careModalTitle', overlay);
    const subEl = $('#careModalSub', overlay);

    if (product) {
      if (titleEl) titleEl.textContent = `Comprar ${product.name}`;
      if (subEl) subEl.textContent = 'Escolha o marketplace de sua preferência.';
      if (grid) {
        grid.innerHTML = ['amazon', 'shopee', 'mercadolivre'].map(key => {
          const names = { amazon: 'Amazon', shopee: 'Shopee', mercadolivre: 'Mercado Livre' };
          return `<a class="care-modal-card" href="${esc(buildCareMarketplaceUrl(key, product))}" target="_blank" rel="noopener noreferrer" data-market="${key}" data-origin="care-global-modal" data-product="${esc(product.id)}"><strong>${names[key]}</strong><span>Buscar ${esc(product.name)}</span></a>`;
        }).join('');
      }
      track('care_buy_modal_open', { product_id: product.id, product_name: product.name });
    } else {
      if (titleEl) titleEl.textContent = 'Comprar Caracóis Care';
      if (subEl) subEl.textContent = 'Escolha o marketplace de sua preferência.';
      if (grid) {
        grid.innerHTML = ['amazon', 'shopee', 'mercadolivre'].map(key => {
          const names = { amazon: 'Amazon', shopee: 'Shopee', mercadolivre: 'Mercado Livre' };
          return `<a class="care-modal-card" href="${esc(buildCareMarketplaceUrl(key, null))}" target="_blank" rel="noopener noreferrer" data-market="${key}" data-origin="care-global-modal"><strong>${names[key]}</strong><span>Buscar catálogo</span></a>`;
        }).join('');
      }
      track('care_buy_modal_open', { product_id: 'all' });
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }

  function closeCareModal() {
    const overlay = $('#careModal');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.active[role="dialog"]')) {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  }

  function closeCareModalOnOverlay(event) {
    if (event && event.target && event.target.id === 'careModal') closeCareModal();
  }

  function bootCareCatalog() {
    document.addEventListener('click', (event) => {
      const buyBtn = event.target.closest('[data-care-buy]');
      if (buyBtn) {
        // Se a página tem seção #onde-comprar (página individual de produto),
        // deixa o caracois-care-product-pages.js fazer o scroll.
        // Se não tem (catálogo, home etc), abre o modal global de marketplaces.
        if (document.getElementById('onde-comprar')) return;
        event.preventDefault();
        openCareModal(buyBtn);
        return;
      }
      const market = event.target.closest('.care-modal-card[data-market]');
      if (market) {
        track('care_marketplace_click', {
          market: market.dataset.market || '',
          origin: market.dataset.origin || '',
          product_id: market.dataset.product || 'all',
          link_url: market.href || ''
        });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeCareModal();
    });

    if ($('#careProductsGrid')) {
      renderCatalog('all');
      initFilters();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCareCatalog, { once: true });
  } else {
    bootCareCatalog();
  }

  // Expostos globalmente
  window.CARE_PRODUCTS = PRODUCTS;
  window.CARE_CATEGORY_LABELS = CATEGORY_LABELS;
  window.careProductSearchQuery = careProductSearchQuery;
  window.buildCareMarketplaceUrl = buildCareMarketplaceUrl;
  window.openCareModal = openCareModal;
  window.closeCareModal = closeCareModal;
  window.closeCareModalOnOverlay = closeCareModalOnOverlay;
})();
