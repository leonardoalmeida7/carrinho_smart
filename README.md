# Carrinho Smart 🛒

Aplicativo de **lista de compras com calculadora em tempo real**, desenvolvido com base no design system *Carrinho Fresco* e nas telas de referência enviadas.

## Funcionalidades

### Lista de Compras (Tela Principal)
- **Painel de Total Automático** — total acumulado, contagem de itens e barra de progresso vs. meta de gastos
- **Adição Rápida** — nome, quantidade e preço unitário em um toque
- **Checklist Inteligente** — itens divididos em *No Carrinho* e *Pendentes* com subtotais
- **Filtros** — Todos / No Carrinho / Pendentes
- **Ações** — Finalizar compra, compartilhar ou limpar lista
- **Banner de economia** — insight motivacional baseado no orçamento

### Novo Item / Edição
- Stepper de quantidade (+ / −)
- Unidades: `un`, `kg`, `g`, `L`
- Sugestões inteligentes (Leite, Pão, Café…)
- Prévia instantânea do subtotal
- Seleção de categorias (Hortifrúti, Laticínios, Padaria…)

### Histórico
- Resumo mensal com barra de progresso vs. teto mensal
- Registro de compras com tags (Dentro, Compra do Mês, Feira Fresca)
- **Repetir lista** — clona itens para nova ida ao mercado
- Exportar recibo (impressão/PDF) e compartilhar via WhatsApp

### Configurações
- Meta de gasto por compra com alerta de teto
- Desconto no caixa (%) e taxa de sacolas
- Gerenciamento visual de categorias
- **Vibração ao marcar item** (API Vibration)
- **Manter tela ligada** (Screen Wake Lock API)

## Como executar

```bash
cd carrinho-smart
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador (ideal: modo responsivo mobile ou celular).

### Build de produção

```bash
npm run build
npm run preview
```

## Stack tecnológica

| Tecnologia | Função |
|---|---|
| **React 19** | Interface reativa e componentizada |
| **TypeScript** | Tipagem estática e segurança em tempo de compilação |
| **Vite 8** | Dev server instantâneo e build otimizado |
| **Tailwind CSS 4** | Design tokens e utilitários alinhados ao DESIGN.md |
| **Zustand** | Estado global leve com persistência em localStorage |
| **React Router 7** | Navegação entre Lista, Histórico e Ajustes |
| **Lucide React** | Ícones consistentes e tree-shakeable |

> Detalhes completos das escolhas técnicas em [`DECISOES.md`](./DECISOES.md).

## Estrutura do projeto

```
src/
├── components/
│   ├── history/     # Resumo mensal, cards de visita
│   ├── layout/      # Header, BottomNav, AppShell
│   ├── list/        # BudgetPanel, QuickAddBar, ItemCard…
│   └── ui/          # Button, Checkbox, Chip, Stepper, Toggle…
├── hooks/           # Wake Lock, vibração
├── lib/             # Formatação BRL, constantes, compartilhamento
├── pages/           # Lista, Novo Item, Histórico, Ajustes
├── store/           # Zustand store com persistência
└── types/           # Tipos TypeScript
```

## Persistência

Todos os dados (lista, histórico, configurações) são salvos automaticamente no **localStorage** do navegador via Zustand Persist — funciona offline após o primeiro carregamento.

## Design

O visual segue fielmente o arquivo `DESIGN.md`:
- Paleta emerald/mint (`#006948`, `#059669`)
- Tipografia **Plus Jakarta Sans** + **Inter** (valores monetários com `tabular-nums`)
- Cards `rounded-2xl`, chips pill, touch targets ≥ 48px
- Locale `pt-BR` com formatação `R$ 0,00`

## Licença

Projeto educacional — uso livre.
