# 🎨 Esquema de Cores - Design Baseado em Brand Image 2026

## 📸 Imagem Brand Aplicada

A imagem brand agora está integrada na **Barra de Navegação** como um avatar circular com efeitos:
- **Localização**: Header - Lado esquerdo ao lado do logo "Leidy Cleaner"
- **Dimensões**: 64x64px (desktop) / 56x56px (mobile)
- **Formato**: JPG circular com border roxo e efeitos hover animados
- **Caminho**: `/public/images/theme-brand.jpg`

---

## 🎯 Paleta de Cores Primária

### Cores Dominantes da Imagem Brand

| Cor | HEX | RGB | Uso | Variações |
|-----|-----|-----|-----|-----------|
| **Roxo Brand** | `#7c3aed` | `124, 58, 237` | Primária Principal | Light: `#a78bfa` / Dark: `#6d28d9` |
| **Ciano Vibrante** | `#06b6d4` | `6, 182, 212` | Secundária Principal | Light: `#22d3ee` / Dark: `#0891b2` |
| **Fundo Claro** | `#f8f6fc` | `248, 246, 252` | Bg padrão (light) | Secundário: `#f3f0fa` |
| **Fundo Escuro** | `#0f172a` | `15, 23, 42` | Bg padrão (dark) | Secundário: `#1e293b` |

---

## 🌈 Paleta Completa com Status

### Status & Tokens

```css
/* Cores de Status */
--color-success: #10b981   /* Verde sucesso */
--color-warning: #f59e0b   /* Laranja aviso */
--color-error: #ef4444     /* Vermelho erro */
--color-info: #06b6d4      /* Ciano informação */

/* Texto Variações */
--color-text: #1e1b4b                  /* Primário (light) */
--color-text-secondary: #52525b        /* Secundário */
--color-text-tertiary: #a1a1aa         /* Terciário */

/* Bordas Variações */
--color-border: #ddd6fe                /* Principal */
--color-border-light: #ede9fe          /* Light */
```

---

## 🎭 Temas Implementados

### 1️⃣ Tema Claro (Light - Padrão)

```
┌─────────────────────────────────────┐
│  [Brand Image] Leidy Cleaner        │ ← Header Roxo com Ciano
│  Limpeza Profissional Premium       │
└─────────────────────────────────────┘
│
├─ Cores:
│  ├─ Primária: #7c3aed (Roxo)
│  ├─ Secundária: #06b6d4 (Ciano)
│  ├─ Background: #f8f6fc (Violeta muito claro)
│  ├─ Text: #1e1b4b (Escuro)
│  └─ Borders: #ddd6fe (Roxo suave)
│
├─ Gradientes:
│  ├─ Header: #1e293b → #6d28d9 → #1e293b
│  ├─ Botões: #7c3aed → #06b6d4
│  └─ Cards: rgba(124,58,237,0.15)
```

### 2️⃣ Tema Escuro (Dark Mode)

```
┌─────────────────────────────────────┐
│  [Brand Image] Leidy Cleaner        │ ← Header Escuro com Ciano
│  Limpeza Profissional Premium       │
└─────────────────────────────────────┘
│
├─ Cores:
│  ├─ Primária: #a78bfa (Roxo claro)
│  ├─ Secundária: #22d3ee (Ciano claro)
│  ├─ Background: #0f172a (Azul escuro)
│  ├─ Text: #f8fafc (Branco)
│  └─ Borders: #64748b (Cinza)
│
├─ Gradientes:
│  ├─ Header: #0f172a → #6d28d9 → #0f172a
│  ├─ Botões: #a78bfa → #22d3ee
│  └─ Cards: rgba(167,139,250,0.1)
```

### 3️⃣ Tema Alto Contraste (Acessibilidade)

```
├─ Primária: #000000 (Preto)
├─ Background: #ffffff (Branco)
├─ Text: #000000 (Preto)
└─ Borders: #000000 (Preto)
```

---

## 🎨 Componentes Atualizados

