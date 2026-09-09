---
name: Carrinho Fresco
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  currency-display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.03em
  currency-tag:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  spacing-2xs: 0.25rem
  spacing-xs: 0.5rem
  spacing-sm: 0.75rem
  spacing-md: 1rem
  spacing-lg: 1.25rem
  spacing-xl: 1.5rem
  spacing-2xl: 2rem
  spacing-3xl: 3rem
  margin-mobile: 1rem
  margin-tablet: 1.5rem
  gutter-default: 0.75rem
---

## Brand & Style
The design system embodies a modern, cheerful, and hyper-efficient companion for everyday grocery shopping and dynamic spending control. It strikes a balance between grocery freshness (crisp produce, natural vibrancy) and financial clarity (budget consciousness, clear math, accessible figures).

The design style relies on a hybrid of **Clean Modernism** and **Tactile Micro-Interactions**:
- High-clarity layouts engineered for quick in-aisle thumb operations.
- Warm, luminous off-white backdrops that eliminate cold clinical sterility while sustaining maximum contrast under varied supermarket lighting.
- Crisp emerald and vivid mint accents providing positive psychological feedback on savings and remaining budget.
- Tactile, pressable micro-components (steppers, checks, quick tags) designed with immediate physical responsiveness.
- Brazilian Portuguese (`pt-BR`) linguistic ergonomics: accommodating lengthier phrasing (e.g., "Hortifrúti", "Adicionar ao carrinho") and clear currency formatting (`R$ 0,00`).

## Colors
The color palette leverages the vitality of fresh market greens alongside dependable, high-contrast functional neutrals.

- **Primary (`#059669` / Emerald 600)**: Used for primary calls to action, affirmative status badges, active totals, and key monetary targets. Communicates freshness, budget safety, and balance.
- **Secondary (`#10B981` / Mint 500)**: Serves as an accent for highlights, completed checklist sweeps, subtle progress track fills, and live savings trackers.
- **Tertiary (`#F59E0B` / Amber 500)**: Flags impending budget ceilings, promotional tags, and warning thresholds (e.g., approaching 90% of shopping budget).
- **Neutral (`#111827` / Gray 900)**: High-contrast ink for core labels, price points, and dense tabular numbers.
- **Surfaces & Backgrounds**:
  - Base canvas: `#FAFAF9` (warm crisp off-white/stone).
  - Elevated cards & bottom sheets: `#FFFFFF` (pure white for pristine separation).
  - Subtle borders & divider lines: `#E7E5E4` (warm stone neutral).
  - Danger / Deletion / Budget Exceeded: `#E11D48` (rose red).

## Typography
The typographic scale combines the approachable geometry of **Plus Jakarta Sans** for headers, categories, and item descriptions, with the structural precision of **Inter** for numerals, currency denominations, tabular calculations, and interface tags.

- All currency amounts use `font-variant-numeric: tabular-nums` to ensure that rapidly adjusting running totals do not cause layout jittering.
- The `currency-display` role is specifically optimized for fixed bottom bars indicating "Total no Carrinho" or "Saldo Restante".
- The `currency-tag` token ensures unit prices (`R$ 14,90/kg`) remain legible at a glance under motion.

## Layout & Spacing
The layout strictly adopts a mobile-first fluid model governed by standard base-4 and base-8 increments.

- **Mobile Viewport (up to 640px)**: 1-column fluid stacking with `16px` outer margins. Interactive touch targets (buttons, stepper zones, checkboxes) must maintain a minimum height and width of `48px` to facilitate reliable one-handed thumb interaction.
- **Tablet / Split Viewport (641px - 1024px)**: 2-column layout pairing the interactive list on the left with a sticky summary, budget meter, and departmental overview on the right. Margins expand to `24px`.
- **Desktop (1025px+)**: Max-width capped at `768px` for focused list planning or an anchored dual-pane at `1080px`.
- **Safe Zones**: Pinned bottom navigation or sticky budget bars require an integrated bottom safe area padding of at least `spacing-lg` (`20px`) plus device home indicator space.

## Elevation & Depth
Visual separation avoids heavy, murky dropshadows in favor of crisp tonal layers, soft ambient green-tinted glows, and hairline dividers.

