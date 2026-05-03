# Tracking profissional — Studio Caracóis

Versão: 20260502-audit-v1

## Arquitetura atual

O site usa páginas intermediárias próprias em:

```txt
/agendar/...
```

Essas páginas são `noindex` e fazem o redirecionamento para a plataforma final somente depois de registrar eventos. Essa arquitetura preserva o domínio próprio, melhora a mensuração e evita depender de links externos nos botões principais.

## Plataformas de medição

- GA4 — `G-0J7RBF2BFX`
- Meta Pixel — `1522260281454126`
- Microsoft Clarity — `wb0w1oc0ou`
- `dataLayer`
- first touch e last touch via `localStorage` (`sc_first_touch`, `sc_last_touch`)

## Eventos principais

### CTA / conversão
- `cta_click`
- `booking_click`
- `whatsapp_click`
- `map_click`
- `phone_click`
- `marketplace_click`

### Marca Bee Cosmetics
- `bee_filter_click`
- `bee_product_modal_open`
- `bee_marketplace_modal_open`
- `bee_marketplace_click`

### Marca Caracóis Care (NOVO)
- `care_filter_click`
- `care_product_modal_open`
- `care_tease` (cards do index)
- `care_mention` (menções contextuais em artigos)
- `care_prod_hero_booking` / `care_prod_final_booking`
- `care_prod_float_wa` / `care_prod_final_wa`
- `care_prod_nav_booking`
- `caracois_care_related`

### Erros
- `page_not_found` (NOVO — disparado no 404.html)

## O que é rastreado

### Agendamento

Botões e modais de agendamento devem apontar para:

```txt
/agendar/brasilia-asa-sul
/agendar/sao-paulo-tatuape
/agendar/sao-jose-dos-campos
...
```

O destino final Booksy/Linktree/Booksy Instant fica nas páginas `/agendar`, não no `vercel.json`.

### WhatsApp

Cliques em `wa.me` são rastreados pelo `main.js`, incluindo unidade quando o link ou o texto permitem inferência.

Recomendado usar mensagem pré-configurada no formato:

```txt
Olá! Vim pelo site do Studio Caracóis e quero agendar uma avaliação.
```

O `main.js` também pode enriquecer/normalizar links quando eles estiverem construídos pelo modal de unidades.

### Instagram e redes sociais

Cliques externos como Instagram, TikTok e YouTube podem ser registrados como `social_click`/`external_click` quando passam pelo listener global do `main.js`. Para máxima precisão, use `data-cta="social"` e `data-social="instagram"` nos links mais importantes.

Cada footer agora carrega o `data-source` específico para rastrear de onde vieram os cliques sociais:
- `data-source="home"`, `"artigo"`, `"servico"`, `"bee-produto"`, `"caracois-care-produto"`, `"unidade"`, `"care-hub"`, `"bee-hub"`, `"central"`, `"franquia"`.

## Boas práticas mantidas

- Não usar redirect direto no `vercel.json` para agendamento.
- Não indexar `/agendar`.
- Usar cache-busting em CSS/JS (`?v=20260502-audit-v1` — versão única em todo o site).
- Não subir `bee-tracking.js`.
- Manter o tracking centralizado no `main.js`.

## Cobertura de tracking pós-auditoria 2026-05-02

- **63 de 63** páginas HTML com GA4 + Meta Pixel + Clarity (incluindo 404 e as 5 novas páginas internas Caracóis Care).
- **54 de 54** páginas com `<nav>` têm Caracóis Care no menu.
- **1 versão única** de cache-busting em todo o site (anteriormente havia 9 versões diferentes).
- **5 de 5** páginas internas Caracóis Care com modais waModal/bookingModal/mobile menu funcionais.
- **0 links internos quebrados** (anteriormente 19 quebrados em /servicos/*).
- **54 URLs no sitemap.xml** (anteriormente 31 — +6 Caracóis Care, +6 Serviços, +10 Bee Cosmetics, +1 Bee Cosmetics hub).
