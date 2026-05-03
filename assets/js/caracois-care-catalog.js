
/* Caracóis Care — catálogo conceito premium
   Build: 20260502-home-central-phase1-10-10
   Estrutura inspirada no catálogo Bee, com escopo próprio para não conflitar.
*/
(function(){
  'use strict';
  const BUILD_VERSION = '20260502-home-central-phase1-10-10';
  const CARE_PRODUCTS = [
    {
      id:'shampoo-sem-sulfato', initials:'S', name:'Shampoo Sem Sulfato', type:'Limpeza inteligente', category:'limpeza',
      desc:'Limpeza suave pensada para cabelos com curvatura, removendo impurezas sem comprometer a hidratação natural dos fios. Ideal para quem quer couro cabeludo limpo, cachos soltos e sensação de leveza desde a primeira etapa da rotina.',
      shortDesc:'Limpeza suave sem ressecar, ideal para rotinas low poo e cuidado frequente dos cachos.',
      tags:['Low poo','Sem sulfato','Limpeza suave'], volume:'300 ml', ph:'pH estimado 4,5–5,0', status:'Conceito em desenvolvimento',
      howToUse:'Aplique nos cabelos molhados, massageando o couro cabeludo com a ponta dos dedos. Enxágue bem e repita se necessário. Em seguida, use a Máscara 3 em 1 ou o Leave-in Multiuso Caracóis Care conforme a necessidade dos fios.',
      concept:'Proposta de fórmula com tensoativos suaves, aloe vera, pantenol e agentes condicionantes de origem vegetal para apoiar uma limpeza equilibrada sem aspereza.'
    },
    {
      id:'co-wash', initials:'C', name:'Co-wash', type:'Limpeza condicionante', category:'limpeza',
      desc:'Limpeza cremosa e condicionante para rotinas no poo, criada para higienizar com delicadeza enquanto ajuda a preservar maciez, movimento e definição. Uma opção estratégica para alternar com o shampoo sem sulfato.',
      shortDesc:'Limpa e condiciona em um só passo, com toque macio e proposta no poo.',
      tags:['No poo','Co-wash','Maciez'], volume:'300 ml', ph:'pH estimado 4,0–4,5', status:'Conceito em desenvolvimento',
      howToUse:'Aplique diretamente no couro cabeludo e comprimento molhados. Massageie com calma, distribua pelo comprimento e enxágue completamente. Use em dias de lavagem mais suave ou quando os fios pedirem menos detergência.',
      concept:'Proposta com base condicionante, extratos hidratantes e emolientes leves para limpeza por fricção e condicionamento, sem perder a sensação de cabelo limpo.'
    },
    {
      id:'mascara-3-em-1', initials:'3', name:'Máscara 3 em 1', type:'Hidratação • Nutrição • Reconstrução', category:'tratamento',
      desc:'Tratamento versátil para simplificar a rotina capilar, combinando hidratação, nutrição e reposição de massa em uma única proposta. Desenvolvida para entregar sensorial profissional, brilho, maciez e força sem pesar os cachos.',
      shortDesc:'Tratamento completo para hidratar, nutrir e fortalecer cabelos cacheados, ondulados e crespos.',
      tags:['3 em 1','Brilho','Força'], volume:'300 g', ph:'pH estimado 4,0', status:'Conceito em desenvolvimento',
      howToUse:'Após a limpeza, aplique mecha a mecha, enluvando os fios. Deixe agir de 5 a 10 minutos e enxágue. Use semanalmente ou conforme orientação profissional na avaliação capilar.',
      concept:'Proposta com pantenol, manteigas vegetais, aminoácidos e proteína hidrolisada em equilíbrio para tratar diferentes necessidades sem criar uma rotina complicada.'
    },
    {
      id:'leave-in-multiuso', initials:'L', name:'Leave-in Multiuso', type:'Finalização versátil', category:'finalizacao',
      desc:'Finalizador multifuncional para definição, controle de frizz, proteção térmica e toque leve. Pensado para funcionar em diferentes curvaturas e técnicas de finalização, da fitagem à finalização mais natural.',
      shortDesc:'Finalização, definição, proteção térmica e controle de frizz em um único produto.',
      tags:['Proteção térmica','Definição','Frizz'], volume:'300 ml', ph:'pH estimado 4,0–4,5', status:'Conceito em desenvolvimento',
      howToUse:'Com os fios úmidos, aplique do comprimento às pontas e finalize como preferir. Para mais definição, combine com a Gelatina Capilar Caracóis Care. Para efeito leve, use menor quantidade e amasse os cachos.',
      concept:'Proposta com polímeros condicionantes, manteigas leves e complexo termoativo para apoiar definição, maciez e proteção no uso com difusor.'
    },
    {
      id:'gelatina-capilar', initials:'G', name:'Gelatina Capilar', type:'Fixação e definição', category:'finalizacao',
      desc:'Gelatina de finalização com fixação equilibrada para prolongar a definição sem rigidez excessiva. Criada para ajudar no controle do frizz, na durabilidade dos cachos e no acabamento profissional da rotina.',
      shortDesc:'Fixação equilibrada, definição duradoura e acabamento leve para cabelos com curvatura.',
      tags:['Fixação','Definição','Day after'], volume:'300 g', ph:'pH estimado 4,5', status:'Conceito em desenvolvimento',
      howToUse:'Aplique após o leave-in, distribuindo por mechas ou amassando os fios de baixo para cima. Use mais produto para maior fixação ou menos produto para um acabamento natural.',
      concept:'Proposta com aloe vera, agentes filmógenos flexíveis e ativos hidratantes para criar memória de cacho sem deixar acabamento duro.'
    }
  ];

  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (str) => String(str || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function track(name, payload){
    const data = {brand:'caracois-care', build_version:BUILD_VERSION, ...(payload||{})};
    try{ if(typeof window.scTrack === 'function') window.scTrack(name, data); }catch(e){}
    try{ if(typeof window.gtag === 'function') window.gtag('event', name, data); }catch(e){}
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event:name, ...data});
  }

  function card(product){
    const tags = (product.tags||[]).slice(0,3).map(t => `<span class="care-product-pill care-product-pill--tag">${esc(t)}</span>`).join('');
    return `<article class="care-product-card reveal" tabindex="0" role="button" aria-label="Ver ficha de ${esc(product.name)}" data-product-id="${esc(product.id)}">
      <div class="care-product-img">
        <span class="care-product-tag-float">${esc(product.category)}</span>
        <div class="care-product-placeholder" aria-hidden="true">${esc(product.initials)}</div>
      </div>
      <div class="care-product-info">
        <div class="care-product-type">${esc(product.type)}</div>
        <h4>${esc(product.name)}</h4>
        <p>${esc(product.shortDesc)}</p>
        <div class="care-product-meta-row">${tags}<span class="care-product-pill care-product-pill--ph">${esc(product.ph)}</span></div>
        <div class="care-product-actions"><button type="button" class="care-btn-mini" data-product-id="${esc(product.id)}">Ver conceito do produto →</button></div>
      </div>
    </article>`;
  }

  function render(filter='all'){
    const grid = $('#careProductsGrid');
    if(!grid) return;
    const list = filter === 'all' ? CARE_PRODUCTS : CARE_PRODUCTS.filter(p => p.category === filter);
    grid.innerHTML = list.map(card).join('');
    grid.classList.remove('care-cat-products-grid--loading');
    grid.setAttribute('aria-busy','false');
    $$('.care-product-card', grid).forEach(el => {
      const id = el.dataset.productId;
      el.addEventListener('click', (ev) => { if(ev.target.closest('button')) return; openCareProductModal(id); });
      el.addEventListener('keydown', ev => { if(ev.key==='Enter' || ev.key===' '){ ev.preventDefault(); openCareProductModal(id); } });
    });
    $$('.care-btn-mini', grid).forEach(btn => btn.addEventListener('click', ev => { ev.stopPropagation(); openCareProductModal(btn.dataset.productId); }));
    if(typeof IntersectionObserver !== 'undefined'){
      $$('.reveal', grid).forEach(el => setTimeout(()=>el.classList.add('visible'), 50));
    } else {
      $$('.reveal', grid).forEach(el => el.classList.add('visible'));
    }
  }

  function productById(id){ return CARE_PRODUCTS.find(p => p.id === id) || CARE_PRODUCTS[0]; }

  function openCareProductModal(id){
    const p = productById(id);
    const overlay = $('#careProductModal');
    const content = $('#careProductModalContent');
    if(!overlay || !content) return;
    const tags = (p.tags||[]).map(t => `<span class="care-pm-pill">${esc(t)}</span>`).join('');
    content.innerHTML = `<div class="care-pm-grid">
      <div class="care-pm-visual"><div class="care-product-placeholder" aria-hidden="true">${esc(p.initials)}</div></div>
      <div class="care-pm-copy">
        <div class="care-pm-kicker">Caracóis Care · ${esc(p.type)}</div>
        <h2>${esc(p.name)}</h2>
        <p class="care-pm-desc">${esc(p.desc)}</p>
        <div class="care-pm-pills">${tags}<span class="care-pm-pill">${esc(p.volume)}</span><span class="care-pm-pill">${esc(p.ph)}</span></div>
        <div class="care-pm-section"><h3>Como entra na rotina</h3><p>${esc(p.howToUse)}</p></div>
        <div class="care-pm-section"><h3>Conceito de fórmula</h3><p>${esc(p.concept)}</p></div>
        <div class="care-pm-section"><h3>Status</h3><p>${esc(p.status)}. Esta página é uma prévia conceitual para validação visual, posicionamento e arquitetura da futura linha.</p></div>
        <div class="care-pm-actions">
          <button type="button" class="btn btn-primary" onclick="openBooking()" data-cta="care_modal_booking" data-product="${esc(p.id)}">Agendar avaliação</button>
          <button type="button" class="btn btn-outline-terracota-plain" onclick="closeCareProductModal()" data-cta="care_modal_close" data-product="${esc(p.id)}">Voltar ao catálogo</button>
        </div>
        <p class="care-pm-disclaimer">Textos, pH, volume e conceito são prévias editoriais. Ajuste com ficha técnica final antes da venda oficial.</p>
      </div>
    </div>`;
    overlay.classList.add('active'); overlay.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open'); document.body.classList.add('modal-open');
    track('care_product_modal_open', {product_id:p.id, product_name:p.name});
  }

  function closeCareProductModal(){
    const overlay = $('#careProductModal');
    if(!overlay) return;
    overlay.classList.remove('active'); overlay.setAttribute('aria-hidden','true');
    if(!document.querySelector('.active[role="dialog"], .is-open[role="dialog"], .open[role="dialog"]')){
      document.documentElement.classList.remove('modal-open'); document.body.classList.remove('modal-open');
    }
  }

  function initFilters(){
    $$('.care-cat-filter-btn').forEach(btn => btn.addEventListener('click', () => {
      $$('.care-cat-filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      render(btn.dataset.filter || 'all');
      track('care_filter_click', {filter:btn.dataset.filter || 'all'});
    }));
  }

  function initEsc(){ document.addEventListener('keydown', ev => { if(ev.key === 'Escape') closeCareProductModal(); }); }

  document.addEventListener('DOMContentLoaded', () => { render('all'); initFilters(); initEsc(); });
  window.CARACOIS_CARE_PRODUCTS = CARE_PRODUCTS;
  window.openCareProductModal = openCareProductModal;
  window.closeCareProductModal = closeCareProductModal;
})();
