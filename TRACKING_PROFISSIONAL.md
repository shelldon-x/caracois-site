# Tracking profissional — Studio Caracóis

Versão 10/10 com páginas intermediárias `/agendar/...`, redirecionamento automático em ~800ms, evento central `cta_click`, eventos específicos (`booking_click`, `whatsapp_click`, `map_click`, `phone_click`, `marketplace_click`), captura de UTMs, first/last touch em localStorage, envio para GA4, Meta Pixel, Clarity e dataLayer.

As páginas `/agendar/...` são noindex e substituem os redirects diretos da Vercel para permitir mensuração antes de enviar para Booksy/Salão99/Linktree.
