
(function(){
  'use strict';
  const BUILD_VERSION = '20260503-bee-dynamic-system-v1';
  const MARKETPLACES = [
    { key:'amazon', name:'Amazon', href:'https://www.amazon.com.br/s?k=bee+cosmetics+cabelo+cacheado' },
    { key:'shopee', name:'Shopee', href:'https://shopee.com.br/search?keyword=bee%20cosmetics%20cabelo%20cacheado' },
    { key:'mercadolivre', name:'Mercado Livre', href:'https://lista.mercadolivre.com.br/bee-cosmetics' }
  ];
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const esc = (str) => String(str || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  function track(name, params){
    const payload = { build_version: BUILD_VERSION, page_type:'bee_product', ...(params||{}) };
    try { if (typeof window.gtag === 'function') window.gtag('event', name, payload); } catch(e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', name, payload); } catch(e) {}
    try { if (typeof window.clarity === 'function') window.clarity('event', name); } catch(e) {}
  }
  function getSlug(){
    const explicit = document.body.dataset.productId;
    if (explicit) return explicit;
    const path = window.location.pathname.replace(/\/$/,'');
    return path.split('/').pop().replace(/\.html$/,'');
  }
  function categoryLabel(category){ return ({limpeza:'Limpeza', tratamento:'Tratamento', finalizacao:'Finalização'}[category] || category || 'Produto'); }
  function productBySlug(slug){ return (window.BEE_PRODUCTS || []).find(p => p.id === slug) || null; }
  function relatedProducts(product){
    const all = window.BEE_PRODUCTS || [];
    const same = all.filter(p => p.id !== product.id && p.category === product.category);
    const rest = all.filter(p => p.id !== product.id && p.category !== product.category);
    return [...same, ...rest].slice(0,4);
  }
  function imageHtml(product, loading='eager'){
    const fallbacks = [product.image].concat(product.fallbacks || []).filter(Boolean);
    return `<img src="${esc(fallbacks[0])}" data-fallbacks='${esc(JSON.stringify(fallbacks))}' alt="${esc(product.name)} — ${esc(product.type)}" loading="${loading}" decoding="async">`;
  }
  function bindImageFallbacks(root=document){
    root.querySelectorAll('img[data-fallbacks]:not([data-fallback-bound])').forEach(img => {
      img.dataset.fallbackBound = 'true';
      img.addEventListener('error', () => {
        let list=[]; try { list = JSON.parse(img.dataset.fallbacks || '[]'); } catch(e) {}
        const current = img.getAttribute('src');
        const idx = list.indexOf(current);
        const next = list[idx + 1];
        if (next) img.src = next;
      });
    });
  }
  function render(product){
    document.title = document.title || `${product.name} | Bee Cosmetics`;
    const tags = (product.tags || []).map(t => `<span class="bee-product-pill">${esc(t)}</span>`).join('');
    $('#beeProductBreadcrumbCurrent').textContent = product.name;
    $('#beeProductCategory').textContent = categoryLabel(product.category);
    $('#beeProductName').textContent = product.name;
    $('#beeProductType').textContent = product.type;
    $('#beeProductDesc').textContent = product.desc || product.shortDesc || '';
    $('#beeProductPills').innerHTML = tags + (product.ph ? `<span class="bee-product-pill">${esc(product.ph)}</span>` : '');
    $('#beeProductImage').innerHTML = imageHtml(product, 'eager');
    $('#beeProductVolume').textContent = product.volume || '—';
    $('#beeProductPh').textContent = product.ph || '—';
    $('#beeProductAnvisa').textContent = product.anvisa || '—';
    $('#beeProductBarcode').textContent = product.barcode || '—';
    $('#beeProductEditorialTitle').textContent = `${product.name}: ${product.type}`;
    $('#beeProductEditorialText').textContent = product.shortDesc || product.desc || '';
    $('#beeProductHowToUse').textContent = product.howToUse || '';
    $('#beeProductIngredients').textContent = product.ingredients || '';
    $('#beeProductMarkets').innerHTML = MARKETPLACES.map(m => `<a class="bee-product-market-chip" href="${esc(m.href)}" target="_blank" rel="noopener noreferrer" data-market="${esc(m.key)}" data-origin="product-page" data-product="${esc(product.id)}">${esc(m.name)} ↗</a>`).join('');
    $('#beeProductRelated').innerHTML = relatedProducts(product).map(p => `<a class="bee-product-related-card" href="/bee-cosmetics/${esc(p.id)}" data-product-related="${esc(p.id)}">${imageHtml(p,'lazy')}<span>${esc(categoryLabel(p.category))}</span><strong>${esc(p.name)}</strong><small>${esc(p.type)}</small></a>`).join('');
    const buyBarTitle = $('#beeBuyBarTitle'); if (buyBarTitle) buyBarTitle.textContent = product.name;
    document.querySelectorAll('[data-current-product]').forEach(el => el.dataset.currentProduct = product.id);
    bindImageFallbacks(document);
    document.querySelectorAll('.js-render-pending').forEach(el => { el.classList.remove('js-render-pending'); el.classList.add('js-render-ready'); });
    track('view_item', { item_id: product.id, item_name: product.name, item_category: product.category, item_variant: product.type });
  }
  function initStickyBuyBar(){
    const bar = $('#beeBuyBar'); const hero = $('.bee-product-hero');
    if (!bar || !hero || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => bar.classList.toggle('is-visible', !entry.isIntersecting));
    }, { threshold: .08 });
    io.observe(hero);
  }
  function bindEvents(product){
    document.addEventListener('click', (event) => {
      const buy = event.target.closest('[data-bee-buy]');
      if (buy) {
        track('bee_product_buy_intent', { product_id: product.id, product_name: product.name, product_category: product.category, origin: buy.dataset.origin || '' });
        if (typeof window.openBeeModal === 'function') { event.preventDefault(); window.openBeeModal(); }
      }
      const market = event.target.closest('[data-market]');
      if (market) track('bee_marketplace_click', { product_id: product.id, market: market.dataset.market || '', origin: market.dataset.origin || '', link_url: market.href || '' });
      const related = event.target.closest('[data-product-related]');
      if (related) track('bee_related_product_click', { product_id: product.id, related_product_id: related.dataset.productRelated || '' });
    });
  }
  function boot(){
    const slug = getSlug();
    const product = productBySlug(slug);
    if (!product) {
      const target = $('#beeProductName');
      if (target) target.textContent = 'Produto não encontrado';
      track('bee_product_not_found', { slug });
      return;
    }
    render(product); bindEvents(product); initStickyBuyBar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true }); else boot();
})();
