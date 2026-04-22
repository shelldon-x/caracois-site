/* =========================
   BEE COSMETICS — CATÁLOGO INTERATIVO
   Array de produtos, render dinâmico, modal de ficha completa
   com trap de foco e retorno de foco ao elemento de origem.
========================= */
const BEE_PRODUCTS = [
  {id:'born-to-bee', name:'Born to BEE', category:'Shampoo Sem Sulfato', size:'300 ml', ph:'pH 4,5', anvisa:'25351.459676/2022-71', barcode:'7899085798567', actives:'Extrato de Aloe Vera, Vitamina B12, Hydra Repair', desc:'Limpeza eficaz sem ressecar ou agredir os fios. Com limpante natural, deixa o cabelo limpo e hidratado.', full:'Tenha uma limpeza eficaz sem ressecar ou agredir os fios. Nosso Shampoo Sem Sulfato Born to BEE, com limpante natural, deixa seu cabelo limpo e hidratado, perfeito para rotinas low poo.', usage:'Aplique no cabelo molhado, massageando suavemente o couro cabeludo em movimentos circulares. Enxágue bem. Repita se necessário.', comp:'Água Deionizada, Lauril Sulfosucinato de Sódio, Cocoamidopropil Betaína, Dietanolamida de Ácidos Graxos de Côco, Fragrância, Poliquatérnio-39, Hidroxietil Uréia, Extrato de Babosa, Cloreto de Guar Hidroxipropiltrimônio, Distearato do PEG-150, Poliquatérnio-22, Poliquatérnio-55, Poliquatérnio-47, Metilglucose Eter do PPG-20, Glicerina, Álcool Benzílico, Clorfenesina, EDTA Dissódico.', kind:'limpeza', tag:'low poo', img:'/images/products/born-to-bee.webp'},
  {id:'feel-the-beeat', name:'Feel the BEEat', category:'Co-Wash', size:'300 ml', ph:'pH 4,5', anvisa:'25351.459590/2022-48', barcode:'7899085798611', actives:'Aloe Vera, Manteiga de Oliva, Queratina', desc:'Limpa, condiciona, hidrata e repara em um só passo. Ideal para rotinas no poo.', full:'Um produto completo que limpa, condiciona, hidrata e repara seus fios. Com aloe vera, manteiga de oliva e queratina, é ideal para quem segue a rotina sem shampoos tradicionais.', usage:'Aplique nos cabelos molhados, massageando o couro cabeludo e distribuindo pelo comprimento. Enxágue bem.', comp:'Água Deionizada, Cocoamidopropil Betaina, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Cloreto de Berrentrimômio, Fragrância, Poliquatérnio-39, Queratina Hidrolizada, Manteiga de Oliva, Extrato de Babosa.', kind:'limpeza', tag:'no poo', img:'/images/products/cowash-linha1.webp'},
  {id:'beetween-gardens', name:'BEEtween Gardens', category:'Máscara de Nutrição', size:'300 g', ph:'pH 4,0', anvisa:'25351.459556/2022-73', barcode:'7899085798598', actives:'Manteiga de Abacate, Óleo de Coco, D-Pantenol', desc:'Hidratação e nutrição em um único produto. Proporciona umectação, emoliência e maciez.', full:'Hidratação e nutrição em um único produto. Com D-pantenol, manteiga de abacate e óleo de coco, proporciona umectação, emoliência e maciez, ajudando a evitar o frizz.', usage:'Aplique após a limpeza, enluvando as mechas. Deixe agir por 10 minutos e enxágue.', comp:'Água Deionizada, Cloreto de Berrentrimônio, Álcool Cetoestarílico, Álcool Cetílico, Cloreto de Cetrimônio, Metosulfato de Berrentrimônio, Fragrância, Glicerina, Poliquatérnio-39, Vitamina B5, Óleo de Coco, Manteiga de Abacate.', kind:'tratamento', tag:'nutrição', img:'/images/products/beetween-gardens.webp'},
  {id:'after-beeach', name:'After BEEach', category:'Máscara de Reconstrução', size:'300 g', ph:'pH 4,0', anvisa:'25351.459709/2022-82', barcode:'7899085798574', actives:'Manteiga de Oliva, Proteína do Trigo, Vitamina E', desc:'Reparo intensivo para cabelos danificados por coloração, química ou exposição ao sol.', full:'Proteção e reparo intensivo para cabelos danificados por coloração, tratamentos químicos ou exposição ao sol e ao mar.', usage:'Após a limpeza, tire o excesso de água, aplique enluvando as mechas. Deixe agir por 10 minutos e enxágue.', comp:'Água Deionizada, Cloreto de Berrentrimônio, Álcool Cetoestarílico, Proteína Hidrolisada de Arroz, Carbocisteína, Serina, Manteiga de Oliva, Vitamina E.', kind:'tratamento', tag:'reconstrução', img:'/images/products/hairmask-reconstrucao.webp'},
  {id:'beeloved-oil', name:'BEEloved Oil', category:'Máscara de Umectação', size:'300 g', ph:'pH 4,0', anvisa:'25351.459606/2022-12', barcode:'7899085798581', actives:'Óleo de Coco, Óleo de Linhaça, Manteiga de Oliva, Cera de Arroz', desc:'Umectação profunda com maciez, fortalecimento e hidratação para todos os tipos de curvatura.', full:'A combinação perfeita de óleo de coco, óleo de linhaça, manteiga de oliva e cera de arroz. Envolve os fios com uma leve camada de óleo, trazendo maciez e fortalecimento.', usage:'Após a limpeza, retire o excesso de água e aplique enluvando as mechas. Deixe agir por 10 minutos, enxágue.', comp:'Água Deionizada, Cloreto de Berrentrimônio, Álcool Cetoestarílico, Cera de Arroz, Óleo de Coco, Óleo de Linhaça, Manteiga de Oliva.', kind:'tratamento', tag:'umectação', img:'/images/products/beloved-oil.webp'},
  {id:'bee-yourself', name:'BEE Yourself', category:'Leave-in Super Definição', size:'300 ml', ph:'pH 4,0', anvisa:'25351.459723/2022-86', barcode:'7899085798635', actives:'Manteiga de Abacate, Proteína do Trigo', desc:'Definição intensa com brilho, condicionamento e redução de porosidade.', full:'A definição dos sonhos com manteiga de abacate e proteína do trigo. Super hidratante, fornece brilho, condiciona, melhora a retenção de água e reduz a porosidade.', usage:'Aplique nos fios úmidos. Utilize a técnica de fitagem que preferir. Finalize com a gelatina Be my BEE.', comp:'Água Deionizada, Metosulfato de Berrentrimônio, Álcool Cetoestarílico, Manteiga de Abacate, Proteína Hidrolizada do Trigo.', kind:'finalizacao', tag:'super definição', img:'/images/products/bee-yourself.webp'},
  {id:'let-it-bee', name:'Let it BEE', category:'Leave-in Leveza Natural', size:'300 ml', ph:'pH 4,0', anvisa:'25351.459688/2022-03', barcode:'7899085798628', actives:'Manteiga de Karité, Óleo de Amêndoas', desc:'Brilho e fixação suave para definição leve e day after favorecido.', full:'Day after garantido com manteiga de karité e óleo de amêndoas. Proporciona brilho e fixação suave para uma definição perfeita.', usage:'Aplique nos fios úmidos e modele com as mãos. Finalize com a gelatina Be my BEE.', comp:'Água Deionizada, Álcool Cetoestearílico, Manteiga de Karité, Óleo de Amêndoas Doce, Recovery Hair Pro.', kind:'finalizacao', tag:'leveza natural', img:'/images/products/let-it-bee.webp'},
  {id:'bee-proud', name:'BEE Proud', category:'Leave-in Antiencolhimento', size:'300 ml', ph:'pH 4,0', anvisa:'25351.459582/2022-00', barcode:'7899085798642', actives:'Manteiga de Oliva, Óleo de Algodão', desc:'Previne o fator encolhimento mantendo fios saudáveis e sem frizz.', full:'Previne o fator encolhimento com manteiga de oliva e óleo de algodão. Mantém seus fios saudáveis, bonitos e sem frizz.', usage:'Aplique nos fios úmidos, distribua bem e finalize da forma desejada.', comp:'Água Deionizada, Álcool Cetoestarílico, Manteiga de Oliva, Óleo de Algodão, Liss Repair.', kind:'finalizacao', tag:'antiencolhimento', img:'/images/products/leave-in-antiencolhimento.webp'},
  {id:'be-my-bee', name:'Be my BEE', category:'Gelatina Capilar', size:'300 g', ph:'pH 4,0', anvisa:'25351.459703/2022-13', barcode:'7899085798604', actives:'Aloe Vera, Extrato de Cana de Açúcar, Vitamina B12', desc:'Definição com fixação e hidratação. Fios macios e brilhosos.', full:'Definição com estilo e fixação. Com aloe vera e cana-de-açúcar, hidrata e ajuda a reter umidade, deixando os fios macios e brilhosos.', usage:'Após a fitagem com o leave-in, aplique a gelatina e amasse os fios.', comp:'Água Deionizada, Carbômero, Aminometil Propanol, Glicerina, Extrato de Aloe Vera, Extrato de Mel, PVP.', kind:'finalizacao', tag:'gelatina', img:'/images/products/jelly-fixacao.webp'},
  {id:'beelieve-in-acid', name:'BEElieve in Acid', category:'Elixir Acidificante', size:'140 ml', ph:'pH 3,5', anvisa:'25351.438363/2024-41', barcode:'7899085798659', actives:'Bioacetum Maçã, Betacaroteno, Potássio', desc:'Equilibra o pH, sela cutículas e intensifica o brilho dos fios.', full:'Revitalize seus cabelos com o Elixir Acidificante BEElieve in Acid. Equilibra o pH dos fios, sela as cutículas e proporciona brilho intenso, além de preparar o cabelo para tratamentos profundos.', usage:'Após a limpeza, aplique nos fios molhados. Deixe agir por 5 minutos e enxágue. Continue com máscara de tratamento.', comp:'Água Purificada, Vinagre, Extrato de Maçã, Frutose, Glicose, Ácido Glucônico, Gliconolactona.', kind:'tratamento', tag:'acidificação', img:'/images/products/beelieve-in-acid.webp'}
];

