/* =========================
   UNIDADES.JS — Lógica específica para páginas de unidade
   Popula dinamicamente os dados da unidade a partir de window.UNIT_CONFIG
========================= */

(function() {
    'use strict';

    const config = window.UNIT_CONFIG;
    if (!config) {
        console.warn('UNIT_CONFIG não definido. A página da unidade não será populada.');
        return;
    }

    // Função para escapar HTML (evita XSS)
    function escapeHtml(value) {
        if (!value) return '';
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Popula elementos com data-unit="..."
    function populateElements() {
        document.querySelectorAll('[data-unit]').forEach(el => {
            const key = el.getAttribute('data-unit');
            let value = config[key] || '';

            // Tratamentos especiais
            if (key === 'cityStatePostal') {
                value = `${config.city} - ${config.state} • CEP ${config.postal}`;
            } else if (key === 'whatsappUrl') {
                const text = encodeURIComponent(`Olá! Gostaria de agendar minha avaliação gratuita na unidade ${config.name}.`);
                value = `https://wa.me/${config.phone}?text=${text}`;
            } else if (key === 'heroTitle') {
                value = `Cabelos cacheados em ${config.city} agora têm <em>um endereço de confiança.</em>`;
            } else if (key === 'heroSub') {
                value = `Studio Caracóis ${config.name}: técnica, acolhimento e produtos low poo para revelar o melhor dos seus cachos. Agende sua avaliação gratuita.`;
            }

            // Aplica o valor
            if (el.tagName === 'A') {
                el.setAttribute('href', value);
            } else if (el.tagName === 'IFRAME') {
                el.setAttribute('src', value);
            } else {
                // Permite HTML no heroTitle (por causa do <em>)
                if (key === 'heroTitle') {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }
        });
    }

    // Gera e insere o Schema.org LocalBusiness
    function injectSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "HairSalon",
            "parentOrganization": {"@type": "Organization", "@id": "https://caracois.com.br/#organization"},
            "name": `Studio Caracóis — ${config.name}`,
            "description": `Salão especializado em cabelos cacheados em ${config.city}, ${config.state}. Corte 3D, Acidificação, Caracóis Care e avaliação gratuita.`,
            "url": `https://caracois.com.br/unidades/${config.slug}`,
            "telephone": `+55${config.phone}`,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": config.address,
                "addressLocality": config.city,
                "addressRegion": config.state,
                "postalCode": config.postal,
                "addressCountry": "BR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": config.lat,
                "longitude": config.lng
            },
            "priceRange": "$$",
            "image": "https://caracois.com.br/images/logos/logo-terracota.svg",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "19:00"
                }
            ],
            "sameAs": ["https://instagram.com/studiocaracois"]
        };

        const scriptEl = document.getElementById('unitSchema');
        if (scriptEl) {
            scriptEl.textContent = JSON.stringify(schema, null, 2);
        }
    }

    // Atualiza meta tags para SEO
    function updateMetaTags() {
        const metaMap = {
            'description': `Studio Caracóis ${config.name}: salão especialista em cabelos cacheados. Corte 3D, Acidificação e Caracóis Care. Agende sua avaliação gratuita.`,
            'keywords': `salão cabelo cacheado ${config.city}, especialista em cachos ${config.neighborhood}, Studio Caracóis ${config.city}`,
            'og:title': `Studio Caracóis ${config.name} | Especialistas em Cabelos Cacheados`,
            'og:description': `Corte 3D, Acidificação, Caracóis Care e avaliação gratuita em ${config.city}. Agende seu horário.`,
            'og:url': `https://caracois.com.br/unidades/${config.slug}`,
            'twitter:title': `Studio Caracóis ${config.name} | Especialistas em Cabelos Cacheados`,
            'twitter:description': `Corte 3D, Acidificação, Caracóis Care e avaliação gratuita em ${config.city}.`
        };

        Object.entries(metaMap).forEach(([name, content]) => {
            let selector;
            if (name.startsWith('og:')) {
                selector = `meta[property="${name}"]`;
            } else if (name.startsWith('twitter:')) {
                selector = `meta[name="${name}"]`;
            } else {
                selector = `meta[name="${name}"]`;
            }
            
            const meta = document.querySelector(selector);
            if (meta) meta.setAttribute('content', content);
        });

        // Atualiza título
        document.title = `Studio Caracóis ${config.name} | Salão de Cachos`;
        
        // Atualiza canonical
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', `https://caracois.com.br/unidades/${config.slug}`);
    }

    // Configura o botão flutuante do WhatsApp
    function setupWhatsAppFloat() {
        const floatBtn = document.querySelector('.whatsapp-float');
        if (floatBtn) {
            const text = encodeURIComponent(`Olá! Gostaria de agendar minha avaliação gratuita na unidade ${config.name}.`);
            const url = `https://wa.me/${config.phone}?text=${text}`;
            floatBtn.setAttribute('onclick', `window.open('${url}', '_blank')`);
        }
    }

    // Configura a sticky CTA
    function setupStickyCta() {
        const stickyCta = document.querySelector('.sticky-cta');
        if (stickyCta) {
            stickyCta.setAttribute('href', config.bookingUrl);
        }
    }

    // Inicialização
    function init() {
        populateElements();
        injectSchema();
        updateMetaTags();
        setupWhatsAppFloat();
        setupStickyCta();
    }

    init();
})();