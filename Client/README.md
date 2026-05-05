# Adaptive Quiz Platform – Frontend

React + TypeScript frontend for an adaptive quiz application. Users answer questions that dynamically adjust in difficulty based on performance, with scoring, stats, and a global leaderboard.

---

## 🚀 Tech Stack

- React
- TypeScript
- TanStack Query (React Query) – data fetching & caching
- Supabase – authentication
- React Router
- Tailwind CSS

---

## ✨ Features

- Magic link authentication (email-based login)
- Adaptive question flow (difficulty adjusts per answer)
- Timed scoring system
- Leaderboard
- User profile with stats
- Optimised data fetching and caching via React Query

---

## 🧠 Architecture

- `api/client.ts` → centralised fetch wrapper (auth + error handling)
- `hooks/useQuiz.ts` → React Query hooks for API interaction
- Context → lightweight user state (display name)
- Pages → UI + orchestration

---

## ⚙️ Environment Variables

Copy the example file and update values as needed:

```bash
cp .env.example .env
```

## Things to do

- /results page handling for direct visits when there is no quiz `attemptId` to generate results
  planned improvement: - Move attemptId into URL (e.g. `/results/attemptId`) - OR fetch latest attempt from backend