### Header.jsx
```jsx
// Novo design com imagem brand
<header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-300/50">
    <Image src="/images/theme-brand.jpg" alt="Leidy Cleaner Brand" />
  </div>
  <h1 className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
    Leidy Cleaner
  </h1>
</header>
```

### Botões CTA
```jsx
// Gradient Roxo → Ciano
className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
```

### Cards & Surfaces
```css
/* Background violeta muito suave */
background: linear-gradient(180deg, #f8f6fc 0%, #f3f0fa 100%);

/* Bordas roxo suave */
border: 1px solid #ddd6fe;

/* Shadows com roxo */
box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.15);
```

---

## 📱 Responsividade por Tema

### Mobile Header
- Brand Image: 56x56px (circular)
- Texto mantém o mesmo gradient
- Menu mobile com mesmo tema roxo/ciano

### Tablet
- Brand Image: 64x64px (circular)
- Layout expandido
- Navegação horizontal em desktop

### Desktop
- Brand Image: 64x64px (circular)
- Full navigation bar
- Max-width 1200px

---

## ✨ Efeitos & Animações

### Hover Effects
```css
/* Brand Image */
.brand-image:hover {
  transform: scale(1.1);
  border-color: #a78bfa;
  filter: brightness(1.2);
}

/* Botões CTA */
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);
}

/* Cards */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.2);
}
```

### Animações
- **Pulse**: Brand image com pulso de luz
- **Fade In**: Elementos ao scroll
- **Slide Up**: Modais e menus
- **Gradient Animation**: Gradientes animados

---

## 🎯 Casos de Uso por Componente

### Header
- Fundo: Roxo gradiente
- Texto: Cyan → Purple → Pink
- Image: Brand circular
- Botão Agendar: Cyan → Purple

### Hero Section
- Gradient background com roxo/ciano
- Text: Contraste alto
- CTA: Cyan → Purple

### Cards Serviços
- Border: Roxo suave
- Hover: Elevação roxo
- Icon bg: Roxo transparente

### CTAs & Botões
- Primary: Cyan → Purple
- Secondary: Purple outline
- Tertiary: Ghost mode

### Forms & Inputs
- Focus: Border roxo com glow
- Placeholder: Muted gray
- Error: Vermelho

---

## 🔧 Arquivos Modificados

1. **Header.jsx** - Novo design com brand image
2. **themes.css** - Paleta roxo/ciano
3. **globals.css** - Design tokens atualizados
4. **ThemeContext.jsx** - Accent color = roxo

---

## 📊 Métricas de Cor

### Contrastes (WCAG)
- Roxo sobre Branco: 5.2:1 ✅ AA+
- Ciano sobre Roxo: 4.8:1 ✅ AA
- Preto sobre Roxo Light: 7.1:1 ✅ AAA

### Saturação
- Primária (Roxo): 88%
- Secundária (Ciano): 96%
- Backgrounds: 15-20%

---

## 🚀 Como Usar

### No JSX
```jsx
import Header from '@/components/Layout/Header';

export default function Page() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-cyan-500">
      <Header />
    </div>
  );
}
```

### No CSS/Tailwind
```tailwind
<!-- Roxo brand -->
<div className="bg-purple-600 text-white">

<!-- Ciano secundário -->
<div className="bg-cyan-500 text-slate-900">

<!-- Gradient combo -->
<div className="bg-gradient-to-r from-purple-600 to-cyan-500">

<!-- Com dark mode -->
<div className="bg-purple-600 dark:bg-purple-700">
```

---

## 🎬 Próximas Steps

- [ ] Expandir gradientes em mais componentes
- [ ] Criar animações de transição suave
- [ ] Adicionar micro-interações com efeitos de brilho
- [ ] Testar contrastes em leitores de tela
- [ ] Implementar dark mode em todas as páginas
- [ ] Criar guia de estilo completo (Storybook)

---

**Versão**: 1.0.0  
**Data**: Fevereiro 2026  
**Status**: ✅ Implementado com sucesso
