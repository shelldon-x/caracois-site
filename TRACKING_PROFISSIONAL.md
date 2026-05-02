# Tracking profissional — Studio Caracóis

Versão: 20260429-infra-10-10

## Arquitetura atual

O site usa páginas intermediárias próprias em:

```txt
/agendar/...
```

Essas páginas são `noindex` e fazem o redirecionamento para a plataforma final somente depois de registrar eventos. Essa arquitetura preserva o domínio próprio, melhora a mensuração e evita depender de links externos nos botões principais.

## Plataformas de medição

- GA4
- Meta Pixel
- Microsoft Clarity
- `dataLayer`
- first touch e last touch via `localStorage`

## Eventos principais

- `cta_click`
- `booking_click`
- `whatsapp_click`
- `map_click`
- `phone_click`
- `marketplace_click`
- `bee_filter_click`
- `bee_product_modal_open`
- `bee_marketplace_modal_open`
- `bee_marketplace_click`

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

## Boas práticas mantidas

- Não usar redirect direto no `vercel.json` para agendamento.
- Não indexar `/agendar`.
- Usar cache-busting em CSS/JS.
- Não subir `bee-tracking.js`.
- Manter o tracking centralizado no `main.js`.
