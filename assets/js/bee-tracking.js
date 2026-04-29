/* Bee Cosmetics — tracking complementar seguro */
(function(){
  'use strict';
  document.addEventListener('click', function(event){
    var el = event.target.closest('[data-market], [data-cta]');
    if(!el) return;
    var payload = { market: el.dataset.market || '', cta: el.dataset.cta || '', origin: el.dataset.origin || '' };
    try { if (typeof gtag === 'function') gtag('event', 'bee_interaction', payload); } catch(e) {}
    try { if (typeof fbq === 'function') fbq('trackCustom', 'BeeInteraction', payload); } catch(e) {}
  });
})();
