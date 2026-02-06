# 🎨 Redesign Visual - Leidy Cleaner 2026

## 📋 Escopo de Redesign

### Objetivos
✅ Layout mais amplo e moderno (12-col grid, spacing generoso)  
✅ Design System atualizado (cores vibrantes, tipografia premium)  
✅ Animações suaves em toda a experiência  
✅ Mais funcionalidades visuais nas telas  
✅ Imagens de qualidade e ícones modernos  
✅ Modo claro/escuro melhorado  
✅ Acessibilidade aprimorada  

---

## 🎨 Design System Novo

### Paleta de Cores (2026)
```
Primary:     #2563EB (Azul Moderno)
Accent:      #10B981 (Verde Esmeralda)
Secondary:   #F59E0B (Âmbar Quente)
Success:     #34D399 (Verde Claro)
Warning:     #FBBF24 (Amarelo)
Danger:      #EF4444 (Vermelho)
Neutral:     #1F2937 → #F9FAFB (Cinzento)

Gradients:
- Hero:      linear-gradient(135deg, #2563EB, #10B981)
- Accent:    linear-gradient(135deg, #10B981, #06B6D4)
- Dark:      linear-gradient(135deg, #1E293B, #0F172A)
```

### Tipografia
```
Display:     Inter 700, 3.5rem (Hero Titles)
Heading:     Poppins 700, 1.875rem (Section Titles)
Subheading:  Inter 600, 1.25rem
Body:        Inter 400, 1rem (Line-height: 1.6)
Caption:     Inter 500, 0.875rem
Code:        JetBrains Mono 400, 0.875rem
```

