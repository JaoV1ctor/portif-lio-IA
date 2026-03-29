# Project Constitution (Gemini)

## Data Schemas

### Project Schema (Interface)
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  link?: string;
}
```

## Behavioral Rules

- **Design Pattern:** Portfolio / Agency (Storytelling + Case Studies)
- **Aesthetic:** Liquid Glass (backdrop-filter: blur, transparent backgrounds, gloss)
- **Color Palette (60-30-10):**
  - Primary (60%): `#FFFFFF` (White) / `#1E293B` (Slate for text in light mode / bg in dark mode)
  - Secondary (30%): `#6366F1` (Indigo)
  - Accent (10%): `#10B981` (Emerald) e `#F59E0B` (Amber)
- **Typography:**
  - Headings: Inter (Google Font)
  - Body: Roboto (Google Font)
- **Anti-patterns to avoid:**
  - Animações travando eventos de usuário.
  - Textos puros Brancos sobre Preto puro (usaremos slate).
  - Ícones sem bordas táteis claras.
  - Ocultar navegação sem motivo justificado.

## Architectural Invariants
- React (19) com Vite
- Estilização via Tailwind CSS 4
- Animações exclusivas com `framer-motion`
- Tudo deve ser responsivo e modular (componentes isolados na pasta `src/components/ui`).