- **Level 0 (Flat)**: Base canvas (`#FAFAF9`).
- **Level 1 (Surface Cards)**: `#FFFFFF` elevated via a subtle ambient shadow (`0 2px 8px -2px rgba(17, 24, 39, 0.04), 0 1px 3px 0 rgba(17, 24, 39, 0.02)`) paired with a `1px` border in `#F3F4F6`.
- **Level 2 (Active Cards & Floating Sheets)**: Raised state for dragged items or opened input sheets (`0 10px 25px -5px rgba(17, 24, 39, 0.08), 0 8px 10px -6px rgba(17, 24, 39, 0.03)`).
- **Level 3 (Fixed Spend Calculator Bar)**: Docked at the bottom screen edge with an upward diffuse shadow (`0 -4px 20px -2px rgba(5, 150, 105, 0.08), 0 -2px 6px -1px rgba(0, 0, 0, 0.04)`) and a `1px` top border in `#E5E7EB`.

## Shapes
A roundedness value of `2` provides a friendly, welcoming aesthetic that avoids industrial harshness while maintaining clean alignment.

- **Containers & Main Cards**: Use `rounded-2xl` (`16px` / `1rem`) for smooth visual framing.
- **Quantity Steppers & Metric Badges**: Use `rounded-xl` (`12px` / `0.75rem`) for compact tactile comfort.
- **Pill Tags (Category & Filter Chips)**: Full round (`9999px`) to afford sliding and touch classification.
- **Input Fields & Action Triggers**: Standardized to `rounded-xl` (`12px`).

## Components

### 1. Buttons
- **Primary Action**: Solid `#059669` fill, pure white label, `rounded-xl`, height `48px`. Active state subtly presses down (`transform: scale(0.98)`).
- **Secondary Action**: Tinted mint surface (`#ECFDF5`), `#059669` text label, no border, `rounded-xl`.
- **Destructive Action**: `#FFF1F2` surface with `#E11D48` text and icon.

### 2. Shopping Item Card
- Multi-state card using `rounded-2xl` and pure white background.
- **Unchecked**: Crisp `#111827` title, high-contrast price tag badge, inline stepper, and category indicator icon.
- **Checked (In Cart)**: Background shifts to `#F8FAFC`, title receives a gentle strike-through with `#6B7280` text, and the leading checkbox turns into a filled `#059669` checkmark badge.

### 3. Quantity Stepper
- Compact pill or squircle capsule consisting of `[ - ] [ Value ] [ + ]`.
- Buttons are minimum `36px × 36px` touch zones with a neutral surface (`#F3F4F6`), transitioning to `#E5E7EB` on active touch.
- Value displayed using `Inter` bold font with clear unit descriptors (e.g., "3 un" or "1,2 kg").

### 4. Monetary Badges & Price Tags
- **Price Tag Badge**: Contained within an accent container with `#F0FDF4` fill, `#166534` text, and `currency-tag` typography.
- **Discount / Economy Badge**: Contained within `#FEF3C7` background with `#92400E` text (e.g., "-R$ 4,50").

### 5. Checkbox
- Rounded square (`8px` radius) with `22px × 22px` footprint.
- Unchecked: `2px` outline in `#D1D5DB`, background transparent.
- Checked: `#059669` background with a crisp white check vector animation.

### 6. Chips (Department & Filter)
- Horizontally scrollable row with `rounded-full` shape.
- Unselected: White background, `1px` solid border (`#E5E7EB`), text in `#4B5563`.
- Selected: `#059669` background, text in white, subtle emerald shadow.

### 7. Input Fields
- Height `48px`, `rounded-xl`, border `1.5px` solid `#E5E7EB`.
- Focused: Border shifts to `#059669` with a diffuse `3px` focus ring in `rgba(16, 185, 129, 0.2)`.
- Pre-fixed currency masks (`R$`) anchored in muted neutral tone.

### 8. Pinned Spending Bar (Calculator Deck)
- Fixed bottom container featuring:
  - Mini live progress bar depicting current spending against the set budget limit (transitions dynamically: Emerald &rarr; Mint &rarr; Amber &rarr; Rose).
  - High-impact split: Left side displays "Total" and remaining balance; Right side features a prominent "Finalizar Compra" or "Adicionar Item" primary CTA.