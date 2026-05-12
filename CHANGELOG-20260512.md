# Release `20260512` — Caracóis Care Mirror + Cache-Busting + Tipografia

**Data:** 12/05/2026  
**Build tag:** `v=20260512`  
**Tipo:** Melhoria estrutural + higiene de manutenção, sem refatoração de tracking.

---

## ✅ Pode subir para produção?

**Sim.** Tracking, modais, schema.org, Open Graph, robots.txt, sitemap.xml e vercel.json foram preservados byte-a-byte. Validações automáticas passaram 100%.

---

## 📝 O que mudou

### 1. Caracóis Care — Espelho da Bee Cosmetics

**Arquivo:** `caracois-care.html`

- Adicionada seção **"Onde comprar"** entre o guia de uso e o CTA final, espelhando exatamente o padrão `bee-cat-buy` da Bee Cosmetics.
- 3 cards de marketplace (Amazon, Shopee, Mercado Livre) com queries amigáveis.
- Atributos de tracking preservados: `data-market`, `data-origin="care-section-buy"`.
- `aria-labelledby="buy-title-care"` para acessibilidade.

### 2. Catálogo Care — Queries de marketplace amigáveis

**Arquivo:** `assets/js/caracois-care-catalog.js`

**Antes:** Queries por produto eram híbridas (mesclavam nome + termos da categoria + "Studio Caracóis"):
```
Caracóis Care Shampoo Sem Sulfato shampoo sem sulfato cabelo cacheado Studio Caracóis
```

**Depois:** Padrão simples e amigável conforme solicitado:
```
Caracóis Care Shampoo Sem Sulfato para Cabelos Cacheados
```

**Fallback (modal global, sem produto):** `Caracóis Care para Cabelos Cacheados`

URLs geradas (exemplo):
- Amazon: `https://www.amazon.com.br/s?k=Caracóis%20Care%20Shampoo%20Sem%20Sulfato%20para%20Cabelos%20Cacheados`
- Shopee: `https://shopee.com.br/search?keyword=Caracóis%20Care%20Shampoo%20Sem%20Sulfato%20para%20Cabelos%20Cacheados`
- ML: `https://lista.mercadolivre.com.br/Caracóis%20Care%20Shampoo%20Sem%20Sulfato%20para%20Cabelos%20Cacheados`

### 3. CSS — Refinamentos de tipografia e consistência

**Arquivo:** `assets/css/main.css`

| Mudança | Linha | Antes | Depois |
|---|:---:|---|---|
| `.hero-sub` mobile (legibilidade) | 2490 | `font-size: 0.92rem` | `font-size: 0.95rem` |
| Breakpoint inconsistente do `.product-modal` | 3519 | `@media (max-width: 760px)` | `@media (max-width: 768px)` |

**Arquivo:** `assets/css/caracois-care.css`

- Adicionadas 78 linhas com regras `.care-cat-buy*` (espelho de `.bee-cat-buy*`).
- Inclui media query mobile para grid de 1 coluna abaixo de 768px.

### 4. Cache-busting unificado

**63 arquivos HTML** atualizados para versão única `?v=20260512` em todas as referências de:

- `main.css`, `main.js`
- `articles.css`, `pages.css`, `unidades.css`, `agendar.css`, `agendar.js`
- `bee-cosmetics.css`, `bee-product-pages.css`, `bee-catalog.js`, `bee-product-pages.js`
- `caracois-care.css`, `caracois-care-product-pages.css`, `caracois-care-catalog.js`, `caracois-care-product-pages.js`

**Por que isso é necessário:** o `vercel.json` configura `Cache-Control: public, max-age=31536000, immutable` para `/assets/*` (1 ano). Sem o `?v=` atualizado, navegadores que já visitaram o site **não baixariam o CSS/JS atualizado**.

**Antes:** 6 versões diferentes de `main.css` espalhadas (de `20260504` a `20260507`), 8 versões diferentes de `main.js`. Inconsistência de cache.

**Depois:** versão única `20260512` em todos os HTMLs.

---

## 🔒 O que NÃO foi modificado (cofre selado)

Verificado byte-a-byte via `diff`:

- ✅ `assets/js/main.js` — **tracking completo** (GA4, Meta Pixel, Clarity, Pinterest, dataLayer, classificação de IAs, atribuição first/last touch) **idêntico**
- ✅ `assets/js/bee-catalog.js` — idêntico
- ✅ `assets/js/bee-product-pages.js` — idêntico
- ✅ `assets/js/caracois-care-product-pages.js` — idêntico
- ✅ `assets/js/agendar.js` — idêntico
- ✅ `robots.txt` — idêntico (liberação de IAs preservada)
- ✅ `sitemap.xml` — idêntico (Care continua indexável conforme pedido)
- ✅ `vercel.json` — idêntico (58 redirects, 2 rewrites, security headers, cache policy)
- ✅ `site.webmanifest`, `404.html` — idênticos
- ✅ Estrutura dos modais existentes: `#beeModal`, `#careModal`, `#bookingModal`, `#waModal`, `#productModal`
- ✅ Schema.org (JSON-LD) em todas as 55 páginas que tinham
- ✅ Open Graph e Twitter Cards em todas as páginas
- ✅ Canonicals em todas as 63 páginas
- ✅ Atributos de tracking: `data-cta` (561×), `data-channel` (14×), `data-market` (51×), `data-origin` (94×), `data-unit*` (42×)

---

## 🧪 Validações automáticas executadas

```
✓ GA4 G-0J7RBF2BFX presente em 63 páginas
✓ Meta Pixel 1522260281454126 presente em 63 páginas
✓ Microsoft Clarity wb0w1oc00u presente em 63 páginas
✓ Pinterest 2613592271512 presente em 63 páginas
✓ Modais preservados (#beeModal, #careModal, #bookingModal, #waModal, #productModal)
✓ Schema.org JSON-LD em 55 páginas
✓ Canonicals em 63 páginas
✓ Todos os assets versionados em 20260512 uniformemente
```

---

## 🚀 Como fazer o deploy

1. **Backup do estado atual** (recomendado): `git tag pre-20260512` antes de subir.
2. **Substituir os arquivos** do projeto pelos do ZIP.
3. **Conferir localmente** (opcional): abrir `/caracois-care` em modo anônimo e validar:
   - Seção "Onde comprar" aparece entre guia e CTA final
   - 3 cards (Amazon, Shopee, ML) com hover funcional
   - Links abrem em nova aba com query `Caracóis Care para Cabelos Cacheados`
   - Modal de produto (clicar num card do catálogo) abre com 3 marketplaces, cada um com query `Caracóis Care {Nome do Produto} para Cabelos Cacheados`
4. **Deploy normal** via Vercel.
5. **Pós-deploy**: testar em modo anônimo no `caracois.com.br/caracois-care`. Se cache ainda persistir num device, é só hard-refresh (Cmd+Shift+R / Ctrl+F5) — o `?v=20260512` resolve para novos visitantes automaticamente.

---

## 🐛 Plano de rollback (se necessário)

Como cada arquivo modificado é independente, o rollback é simples:

- **Tracking quebrou?** Não é possível — `main.js` não foi tocado. Mas se algo acontecer, basta restaurar `main.js`, `bee-catalog.js`, `bee-product-pages.js`.
- **Tipografia mobile ficou estranha?** Restaurar `assets/css/main.css` (única mudança são 2 linhas).
- **Seção Onde Comprar deu problema na Care?** Restaurar `caracois-care.html` e `assets/css/caracois-care.css`.
- **Queries de marketplace voltaram a buscar errado?** Restaurar `assets/js/caracois-care-catalog.js`.

Em todos os casos: rollback é arquivo-por-arquivo, sem efeito cascata.

---

## 📊 Resumo numérico

| Métrica | Antes | Depois |
|---|:---:|:---:|
| Versões distintas de `main.css` no projeto | 6 | 1 |
| Versões distintas de `main.js` no projeto | 8 | 1 |
| Seções na home Caracóis Care | 5 | 6 (+Onde Comprar) |
| Páginas com Care indexável | 6 | 6 (mantido) |
| Páginas com modal Care | 6 | 6 (mantido) |
| Páginas com tracking GA4 | 63 | 63 |
| `main.js` (tracking) | preservado | preservado |
| Linhas tocadas no `main.css` | — | 2 |
| Linhas adicionadas no `caracois-care.css` | — | 78 |
| Função simplificada no `caracois-care-catalog.js` | — | 1 (`careProductSearchQuery`) |

---

## 🎯 Próximos passos sugeridos (não inclusos nesta release)

1. **Fase 4 — Refactor CSS** (4-6h em sessão dedicada): consolidar 149 `!important` no `main.css`, unificar `bee-product-pages.css` ↔ `caracois-care-product-pages.css`.
2. **Quando Care tiver SKUs reais**: substituir queries genéricas por links diretos de produto nos marketplaces (ASIN Amazon, ID Shopee, MLB do Mercado Livre).
3. **Considerar**: Schema.org `Product` nas páginas de produto Care (atualmente só Bee tem). Pode ser feito junto com a chegada dos SKUs.
