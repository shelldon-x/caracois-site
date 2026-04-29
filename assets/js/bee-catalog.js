/* Bee Cosmetics — catálogo frontend rico 100%
   Build: 20260429-bee-page-render-fix
   Dados enriquecidos: volume, pH, ANVISA, código de barras, descrição, modo de usar e composição.
   Sem campo de ativos principais, conforme solicitado.
*/
(function () {
  'use strict';

  const BUILD_VERSION = '20260429-bee-page-render-fix';
  const PRODUCTS = [
    {
        "id": "born-to-bee",
        "name": "Born to BEE",
        "type": "Shampoo Sem Sulfato",
        "category": "limpeza",
        "image": "/images/products/born-to-bee.webp",
        "fallbacks": [
            "/images/products/born-to-bee.png",
            "/images/products/shampoo-born-to-bee.webp"
        ],
        "desc": "Tenha uma limpeza eficaz sem ressecar ou agredir os fios. O Shampoo Sem Sulfato Born to BEE, com limpante natural, deixa o cabelo limpo e hidratado, perfeito para rotinas de limpeza suave.",
        "shortDesc": "Limpeza eficaz sem ressecar, com ingredientes hidratantes e condicionantes.",
        "tags": [
            "Low poo",
            "Sem sulfato",
            "Limpeza suave"
        ],
        "volume": "300 ml / 10.14 fl.oz",
        "ph": "pH 4,5",
        "anvisa": "25351.459676/2022-71",
        "barcode": "7899085798567",
        "howToUse": "Aplique no cabelo molhado, massageando suavemente o couro cabeludo em movimentos circulares. Enxágue bem. Repita se necessário. Para melhores resultados, use o Co-Wash Feel the BEEat ou a Máscara de Nutrição BEEtween Gardens.",
        "ingredients": "Água Deionizada, Lauril Sulfosucinato de Sódio, Cocoamidopropil Betaína, Dietanolamida de Ácidos Graxos de Côco, Fragrância, Poliquatérnio-39, Hidroxietil Uréia, Extrato de Babosa, Cloreto de Guar Hidroxipropiltrimônio, Distearato do PEG-150, Poliquatérnio-22, Poliquatérnio-55, Poliquatérnio-47, Metilglucose Eter do PPG-20, Glicerina, Álcool Benzílico, Clorfenesina, EDTA Dissódico, Metilcloroisotiazolinona, Metilisotiazolinona, Aldeído Hexil Cinâmico, Salicilato de Benzila, Linalol, Geraniol."
    },
    {
        "id": "feel-the-beeat",
        "name": "Feel the BEEat",
        "type": "Co-Wash",
        "category": "limpeza",
        "image": "/images/products/cowash-linha1.webp",
        "fallbacks": [
            "/images/products/feel-the-beeat.webp",
            "/images/products/cowash.webp",
            "/images/products/co-wash.webp"
        ],
        "desc": "Um produto completo que limpa, condiciona, hidrata e repara os fios. Ideal para quem segue uma rotina sem shampoos tradicionais com sulfatos.",
        "shortDesc": "Limpeza, condicionamento e hidratação com aloe vera, manteiga de oliva e queratina.",
        "tags": [
            "No poo",
            "Co-wash",
            "Hidratação"
        ],
        "volume": "300 ml / 10.14 fl.oz",
        "ph": "pH 4,5",
        "anvisa": "25351.459590/2022-48",
        "barcode": "7899085798611",
        "howToUse": "Aplique nos cabelos após o Shampoo Sem Sulfato Born to BEE, da raiz às pontas, e deslize suavemente entre os dedos. Enxágue bem. Para a rotina sem shampoo, aplique diretamente nos cabelos molhados, massageando o couro cabeludo. Enxágue bem e repita se necessário. Complete o tratamento com a Máscara de Umectação BEEloved Oil.",
        "ingredients": "Água Deionizada, Cocoamidopropil Betaina, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Cloreto de Berrentrimômio, Fragrância, Poliquatérnio-39, Poliquatérnio-22, Poliquatérnio-47, Poliquatérnio-55, Metilglucose Eter do PPG-20, Glicerina, Álcool Benzílico, Clorfenesina, Queratina Hidrolizada, Manteiga de Oliva, Extrato de Babosa, Cloreto de Guar Hidroxipropiltrimônio, Fenoxietanol, Ácido Lático, EDTA Dissódico, Aldeído Hexil Cinâmico, Linalol, Salicilato de Benzila, Limoneno, Metiliononas Gama Alfa, Lirial, Cumarina."
    },
    {
        "id": "beetween-gardens",
        "name": "BEEtween Gardens",
        "type": "Máscara de Nutrição",
        "category": "tratamento",
        "image": "/images/products/beetween-gardens.webp",
        "fallbacks": [
            "/images/products/between-gardens.webp",
            "/images/products/mascara-nutricao.webp"
        ],
        "desc": "Hidratação e nutrição em um único produto. Proporciona umectação, emoliência e maciez, ajudando a evitar o frizz.",
        "shortDesc": "Hidratação e nutrição com D-pantenol, manteiga de abacate e óleo de coco.",
        "tags": [
            "Nutrição",
            "Brilho",
            "Maciez"
        ],
        "volume": "300 g / 10.58 oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459556/2022-73",
        "barcode": "7899085798598",
        "howToUse": "Aplique a máscara de nutrição após o Shampoo Born to BEE ou o Co-Wash Feel the BEEat, enluvando as mechas. Deixe agir por 10 minutos e enxágue. Use a Gelatina Capilar Be my BEE após o Leave-in BEE Yourself ou Let it BEE para uma definição impecável.",
        "ingredients": "Água Deionizada, Cloreto de Berrentrimônio, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Metosulfato de Berrentrimônio, Fragrância, Glicerina, Poliquatérnio-39, Vitamina B5, Óleo de Coco, Manteiga de Abacate, Hidroxietilcelulose, Fenoxietanol, Ácido Lático, EDTA Dissódico, Aldeído Hexil Cinâmico, Linalol, Salicilato de Benzila, Hidroxicitronelal, Citronelol, Geraniol."
    },
    {
        "id": "after-beeach",
        "name": "After BEEach",
        "type": "Máscara de Reconstrução",
        "category": "tratamento",
        "image": "/images/products/after-beeach.webp",
        "fallbacks": [
            "/images/products/after-beach.webp",
            "/images/products/after-beeatch.webp",
            "/images/products/mascara-reconstrucao.webp"
        ],
        "desc": "Proteção e reparo intensivo para cabelos danificados por coloração, tratamentos químicos ou exposição ao sol e ao mar.",
        "shortDesc": "Reparo intensivo com manteiga de oliva e proteína do trigo.",
        "tags": [
            "Reconstrução",
            "Força",
            "Reparo"
        ],
        "volume": "300 g / 10.58 oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459709/2022-82",
        "barcode": "7899085798574",
        "howToUse": "Após usar o Shampoo Born to BEE ou o Co-Wash Feel the BEEat, tire o excesso de água dos fios e aplique a máscara enluvando as mechas. Deixe agir por 10 minutos e enxágue. Para um acabamento perfeito, use o Leave-in BEE Yourself.",
        "ingredients": "Água Deionizada, Cloreto de Berrentrimônio, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Metosulfato de Berrentrimônio, Fragrância, Glicerina, Poliquatérnio-39, Poliquatérnio-10, Polióxido de Etileno 90 M, Proteína Hidrolisada de Arroz, Carbocisteína, Serina, Ácido Glutâmico, Manteiga de Oliva, Vitamina E, Fenoxietanol, EDTA Dissódico, Linalol, Salicilato de Benzila, Metiliononas Gama Alfa, Citronelol, Geraniol."
    },
    {
        "id": "beeloved-oil",
        "name": "BEEloved Oil",
        "type": "Máscara de Umectação",
        "category": "tratamento",
        "image": "/images/products/beeloved-oil.webp",
        "fallbacks": [
            "/images/products/bee-loved-oil.webp",
            "/images/products/beeloved.webp",
            "/images/products/mascara-umectacao.webp"
        ],
        "desc": "Combinação de óleos e manteigas que envolve os fios com uma camada leve de nutrição, trazendo maciez, fortalecimento e hidratação.",
        "shortDesc": "Umectação profunda com óleo de coco, linhaça, manteiga de oliva e cera de arroz.",
        "tags": [
            "Umectação",
            "Nutrição intensa",
            "Óleos"
        ],
        "volume": "300 g / 10.58 oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459606/2022-12",
        "barcode": "7899085798581",
        "howToUse": "Após o Shampoo Born to BEE ou o Co-Wash Feel the BEEat, retire o excesso de água e aplique a máscara de umectação, enluvando as mechas. Deixe agir por 10 minutos e enxágue com água fria ou morna. Use a Gelatina Capilar Be my BEE após o Leave-in BEE Yourself ou Let it BEE para definição.",
        "ingredients": "Água Deionizada, Cloreto de Berrentrimônio, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Metosulfato de Berrentrimônio, Fragrância, Glicerina, Poliquatérnio-39, Cêra de Arroz, Óleo de Coco, Óleo de Linhaça, Manteiga de Oliva, Hidroxietilcelulose, Fenoxietanol, Ácido Lático, EDTA Dissódico, Cumarina, Lilial."
    },
    {
        "id": "bee-yourself",
        "name": "BEE Yourself",
        "type": "Leave-in Super Definição",
        "category": "finalizacao",
        "image": "/images/products/bee-yourself.webp",
        "fallbacks": [
            "/images/products/leavein-bee-yourself.webp",
            "/images/products/leave-in-bee-yourself.webp"
        ],
        "desc": "A definição dos sonhos com textura hidratante, brilho, condicionamento, melhora da retenção de água e redução de porosidade.",
        "shortDesc": "Definição com hidratação, brilho, redução de porosidade e acabamento impecável.",
        "tags": [
            "Definição",
            "Brilho",
            "Finalização"
        ],
        "volume": "300 ml / 10.14 fl.oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459723/2022-86",
        "barcode": "7899085798635",
        "howToUse": "Após usar o limpante Born to BEE ou o Co-Wash Feel the BEEat e as máscaras Bee Cosmetics, aplique nos fios úmidos. Utilize a técnica de fitagem que preferir. Finalize com a Gelatina Capilar Be my BEE.",
        "ingredients": "Água Deionizada, Metosulfato de Berrentrimônio, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Cloreto de Berrentrimônio, Fragrância, Polióxido de Etilleno 90 M, Poliquatérnio–39, Hidroxietilcelulose, Manteiga de Abacate, Proteína Hidrolizada do Trigo, Fenoxietanol, Ácido Lático, EDTA Dissódico, Linalol, Salicilato de Benzila, Aldeído Hexil Cinâmico, Citronelol, Hidroxicitronelal, Metiliononas Gama Alfa, Limoneno."
    },
    {
        "id": "let-it-bee",
        "name": "Let it BEE",
        "type": "Leave-in Leveza Natural",
        "category": "finalizacao",
        "image": "/images/products/let-it-bee.webp",
        "fallbacks": [
            "/images/products/leavein-let-it-bee.webp",
            "/images/products/leave-in-let-it-bee.webp"
        ],
        "desc": "Day after garantido com brilho e fixação suave para uma definição leve, natural e bonita.",
        "shortDesc": "Proteção térmica, controle de frizz e leveza para todos os tipos de curvatura.",
        "tags": [
            "Leveza",
            "Frizz",
            "Proteção térmica"
        ],
        "volume": "300 ml / 10.14 fl.oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459688/2022-03",
        "barcode": "7899085798628",
        "howToUse": "Após usar o Shampoo Born to BEE ou o Co-Wash Feel the BEEat e as máscaras Bee Cosmetics, aplique nos fios úmidos. Utilize a técnica de fitagem que preferir. Finalize com a Gelatina Capilar Be my BEE.",
        "ingredients": "Água Deionizada, Álcool Cetoestearílico, Álcool Cetílico, Metasulfato de Berrentrimônio, Cloreto de Cetrimônio, Cloreto de Berrentrimônio, Fragrância, Manteiga de Karité, Poliquatérnio-39, Hidroxietilcelulose, Óleo de Amêndoas Doce, Fenoxietanol, Ácido Lático, EDTA Dissódico, Recovery Hair Pro® (Maleato de Dietilexil, Vitamina E, Triglicérides do Ácido Cáprico Caprílico, Palmitato de Etilexil, Óleo de Coco, Ácido Aspártico, Treonina, Serina, Ácido Glutâmico, Prolina, Glicina, Alanina, Sódio PCA, Valina, Metionina, Isoleucina, Leucina, Tirosina, Fenilalanina, Histidina, Lisina, Hidroxilisina, Arginina, Triptofano, Hidroxiprolina), Glicerina, Salicilato de Benzila, Aldeído Hexil Cinâmico, Linalol, Metiliononas Gama Alfa, Cumarina, Hidroxicitronelal, Citronelol."
    },
    {
        "id": "bee-proud",
        "name": "BEE Proud",
        "type": "Leave-in Antiencolhimento",
        "category": "finalizacao",
        "image": "/images/products/bee-proud.webp",
        "fallbacks": [
            "/images/products/leavein-bee-proud.webp",
            "/images/products/leave-in-bee-proud.webp"
        ],
        "desc": "Previne o fator encolhimento e ajuda a manter os fios saudáveis, bonitos e com menos frizz.",
        "shortDesc": "Reduz fator encolhimento com manteiga de oliva e óleo de algodão.",
        "tags": [
            "Antiencolhimento",
            "Volume",
            "Finalização"
        ],
        "volume": "300 ml / 10.14 fl.oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459582/2022-00",
        "barcode": "7899085798642",
        "howToUse": "Após usar o Shampoo Born to BEE ou o Co-Wash Feel the BEEat e as máscaras Bee Cosmetics, aplique nos fios úmidos. Utilize a técnica de fitagem que preferir. Finalize com a Gelatina Capilar Be my BEE.",
        "ingredients": "Água Deionizada, Álcool Cetoestarílico, Álcool Cetílico, Metosulfato de Berrentrimônio, Cloreto de Berrentrimônio, Cloreto de Cetrimônio, Fragrância, Poliquatérnio–39, Manteiga de Oliva, Óleo de Algodão, Acetamida Mea, Berrenamidopropil Dimetilamina, Ácido Glutâmico, Ácido Lático, Ácido Aspartico, Poliquatérnio-47, Poliquatérnio-22, Extrato de Avelã, Álcool Benzílico, Clorfenesina, Glicerina, Hidroxietilcelulose, Fenoxietanol, EDTA Dissódico, Linalol, Salicilato de Benzila, Hidroxicitronelal, Cumarina, Geraniol."
    },
    {
        "id": "be-my-bee",
        "name": "Be my BEE",
        "type": "Gelatina Capilar",
        "category": "finalizacao",
        "image": "/images/products/be-my-bee.webp",
        "fallbacks": [
            "/images/products/gelatina-be-my-bee.webp",
            "/images/products/gelatina.webp"
        ],
        "desc": "Definição com estilo e fixação. Hidrata, ajuda a reter umidade e deixa os fios macios e brilhosos.",
        "shortDesc": "Definição com fixação e hidratação com aloe vera e extrato de cana-de-açúcar.",
        "tags": [
            "Fixação",
            "Definição",
            "Day after"
        ],
        "volume": "300 g / 10.58 oz",
        "ph": "pH 4,0",
        "anvisa": "25351.459703/2022-13",
        "barcode": "7899085798604",
        "howToUse": "Após a fitagem com o Leave-in BEE Yourself ou Let it BEE, aplique a Gelatina Capilar Be my BEE e amasse os fios. Aproveite a definição e a fixação.",
        "ingredients": "Água Deionizada, Fragrância, Carbômero, Aminometil Propanol, Glicerina, Extrato de Aloe Vera, Extrato de Mel, PVP, Fenoxietanol, EDTA Dissódico, Salicilato de Benzila, Aldeído Hexil Cinâmico, Linalol, Geraniol, Hidroxicitronelal."
    },
    {
        "id": "beelieve-in-acid",
        "name": "BEElieve in Acid",
        "type": "Elixir Acidificante",
        "category": "tratamento",
        "image": "/images/products/beelieve-in-acid.webp",
        "fallbacks": [
            "/images/products/believe-in-acid.webp",
            "/images/products/acidificante.webp"
        ],
        "desc": "Equilibra o pH dos fios, sela as cutículas, proporciona brilho intenso e prepara o cabelo para tratamentos profundos.",
        "shortDesc": "Sela cutículas, equilibra o pH e intensifica o brilho dos fios.",
        "tags": [
            "Acidificação",
            "Porosidade",
            "Brilho"
        ],
        "volume": "140 ml / 4.74 fl.oz",
        "ph": "pH 3,5",
        "anvisa": "25351.438363/2024-41",
        "barcode": "7899085798659",
        "howToUse": "Após lavar o cabelo com o Shampoo Born to BEE ou o Co-Wash Feel the BEEat, aplique o elixir nos fios molhados, distribuindo uniformemente. Deixe agir por 5 minutos e enxágue. Continue com a Máscara de Reconstrução After BEEach ou a Máscara de Nutrição BEEtween Gardens para resultados excepcionais.",
        "ingredients": "Água Purificada, Vinagre, Extrato de Maçã, Frutose, Glicose, Ácido Glucônico, Gliconolactona, Goma de Falso Pau Brasil, Fragrância, Propilenoglicol, Fenoxietanol, Salicilato de Benzila, Hexil Cinamal, Linalol, Geraniol, Hidroxicitronelal."
    }
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
      if (value !== undefined && value !== null && value !== '') out[key] = String(value).slice(0, 180);
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

  function pills(product) {
    const tagPills = (product.tags || []).map(t => `<span class="bee-product-pill bee-product-pill--tag">${esc(t)}</span>`).join('');
    const phPill = product.ph ? `<span class="bee-product-pill bee-product-pill--ph">${esc(product.ph)}</span>` : '';
    return tagPills + phPill;
  }

  function card(product) {
    return `
      <article class="bee-product-card" id="${esc(product.id)}" tabindex="0" data-category="${esc(product.category)}" data-product-card="${esc(product.id)}">
        <div class="bee-product-img">
          <img ${imageAttrs(product)} alt="${esc(product.name)} — ${esc(product.type)}" loading="lazy" decoding="async">
        </div>
        <div class="bee-product-info">
          <div class="product-type">${esc(product.type)}</div>
          <h4>${esc(product.name)}</h4>
          <p>${esc(product.shortDesc || product.desc)}</p>
          <div class="bee-product-meta-row">${pills(product)}</div>
          <div class="bee-product-actions">
            <button type="button" class="btn-mini" data-product="${esc(product.id)}" data-cta="bee_product_details" aria-label="Ver detalhes de ${esc(product.name)}">Ver detalhes</button>
          </div>
        </div>
      </article>`;
  }

  function render(filter = 'all') {
    ['#beeProductsGrid', '#beeProducts', '.bee-cat-products-grid'].forEach((selector) => {
      const grid = $(selector);
      if (!grid) return;

      const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

      grid.classList.remove('bee-cat-products-grid--loading');
      grid.classList.add('bee-products-ready');
      grid.setAttribute('aria-busy', 'false');

      grid.innerHTML = list.length
        ? list.map(card).join('')
        : '<p class="bee-products-empty">Nenhum produto encontrado nesta categoria.</p>';

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

  function detailItem(label, value) {
    if (!value) return '';
    return `<div class="pm-spec"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;
  }

  function textSection(title, text, extraClass = '') {
    if (!text) return '';
    return `
      <div class="pm-section ${extraClass}">
        <h3>${esc(title)}</h3>
        <p>${esc(text)}</p>
      </div>`;
  }

  function openProductModal(id) {
    const p = productById(id);
    const modal = $('#productModal');
    const content = $('#productModalContent') || $('.product-modal-content', modal) || $('.product-modal-body', modal) || $('.product-modal', modal);
    if (!modal || !content) return;

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
            ${detailItem('Volume', p.volume)}
            ${detailItem('pH', p.ph)}
            ${detailItem('ANVISA', p.anvisa)}
            ${detailItem('Código de barras', p.barcode)}
          </div>

          <div class="bee-product-meta-row pm-pills">${pills(p)}</div>

          ${textSection('Modo de usar', p.howToUse)}
          ${textSection('Composição', p.ingredients, 'pm-section--ingredients')}

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
    if (window.__BEE_CATALOG_EVENTS_BOUND__) return;
    window.__BEE_CATALOG_EVENTS_BOUND__ = true;
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

  function bootBeeCatalog() {
    bindEvents();

    const paint = () => {
      render('all');
      initImageFallbacks();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(paint), { once: true });
    } else {
      requestAnimationFrame(paint);
    }

    // Defesa contra race/cache: se algum CSS/JS da página recolocar loading ou limpar grid, repinta.
    window.setTimeout(() => {
      const grids = ['#beeProductsGrid', '#beeProducts', '.bee-cat-products-grid']
        .map(sel => $(sel))
        .filter(Boolean);

      grids.forEach(grid => {
        if (!grid.dataset.beeRendered || !grid.querySelector('.bee-product-card')) {
          render(grid.dataset.beeFilter || 'all');
        }
      });
    }, 350);
  }

  bootBeeCatalog();

  window.BEE_PRODUCTS = PRODUCTS;
  window.openBeeModal = openBeeModal;
  window.closeBeeModal = closeBeeModal;
  window.closeBeeModalOnOverlay = closeBeeModalOnOverlay;
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
})();
