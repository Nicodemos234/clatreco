# Clatreco

Jogo diário de adivinhar a palavra de 5 letras em português. React + Vite.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:5173.

## Deploy na Vercel

**Pelo site:** suba esta pasta para um repositório no GitHub, entre em vercel.com → *Add New → Project*, importe o repositório e clique em *Deploy*. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`).

**Pela linha de comando:**

```bash
npm i -g vercel
vercel        # primeiro deploy (preview)
vercel --prod # produção
```

## Estrutura

- `src/lib/words.json` — `ans`: lista de respostas do dia; `valid`: palavras aceitas como tentativa
- `src/lib/game.js` — palavra do dia, normalização de acentos, pontuação
- `src/App.jsx` — estado do jogo, teclado físico, estatísticas
- `src/components/` — tabuleiro, teclado, cabeçalho e janelas (ajuda, estatísticas, configurações)

Para trocar as palavras do dia, edite `ans` em `words.json`. A ordem é embaralhada com uma semente fixa, então todo mundo recebe a mesma palavra no mesmo dia.
# clatreco
# clatreco
