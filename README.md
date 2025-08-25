# Counselling Through Bible — v6 (Quota Fallback)

- ESLint 8 fix, TS alias, postcss.cjs
- Node runtime API for chat (fs ok)
- **LLM_OFFLINE=on** provides a graceful local fallback if OpenAI key is missing or quota exceeded
- FREE_TIER=on bypasses Stripe while testing

## Run
```
npm install
cp .env.example .env.local   # defaults: LLM_OFFLINE=on, FREE_TIER=on
npm run dev
```
When ready to use the real model:
- set `OPENAI_API_KEY=sk-...`
- set `LLM_OFFLINE=off`
