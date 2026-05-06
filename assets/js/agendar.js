/* Studio Caracóis — agendar.js centralizado
   Build: 20260503-agendar-central-js-logo-final
   Responsável por atribuição, tracking e redirecionamento das páginas /agendar.
*/
(function () {
  'use strict';

  var BUILD = window.SC_AGENDAR_BUILD || '20260506-agendar-attribution-preserve';
  var SC_UNIT = window.SC_AGENDAR_UNIT || {};
  var SC_DESTINATION = window.SC_AGENDAR_DESTINATION || '';
  var ATTR_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid','fbclid','msclkid'];

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }

  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function normalizeHost(ref) {
    try { return new URL(ref).hostname.replace(/^www\./, '').toLowerCase(); } catch (e) { return ''; }
  }

  function inferReferrerSource() {
    var ref = document.referrer || '';
    if (!ref) return { source: 'direct', medium: 'none' };
    var host = normalizeHost(ref);
    var currentHost = (location.hostname || '').replace(/^www\./, '').toLowerCase();
    if (host && currentHost && (host === currentHost || host.slice(-(currentHost.length + 1)) === '.' + currentHost)) {
      return { source: 'internal', medium: 'navigation', internal: true };
    }
    var aiSources = [
      ['chatgpt', ['chatgpt.com','chat.openai.com','openai.com']],
      ['copilot', ['copilot.microsoft.com','bing.com/chat']],
      ['gemini', ['gemini.google.com','bard.google.com']],
      ['deepseek', ['deepseek.com','chat.deepseek.com']],
      ['claude', ['claude.ai','anthropic.com']],
      ['perplexity', ['perplexity.ai']],
      ['grok', ['grok.com','x.ai']],
      ['meta_ai', ['meta.ai']]
    ];
    for (var i = 0; i < aiSources.length; i++) {
      var source = aiSources[i][0];
      var domains = aiSources[i][1];
      for (var j = 0; j < domains.length; j++) {
        if (host.indexOf(domains[j]) !== -1) return { source: source, medium: 'ai' };
      }
    }
    if (host.indexOf('google.') !== -1) return { source: 'google', medium: 'organic' };
    if (host.indexOf('bing.') !== -1) return { source: 'bing', medium: 'organic' };
    if (host.indexOf('instagram.') !== -1) return { source: 'instagram', medium: 'social' };
    if (host.indexOf('facebook.') !== -1 || host.indexOf('fb.') !== -1) return { source: 'facebook', medium: 'social' };
    if (host.indexOf('tiktok.') !== -1) return { source: 'tiktok', medium: 'social' };
    if (host.indexOf('youtube.') !== -1 || host.indexOf('youtu.be') !== -1) return { source: 'youtube', medium: 'video' };
    if (host.indexOf('pinterest.') !== -1) return { source: 'pinterest', medium: 'social' };
    if (host.indexOf('x.com') !== -1 || host.indexOf('twitter.') !== -1) return { source: 'x', medium: 'social' };
    if (host.indexOf('linkedin.') !== -1) return { source: 'linkedin', medium: 'social' };
    if (host.indexOf('whatsapp.') !== -1) return { source: 'whatsapp', medium: 'referral' };
    return { source: host || 'referral', medium: 'referral' };
  }

  function captureAttribution() {
    var qs = new URLSearchParams(location.search);
    var ref = inferReferrerSource();
    var now = new Date().toISOString();
    var first = readJSON('sc_first_touch', null);
    var previousLast = readJSON('sc_last_touch', null);
    var hasUrlAttrs = ATTR_KEYS.some(function (key) { return qs.get(key); });
    var current = (ref.internal && !hasUrlAttrs && previousLast) ? Object.assign({}, previousLast, {
      previous_page: previousLast.page_path || previousLast.landing_page || '',
      page_path: location.pathname,
      page_title: document.title || '',
      internal_navigation_at: now
    }) : {
      source: qs.get('utm_source') || ref.source,
      medium: qs.get('utm_medium') || ref.medium,
      campaign: qs.get('utm_campaign') || '',
      content: qs.get('utm_content') || '',
      term: qs.get('utm_term') || '',
      gclid: qs.get('gclid') || '',
      gbraid: qs.get('gbraid') || '',
      wbraid: qs.get('wbraid') || '',
      fbclid: qs.get('fbclid') || '',
      msclkid: qs.get('msclkid') || '',
      landing_page: (first && first.landing_page) || location.pathname,
      page_path: location.pathname,
      page_title: document.title || '',
      captured_at: now
    };
    if (!first) writeJSON('sc_first_touch', current);
    writeJSON('sc_last_touch', current);
    return { first: readJSON('sc_first_touch', current), last: current };
  }

  var attr = captureAttribution();

  function destinationWithParams() {
    var dest = new URL(SC_DESTINATION, location.origin);
    var qs = new URLSearchParams(location.search);
    ATTR_KEYS.forEach(function (key) {
      var normalized = key.replace('utm_', '');
      var value = qs.get(key) || attr.last[normalized] || attr.last[key] || '';
      if (value && !dest.searchParams.has(key)) dest.searchParams.set(key, value);
    });
    return dest.toString();
  }

  function payload(finalUrl, ctaName) {
    var destinationHost = '';
    try { destinationHost = new URL(finalUrl).hostname.replace(/^www\./, ''); } catch (e) {}
    return {
      site: 'caracois.com.br',
      page_path: location.pathname,
      page_location: location.href,
      page_title: document.title,
      channel: 'booking',
      cta_type: 'agendar',
      cta: ctaName || 'agendar_redirect_auto',
      unidade: SC_UNIT.id || '',
      unit_slug: SC_UNIT.slug || '',
      unit_name: SC_UNIT.name || '',
      destination_platform: SC_UNIT.platform || '',
      destination_host: destinationHost,
      destination_url_type: 'external',
      build_version: BUILD,
      source: attr.last.source || '',
      medium: attr.last.medium || '',
      campaign: attr.last.campaign || '',
      first_source: (attr.first || {}).source || '',
      first_medium: (attr.first || {}).medium || '',
      landing_page: (attr.first || {}).landing_page || ''
    };
  }

  function track(name, data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, data));
    try { if (typeof gtag === 'function') gtag('event', name, Object.assign({ event_category: 'booking', transport_type: 'beacon' }, data)); } catch (e) {}
    try { if (typeof fbq === 'function') fbq('trackCustom', name, { content_name: data.cta, content_category: 'booking', unidade: data.unidade, source: data.source, medium: data.medium, campaign: data.campaign }); } catch (e) {}
    try { if (typeof clarity === 'function') { clarity('event', name); clarity('set', 'unidade', data.unidade || ''); clarity('set', 'booking_platform', data.destination_platform || ''); } } catch (e) {}
  }

  function init() {
    if (!SC_DESTINATION) return;
    var finalUrl = destinationWithParams();
    var continueLink = document.getElementById('continueLink');
    if (continueLink) {
      continueLink.href = finalUrl;
      continueLink.setAttribute('rel', 'noopener noreferrer');
      continueLink.addEventListener('click', function () {
        track('booking_manual_click', payload(finalUrl, 'agendar_redirect_manual'));
      });
    }
    var p = payload(finalUrl, 'agendar_redirect_auto');
    track('booking_intent', p);
    track('cta_click', p);
    window.setTimeout(function () {
      track('booking_redirect', p);
      location.href = finalUrl;
    }, 800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