### Espaçamento
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
4xl: 96px
```

---

## 📱 Mapa de Páginas Redesenhadas

| Página | Status | Novas Seções | Animações |
|--------|--------|-------------|-----------|
| `/` (Home) | ♻️ Em redesign | Hero épico, Serviços cards, Pricing interativo, Testimonials, Blog preview | Parallax, Scroll-triggered, Hover effects |
| `/agendar` | ♻️ Em redesign | Wizard passos visuais, Calendário moderno, Mapa interativo, Preview resultado | Step animations, Date pick effects |
| `/dashboard` | ♻️ Em redesign | Cards KPI animadas, Gráficos interativos, Timeline de bookings | Real-time data, Chart animations |
| `/servicos` | 🆕 Nova página | Grid de serviços 3-4 col, Filtros avançados, Comparador de preços | Filter transitions, Card stagger |
| `/reviews` | ♻️ Em redesign | Carousel testimonios, Rating stars animadas, User avatars | Swipe animations, Star filling |
| `/admin` | ♻️ Em redesign | Dashboard analítico, Tabelas interativas, Gráficos avançados | Real-time updates |

---

## 🎬 Componentes Novos

### 1. **HeroSection** (Ampliado)
```jsx
- Vídeo background (ou blur animado)
- CTA buttons duplos (Primary + Secondary)
- Scroll indicator animado
- Breadcrumb dinâmico
- Trust badges (4.9 ⭐, 500+ reviews, 10+ anos)
```

### 2. **ServiceCard** (Estilo novo)
```jsx
- Ícone 3D/SVG animado
- Gradient background
- Hover elevation effect
- Quick links (Saiba mais, Agendar)
- Badge de popular/new
- Preço com animação de números
```

### 3. **TimelineBookings** (Nova)
```jsx
- Vertical timeline com ícones animados
- Status badges com cores
- Data/hora destacada
- Microinteractions ao hover
- Expandable details
```

### 4. **InteractiveCalendar** (Melhorada)
```jsx
- Integração com D3.js/Charts
- Heat map de disponibilidade
- Horários recomendados destacados
- Sincronização Google Calendar
- Export ICS
```

### 5. **TestimonialsCarousel** (Animado)
```jsx
- Auto-play com pausas
- Star ratings animadas
- Avatar placeholders
- Swipe gestures (mobile)
- Quote marks decorativos animados
```

### 6. **PricingComparator** (Interativo)
```jsx
- 3+ planos lado a lado
- Toggle anual/mensal
- Featurelist com checkmarks animados
- Highlight bestseller
- Smooth transitions
```

### 7. **FloatingChat** (Novo)
```jsx
- Chat bubble no canto inferior
- Pulse animation
- Quick replies
- Avatar do atendente
- Notificação badge
```

### 8. **StatsCounter** (Animado)
```jsx
- Números animados ao scroll
- Unidades dinâmicas (+ clientes, servicios, etc)
- Ícones com hover effects
```

---

## 🎯 Seções da Home (Nova Estrutura)

1. **Hero Section** (Viewport inteiro)
   - Background animado
   - Copy principal + subcopy
   - 2 CTAs destacados
   - Scroll indicator com seta animada

2. **Trust Badges**
   - 4.9 ⭐ | 500+ Reviews | 10+ Anos | Eco-friendly Certified
   - Animação de fade-in cascata

3. **Serviços Rápidos** (3-4 cards)
   - Card com gradiente + ícone 3D
   - Preço destacado
   - Hover: Popup de detalhes

4. **Como Funciona** (4 passos)
   - Numeração grande + ícone animado
   - Timeline visual
   - Descrição clara

5. **Mercado de Profissionais** (NEW)
   - Grid de top clientes
   - Rating + reviews ao hover
   - Click para mais detalhes

6. **Preços & Planos** (Comparador interativo)
   - 3 planos: Básico, Pro, Premium
   - Toggle anual/mensal
   - Destaque "Mais Popular"

7. **Testemunhos** (Carrossel)
   - Avatar + Nome + Rating ⭐⭐⭐⭐⭐
   - Swipe mobile, auto-play desktop
   - Quote visual

8. **Blog Preview** (3 últimos posts)
   - Card com imagem cover (placeholder)
   - Categoria badge + leitura estimada
   - Hover: Transform + shadow

9. **FAQ** (Accordion)
   - Expandable items com ícones
   - Smooth height animation
   - Search box

10. **Newsletter CTA**
    - Copy principal + input email
    - Loading state no botão
    - Confirmação com animação

11. **Footer** (Ampliado)
    - Links, Redes Sociais, WhatsApp
    - Mapa com endereço
    - Legal links

---

## 🎨 Padrões de Animação

### Scroll Triggers (AOS)
- Fade-up + 30px
- Duration: 600ms
- Delay: 80ms stagger
- Once: true

### Click States
- Button: Ripple effect
- Card: Lift + shadow expansion
- Links: Underline slide

### Hover Effects  
- Cards: Y-translate -10px, Shadow glow
- Buttons: Brightness ↑, Icon rotate
- Images: Scale 1.05, Brightness ↑

### Loading States
- Skeleton screens com shimmer
- Button: Loading spinner + disabled
- Data: Placeholder animations

### Transitions
- Color/opacity: 200ms (ease-out)
- Position/size: 300ms (cubic-bezier)
- Complex: 400ms (easeOutCubic)

---

## 🖼️ Imagens & Assets

### Tipos de Imagens Necessárias
1. **Hero Background** 
   - Larga (1920x1080px): Professional cleaning scene
   - Alt: "Equipe profissional de limpeza em ação"

2. **Service Icons** (6x)
   - SVG animáveis (Lottie format)
   - 200x200px base
   - Uso em cards + seções

3. **Team Photos** (4-6 people)
   - 400x400px, format: webp
   - Headshots com backgroundblur
   - Avatar circular 80x80px

4. **Testimonial Avatars** (5-8 people)
   - 64x64px circular
   - Initials fallback (Avatar.tsx)

5. **Blog Cover Images** (3-6)
   - 1200x600px, format: webp
   - Category gradient overlay
   - Alt text descritivo

6. **Product/Before-After**
   - Slider component
   - 900x600px cada

7. **Logo Variants**
   - Full logo 300x100px
   - Icon-only 200x200px
   - Dark/light versions

---

## 📊 Implementação Timeline

### Phase 1 (Hoje)
- ✅ Create new Design System colors/typography
- ✅ Update index.jsx com novo layout
- ✅ Create reusable component library
- ✅ Add Framer Motion animations

### Phase 2 
- ⬜ Update /agendar page (booking wizard)
- ⬜ New /servicos page (service grid + filters)
- ⬜ Update /dashboard (analytics cards)

### Phase 3
- ⬜ Add floating chat component
- ⬜ Integrate Google/Calendar sync
- ⬜ Add animations.config.ts (centralized)

### Phase 4
- ⬜ Accessibility audit (WCAG 2.1 AA)
- ⬜ Performance optimization (Lighthouse 90+)
- ⬜ E2E component tests

---

## 🎯 Success Metrics

- [ ] Lighthouse score > 90
- [ ] Mobile first index
- [ ] CRO improvement 15%+
- [ ] Time on page ↑ 40%
- [ ] Engagement rate ↑ 25%

---

**Status:** 🟢 Ready for Implementation  
**Last Updated:** 2026-02-06  
**Owner:** Design System Team