const BEE_MARKET_LINKS = {
  amazon: 'https://www.amazon.com.br/s?k=bee+cosmetics+cabelo+cacheado',
  shopee: 'https://shopee.com.br/search?keyword=bee%20cosmetics%20cabelo%20cacheado',
  mercadolivre: 'https://lista.mercadolivre.com.br/bee-cosmetics'
};

const beeProductsGrid = document.getElementById('beeProductsGrid');
const productModalEl = document.getElementById('productModal');
const productModalContent = document.getElementById('productModalContent');
let lastFocusedBeforeProductModal = null;

function _escapeAttr(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderBeeProducts(filter) {
    if (!beeProductsGrid) return;
    filter = filter || 'all';
    const list = BEE_PRODUCTS.filter(function(p) { return filter === 'all' || p.kind === filter; });
    let html = '';
    for (let i = 0; i < list.length; i++) {
        let p = list[i];
        html += '<article class="bee-product-card" tabindex="0" role="button" aria-label="Ver ficha completa de ' + _escapeAttr(p.name) + '" data-product-id="' + _escapeAttr(p.id) + '">'
            + '<div class="bee-product-img">'
            + '<img src="' + p.img + '" alt="' + _escapeAttr(p.category + ' ' + p.name) + ' — Bee Cosmetics" loading="lazy" decoding="async" width="500" height="500">'
            + '<span class="bee-product-tag-float">' + _escapeAttr(p.tag) + '</span>'
            + '</div>'
            + '<div class="bee-product-info">'
            + '<div class="product-type">' + _escapeAttr(p.category) + '</div>'
            + '<h4>' + _escapeAttr(p.name) + '</h4>'
            + '<p>' + _escapeAttr(p.desc) + '</p>'
            + '<div class="bee-product-meta-row">'
            + '<span class="bee-product-pill bee-product-pill--tag">' + _escapeAttr(p.tag) + '</span>'
            + '<span class="bee-product-pill bee-product-pill--ph">' + _escapeAttr(p.ph) + '</span>'
            + '<span class="bee-product-pill bee-product-pill--ph">' + _escapeAttr(p.size) + '</span>'
            + '</div>'
            + '<div class="bee-product-actions">'
            + '<button type="button" class="btn-mini" data-product-id="' + _escapeAttr(p.id) + '">Ver ficha completa</button>'
            + '</div>'
            + '</div>'
            + '</article>';
    }
    beeProductsGrid.innerHTML = html;
}

function openProductModal(id, originEl) {
    let p = null;
    for (let i = 0; i < BEE_PRODUCTS.length; i++) { if (BEE_PRODUCTS[i].id === id) { p = BEE_PRODUCTS[i]; break; } }
    if (!p || !productModalEl) return;

    // Salva o foco atual para devolver ao fechar
    lastFocusedBeforeProductModal = originEl || document.activeElement;

    productModalContent.innerHTML =
        '<div class="pm-grid">'
        + '<div class="pm-image"><img src="' + p.img + '" alt="' + _escapeAttr(p.name) + '" loading="eager" decoding="async"></div>'
        + '<div class="pm-content">'
        + '<div class="pm-eyebrow">Ficha completa</div>'
        + '<h2>' + _escapeAttr(p.name) + '</h2>'
        + '<p class="pm-desc">' + _escapeAttr(p.full) + '</p>'
        + '<div class="pm-specs">'
        + '<div class="pm-spec"><span>Categoria</span><strong>' + _escapeAttr(p.category) + '</strong></div>'
        + '<div class="pm-spec"><span>Tamanho</span><strong>' + _escapeAttr(p.size) + '</strong></div>'
        + '<div class="pm-spec"><span>pH</span><strong>' + _escapeAttr(p.ph) + '</strong></div>'
        + '<div class="pm-spec"><span>Ativos</span><strong>' + _escapeAttr(p.actives) + '</strong></div>'
        + '<div class="pm-spec"><span>ANVISA</span><strong>' + _escapeAttr(p.anvisa) + '</strong></div>'
        + '<div class="pm-spec"><span>Código de barras</span><strong>' + _escapeAttr(p.barcode) + '</strong></div>'
        + '</div>'
        + '<div class="pm-section"><h3>Como usar</h3><p>' + _escapeAttr(p.usage) + '</p></div>'
        + '<div class="pm-section"><h3>Composição</h3><p style="font-size:0.78rem;color:var(--text-muted);">' + _escapeAttr(p.comp) + '</p></div>'
        + '<div class="pm-markets">'
        + '<a href="' + BEE_MARKET_LINKS.amazon + '" target="_blank" rel="noopener noreferrer" class="pm-market-link"><img src="/images/icons/amazon.svg" alt="Amazon" width="24" height="24" onerror="this.style.display=\'none\'"><div><strong>Amazon</strong><br><small>Checkout prático</small></div></a>'
        + '<a href="' + BEE_MARKET_LINKS.shopee + '" target="_blank" rel="noopener noreferrer" class="pm-market-link"><img src="/images/icons/shopee.svg" alt="Shopee" width="24" height="24" onerror="this.style.display=\'none\'"><div><strong>Shopee</strong><br><small>Ofertas e cupons</small></div></a>'
        + '<a href="' + BEE_MARKET_LINKS.mercadolivre + '" target="_blank" rel="noopener noreferrer" class="pm-market-link"><img src="/images/icons/mercadolivre.svg" alt="Mercado Livre" width="24" height="24" onerror="this.style.display=\'none\'"><div><strong>Mercado Livre</strong><br><small>Compra segura</small></div></a>'
        + '</div>'
        + '</div>'
        + '</div>';

    productModalEl.classList.add('open');
    productModalEl.setAttribute('aria-hidden', 'false');
    if (typeof lockScroll === 'function') lockScroll();

    // Foca no botão fechar pra começar do topo
    const closeBtn = productModalEl.querySelector('.pm-close');
    if (closeBtn) setTimeout(function() { closeBtn.focus(); }, 50);
}

function closeProductModal() {
    if (!productModalEl) return;
    productModalEl.classList.remove('open');
    productModalEl.setAttribute('aria-hidden', 'true');
    if (typeof unlockScroll === 'function') unlockScroll();

    // Devolve o foco ao elemento de origem
    if (lastFocusedBeforeProductModal && typeof lastFocusedBeforeProductModal.focus === 'function') {
        try { lastFocusedBeforeProductModal.focus(); } catch (err) {}
    }
    lastFocusedBeforeProductModal = null;

    // Limpa o conteúdo após a transição para liberar memória
    setTimeout(function() {
        if (!productModalEl.classList.contains('open')) productModalContent.innerHTML = '';
    }, 300);
}

/* Trap de foco dentro do productModal (Tab e Shift+Tab) */
if (productModalEl) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModalEl.classList.contains('open')) {
            closeProductModal();
        }
    });

    productModalEl.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab' || !productModalEl.classList.contains('open')) return;
        const focusables = productModalEl.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    });
}

/* Delegação de eventos: clique e teclado nos cards */
if (beeProductsGrid) {
    beeProductsGrid.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-product-id]');
        if (!btn) return;
        let id = btn.getAttribute('data-product-id');
        if (id) openProductModal(id, btn);
    });
    beeProductsGrid.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.bee-product-card');
        if (!card) return;
        e.preventDefault();
        let id = card.getAttribute('data-product-id');
        if (id) openProductModal(id, card);
    });
}

/* Filtros */
document.querySelectorAll('.bee-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.bee-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderBeeProducts(btn.getAttribute('data-filter'));
    });
});

/* Render inicial */
renderBeeProducts('all');
